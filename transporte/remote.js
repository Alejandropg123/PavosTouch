// Conexión con Supabase: inicio de sesión, carga de datos, guardado automático,
// archivos y cambios en vivo. Si config.js no tiene credenciales, la app funciona
// en modo demostración con datos de ejemplo guardados en el navegador.

const CFG = window.CONTROLOPS_CONFIG || {};
const REMOTO = !!(CFG.supabaseUrl && CFG.supabaseAnonKey && window.supabase);
const sb = REMOTO ? window.supabase.createClient(CFG.supabaseUrl, CFG.supabaseAnonKey) : null;
const BUCKET = 'documentos';

// Orden importa: primero las fichas, luego lo que depende de ellas.
const TABLAS = ['clientes', 'vehiculos', 'conductores', 'operaciones', 'gastos'];
const SOLO_SERVIDOR = ['createdAt', 'updatedAt', 'createdBy'];

const snake = (k) => k.replace(/[A-Z]/g, (c) => '_' + c.toLowerCase());
const camel = (k) => k.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
const toRow = (o) => Object.fromEntries(Object.entries(o)
  .filter(([k]) => !SOLO_SERVIDOR.includes(k))
  .map(([k, v]) => [snake(k), v === '' ? null : v]));
const fromRow = (r) => Object.fromEntries(Object.entries(r).map(([k, v]) => [camel(k), v === null ? '' : v]));

const uid = () => (crypto.randomUUID ? crypto.randomUUID() : 'id-' + Date.now() + '-' + Math.random().toString(16).slice(2));

const sesion = { user: null, perfil: null };

// ---------- Sincronización: compara con la última versión guardada y envía solo lo que cambió ----------
const sincronizado = {};
const firma = (r) => JSON.stringify(toRow(r));
function marcar(t, lista) { sincronizado[t] = new Map(lista.map((r) => [r.id, firma(r)])); }

let cola = Promise.resolve();
function sincronizar() {
  if (!REMOTO) return cola;
  cola = cola.then(enviarCambios).catch((e) => console.error(e));
  return cola;
}

async function enviarCambios() {
  const errores = [];
  const borrar = [];
  for (const t of TABLAS) {
    const prev = sincronizado[t] || new Map();
    const cambiados = db[t].filter((r) => prev.get(r.id) !== firma(r));
    if (cambiados.length) {
      const { error } = await sb.from(t).upsert(cambiados.map(toRow));
      if (error) errores.push(error);
      else cambiados.forEach((r) => prev.set(r.id, firma(r)));
    }
    const vivos = new Set(db[t].map((r) => r.id));
    const quitados = [...prev.keys()].filter((id) => !vivos.has(id));
    if (quitados.length) borrar.push([t, quitados, prev]);
    sincronizado[t] = prev;
  }
  // Borrados en orden inverso (gastos antes que operaciones)
  for (const [t, ids, prev] of borrar.reverse()) {
    const { error } = await sb.from(t).delete().in('id', ids);
    if (error) errores.push(error);
    else ids.forEach((id) => prev.delete(id));
  }
  if (errores.length) {
    const e = errores[0];
    const msg = /duplicate|unique/i.test(e.message) ? 'Ya existe un registro con ese dato (placa u OS repetida)'
      : /row-level|permission/i.test(e.message) ? 'No tienes permiso para esa acción'
        : /foreign key/i.test(e.message) ? 'No se puede borrar: tiene viajes relacionados'
          : 'No se pudo guardar: ' + e.message;
    toast(msg, true);
    await recargar();   // vuelve al estado real del servidor
  }
}

// ---------- Carga ----------
async function traerTodo(t) {
  const filas = [];
  for (let desde = 0; ; desde += 1000) {
    const { data, error } = await sb.from(t).select('*').order('created_at').range(desde, desde + 999);
    if (error) throw error;
    filas.push(...data);
    if (data.length < 1000) break;
  }
  return filas.map(fromRow);
}

async function recargar() {
  const listas = await Promise.all(TABLAS.map(traerTodo));
  db = { consecutivo: {} };
  TABLAS.forEach((t, i) => { db[t] = listas[i]; marcar(t, listas[i]); });
  db.operaciones.sort((a, b) => b.fecha.localeCompare(a.fecha));
  render();
}

// ---------- Cambios en vivo de otros usuarios ----------
let renderPendiente = null;
function escucharCambios() {
  sb.channel('controlops').on('postgres_changes', { event: '*', schema: 'public' }, (p) => {
    const t = p.table;
    if (!TABLAS.includes(t)) return;
    if (p.eventType === 'DELETE') {
      db[t] = db[t].filter((r) => r.id !== p.old.id);
      sincronizado[t].delete(p.old.id);
    } else {
      const r = fromRow(p.new);
      const i = db[t].findIndex((x) => x.id === r.id);
      if (i >= 0) db[t][i] = r; else db[t].unshift(r);
      sincronizado[t].set(r.id, firma(r));
    }
    clearTimeout(renderPendiente);
    renderPendiente = setTimeout(() => render(), 150);
  }).subscribe();
}

// ---------- Número de OS ----------
async function siguienteOS(empresaId) {
  if (!REMOTO) {
    const emp = empresa(empresaId);
    db.consecutivo[emp.id] = (db.consecutivo[emp.id] || 0) + 1;
    return emp.prefijo + db.consecutivo[emp.id];
  }
  const { data, error } = await sb.rpc('siguiente_os', { p_empresa: empresaId });
  if (error) throw error;
  return data;
}

// ---------- Archivos ----------
const docName = (v) => String(v || '').split('/').pop().replace(/^\d{10,}-/, '');

async function subirArchivo(carpeta, file) {
  if (!REMOTO) return file.name;
  const limpio = file.name.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^\w.\-]+/g, '_');
  const ruta = `${carpeta}/${Date.now()}-${limpio}`;
  const { error } = await sb.storage.from(BUCKET).upload(ruta, file, { upsert: false, contentType: file.type || undefined });
  if (error) throw error;
  return ruta;
}

async function verArchivo(ruta) {
  const w = window.open('', '_blank');   // se abre antes de esperar para que el navegador no la bloquee
  const { data, error } = await sb.storage.from(BUCKET).createSignedUrl(ruta, 600);
  if (error) { if (w) w.close(); toast('No se pudo abrir el archivo', true); return; }
  if (w) w.location = data.signedUrl; else location.href = data.signedUrl;
}

// ---------- Sesión ----------
async function cargarPerfil() {
  const { data } = await sb.from('perfiles').select('*').eq('id', sesion.user.id).maybeSingle();
  sesion.perfil = data || { rol: 'operador', nombre: sesion.user.email };
  ui.rol = sesion.perfil.rol;
}

function pantallaLogin(msg = '') {
  document.body.classList.add('login-mode');
  $('#view').innerHTML = `
  <div class="login glass-strong">
    <span class="logo big-logo">${ico('truck')}</span>
    <h1>Control<b>Ops</b></h1>
    <p class="sub">Llano Carga · Jorge Fonseca</p>
    <form id="loginForm" class="form" style="grid-template-columns:1fr">
      <div class="f"><label>Correo</label><input name="email" type="email" autocomplete="username" required></div>
      <div class="f"><label>Contraseña</label><input name="password" type="password" autocomplete="current-password" required></div>
      ${msg ? `<div class="login-err">${esc(msg)}</div>` : ''}
      <button class="btn primary" type="submit" style="justify-content:center;height:46px">Ingresar</button>
      <button class="link" type="button" data-act="olvide" style="justify-self:center">¿Olvidaste tu contraseña?</button>
    </form>
  </div>`;
  $('#loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const { email, password } = Object.fromEntries(new FormData(e.target));
    const btn = e.target.querySelector('button[type="submit"]');
    btn.disabled = true; btn.textContent = 'Ingresando…';
    const { error } = await sb.auth.signInWithPassword({ email, password });
    if (error) pantallaLogin(/invalid/i.test(error.message) ? 'Correo o contraseña incorrectos' : error.message);
  });
}

async function olvideClave() {
  const email = $('#loginForm input[name="email"]').value.trim();
  if (!email) { pantallaLogin('Escribe tu correo y vuelve a tocar «¿Olvidaste tu contraseña?»'); return; }
  const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo: location.origin + location.pathname });
  pantallaLogin(error ? error.message : 'Te enviamos un correo para crear una nueva contraseña.');
}

// Enlace de invitación o de recuperación: pedir la nueva contraseña
function pantallaNuevaClave() {
  document.body.classList.add('login-mode');
  $('#view').innerHTML = `
  <div class="login glass-strong">
    <span class="logo big-logo">${ico('truck')}</span>
    <h1>Crea tu contraseña</h1>
    <p class="sub">${esc(sesion.user.email)}</p>
    <form id="claveForm" class="form" style="grid-template-columns:1fr">
      <div class="f"><label>Nueva contraseña (mínimo 8 caracteres)</label><input name="password" type="password" minlength="8" autocomplete="new-password" required></div>
      <button class="btn primary" type="submit" style="justify-content:center;height:46px">Guardar y entrar</button>
    </form>
  </div>`;
  $('#claveForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const { error } = await sb.auth.updateUser({ password: new FormData(e.target).get('password') });
    if (error) { toast(error.message, true); return; }
    history.replaceState(null, '', location.pathname);
    entrar();
  });
}

let entro = false;
async function entrar() {
  if (entro) return;
  entro = true;
  document.body.classList.remove('login-mode');
  $('#view').innerHTML = '<div class="empty" style="margin-top:20vh;border:0">Cargando datos…</div>';
  try {
    await cargarPerfil();
    await recargar();
    escucharCambios();
  } catch (e) {
    entro = false;
    $('#view').innerHTML = `<div class="empty" style="margin-top:20vh">No se pudieron cargar los datos: ${esc(e.message)}<br><br><button class="btn ghost" onclick="location.reload()">Reintentar</button></div>`;
  }
}

async function cerrarSesion() {
  await sb.auth.signOut();
  location.reload();
}

async function iniciar() {
  if (!REMOTO) { ui.rol = 'admin'; render(); return; }
  const esEnlace = /type=(invite|recovery)/.test(location.hash);
  sb.auth.onAuthStateChange((evento, s) => {
    sesion.user = s ? s.user : null;
    if (evento === 'PASSWORD_RECOVERY' || (s && esEnlace)) { pantallaNuevaClave(); return; }
    if (evento === 'SIGNED_IN' && s) entrar();
    if (evento === 'SIGNED_OUT') { entro = false; pantallaLogin(); }
  });
  const { data } = await sb.auth.getSession();
  sesion.user = data.session ? data.session.user : null;
  if (!sesion.user) pantallaLogin();
  else if (esEnlace) pantallaNuevaClave();
  else entrar();
}
