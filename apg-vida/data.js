// APG VIDA · capa de datos.
// Con credenciales en config.js todo se guarda en Supabase (sincronizado entre
// celular y computador). Sin credenciales funciona en modo demostración, con
// datos de ejemplo guardados solo en este navegador.

const CFG = window.APG_VIDA_CONFIG || {};
const REMOTO = !!(CFG.supabaseUrl && CFG.supabaseAnonKey && window.supabase);
const sb = REMOTO ? window.supabase.createClient(CFG.supabaseUrl, CFG.supabaseAnonKey) : null;
const BUCKET = 'documentos';
const LS_DEMO = 'apgvida-demo-v1';

const TABLAS = ['categorias', 'tareas', 'habitos', 'habito_registros', 'pagos', 'pago_historial', 'documentos'];
const db = Object.fromEntries(TABLAS.map((t) => [t, []]));
const sesion = { user: null };

const uid = () => (crypto.randomUUID ? crypto.randomUUID()
  : 'xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx'.replace(/x/g, () => ((Math.random() * 16) | 0).toString(16)));

// ---------- Fechas (siempre en hora local, formato AAAA-MM-DD) ----------
const pad = (n) => String(n).padStart(2, '0');
const isoDe = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const hoyISO = () => isoDe(new Date());
const aFecha = (iso) => { const [y, m, d] = iso.split('-').map(Number); return new Date(y, m - 1, d); };
const sumarDias = (iso, n) => { const d = aFecha(iso); d.setDate(d.getDate() + n); return isoDe(d); };
function sumarMeses(iso, n) {
  const [y, m, d] = iso.split('-').map(Number);
  const ultimo = new Date(y, m - 1 + n + 1, 0).getDate();
  return isoDe(new Date(y, m - 1 + n, Math.min(d, ultimo)));
}
const diasEntre = (a, b) => Math.round((aFecha(b) - aFecha(a)) / 86400000);

// ---------- Persistencia local (modo demostración) ----------
function guardarLocal() {
  if (REMOTO) return;
  try { localStorage.setItem(LS_DEMO, JSON.stringify(db)); }
  catch (e) { toast('El navegador no tiene más espacio para el modo demostración', true); }
}

function avisarError(error) {
  console.error(error);
  const m = error && error.message || String(error);
  toast(/row-level|permission/i.test(m) ? 'No tienes permiso para esa acción'
    : /fetch|network/i.test(m) ? 'Sin conexión: no se pudo guardar'
      : 'No se pudo guardar: ' + m, true);
}

// ---------- Operaciones ----------
// Todas actualizan la pantalla al instante y luego guardan; si falla, se deshace.
const Datos = {
  async cargar() {
    if (!REMOTO) {
      const guardado = localStorage.getItem(LS_DEMO);
      const datos = guardado ? JSON.parse(guardado) : datosDemo();
      TABLAS.forEach((t) => { db[t] = datos[t] || []; });
      guardarLocal();
      return;
    }
    const resultados = await Promise.all(TABLAS.map(traerTodo));
    TABLAS.forEach((t, i) => { db[t] = resultados[i]; });
    if (!db.categorias.length && !db.habitos.length) await sembrarInicial();
  },

  async crear(t, obj) {
    const fila = { id: uid(), created_at: new Date().toISOString(), ...obj };
    db[t].push(fila);
    guardarLocal(); programarRender();
    if (REMOTO) {
      const { error } = await sb.from(t).insert(fila);
      if (error) { db[t] = db[t].filter((r) => r.id !== fila.id); avisarError(error); render(); throw error; }
    }
    return fila;
  },

  async editar(t, id, cambios) {
    const fila = db[t].find((r) => r.id === id);
    if (!fila) return;
    const antes = { ...fila };
    Object.assign(fila, cambios);
    guardarLocal(); programarRender();
    if (REMOTO) {
      const { error } = await sb.from(t).update(cambios).eq('id', id);
      if (error) { Object.assign(fila, antes); avisarError(error); render(); throw error; }
    }
    return fila;
  },

  async borrar(t, id) {
    const copia = Object.fromEntries(TABLAS.map((x) => [x, db[x].slice()]));
    db[t] = db[t].filter((r) => r.id !== id);
    // Lo mismo que hace la base de datos: borrar lo que depende y soltar referencias.
    if (t === 'habitos') db.habito_registros = db.habito_registros.filter((r) => r.habito_id !== id);
    if (t === 'pagos') db.pago_historial = db.pago_historial.filter((r) => r.pago_id !== id);
    if (t === 'categorias') {
      db.tareas.forEach((r) => { if (r.lista_id === id) r.lista_id = null; });
      db.pagos.forEach((r) => { if (r.categoria_id === id) r.categoria_id = null; });
      db.documentos.forEach((r) => { if (r.carpeta_id === id) r.carpeta_id = null; });
    }
    guardarLocal(); programarRender();
    if (REMOTO) {
      const { error } = await sb.from(t).delete().eq('id', id);
      if (error) { TABLAS.forEach((x) => { db[x] = copia[x]; }); avisarError(error); render(); throw error; }
    }
  },
};

async function traerTodo(t) {
  const filas = [];
  for (let desde = 0; ; desde += 1000) {
    const { data, error } = await sb.from(t).select('*').order('created_at').range(desde, desde + 999);
    if (error) throw error;
    filas.push(...data);
    if (data.length < 1000) break;
  }
  return filas;
}

// ---------- Archivos del baúl ----------
const Archivos = {
  async subir(docId, file) {
    const limpio = file.name.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^\w.-]+/g, '_').slice(-80);
    const info = { nombre: file.name, tipo: file.type || 'application/octet-stream', tamano: file.size };
    if (!REMOTO) {
      if (file.size > 1.5 * 1024 * 1024) throw new Error('En modo demostración solo se aceptan archivos de hasta 1,5 MB');
      const data = await new Promise((ok, mal) => {
        const r = new FileReader(); r.onload = () => ok(r.result); r.onerror = mal; r.readAsDataURL(file);
      });
      return { ...info, path: 'local:' + uid(), data };
    }
    const path = `${sesion.user.id}/${docId}/${Date.now()}-${limpio}`;
    const { error } = await sb.storage.from(BUCKET).upload(path, file, { contentType: info.tipo, upsert: false });
    if (error) throw error;
    return { ...info, path };
  },

  async url(archivo) {
    if (archivo.data) return archivo.data;
    const { data, error } = await sb.storage.from(BUCKET).createSignedUrl(archivo.path, 600);
    if (error) throw error;
    return data.signedUrl;
  },

  async borrar(archivos) {
    const rutas = archivos.filter((a) => !a.data && a.path).map((a) => a.path);
    if (REMOTO && rutas.length) {
      const { error } = await sb.storage.from(BUCKET).remove(rutas);
      if (error) console.error(error);
    }
  },
};

// ---------- Cuenta ----------
const Cuenta = {
  async iniciar() {
    if (!REMOTO) { sesion.user = { id: 'demo', email: 'demo', user_metadata: { nombre: localStorage.getItem('apgvida-nombre') || '' } }; return true; }
    const { data } = await sb.auth.getSession();
    sesion.user = data.session ? data.session.user : null;
    sb.auth.onAuthStateChange((evento, s) => {
      if (evento === 'PASSWORD_RECOVERY') { sesion.user = s.user; pedirNuevaClave(); }
      if (evento === 'SIGNED_OUT') { sesion.user = null; TABLAS.forEach((t) => { db[t] = []; }); mostrarLogin(); }
    });
    return !!sesion.user;
  },
  async entrar(email, clave) {
    const { data, error } = await sb.auth.signInWithPassword({ email, password: clave });
    if (error) throw error;
    sesion.user = data.user;
  },
  async registrar(nombre, email, clave) {
    const { data, error } = await sb.auth.signUp({
      email, password: clave,
      options: { data: { nombre }, emailRedirectTo: location.origin + location.pathname },
    });
    if (error) throw error;
    sesion.user = data.session ? data.user : null;
    return !!data.session;
  },
  async recordar(email) {
    const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo: location.origin + location.pathname });
    if (error) throw error;
  },
  async cambiarClave(clave) {
    const { error } = await sb.auth.updateUser({ password: clave });
    if (error) throw error;
  },
  async cambiarNombre(nombre) {
    if (!REMOTO) { localStorage.setItem('apgvida-nombre', nombre); sesion.user.user_metadata.nombre = nombre; return; }
    const { data, error } = await sb.auth.updateUser({ data: { nombre } });
    if (error) throw error;
    sesion.user = data.user;
  },
  async salir() { if (REMOTO) await sb.auth.signOut(); },
  nombre() { return (sesion.user && sesion.user.user_metadata && sesion.user.user_metadata.nombre) || ''; },
};

// ---------- Datos iniciales ----------
const HABITOS_BASE = [
  ['Dormir bien', 'sueno', false], ['Leer', 'libro', false], ['Tomar agua', 'agua', false],
  ['Hacer ejercicio', 'ejercicio', true], ['Meditar', 'meditar', false],
];
const CATEGORIAS_BASE = {
  carpeta: [['Familia', 'familia'], ['Personales', 'persona'], ['Importantes', 'estrella'], ['Vehículos', 'carro'], ['Otros', 'carpeta']],
  lista: [['Personal', 'persona'], ['Trabajo', 'trabajo'], ['Casa', 'casa']],
  pago: [['Hogar', 'casa'], ['Vehículo', 'carro'], ['Suscripciones', 'repetir'], ['Tarjetas', 'tarjeta']],
};

function filasBase() {
  const ahora = Date.now();
  const ts = (i) => new Date(ahora + i).toISOString();
  let i = 0;
  const categorias = [];
  Object.entries(CATEGORIAS_BASE).forEach(([tipo, lista]) => lista.forEach(([nombre, icono], orden) => {
    categorias.push({ id: uid(), tipo, nombre, icono, orden, created_at: ts(i++) });
  }));
  const habitos = HABITOS_BASE.map(([nombre, icono, es_ejercicio], orden) => ({ id: uid(), nombre, icono, es_ejercicio, orden, created_at: ts(i++) }));
  return { categorias, habitos };
}

async function sembrarInicial() {
  const { categorias, habitos } = filasBase();
  const [a, b] = await Promise.all([sb.from('categorias').insert(categorias), sb.from('habitos').insert(habitos)]);
  if (a.error || b.error) { avisarError(a.error || b.error); return; }
  db.categorias = categorias; db.habitos = habitos;
}

function datosDemo() {
  const { categorias, habitos } = filasBase();
  const cat = (tipo, nombre) => categorias.find((c) => c.tipo === tipo && c.nombre === nombre).id;
  const h = hoyISO();
  const d = (n) => sumarDias(h, n);
  const habito_registros = [];
  habitos.forEach((hab, k) => {
    for (let n = 1; n <= 40; n++) {
      // Rachas de ejemplo distintas para cada hábito
      if ((n + k * 3) % (k + 4) === 0 && n > 3 + k) continue;
      if (hab.icono === 'ejercicio' && n % 2 === 0) continue;
      habito_registros.push({
        id: uid(), habito_id: hab.id, fecha: d(-n), created_at: new Date().toISOString(),
        detalle: hab.es_ejercicio ? { minutos: 30 + (n % 3) * 10, ejercicios: [{ nombre: 'Flexiones', reps: 30 + n % 15 }, { nombre: 'Sentadillas', reps: 40 }] } : null,
      });
    }
  });
  habito_registros.push({ id: uid(), habito_id: habitos[0].id, fecha: h, detalle: null, created_at: new Date().toISOString() });
  habito_registros.push({ id: uid(), habito_id: habitos[2].id, fecha: h, detalle: null, created_at: new Date().toISOString() });
  const t = (titulo, fecha, prioridad, lista, repetir) => ({ id: uid(), titulo, fecha, prioridad, lista_id: lista && cat('lista', lista), repetir: repetir || null, hecha: false, hecha_en: null, created_at: new Date().toISOString() });
  const p = (nombre, frecuencia, proxima_fecha, valor, categoria) => ({ id: uid(), nombre, frecuencia, proxima_fecha, valor, categoria_id: cat('pago', categoria), notas: null, created_at: new Date().toISOString() });
  const doc = (nombre, carpeta, persona, numero, exp, venc) => ({ id: uid(), nombre, carpeta_id: cat('carpeta', carpeta), persona, numero, fecha_expedicion: exp, fecha_vencimiento: venc, notas: null, archivos: [], created_at: new Date().toISOString() });
  return {
    categorias, habitos, habito_registros,
    tareas: [
      t('Llamar al banco por el extracto', d(-1), 'alta', 'Personal'),
      t('Revisar propuesta del cliente', h, 'media', 'Trabajo'),
      t('Comprar mercado de la semana', h, null, 'Casa', 'semanal'),
      t('Agendar cita médica', d(2), 'baja', 'Personal'),
      t('Organizar el garaje', null, null, 'Casa'),
    ],
    pagos: [
      p('Arriendo', 'mensual', d(2), 1500000, 'Hogar'),
      p('Tarjeta de crédito', 'mensual', d(-1), null, 'Tarjetas'),
      p('Internet y TV', 'mensual', d(9), 129900, 'Hogar'),
      p('Netflix', 'mensual', d(16), 44900, 'Suscripciones'),
      p('Seguro todo riesgo', 'anual', d(75), 2350000, 'Vehículo'),
    ],
    pago_historial: [],
    documentos: [
      doc('SOAT', 'Vehículos', 'Yo', 'AT-1329-88412', d(-340), d(25)),
      doc('Revisión técnico-mecánica', 'Vehículos', 'Yo', 'RTM-55120', d(-300), d(65)),
      doc('Pasaporte', 'Personales', 'Yo', 'AX123456', d(-1500), d(-5)),
      doc('Licencia de conducción', 'Personales', 'Yo', '1.020.345.678', d(-800), d(2200)),
      doc('Registro civil', 'Familia', 'Hijo', '45879123', d(-2000), null),
      doc('Escritura del apartamento', 'Importantes', 'Yo', 'Esc. 2381', d(-900), null),
      doc('Póliza de salud', 'Importantes', 'Familia', 'POL-778812', d(-200), d(165)),
    ],
  };
}

function reiniciarDemo() {
  localStorage.removeItem(LS_DEMO);
  location.reload();
}
