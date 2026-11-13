// APG VIDA · interfaz: Inicio (tareas), Hábitos, Pagos y Baúl de documentos.

// ---------- Íconos ----------
const ICONOS = {
  inicio: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/>',
  casa: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/>',
  tareas: '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="m8 12 3 3 5-6"/>',
  habitos: '<path d="M12 21v-9"/><path d="M12 12c0-4 3-7 8-7 0 5-3 7-8 7z"/><path d="M12 14c0-3-2.5-5.5-7-5.5 0 4 2.5 5.5 7 5.5z"/>',
  pagos: '<rect x="3" y="6" width="18" height="14" rx="3"/><path d="M3 10h18"/><path d="M16 15h2"/><path d="m6 6 9-3 1 3"/>',
  baul: '<rect x="3" y="4" width="18" height="5" rx="1.5"/><path d="M5 9v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9"/><path d="M10 13h4"/>',
  calendario: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  alerta: '<path d="M6 16v-5a6 6 0 1 1 12 0v5l2 2H4z"/><path d="M10 21h4"/>',
  mas: '<path d="M12 5v14M5 12h14"/>',
  buscar: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  ajustes: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  derecha: '<path d="m9 18 6-6-6-6"/>',
  izquierda: '<path d="m15 18-6-6 6-6"/>',
  basura: '<path d="M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15"/>',
  editar: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>',
  archivo: '<path d="M14 3H6v18h12V7z"/><path d="M14 3v4h4"/><path d="M9 13h6M9 17h6"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  check: '<path d="m5 12 5 5L20 7"/>',
  sueno: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
  libro: '<path d="M4 4h6a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4z"/><path d="M20 4h-6a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h6z"/>',
  agua: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
  ejercicio: '<path d="M6 7v10M18 7v10M3 10v4M21 10v4M6 12h12"/>',
  meditar: '<path d="m12 3 1.8 4.7 4.7 1.8-4.7 1.8L12 16l-1.8-4.7-4.7-1.8 4.7-1.8z"/><path d="m19 15 .8 2.2 2.2.8-2.2.8L19 21l-.8-2.2-2.2-.8 2.2-.8z"/>',
  corazon: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>',
  manzana: '<path d="M12 7c-1-2-3-3-5-2-3 1.5-3 6-1 10 1.5 3 3.5 5 6 4 2.5 1 4.5-1 6-4 2-4 2-8.5-1-10-2-1-4 0-5 2z"/><path d="M12 7c0-2 1-4 3-4"/>',
  sol: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  estrella: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2-5.5-2.9-5.5 2.9 1-6.2L3 9.6l6.2-.9z"/>',
  familia: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14.2a5 5 0 0 1 5.5 5.8"/>',
  persona: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  carro: '<path d="M5 16h14v-3l-2-5H7l-2 5z"/><path d="M3 13h18"/><circle cx="7.5" cy="17" r="1.8"/><circle cx="16.5" cy="17" r="1.8"/>',
  carpeta: '<path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  trabajo: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',
  repetir: '<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
  tarjeta: '<rect x="2" y="5" width="20" height="14" rx="3"/><path d="M2 10h20M6 15h4"/>',
  bandera: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
  reloj: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  salir: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/>',
  subir: '<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>',
  fuego: '<path d="M12 22c4 0 7-2.7 7-7 0-4-3-6.5-4-9.5-1 2-2 3-3.5 3.5C11 6 10.5 4 10 2 7 5 5 9 5 15c0 4.3 3 7 7 7z"/>',
  escudo: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',
  dinero: '<circle cx="12" cy="12" r="9"/><path d="M15 9a3 3 0 0 0-3-1.5c-1.7 0-3 .9-3 2.2 0 3 6 1.6 6 4.6 0 1.3-1.3 2.2-3 2.2A3.2 3.2 0 0 1 9 15M12 6v1.5M12 16.5V18"/>',
  lista: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  candado: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  abierto: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 7.5-2"/>',
  celular: '<rect x="7" y="2" width="10" height="20" rx="2.5"/><path d="M11 18h2"/>',
  banco: '<path d="M3 10 12 4l9 6"/><path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/>',
  trofeo: '<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H5a2 2 0 0 0 2 4M16 6h3a2 2 0 0 1-2 4M12 13v4M8 20h8M10 17h4"/>',
  meta: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  descargar: '<path d="M12 4v12M7 11l5 5 5-5"/><path d="M4 20h16"/>',
  kanban: '<rect x="3" y="4" width="5" height="16" rx="1.5"/><rect x="10" y="4" width="5" height="10" rx="1.5"/><rect x="17" y="4" width="4" height="13" rx="1.5"/>',
  matriz: '<rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="8" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/><rect x="13" y="13" width="8" height="8" rx="2"/>',
  pulso: '<path d="M3 12h4l3-7 4 14 3-7h4"/>',
  externo: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
};
const ic = (n, cls = '') => `<svg class="i ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONOS[n] || ICONOS.estrella}</svg>`;
const ICONOS_HABITO = ['sueno', 'libro', 'agua', 'ejercicio', 'meditar', 'corazon', 'manzana', 'sol', 'estrella', 'reloj', 'fuego', 'pulso'];
const ICONOS_CATEGORIA = ['celular', 'banco', 'carpeta', 'familia', 'persona', 'estrella', 'carro', 'casa', 'trabajo', 'tarjeta', 'repetir', 'escudo', 'corazon', 'dinero', 'archivo', 'libro'];

// ---------- Utilidades ----------
const $ = (s, r = document) => r.querySelector(s);
const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const plural = (n, uno, varios) => `${n} ${n === 1 ? uno : varios}`;
const dinero = (v) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(v);
const mayus = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const esEscritorio = () => matchMedia('(min-width: 900px)').matches;

function fmtFecha(iso, conAnio) {
  if (!iso) return '';
  const d = aFecha(iso);
  const otroAnio = d.getFullYear() !== new Date().getFullYear();
  return d.toLocaleDateString('es-CO', { day: 'numeric', month: 'short', ...(conAnio || otroAnio ? { year: 'numeric' } : {}) }).replace('.', '');
}
// Estado de una fecha límite: vencida (rojo), próxima (naranja) o tranquila.
function estadoFecha(iso, umbral) {
  const d = diasEntre(hoyISO(), iso);
  if (d < 0) return { cls: 'rojo', txt: d === -1 ? 'Venció ayer' : `Venció hace ${-d} días`, d };
  if (d === 0) return { cls: 'naranja', txt: 'Hoy', d };
  if (d === 1) return { cls: 'naranja', txt: 'Mañana', d };
  if (d <= umbral) return { cls: 'naranja', txt: `En ${d} días`, d };
  return { cls: '', txt: fmtFecha(iso), d };
}
const fechaCorta = (iso) => {
  const d = diasEntre(hoyISO(), iso);
  return d === 0 ? 'Hoy' : d === 1 ? 'Mañana' : d === -1 ? 'Ayer' : fmtFecha(iso);
};

const cats = (tipo) => db.categorias.filter((c) => c.tipo === tipo).sort((a, b) => a.orden - b.orden || a.nombre.localeCompare(b.nombre));
const cat = (id) => db.categorias.find((c) => c.id === id);
const habitosOrden = () => db.habitos.slice().sort((a, b) => a.orden - b.orden || a.created_at.localeCompare(b.created_at));
const registro = (habId, fecha) => db.habito_registros.find((r) => r.habito_id === habId && r.fecha === fecha);

// ---------- Estado de la interfaz ----------
const ui = { vistaDocs: localStorage.getItem('apgvida-vista-docs') || 'carpetas', kanbanPor: 'carpeta', ordenDocs: 'vence', carpetaFiltro: '', resPagos: 'semana', vistaHab: localStorage.getItem('apgvida-vista-hab') || 'hoy', diaHab: null, semanaHab: 0, mesHabRes: 0, verHabHechos: true, vistaTareas: localStorage.getItem('apgvida-vista-tareas') || 'lista', mesTareas: 0, diaTareas: null, filtroTareas: 'hoy', listaTareas: null, verHechas: false, catPagos: null, mesHab: 0, busqueda: '', filtroVenc: 'todos' };
const ocupado = new Set();   // evita dobles toques mientras se guarda

// ---------- Toast ----------
let toastTimer;
function toast(msg, error = false, accion = null) {
  const el = $('#toast');
  el.className = 'toast on' + (error ? ' error' : '');
  el.innerHTML = `<span>${esc(msg)}</span>` + (accion ? `<button type="button">${esc(accion.txt)}</button>` : '');
  if (accion) el.querySelector('button').onclick = () => { el.classList.remove('on'); accion.fn(); };
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('on'), accion ? 6000 : 3000);
}

// ---------- Hoja modal ----------
function abrirSheet(html) {
  const s = $('#sheet');
  s.innerHTML = `<div class="agarre"></div>${html}`;
  s.classList.add('on'); s.setAttribute('aria-hidden', 'false');
  $('#overlay').classList.add('on');
  if (esEscritorio()) { const f = s.querySelector('input:not([type=hidden]):not([type=file]), textarea'); if (f) f.focus(); }
}
function cerrarSheet() {
  $('#sheet').classList.remove('on'); $('#sheet').setAttribute('aria-hidden', 'true');
  $('#overlay').classList.remove('on');
}
const cabezaSheet = (titulo) => `<div class="sheet-h"><h2>${esc(titulo)}</h2><button type="button" class="icono-btn" data-act="cerrar" aria-label="Cerrar">${ic('x')}</button></div>`;

// ---------- Navegación ----------
const SECCIONES = [
  ['inicio', 'Inicio', 'inicio'], ['tareas', 'Tareas', 'tareas'], ['habitos', 'Hábitos', 'habitos'],
  ['pagos', 'Pagos', 'pagos'], ['baul', 'Baúl', 'baul'],
];
function ruta() {
  const [vista, param] = location.hash.replace(/^#\/?/, '').split('/');
  return { vista: vista || 'inicio', param: param ? decodeURIComponent(param) : null };
}
const ir = (vista, param) => { location.hash = '/' + vista + (param ? '/' + encodeURIComponent(param) : ''); };
const seccionDe = (v) => ({ habito: 'habitos', carpeta: 'baul', documento: 'baul', vencimientos: 'baul' }[v] || v);

function iniciales() {
  const n = Cuenta.nombre() || (sesion.user && sesion.user.email) || '?';
  return n.split(/[\s@.]+/).filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join('');
}
const logo = () => `<a class="logo" href="#/inicio"><span class="marca">${ic('pulso')}</span><span>APG <b>VIDA</b></span></a>`;

function pintarMarco(actual) {
  const sec = seccionDe(actual);
  const botones = SECCIONES.map(([v, t, i]) => `<button type="button" class="${sec === v ? 'on' : ''}" data-act="ir" data-v="${v}">${ic(i)}<span>${t}</span></button>`).join('');
  $('#sidebar').innerHTML = `${logo()}<nav>${botones}
      <button type="button" class="${actual === 'vencimientos' ? 'on' : ''}" data-act="ir" data-v="vencimientos">${ic('alerta')}<span>Vencimientos</span></button>
      <button type="button" class="${actual === 'ajustes' ? 'on' : ''}" data-act="ir" data-v="ajustes">${ic('ajustes')}<span>Ajustes</span></button></nav>
    <div class="pie"><button type="button" class="avatar" data-act="ir" data-v="ajustes">${esc(iniciales())}</button><span class="quien">${esc(Cuenta.nombre() || (REMOTO ? sesion.user.email : 'Modo demostración'))}</span></div>`;
  $('#topbar').innerHTML = `${logo()}<span class="espacio"></span>
    <button type="button" class="icono-btn" style="color:#fff" data-act="ir" data-v="vencimientos" aria-label="Vencimientos">${ic('alerta')}</button>
    <button type="button" class="avatar" data-act="ir" data-v="ajustes" aria-label="Ajustes">${esc(iniciales())}</button>`;
  $('#bottomnav').innerHTML = botones;
  const fab = $('#fab');
  fab.innerHTML = ic('mas');
  fab.hidden = ['ajustes', 'documento', 'vencimientos'].includes(actual);
}
function menuAgregar() {
  const op = (act, icono, t, s) => `<button type="button" class="menu-op" data-act="${act}">${ic(icono)}<span><b>${t}</b><small>${s}</small></span></button>`;
  abrirSheet(`${cabezaSheet('¿Qué quieres agregar?')}
    <div class="menu-ops">
      ${op('nueva-tarea', 'tareas', 'Tarea', 'Algo que tienes que hacer')}
      ${op('nuevo-pago', 'pagos', 'Pago', 'Un pago que se repite')}
      ${op('nuevo-doc', 'archivo', 'Documento', 'PDF o foto al baúl')}
      ${op('nuevo-habito', 'habitos', 'Hábito', 'Algo que quieres hacer a diario')}
    </div>`);
}

let rutaAnterior = '';
let renderPendiente = false;
function programarRender() {
  if (renderPendiente) return;
  renderPendiente = true;
  requestAnimationFrame(() => { renderPendiente = false; render(); });
}
function render() {
  if (!sesion.user) return;
  const { vista, param } = ruta();
  const vistas = {
    inicio: vistaInicio, tareas: vistaTareas, habitos: vistaHabitos, habito: vistaHabito, pagos: vistaPagos,
    baul: vistaBaul, carpeta: vistaCarpeta, documento: vistaDocumento, vencimientos: vistaVencimientos, ajustes: vistaAjustes,
  };
  const fn = vistas[vista] || vistaInicio;
  pintarMarco(vista);
  const view = $('#view');
  // Conserva el texto que se esté escribiendo en el buscador
  const activo = document.activeElement && document.activeElement.id;
  view.innerHTML = fn(param);
  if (activo === 'busqueda') { const b = $('#busqueda'); b.focus(); b.setSelectionRange(b.value.length, b.value.length); }
  const clave = vista + '/' + param + (vista === 'tareas' ? '/' + ui.vistaTareas : vista === 'habitos' ? '/' + ui.vistaHab : '');
  if (clave !== rutaAnterior) { window.scrollTo(0, 0); rutaAnterior = clave; }
}

// =====================================================================
// INICIO
// =====================================================================
function tareasPendientesHoy() {
  const h = hoyISO();
  return ordenarTareas(db.tareas.filter((t) => !t.hecha && t.fecha && t.fecha <= h));
}
const pagosProximos = (dias) => db.pagos.filter((p) => diasEntre(hoyISO(), p.proxima_fecha) <= dias).sort((a, b) => a.proxima_fecha.localeCompare(b.proxima_fecha));
const docsPorVencer = (dias) => db.documentos.filter((d) => d.fecha_vencimiento && diasEntre(hoyISO(), d.fecha_vencimiento) <= dias).sort((a, b) => a.fecha_vencimiento.localeCompare(b.fecha_vencimiento));

function vistaInicio() {
  const h = hoyISO();
  const hora = new Date().getHours();
  const saludo = hora < 12 ? 'Buenos días' : hora < 19 ? 'Buenas tardes' : 'Buenas noches';
  const nombre = Cuenta.nombre().split(' ')[0];
  const fecha = new Date().toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' });

  const tareas = tareasPendientesHoy();
  const habs = habitosOrden();
  const hechos = habs.filter((x) => registro(x.id, h)).length;
  const pagos = pagosProximos(7);
  const pagosVencidos = pagos.filter((p) => p.proxima_fecha < h).length;
  const docs = docsPorVencer(30);
  const docsVencidos = docs.filter((d) => d.fecha_vencimiento < h).length;
  const tareasHechasHoy = db.tareas.filter((t) => t.hecha && t.hecha_en && isoDe(new Date(t.hecha_en)) === h).length;
  const estilo = ui.estiloInicio || Cuenta.ajuste('estiloInicio') || 'c';
  const datos = { tareas, habs, hechos, pagos, pagosVencidos, docs, docsVencidos, tareasHechasHoy };
  const cabecera = estilo === 'b' ? inicioB(datos) : estilo === 'c' ? inicioC(datos) : inicioA(datos);

  // Hábitos de hoy en una sola fila (los pendientes primero)
  const habsOrden = habs.slice().sort((a, b) => !!registro(a.id, h) - !!registro(b.id, h));
  const filaHabs = habs.length ? `<section class="card hab-hoy">
    <div class="card-h"><span class="ic">${ic('habitos')}</span><h2>Hábitos de hoy</h2>${anillo(habs.length ? (hechos / habs.length) * 100 : 0, 26, 4)}<span class="progreso-txt">${hechos}/${habs.length}</span></div>
    <div class="hab-hoy-fila">${habsOrden.map((x) => {
      const on = !!registro(x.id, h);
      return `<button type="button" class="hab-chip ${on ? 'on' : ''}" style="--c:${colorHab(x)}" data-act="toggle-habito" data-id="${x.id}" data-fecha="${h}" aria-pressed="${on}"><span class="bola">${ic(on ? 'check' : x.icono)}</span><span class="n">${esc(x.nombre)}</span></button>`;
    }).join('')}</div></section>` : '';

  return `
  <div class="saludo"><h1>${saludo}${nombre ? ', ' + esc(nombre) : ''} ${hora < 19 ? '☀️' : '🌙'}</h1><div class="fecha">${esc(mayus(fecha))}</div></div>
  ${cabecera}
  ${agendaInicio(datos)}
  ${filaHabs}`;
}

// "Tu día": tareas, pagos y documentos en una sola lista, cada uno con su acción
function agendaInicio(x) {
  const h = hoyISO();
  const items = [
    ...x.tareas.map((t) => ({ f: t.fecha, tipo: 'tarea', o: t })),
    ...x.pagos.map((p) => ({ f: p.proxima_fecha, tipo: 'pago', o: p })),
    ...x.docs.map((d) => ({ f: d.fecha_vencimiento, tipo: 'doc', o: d })),
  ].sort((a, b) => a.f.localeCompare(b.f) || a.tipo.localeCompare(b.tipo));
  const grupos = [['Atrasado', items.filter((i) => i.f < h)], ['Hoy', items.filter((i) => i.f === h)], ['Próximos días', items.filter((i) => i.f > h).slice(0, 6)]];
  const fila = (it) => {
    if (it.tipo === 'tarea') {
      const t = it.o; const l = t.lista_id && cat(t.lista_id);
      return `<div class="ag-fila" data-fila="${t.id}">
        <button type="button" class="check ${t.prioridad ? 'p-' + t.prioridad : ''}" data-act="toggle-tarea" data-id="${t.id}" aria-label="Marcar como hecha">${ic('check')}</button>
        <div class="cuerpo" data-act="editar-tarea" data-id="${t.id}"><div class="t">${esc(t.titulo)}</div>
          <div class="meta">${it.f < h ? `<span class="txt-rojo">${esc(fechaCorta(it.f))}</span>` : ''}${l ? `<span><i class="punto" style="background:${colorLista(l.id)}"></i>${esc(l.nombre)}</span>` : ''}${t.repetir ? `<span>${ic('repetir')}</span>` : ''}</div></div></div>`;
    }
    if (it.tipo === 'pago') {
      const p = it.o;
      return `<div class="ag-fila"><span class="ag-ic pago">${ic('pagos')}</span>
        <div class="cuerpo" data-act="editar-pago" data-id="${p.id}"><div class="t">${esc(p.nombre)}</div>
          <div class="meta">${it.f !== h ? `<span class="${it.f < h ? 'txt-rojo' : ''}">${esc(fechaCorta(it.f))}</span>` : ''}<span>${p.valor != null ? dinero(p.valor) : 'Valor variable'}</span></div></div>
        <button type="button" class="btn chico verde" data-act="pagar" data-id="${p.id}">Pagar</button></div>`;
    }
    const d = it.o; const e = estadoFecha(d.fecha_vencimiento, 30);
    return `<div class="ag-fila"><span class="ag-ic doc">${ic('archivo')}</span>
      <div class="cuerpo" data-act="ir" data-v="documento" data-p="${d.id}"><div class="t">${esc(d.nombre)}</div><div class="meta"><span>Documento${d.persona ? ' · ' + esc(d.persona) : ''}</span></div></div>
      <span class="badge ${e.cls || 'verde'}">${esc(e.txt)}</span></div>`;
  };
  const cuerpo = grupos.filter(([, l]) => l.length).map(([t, l]) => `<div class="grupo-t">${t}</div><div class="filas">${l.map(fila).join('')}</div>`).join('');
  return `<section class="card agenda">
    <div class="card-h"><span class="ic">${ic('calendario')}</span><h2>Tu día</h2>${x.tareasHechasHoy ? `<span class="badge verde">${ic('check')}${x.tareasHechasHoy} hecha${x.tareasHechasHoy === 1 ? '' : 's'}</span>` : ''}</div>
    ${cuerpo || `<div class="vacio">${ic('check')}Nada pendiente. ¡Disfruta tu día!</div>`}
  </section>`;
}

// ----- Tres estilos para la parte de arriba del Inicio -----
// A: tarjetas de colores
function inicioA(x) {
  const pctHab = x.habs.length ? (x.hechos / x.habs.length) * 100 : 0;
  const tarjeta = (v, tono, icono, num, lbl, sub, extra = '') => `<button type="button" class="ia-card ${tono}" data-act="ir" data-v="${v}">
    <span class="ia-top"><span class="ia-ic">${ic(icono)}</span>${extra}</span>
    <span class="ia-num">${num}</span><span class="ia-lbl">${lbl}</span>${sub ? `<span class="ia-sub">${sub}</span>` : ''}</button>`;
  return `<div class="inicio-a">
    ${tarjeta('tareas', 't-verde', 'tareas', x.tareas.length, x.tareas.length === 1 ? 'Tarea para hoy' : 'Tareas para hoy', x.tareasHechasHoy ? `${x.tareasHechasHoy} ya hecha${x.tareasHechasHoy === 1 ? '' : 's'} ✓` : '')}
    ${tarjeta('habitos', 't-morado', 'habitos', `${x.hechos}<small>/${x.habs.length}</small>`, 'Hábitos de hoy', x.hechos === x.habs.length && x.habs.length ? '¡Completos! 🎉' : '', anillo(pctHab, 34, 4, '#6A4BC4'))}
    ${tarjeta('pagos', 't-azul', 'pagos', x.pagos.length, 'Pagos esta semana', x.pagosVencidos ? `<b class="rojo">${x.pagosVencidos} vencido${x.pagosVencidos === 1 ? '' : 's'}</b>` : '')}
    ${tarjeta('vencimientos', 't-naranja', 'alerta', x.docs.length, 'Docs por vencer', x.docsVencidos ? `<b class="rojo">${x.docsVencidos} vencido${x.docsVencidos === 1 ? '' : 's'}</b>` : 'Próximos 30 días')}
  </div>`;
}
// B: anillo grande con el progreso del día
function inicioB(x) {
  const total = x.habs.length + x.tareas.length + x.tareasHechasHoy;
  const hecho = x.hechos + x.tareasHechasHoy;
  const pct = total ? Math.round((hecho / total) * 100) : 0;
  const msg = pct === 100 ? '¡Día completo! 🎉' : pct >= 50 ? 'Vas muy bien, sigue así' : pct > 0 ? 'Buen comienzo' : 'Empecemos el día';
  const chip = (v, icono, num, lbl, alerta) => `<button type="button" class="ib-chip ${alerta ? 'alerta' : ''}" data-act="ir" data-v="${v}">${ic(icono)}<b>${num}</b><span>${lbl}</span></button>`;
  return `<section class="inicio-b">
    <div class="ib-anillo">${anillo(pct, 108, 11, 'var(--verde-neon)')}<div class="ib-pct"><span>${pct}<small>%</small></span></div></div>
    <div class="ib-txt"><div class="ib-msg">${msg}</div>
      <div class="ib-det">${x.hechos}/${x.habs.length} hábitos · ${x.tareasHechasHoy}/${x.tareas.length + x.tareasHechasHoy} tareas</div></div>
  </section>
  <div class="ib-chips">
    ${chip('tareas', 'tareas', x.tareas.length, 'tareas', false)}
    ${chip('habitos', 'habitos', x.habs.length - x.hechos, 'hábitos por hacer', false)}
    ${chip('pagos', 'pagos', x.pagos.length, 'pagos', x.pagosVencidos)}
    ${chip('vencimientos', 'alerta', x.docs.length, 'docs', x.docsVencidos)}
  </div>`;
}
// C: píldoras compactas
function inicioC(x) {
  const pill = (v, icono, num, lbl, tono) => `<button type="button" class="ic-pill ${tono}" data-act="ir" data-v="${v}">${ic(icono)}<b>${num}</b>${lbl}</button>`;
  return `<div class="ic-pills">
    ${pill('tareas', 'tareas', x.tareas.length, x.tareas.length === 1 ? 'tarea' : 'tareas', 't-verde')}
    ${pill('habitos', 'habitos', `${x.hechos}/${x.habs.length}`, 'hábitos', 't-morado')}
    ${pill('pagos', 'pagos', x.pagos.length, x.pagos.length === 1 ? 'pago' : 'pagos', x.pagosVencidos ? 't-rojo' : 't-azul')}
    ${pill('vencimientos', 'alerta', x.docs.length, 'docs', x.docsVencidos ? 't-rojo' : 't-naranja')}
  </div>`;
}

// =====================================================================
// TAREAS
// =====================================================================
const PRIO = { alta: 0, media: 1, baja: 2 };
function ordenarTareas(lista) {
  return lista.sort((a, b) => (a.fecha || '9999').localeCompare(b.fecha || '9999')
    || (PRIO[a.prioridad] ?? 3) - (PRIO[b.prioridad] ?? 3) || a.created_at.localeCompare(b.created_at));
}
const NOMBRE_REPETIR = { diaria: 'Cada día', semanal: 'Cada semana', mensual: 'Cada mes' };

const COLORES_LISTA = ['#6A4BC4', '#2F6BC4', '#0B8A56', '#C4385B', '#A8520C', '#1F7F8C', '#7A5C00', '#5B6068'];
const colorLista = (id) => COLORES_LISTA[Math.max(0, cats('lista').findIndex((c) => c.id === id)) % COLORES_LISTA.length];

// Matriz de Eisenhower: urgente × importante
const CUADROS = [
  { k: 'q1', n: 'I', urgente: true, importante: true, def: 'Urgente e importante', ayuda: 'Hazlo ya' },
  { k: 'q2', n: 'II', urgente: false, importante: true, def: 'Importante, no urgente', ayuda: 'Planéalo' },
  { k: 'q3', n: 'III', urgente: true, importante: false, def: 'Urgente, no importante', ayuda: 'Delégalo o hazlo rápido' },
  { k: 'q4', n: 'IV', urgente: false, importante: false, def: 'Ni urgente ni importante', ayuda: 'Bandeja' },
];
const nombreCuadro = (q) => ((Cuenta.ajuste('cuadros') || {})[q.k] || q.def);
const cuadroDe = (t) => CUADROS.find((q) => q.urgente === !!t.urgente && q.importante === !!t.importante);

function filaTarea(t, compacta) {
  const h = hoyISO();
  const l = t.lista_id && cat(t.lista_id);
  const meta = [];
  if (t.fecha) meta.push(`<span class="${!t.hecha && t.fecha < h ? 'txt-rojo' : ''}">${ic('calendario')}${fechaCorta(t.fecha)}</span>`);
  if (!compacta) {
    if (t.urgente || t.importante) { const q = cuadroDe(t); meta.push(`<span class="q-tag ${q.k}">${q.n}</span>`); }
    if (t.prioridad) meta.push(`<span>${ic('bandera')}${t.prioridad[0].toUpperCase() + t.prioridad.slice(1)}</span>`);
    if (l) meta.push(`<span><i class="punto" style="background:${colorLista(l.id)}"></i>${esc(l.nombre)}</span>`);
  }
  if (t.repetir) meta.push(`<span>${ic('repetir')}${compacta ? '' : NOMBRE_REPETIR[t.repetir]}</span>`);
  return `<div class="fila ${t.hecha ? 'hecha' : ''} ${compacta ? 'compacta' : ''}" data-fila="${t.id}">
    <button type="button" class="check ${t.hecha ? 'on' : ''} ${!t.hecha && t.prioridad ? 'p-' + t.prioridad : ''}" data-act="toggle-tarea" data-id="${t.id}" aria-label="${t.hecha ? 'Marcar como pendiente' : 'Marcar como hecha'}">${ic('check')}</button>
    <div class="cuerpo" data-act="editar-tarea" data-id="${t.id}"><div class="t">${esc(t.titulo)}</div>${meta.length ? `<div class="meta">${meta.join('')}</div>` : ''}</div>
  </div>`;
}

const VISTAS_TAREAS = [['lista', 'Lista', 'lista'], ['calendario', 'Calendario', 'calendario'], ['matriz', 'Matriz', 'matriz']];

function vistaTareas() {
  const h = hoyISO();
  const pend = db.tareas.filter((t) => !t.hecha && (!ui.listaTareas || t.lista_id === ui.listaTareas));
  const cuerpo = ui.vistaTareas === 'calendario' ? tareasCalendario() : ui.vistaTareas === 'matriz' ? tareasMatriz() : tareasLista();
  const cuenta = { hoy: pend.filter((t) => t.fecha && t.fecha <= h).length, proximas: pend.filter((t) => t.fecha && t.fecha > h).length, sinfecha: pend.filter((t) => !t.fecha).length, todas: pend.length };
  return `
  <div class="cabeza"><div class="txt"><h1>Tareas</h1><p>${plural(pend.length, 'pendiente', 'pendientes')}</p></div>
    <button type="button" class="btn" data-act="informe" data-v="tareas" aria-label="Descargar informe">${ic('descargar')}<span class="solo-pc">Informe</span></button>
    <button type="button" class="btn primario" data-act="nueva-tarea">${ic('mas')}Nueva</button></div>
  <div class="toolbar">
    <div class="seg mini iconos-vista" role="tablist">${VISTAS_TAREAS.map(([k, t, i]) => `<button type="button" role="tab" aria-selected="${ui.vistaTareas === k}" class="${ui.vistaTareas === k ? 'on' : ''}" data-act="vista-tareas" data-v="${k}" aria-label="${t}" title="${t}">${ic(i)}</button>`).join('')}</div>
    ${ui.vistaTareas === 'lista' ? `<label class="pill-select">${ic('calendario')}<select data-cambio="filtro-tareas" aria-label="Qué tareas ver">
      ${[['hoy', 'Hoy'], ['proximas', 'Próximas'], ['sinfecha', 'Sin fecha'], ['todas', 'Todas']].map(([k, t]) => `<option value="${k}" ${ui.filtroTareas === k ? 'selected' : ''}>${t} (${cuenta[k]})</option>`).join('')}</select></label>` : ''}
    <label class="pill-select">${ui.listaTareas ? `<i class="punto" style="background:${colorLista(ui.listaTareas)}"></i>` : ic('lista')}<select data-cambio="lista-tareas" aria-label="Lista">
      <option value="">Todas las listas</option>
      ${cats('lista').map((l) => `<option value="${l.id}" ${ui.listaTareas === l.id ? 'selected' : ''}>${esc(l.nombre)}</option>`).join('')}
      <option value="__editar">Editar listas…</option></select></label>
  </div>
  <div class="anim-entrada" data-anim="${ui.vistaTareas}">${cuerpo}</div>`;
}

function tareasLista() {
  const h = hoyISO();
  const pend = db.tareas.filter((t) => !t.hecha && (!ui.listaTareas || t.lista_id === ui.listaTareas));
  const filtros = {
    hoy: ['Hoy', pend.filter((t) => t.fecha && t.fecha <= h)],
    proximas: ['Próximas', pend.filter((t) => t.fecha && t.fecha > h)],
    sinfecha: ['Sin fecha', pend.filter((t) => !t.fecha)],
    todas: ['Todas', pend],
  };
  const [, lista] = filtros[ui.filtroTareas];
  ordenarTareas(lista);
  const hechas = db.tareas.filter((t) => t.hecha && (!ui.listaTareas || t.lista_id === ui.listaTareas))
    .sort((a, b) => (b.hecha_en || '').localeCompare(a.hecha_en || ''));

  let cuerpo;
  if (!lista.length) cuerpo = `<div class="vacio">${ic('check')}${ui.filtroTareas === 'hoy' ? 'Nada pendiente para hoy.' : 'No hay tareas aquí.'}</div>`;
  else if (ui.filtroTareas === 'hoy') {
    const vencidas = lista.filter((t) => t.fecha < h);
    const deHoy = lista.filter((t) => t.fecha === h);
    cuerpo = (vencidas.length ? `<div class="grupo-t">Atrasadas</div><div class="filas">${vencidas.map((t) => filaTarea(t)).join('')}</div>` : '')
      + (deHoy.length ? `<div class="grupo-t">Hoy</div><div class="filas">${deHoy.map((t) => filaTarea(t)).join('')}</div>` : '');
  } else if (ui.filtroTareas === 'proximas') {
    // Agrupadas por día para leerlas de un vistazo
    const dias = [...new Set(lista.map((t) => t.fecha))];
    cuerpo = dias.map((f) => `<div class="grupo-t">${esc(mayus(fechaCorta(f) === fmtFecha(f) ? aFecha(f).toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'short' }).replace('.', '') : fechaCorta(f)))}</div>
      <div class="filas">${lista.filter((t) => t.fecha === f).map((t) => filaTarea(t)).join('')}</div>`).join('');
  } else cuerpo = `<div class="filas">${lista.map((t) => filaTarea(t)).join('')}</div>`;

  return `
  <section class="card">
    ${cuerpo}
    <button type="button" class="agregar-linea" data-act="nueva-tarea">${ic('mas')}Agregar tarea</button>
  </section>
  ${hechas.length ? `<section class="card">
    <div class="card-h"><h2>Completadas</h2><span class="cuenta">${hechas.length}</span>
      <button type="button" class="link" data-act="ver-hechas">${ui.verHechas ? 'Ocultar' : 'Mostrar'}</button></div>
    ${ui.verHechas ? `<div class="filas">${hechas.slice(0, 50).map((t) => filaTarea(t)).join('')}</div>
      <div class="acciones"><button type="button" class="btn chico peligro" data-act="borrar-hechas">${ic('basura')}Borrar completadas</button></div>` : ''}
  </section>` : ''}`;
}

function tareasCalendario() {
  const h = hoyISO();
  const base = new Date(); base.setDate(1); base.setMonth(base.getMonth() + ui.mesTareas);
  const y = base.getFullYear(); const m = base.getMonth();
  const diasMes = new Date(y, m + 1, 0).getDate();
  const offset = (new Date(y, m, 1).getDay() + 6) % 7;
  const delFiltro = db.tareas.filter((t) => t.fecha && (!ui.listaTareas || t.lista_id === ui.listaTareas));
  const porDia = {};
  delFiltro.forEach((t) => { (porDia[t.fecha] = porDia[t.fecha] || []).push(t); });
  const sel = ui.diaTareas || h;
  const celdas = Array.from({ length: offset }, () => '<span class="vacia"></span>').join('')
    + Array.from({ length: diasMes }, (_, i) => {
      const f = isoDe(new Date(y, m, i + 1));
      const ts = porDia[f] || [];
      const pend = ts.filter((t) => !t.hecha);
      const atrasada = f < h && pend.length;
      const puntos = pend.slice(0, 3).map((t) => `<i style="background:${t.lista_id ? colorLista(t.lista_id) : 'var(--muted)'}"></i>`).join('');
      return `<button type="button" class="${f === sel ? 'sel' : ''} ${f === h ? 'hoy' : ''} ${atrasada ? 'atrasada' : ''}" data-act="dia-tareas" data-v="${f}" aria-label="${fmtFecha(f, true)}${pend.length ? ', ' + plural(pend.length, 'tarea', 'tareas') : ''}">
        <span class="num">${i + 1}</span><span class="puntos">${puntos}${pend.length > 3 ? '<b>+</b>' : ''}</span></button>`;
    }).join('');
  const delDia = ordenarTareas((porDia[sel] || []).slice()).sort((a, b) => a.hecha - b.hecha);
  const titulo = mayus(aFecha(sel).toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' }));
  return `
  <section class="card cal-tareas">
    <div class="cal-h">
      <button type="button" class="icono-btn" data-act="mes-tareas" data-v="-1" aria-label="Mes anterior">${ic('izquierda')}</button>
      <h2>${mayus(base.toLocaleDateString('es-CO', { month: 'long', year: 'numeric' }).replace(' de ', ' '))}</h2>
      ${ui.mesTareas !== 0 || sel !== h ? `<button type="button" class="link" data-act="hoy-tareas">Hoy</button>` : ''}
      <button type="button" class="icono-btn" data-act="mes-tareas" data-v="1" aria-label="Mes siguiente">${ic('derecha')}</button>
    </div>
    <div class="cal">${['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d) => `<span class="dn">${d}</span>`).join('')}${celdas}</div>
  </section>
  <section class="card">
    <div class="card-h"><h2>${esc(titulo)}</h2><span class="cuenta">${delDia.filter((t) => !t.hecha).length || ''}</span></div>
    ${delDia.length ? `<div class="filas">${delDia.map((t) => filaTarea(t)).join('')}</div>` : `<div class="vacio">${ic('calendario')}Sin tareas este día.</div>`}
    <button type="button" class="agregar-linea" data-act="nueva-tarea">${ic('mas')}Agregar tarea este día</button>
  </section>`;
}

function tareasMatriz() {
  const pend = ordenarTareas(db.tareas.filter((t) => !t.hecha && (!ui.listaTareas || t.lista_id === ui.listaTareas)));
  return `
  <div class="matriz-ayuda"><span>Urgente = hay que hacerlo pronto · Importante = te acerca a tus metas</span>
    <button type="button" class="link" data-act="nombres-cuadros">${ic('editar')} Nombres</button></div>
  <div class="matriz">${CUADROS.map((q) => {
    const ts = pend.filter((t) => cuadroDe(t) === q);
    return `<section class="cuadro ${q.k}">
      <div class="cuadro-h"><span class="q-num">${q.n}</span><h2>${esc(nombreCuadro(q))}</h2>
        <button type="button" class="icono-btn" data-act="nueva-tarea-cuadro" data-q="${q.k}" aria-label="Agregar en ${esc(nombreCuadro(q))}">${ic('mas')}</button></div>
      ${ts.length ? `<div class="filas">${ts.map((t) => filaTarea(t, true)).join('')}</div>` : `<div class="cuadro-vacio">Sin tareas</div>`}
    </section>`;
  }).join('')}</div>`;
}

function formNombresCuadros() {
  abrirSheet(`${cabezaSheet('Nombres de los cuadros')}
  <form data-form="cuadros">
    ${CUADROS.map((q) => `<div class="campo-f"><label for="f-${q.k}"><span class="q-num ${q.k}">${q.n}</span> ${q.urgente ? 'Urgente' : 'No urgente'} · ${q.importante ? 'importante' : 'no importante'}</label>
      <input id="f-${q.k}" type="text" name="${q.k}" value="${esc(nombreCuadro(q))}" placeholder="${esc(q.def)}" maxlength="40" autocomplete="off"></div>`).join('')}
    <div class="acciones"><button type="button" class="btn" data-act="cuadros-defecto">Restablecer</button><span class="espacio"></span>
      <button type="button" class="btn" data-act="cerrar">Cancelar</button><button class="btn primario">${ic('check')}Guardar</button></div>
  </form>`);
}

function siguienteFecha(iso, cada) {
  const paso = (f) => (cada === 'diaria' ? sumarDias(f, 1) : cada === 'semanal' ? sumarDias(f, 7) : sumarMeses(f, 1));
  const h = hoyISO();
  let f = paso(iso || h);
  while (f < h) f = paso(f);
  return f;
}

async function toggleTarea(id) {
  const t = db.tareas.find((x) => x.id === id);
  if (!t) return;
  if (!t.hecha && t.repetir) {
    // Las tareas que se repiten pasan solas a la siguiente fecha
    const antes = t.fecha;
    const sig = siguienteFecha(t.fecha, t.repetir);
    await Datos.editar('tareas', id, { fecha: sig });
    toast(`Hecha · se repite el ${fmtFecha(sig)}`, false, { txt: 'Deshacer', fn: () => Datos.editar('tareas', id, { fecha: antes }) });
    return;
  }
  const hecha = !t.hecha;
  await Datos.editar('tareas', id, { hecha, hecha_en: hecha ? new Date().toISOString() : null });
  if (hecha) toast('Tarea completada', false, { txt: 'Deshacer', fn: () => Datos.editar('tareas', id, { hecha: false, hecha_en: null }) });
}

function formTarea(id, preset = {}) {
  const t = id ? db.tareas.find((x) => x.id === id) : { titulo: '', fecha: preset.fecha || '', prioridad: null, lista_id: preset.lista_id || null, repetir: null, urgente: !!preset.urgente, importante: !!preset.importante };
  const seg = (name, opciones, val) => `<div class="seg" data-seg="${name}">${opciones.map(([v, txt]) => `<button type="button" class="${(val || '') === v ? 'on' : ''}" data-v="${v}">${txt}</button>`).join('')}</div><input type="hidden" name="${name}" value="${esc(val || '')}">`;
  const q = cuadroDe(t);
  const pasos = [
    { t: 'Tarea', ayuda: '¿Qué tienes que hacer?', html: `
      <div class="campo-f"><input id="f-titulo" type="text" name="titulo" required value="${esc(t.titulo)}" placeholder="Ej.: Pagar la administración" autocomplete="off" aria-label="Título" class="input-grande"></div>
      <div class="campo-f"><span class="lbl">Lista</span>${chipsCategoria('lista', 'lista_id', t.lista_id)}</div>` },
    { t: 'Cuándo', ayuda: '¿Para cuándo es?', html: `
      <div class="sugerencias grande">${[['hoy', 'Hoy'], ['manana', 'Mañana'], ['finde', 'Fin de semana'], ['lunes', 'Próxima semana'], ['no', 'Sin fecha']].map(([k, tx]) => `<button type="button" class="chip" data-act="fecha-rapida" data-campo="f-fecha" data-v="${k}">${tx}</button>`).join('')}</div>
      <div class="campo-f"><label for="f-fecha">O elige la fecha</label><input id="f-fecha" type="date" name="fecha" value="${esc(t.fecha || '')}"></div>
      <div class="campo-f"><span class="lbl">¿Se repite?</span>${seg('repetir', [['', 'No'], ['diaria', 'Cada día'], ['semanal', 'Cada semana'], ['mensual', 'Cada mes']], t.repetir)}</div>` },
    { t: 'Importancia', ayuda: '¿Qué tan importante es?', html: `
      <div class="cuadros-sel" data-seg="cuadro">${CUADROS.map((c) => `<button type="button" class="${c.k} ${c === q ? 'on' : ''}" data-v="${c.k}"><span class="q-num">${c.n}</span><b>${esc(nombreCuadro(c))}</b><small>${c.ayuda}</small></button>`).join('')}</div>
      <input type="hidden" name="cuadro" value="${q.k}">
      <div class="campo-f" style="margin-top:14px"><span class="lbl">Prioridad</span>${seg('prioridad', [['', 'Ninguna'], ['alta', 'Alta'], ['media', 'Media'], ['baja', 'Baja']], t.prioridad)}</div>` },
  ];
  // Solo el título es obligatorio: "Guardar" está disponible desde el primer paso
  abrirSheet(`${cabezaSheet(id ? 'Editar tarea' : 'Nueva tarea')}
  <form data-form="tarea" data-id="${id || ''}">${wizard(pasos, { borrar: id ? `<button type="button" class="btn peligro" data-act="borrar-tarea" data-id="${id}">${ic('basura')}</button>` : '' })}</form>`);
  prepararWizard();
}

// Formulario por pasos: muestra una pregunta a la vez con barra de progreso.
function wizard(pasos, editando) {
  const n = pasos.length;
  return `<div class="wiz" data-paso="0" data-total="${n}" data-editando="${editando ? 1 : 0}">
    <div class="wiz-puntos">${pasos.map((p, i) => `<button type="button" class="${i === 0 ? 'on' : ''}" data-act="wiz-ir" data-i="${i}" aria-label="Paso ${i + 1}: ${esc(p.t)}"><b>${i + 1}</b><span>${esc(p.t)}</span></button>`).join('')}</div>
    <div class="wiz-prog"><i style="width:${100 / n}%"></i></div>
    ${pasos.map((p, i) => `<div class="wiz-paso ${i === 0 ? 'on' : ''}" data-i="${i}">${p.ayuda ? `<p class="wiz-ayuda">${p.ayuda}</p>` : ''}${p.html}</div>`).join('')}
    <div class="acciones wiz-acc">
      <button type="button" class="btn wiz-atras" data-act="wiz-atras">${ic('izquierda')}Atrás</button>
      <button type="button" class="btn wiz-cancelar" data-act="cerrar">Cancelar</button>
      ${editando && editando.borrar ? editando.borrar : ''}
      <span class="espacio"></span>
      <button type="button" class="btn primario wiz-sig" data-act="wiz-sig">Siguiente${ic('derecha')}</button>
      <button class="btn primario wiz-fin">${ic('check')}Guardar</button>
    </div>
  </div>`;
}
function moverWizard(w, destino) {
  const total = Number(w.dataset.total);
  const actual = Number(w.dataset.paso);
  if (destino < 0 || destino >= total || destino === actual) return;
  // Antes de avanzar, revisa que lo obligatorio del paso actual esté lleno
  if (destino > actual) {
    const invalido = [...w.querySelectorAll(`.wiz-paso[data-i="${actual}"] input, .wiz-paso[data-i="${actual}"] select`)].find((x) => !x.checkValidity());
    if (invalido) { invalido.reportValidity(); return; }
  }
  w.dataset.paso = destino;
  w.querySelectorAll('.wiz-paso').forEach((p) => {
    const i = Number(p.dataset.i);
    p.classList.toggle('on', i === destino);
    p.classList.toggle('desde-izq', i === destino && destino < actual);
  });
  w.querySelectorAll('.wiz-puntos button').forEach((b, i) => { b.classList.toggle('on', i === destino); b.classList.toggle('hecho', i < destino); });
  w.querySelector('.wiz-prog i').style.width = ((destino + 1) / total) * 100 + '%';
  w.classList.toggle('primero', destino === 0);
  w.classList.toggle('ultimo', destino === total - 1);
  const campo = w.querySelector(`.wiz-paso[data-i="${destino}"] input:not([type=hidden]):not([type=file]):not([type=checkbox])`);
  if (campo && esEscritorio()) campo.focus();
}
const sugerencias = (campo, lista) => `<div class="sugerencias">${lista.map((s) => `<button type="button" class="chip" data-act="sugerir" data-campo="${campo}" data-v="${esc(s)}">${esc(s)}</button>`).join('')}</div>`;
function chipsCategoria(tipo, name, val, tam) {
  const opciones = cats(tipo).map((c) => [c.id, c.nombre, c.icono]);
  return `<div class="seg chips-sel ${tam || ''}" data-seg="${name}">
    ${opciones.map(([v, t, i]) => `<button type="button" class="${val === v ? 'on' : ''}" data-v="${v}">${ic(i || 'carpeta')}${esc(t)}</button>`).join('')}
    <button type="button" class="nueva" data-act="nueva-cat-inline" data-tipo="${tipo}">${ic('mas')}Nueva</button>
  </div><input type="hidden" name="${name}" value="${esc(val || '')}">`;
}

function selectCategoria(tipo, name, val, vacio) {
  return `<select id="f-${tipo}" name="${name}">${vacio ? `<option value="">${esc(vacio)}</option>` : ''}
    ${cats(tipo).map((c) => `<option value="${c.id}" ${c.id === val ? 'selected' : ''}>${esc(c.nombre)}</option>`).join('')}
    <option value="__nueva">+ Crear nueva…</option></select>`;
}

// =====================================================================
// HÁBITOS
// =====================================================================
function rachas(habId) {
  const fechas = new Set(db.habito_registros.filter((r) => r.habito_id === habId).map((r) => r.fecha));
  const h = hoyISO();
  let d = fechas.has(h) ? h : sumarDias(h, -1);
  let actual = 0;
  while (fechas.has(d)) { actual++; d = sumarDias(d, -1); }
  const orden = [...fechas].sort();
  let mejor = 0; let corrida = 0; let prev = null;
  orden.forEach((f) => { corrida = prev && sumarDias(prev, 1) === f ? corrida + 1 : 1; mejor = Math.max(mejor, corrida); prev = f; });
  return { actual, mejor, total: fechas.size, fechas };
}
const LETRAS = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

function resumenEjercicio(det) {
  if (!det) return '';
  const partes = [];
  if (det.minutos) partes.push(`${det.minutos} min`);
  (det.ejercicios || []).forEach((e) => partes.push(`${e.nombre}${e.reps ? ' ' + e.reps : ''}`));
  return partes.join(' · ');
}

// ----- Colores y momentos del día -----
const COLORES_HABITO = ['#14C47F', '#1F9FB0', '#3F74D8', '#6A4BC4', '#7A5CE0', '#E05BA8', '#D9473B', '#E0A11B', '#7A8B99'];
const COLOR_POR_ICONO = { agua: '#1F9FB0', libro: '#3F74D8', sueno: '#6A4BC4', ejercicio: '#E05BA8', meditar: '#7A5CE0', manzana: '#D9473B', sol: '#E0A11B', corazon: '#E05BA8', fuego: '#D9473B' };
const colorHab = (x) => x.color || COLOR_POR_ICONO[x.icono] || '#14C47F';
const MOMENTOS = [['', 'Todo el día', 'reloj'], ['manana', 'Mañana', 'sol'], ['tarde', 'Tarde', 'sol'], ['noche', 'Noche', 'sueno']];
const anillo = (pct, tam = 44, grosor = 5, color = 'var(--verde)') => `<span class="anillo" style="--p:${Math.round(pct)};--t:${tam}px;--g:${grosor}px;--c:${color}"></span>`;

// Por defecto los días anteriores quedan bloqueados para no marcar uno por error
const habBloqueado = () => Cuenta.ajuste('bloqueoHab') !== false;
const diaEditable = (f) => f === hoyISO() || !habBloqueado();
const botonCandado = () => `<button type="button" class="candado ${habBloqueado() ? 'on' : ''}" data-act="bloqueo-hab">${ic(habBloqueado() ? 'candado' : 'abierto')}<span>${habBloqueado() ? 'Días anteriores bloqueados' : 'Días anteriores editables'}</span></button>`;

function vistaHabitos() {
  const vistas = [['hoy', 'Hoy', 'habitos'], ['semana', 'Semana', 'calendario'], ['mes', 'Mes', 'matriz']];
  const cuerpo = ui.vistaHab === 'semana' ? habitosSemana() : ui.vistaHab === 'mes' ? habitosMes() : habitosHoy();
  return `
  <div class="cabeza"><div class="txt"><h1>Hábitos</h1><p>Pequeñas acciones, todos los días</p></div>
    <button type="button" class="btn" data-act="informe" data-v="habitos" aria-label="Descargar informe">${ic('descargar')}<span class="solo-pc">Informe</span></button>
    <button type="button" class="btn primario" data-act="nuevo-habito">${ic('mas')}Nuevo</button></div>
  <div class="vistas" role="tablist">${vistas.map(([k, t, i]) => `<button type="button" role="tab" aria-selected="${ui.vistaHab === k}" class="${ui.vistaHab === k ? 'on' : ''}" data-act="vista-hab" data-v="${k}">${ic(i)}<span>${t}</span></button>`).join('')}</div>
  <div class="candado-fila">${botonCandado()}</div>
  <div class="anim-entrada">${cuerpo}</div>`;
}

function habitosHoy() {
  const h = hoyISO();
  const dia = ui.diaHab && ui.diaHab <= h ? ui.diaHab : h;
  const habs = habitosOrden();
  if (!habs.length) return `<section class="card"><div class="vacio">${ic('habitos')}Crea tu primer hábito.</div></section>`;
  const hechosDe = (f) => habs.filter((x) => registro(x.id, f)).length;

  // Tira de los últimos 7 días con su progreso
  const tira = Array.from({ length: 7 }, (_, i) => sumarDias(h, i - 6)).map((f) => {
    const pct = (hechosDe(f) / habs.length) * 100;
    const d = aFecha(f);
    return `<button type="button" class="dia ${f === dia ? 'sel' : ''} ${f === h ? 'hoy' : ''}" data-act="dia-hab" data-v="${f}" aria-label="${fmtFecha(f, true)}">
      <span class="dn">${d.toLocaleDateString('es-CO', { weekday: 'short' }).replace('.', '')}</span>
      <span class="dnum">${anillo(pct, 38, 4, f === dia ? 'var(--verde-neon)' : 'var(--verde)')}<b>${d.getDate()}</b></span></button>`;
  }).join('');

  const hechos = hechosDe(dia);
  const pct = (hechos / habs.length) * 100;
  const faltan = habs.length - hechos;
  const esHoy = dia === h;
  const mensaje = hechos === habs.length ? (esHoy ? '¡Día perfecto! 🎉' : 'Ese día cumpliste todo 🎉')
    : hechos === 0 ? (esHoy ? '¡Arranquemos! Marca tu primer hábito' : 'Ese día no marcaste hábitos')
      : esHoy ? `Vas bien, ${faltan === 1 ? 'te falta 1' : `te faltan ${faltan}`}` : `Ese día cumpliste ${hechos} de ${habs.length}`;

  const pendientes = habs.filter((x) => !registro(x.id, dia));
  const completados = habs.filter((x) => registro(x.id, dia));
  const grupos = MOMENTOS.map(([k, t, i]) => {
    const ls = pendientes.filter((x) => (x.momento || '') === k);
    return ls.length ? `<section class="card grupo-hab"><div class="grupo-hab-h">${ic(i)}<h2>${t}</h2><span>${ls.length}</span></div>
      <div class="hab-lista">${ls.map((x) => filaHabito(x, dia)).join('')}</div></section>` : '';
  }).join('');

  return `
  <div class="tira-dias">${tira}</div>
  <section class="card progreso-dia">
    ${anillo(pct, 72, 8, 'var(--verde)')}<div class="pd-txt"><div class="pd-num">${hechos}<small>/${habs.length}</small></div><div class="pd-msg">${esc(mensaje)}</div>
    ${esHoy ? '' : `${diaEditable(dia) ? '' : `<div class="pd-bloq">${ic('candado')}Solo lectura</div>`}<button type="button" class="link" data-act="dia-hab" data-v="${h}">Volver a hoy</button>`}</div>
  </section>
  ${grupos}
  ${completados.length ? `<section class="card grupo-hab completados ${ui.verHabHechos ? '' : 'cerrado'}">
    <button type="button" class="grupo-hab-h" data-act="ver-hab-hechos">${ic('check')}<h2>Completado</h2><span>${completados.length}</span>${ic(ui.verHabHechos ? 'izquierda' : 'derecha', 'flecha')}</button>
    ${ui.verHabHechos ? `<div class="hab-lista">${completados.map((x) => filaHabito(x, dia)).join('')}</div>` : ''}
  </section>` : ''}`;
}

function filaHabito(x, dia) {
  const r = rachas(x.id);
  const reg = registro(x.id, dia);
  const on = !!reg;
  const meta = x.meta_dias ? Math.min(100, (r.total / x.meta_dias) * 100) : null;
  const det = x.es_ejercicio && on ? resumenEjercicio(reg.detalle) : '';
  return `<div class="hab-fila ${on ? 'on' : ''}" style="--c:${colorHab(x)}" data-fila="${x.id}">
    <button type="button" class="hab-ico" data-act="ir" data-v="habito" data-p="${x.id}" aria-label="Ver ${esc(x.nombre)}">${ic(x.icono)}</button>
    <div class="cuerpo" data-act="ir" data-v="habito" data-p="${x.id}">
      <div class="nombre">${esc(x.nombre)}</div>
      <div class="hab-meta">
        <span class="racha ${r.actual ? '' : 'cero'}">${ic('fuego')}${r.actual}</span>
        ${x.meta_dias ? `<span class="meta-txt">${r.total}/${x.meta_dias} días</span><span class="barra"><i style="width:${meta}%"></i></span>` : `<span class="meta-txt">${plural(r.total, 'día', 'días')}</span>`}
      </div>
      ${x.es_ejercicio && on ? `<div class="detalle-ej">${det ? esc(det) + ' · ' : ''}<button type="button" class="link" data-act="detalle-ejercicio" data-id="${x.id}" data-fecha="${dia}">${det ? 'Editar' : '+ Tiempo y repeticiones'}</button></div>` : ''}
    </div>
    <button type="button" class="hab-check ${on ? 'on' : ''} ${diaEditable(dia) ? '' : 'bloq'}" data-act="toggle-habito" data-id="${x.id}" data-fecha="${dia}" aria-pressed="${on}" aria-label="${on ? 'Desmarcar' : 'Marcar'} ${esc(x.nombre)}">${ic('check')}</button>
  </div>`;
}

function habitosSemana() {
  const h = hoyISO();
  const lunes = sumarDias(h, -((aFecha(h).getDay() + 6) % 7) + ui.semanaHab * 7);
  const dias = Array.from({ length: 7 }, (_, i) => sumarDias(lunes, i));
  const habs = habitosOrden();
  const titulo = ui.semanaHab === 0 ? 'Esta semana' : ui.semanaHab === -1 ? 'Semana pasada' : `${fmtFecha(dias[0])} – ${fmtFecha(dias[6])}`;
  const filas = habs.map((x) => {
    const hechos = dias.filter((f) => registro(x.id, f)).length;
    return `<div class="sem-fila" style="--c:${colorHab(x)}">
      <button type="button" class="sem-nombre" data-act="ir" data-v="habito" data-p="${x.id}"><span class="mini-ico">${ic(x.icono)}</span><span class="n">${esc(x.nombre)}</span></button>
      ${dias.map((f) => `<button type="button" class="celda ${registro(x.id, f) ? 'on' : ''} ${f === h ? 'hoy' : ''} ${f < h && !diaEditable(f) ? 'bloq' : ''}" ${f > h ? 'disabled' : ''} data-act="toggle-habito" data-id="${x.id}" data-fecha="${f}" aria-label="${esc(x.nombre)} ${fmtFecha(f)}"></button>`).join('')}
      <span class="sem-total">${hechos}/7</span>
    </div>`;
  }).join('');
  const totalDia = (f) => habs.length ? Math.round((habs.filter((x) => registro(x.id, f)).length / habs.length) * 100) : 0;
  return `
  <section class="card">
    <div class="cal-h">
      <button type="button" class="icono-btn" data-act="semana-hab" data-v="-1" aria-label="Semana anterior">${ic('izquierda')}</button>
      <h2>${esc(titulo)}</h2>
      <button type="button" class="icono-btn" data-act="semana-hab" data-v="1" ${ui.semanaHab >= 0 ? 'disabled' : ''} aria-label="Semana siguiente">${ic('derecha')}</button>
    </div>
    <div class="semana-grid">
      <div class="sem-fila cab"><span class="esp"></span>${dias.map((f) => `<span class="${f === h ? 'hoy' : ''}">${LETRAS[aFecha(f).getDay()]}<small>${aFecha(f).getDate()}</small></span>`).join('')}<span></span></div>
      ${filas || '<div class="vacio">Sin hábitos.</div>'}
      <div class="sem-fila pie"><span class="n">Cumplido</span>${dias.map((f) => `<span>${f > h ? '' : totalDia(f) + '%'}</span>`).join('')}<span></span></div>
    </div>
    <p class="ayuda-txt">${habBloqueado() ? 'Solo puedes marcar el día de hoy. Toca el candado para editar días anteriores.' : 'Toca un cuadro para marcar o desmarcar ese día.'}</p>
  </section>`;
}

function habitosMes() {
  const h = hoyISO();
  const base = new Date(); base.setDate(1); base.setMonth(base.getMonth() + ui.mesHabRes);
  const y = base.getFullYear(); const m = base.getMonth();
  const diasMes = new Date(y, m + 1, 0).getDate();
  const offset = (new Date(y, m, 1).getDay() + 6) % 7;
  const delMes = Array.from({ length: diasMes }, (_, i) => isoDe(new Date(y, m, i + 1)));
  const transcurridos = delMes.filter((f) => f <= h).length;
  const tarjetas = habitosOrden().map((x) => {
    const r = rachas(x.id);
    const hechos = delMes.filter((f) => r.fechas.has(f)).length;
    const pct = transcurridos ? Math.round((hechos / transcurridos) * 100) : 0;
    const momento = MOMENTOS.find(([k]) => k === (x.momento || ''))[1];
    const celdas = '<i class="v"></i>'.repeat(offset) + delMes.map((f, i) => `<button type="button" class="${r.fechas.has(f) ? 'on' : ''} ${f === h ? 'hoy' : ''} ${f < h && !diaEditable(f) ? 'bloq' : ''}" ${f > h ? 'disabled' : ''} data-act="toggle-habito" data-id="${x.id}" data-fecha="${f}" aria-label="${esc(x.nombre)} ${fmtFecha(f)}">${i + 1}</button>`).join('');
    const metaPct = x.meta_dias ? Math.min(100, Math.round((r.total / x.meta_dias) * 100)) : 0;
    const animo = pct >= 80 ? '¡Excelente mes!' : pct >= 50 ? 'Vas bien' : pct > 0 ? 'Puedes mejorar' : 'Aún sin registros';
    return `<section class="card mh" style="--c:${colorHab(x)}">
      <button type="button" class="mh-h" data-act="ir" data-v="habito" data-p="${x.id}">
        <span class="hab-ico">${ic(x.icono)}</span>
        <span class="mh-tit"><b>${esc(x.nombre)}</b><small>${esc(momento)} · ${animo}</small></span>
        <span class="mh-pct">${anillo(pct, 46, 5, colorHab(x))}<b>${pct}<small>%</small></b></span>
      </button>
      <div class="mh-cuerpo">
        <div class="mh-cal">${['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d) => `<span class="mdn">${d}</span>`).join('')}${celdas}</div>
        <div class="mh-stats">
          <div class="mh-s"><span class="mh-si fuego">${ic('fuego')}</span><div><b>${r.actual}</b><small>Racha actual</small></div></div>
          <div class="mh-s"><span class="mh-si">${ic('trofeo')}</span><div><b>${r.mejor}</b><small>Mejor racha</small></div></div>
          <div class="mh-s"><span class="mh-si">${ic('check')}</span><div><b>${hechos}<small>/${transcurridos}</small></b><small>Días del mes</small></div></div>
          ${x.meta_dias ? `<div class="mh-s meta"><span class="mh-si">${ic('meta')}</span><div><b>${r.total}<small>/${x.meta_dias}</small></b><small>Meta</small><span class="barra"><i style="width:${metaPct}%"></i></span></div></div>` : ''}
        </div>
      </div>
    </section>`;
  }).join('');
  return `
  <section class="card"><div class="cal-h" style="margin:0">
    <button type="button" class="icono-btn" data-act="mes-hab-res" data-v="-1" aria-label="Mes anterior">${ic('izquierda')}</button>
    <h2>${mayus(base.toLocaleDateString('es-CO', { month: 'long', year: 'numeric' }).replace(' de ', ' '))}</h2>
    <button type="button" class="icono-btn" data-act="mes-hab-res" data-v="1" ${ui.mesHabRes >= 0 ? 'disabled' : ''} aria-label="Mes siguiente">${ic('derecha')}</button>
  </div></section>
  <div class="mh-grid">${tarjetas || '<section class="card"><div class="vacio">Sin hábitos.</div></section>'}</div>`;
}

// Lluvia de confeti cuando completas todos los hábitos del día
function confeti() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const capa = document.createElement('div');
  capa.className = 'confeti';
  const colores = ['#14C47F', '#2EE59D', '#E0A11B', '#3F74D8', '#E05BA8', '#6A4BC4'];
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('i');
    p.style.left = Math.random() * 100 + '%';
    p.style.background = colores[i % colores.length];
    p.style.animationDelay = Math.random() * 0.3 + 's';
    p.style.animationDuration = 0.9 + Math.random() * 0.8 + 's';
    p.style.transform = `rotate(${Math.random() * 360}deg)`;
    capa.appendChild(p);
  }
  document.body.appendChild(capa);
  setTimeout(() => capa.remove(), 2000);
}

function vistaHabito(id) {
  const x = db.habitos.find((y) => y.id === id);
  if (!x) return `<button type="button" class="volver" data-act="ir" data-v="habitos">${ic('izquierda')}Hábitos</button><div class="vacio">Este hábito ya no existe.</div>`;
  const h = hoyISO();
  const r = rachas(x.id);
  const base = new Date(); base.setDate(1); base.setMonth(base.getMonth() + ui.mesHab);
  const y = base.getFullYear(); const m = base.getMonth();
  const diasMes = new Date(y, m + 1, 0).getDate();
  const offset = (new Date(y, m, 1).getDay() + 6) % 7;   // semana empieza el lunes
  const delMes = Array.from({ length: diasMes }, (_, i) => isoDe(new Date(y, m, i + 1)));
  const transcurridos = delMes.filter((f) => f <= h);
  const cumplidosMes = transcurridos.filter((f) => r.fechas.has(f)).length;
  const pct = transcurridos.length ? Math.round((cumplidosMes / transcurridos.length) * 100) : 0;
  const celdas = Array.from({ length: offset }, () => '<span class="vacia"></span>').join('')
    + delMes.map((f, i) => `<button type="button" class="${r.fechas.has(f) ? 'on' : ''} ${f === h ? 'hoy' : ''} ${f < h && !diaEditable(f) ? 'bloq' : ''}" ${f > h ? 'disabled' : ''} data-act="toggle-habito" data-id="${x.id}" data-fecha="${f}" aria-label="${fmtFecha(f, true)}">${i + 1}</button>`).join('');
  const registrosEj = x.es_ejercicio ? db.habito_registros.filter((g) => g.habito_id === x.id).sort((a, b) => b.fecha.localeCompare(a.fecha)).slice(0, 30) : [];

  const momento = MOMENTOS.find(([k]) => k === (x.momento || ''))[1];
  const metaPct = x.meta_dias ? Math.min(100, Math.round((r.total / x.meta_dias) * 100)) : 0;
  return `
  <div style="--c:${colorHab(x)}">
  <button type="button" class="volver" data-act="ir" data-v="habitos">${ic('izquierda')}Hábitos</button>
  <div class="candado-fila">${botonCandado()}</div>
  <div class="cabeza hab-det-cab"><span class="hab-ico grande">${ic(x.icono)}</span><div class="txt"><h1>${esc(x.nombre)}</h1><p>${esc(momento)} · Toca un día para marcarlo o desmarcarlo</p></div>
    <button type="button" class="btn" data-act="editar-habito" data-id="${x.id}">${ic('editar')}Editar</button></div>
  ${x.meta_dias ? `<section class="card meta-card">${anillo(metaPct, 64, 7, colorHab(x))}<div><div class="pd-num">${r.total}<small>/${x.meta_dias} días</small></div>
    <div class="pd-msg">${r.total >= x.meta_dias ? '¡Meta cumplida! 🏆' : `Te faltan ${plural(x.meta_dias - r.total, 'día', 'días')} para tu meta`}</div></div></section>` : ''}
  <div class="stats">
    <div class="stat"><div class="v" style="color:var(--naranja)">${r.actual}</div><div class="l">Racha actual (días)</div></div>
    <div class="stat"><div class="v">${r.mejor}</div><div class="l">Mejor racha</div></div>
    <div class="stat"><div class="v" style="color:var(--verde-ink)">${pct}%</div><div class="l">Cumplido este mes</div></div>
    <div class="stat"><div class="v">${r.total}</div><div class="l">Días en total</div></div>
  </div>
  <section class="card cal-hab">
    <div class="cal-h">
      <button type="button" class="icono-btn" data-act="mes-hab" data-v="-1" aria-label="Mes anterior">${ic('izquierda')}</button>
      <h2>${mayus(base.toLocaleDateString('es-CO', { month: 'long', year: 'numeric' }).replace(' de ', ' '))}</h2>
      <button type="button" class="icono-btn" data-act="mes-hab" data-v="1" ${ui.mesHab >= 0 ? 'disabled' : ''} aria-label="Mes siguiente">${ic('derecha')}</button>
    </div>
    <div class="cal">${['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d) => `<span class="dn">${d}</span>`).join('')}${celdas}</div>
  </section>
  ${x.es_ejercicio ? `<section class="card">
    <div class="card-h"><span class="ic">${ic('ejercicio')}</span><h2>Registro de ejercicio</h2></div>
    ${registrosEj.length ? `<div class="filas">${registrosEj.map((g) => `<div class="fila">
      <div class="cuerpo" data-act="detalle-ejercicio" data-id="${x.id}" data-fecha="${g.fecha}">
        <div class="t">${fechaCorta(g.fecha)}</div><div class="meta">${esc(resumenEjercicio(g.detalle) || 'Sin detalle')}</div></div>
      <button type="button" class="icono-btn" data-act="detalle-ejercicio" data-id="${x.id}" data-fecha="${g.fecha}" aria-label="Editar detalle">${ic('editar')}</button></div>`).join('')}</div>`
      : '<div class="vacio">Aún no has registrado ejercicio.</div>'}
  </section>` : ''}
  </div>`;
}

async function toggleHabito(id, fecha) {
  const clave = id + fecha;
  if (ocupado.has(clave)) return;
  ocupado.add(clave);
  try {
    const r = registro(id, fecha);
    if (r) await Datos.borrar('habito_registros', r.id);
    else {
      await Datos.crear('habito_registros', { habito_id: id, fecha, detalle: null });
      const x = db.habitos.find((y) => y.id === id);
      const todos = db.habitos.length && db.habitos.every((y) => registro(y.id, fecha));
      if (todos && fecha === hoyISO()) { confeti(); toast('¡Día perfecto! Cumpliste todos tus hábitos 🎉'); }
      else if (x && x.es_ejercicio) toast('¡Ejercicio marcado! 💪', false, { txt: 'Anotar detalle', fn: () => formEjercicio(id, fecha) });
    }
  } catch (e) { /* ya avisado */ } finally { ocupado.delete(clave); }
}

function formHabito(id) {
  const x = id ? db.habitos.find((y) => y.id === id) : { nombre: '', icono: 'estrella', es_ejercicio: false, momento: '', meta_dias: null, color: COLORES_HABITO[db.habitos.length % COLORES_HABITO.length] };
  const color = colorHab(x);
  abrirSheet(`${cabezaSheet(id ? 'Editar hábito' : 'Nuevo hábito')}
  <form data-form="habito" data-id="${id || ''}" style="--c:${color}">
    <div class="campo-f"><label for="f-nombre">Nombre</label><input id="f-nombre" type="text" name="nombre" required value="${esc(x.nombre)}" placeholder="Ej.: Caminar 30 minutos" autocomplete="off"></div>
    <div class="campo-f"><span class="lbl">Ícono</span><div class="iconos iconos-hab" data-seg="icono">${ICONOS_HABITO.map((n) => `<button type="button" class="${x.icono === n ? 'on' : ''}" data-v="${n}" aria-label="${n}">${ic(n)}</button>`).join('')}</div><input type="hidden" name="icono" value="${esc(x.icono)}"></div>
    <div class="campo-f"><span class="lbl">Color</span><div class="colores" data-seg="color">${COLORES_HABITO.map((c) => `<button type="button" class="${c === color ? 'on' : ''}" data-v="${c}" style="background:${c}" aria-label="Color ${c}"></button>`).join('')}</div><input type="hidden" name="color" value="${esc(color)}"></div>
    <div class="campo-f"><span class="lbl">¿Cuándo?</span><div class="seg" data-seg="momento">${MOMENTOS.map(([k, t]) => `<button type="button" class="${(x.momento || '') === k ? 'on' : ''}" data-v="${k}">${t}</button>`).join('')}</div><input type="hidden" name="momento" value="${esc(x.momento || '')}"></div>
    <div class="campo-f"><label for="f-meta">Meta (días)</label>
      <div class="meta-fila"><input id="f-meta" type="number" name="meta_dias" min="1" max="1000" inputmode="numeric" value="${x.meta_dias || ''}" placeholder="Sin meta">
      ${[21, 30, 66, 100].map((n) => `<button type="button" class="chip" data-act="meta-rapida" data-v="${n}">${n}</button>`).join('')}</div>
      <span class="ayuda">Cuántos días quieres cumplir este hábito, por ejemplo 30 o 100.</span></div>
    <label class="campo-f" style="flex-direction:row;align-items:center;gap:10px"><input type="checkbox" name="es_ejercicio" ${x.es_ejercicio ? 'checked' : ''} style="width:20px;height:20px"> <span>Permitir anotar tiempo y repeticiones (ejercicio)</span></label>
    <div class="acciones">
      ${id ? `<button type="button" class="btn peligro" data-act="borrar-habito" data-id="${id}">${ic('basura')}Borrar</button>` : ''}
      <span class="espacio"></span>
      <button type="button" class="btn" data-act="cerrar">Cancelar</button>
      <button class="btn primario">${ic('check')}Guardar</button>
    </div>
  </form>`);
}

function nombresEjercicios() {
  const s = new Set();
  db.habito_registros.forEach((r) => (r.detalle && r.detalle.ejercicios || []).forEach((e) => e.nombre && s.add(e.nombre)));
  return [...s].sort();
}
const filaEjercicio = (e = {}) => `<div class="ej-fila">
  <input type="text" name="ej_nombre" placeholder="Ejercicio" list="dl-ejercicios" value="${esc(e.nombre || '')}" autocomplete="off" aria-label="Ejercicio">
  <input type="number" name="ej_reps" placeholder="Reps" min="0" inputmode="numeric" value="${esc(e.reps || '')}" aria-label="Repeticiones">
  <button type="button" class="icono-btn" data-act="quitar-ej" aria-label="Quitar">${ic('x')}</button></div>`;

function formEjercicio(habId, fecha) {
  const r = registro(habId, fecha);
  const det = (r && r.detalle) || {};
  const ejs = det.ejercicios && det.ejercicios.length ? det.ejercicios : [{}];
  abrirSheet(`${cabezaSheet('Ejercicio · ' + fechaCorta(fecha))}
  <form data-form="ejercicio" data-id="${habId}" data-fecha="${fecha}">
    <div class="campo-f"><label for="f-min">Tiempo (minutos)</label><input id="f-min" type="number" name="minutos" min="0" inputmode="numeric" value="${esc(det.minutos || '')}" placeholder="Ej.: 30"></div>
    <div class="campo-f"><span class="lbl">Ejercicios y repeticiones</span><div id="ejs">${ejs.map(filaEjercicio).join('')}</div>
      <button type="button" class="link" data-act="agregar-ej">${ic('mas')} Agregar ejercicio</button></div>
    <datalist id="dl-ejercicios">${nombresEjercicios().map((n) => `<option value="${esc(n)}">`).join('')}</datalist>
    <div class="acciones"><span class="espacio"></span>
      <button type="button" class="btn" data-act="cerrar">Cancelar</button>
      <button class="btn primario">${ic('check')}Guardar</button></div>
  </form>`);
}

// =====================================================================
// PAGOS
// =====================================================================
const FRECUENCIAS = { mensual: ['Mensual', 1], bimestral: ['Bimestral', 2], trimestral: ['Trimestral', 3], semestral: ['Semestral', 6], anual: ['Anual', 12] };

function filaPago(p) {
  const e = estadoFecha(p.proxima_fecha, 3);
  const c = p.categoria_id && cat(p.categoria_id);
  return `<div class="fila">
    <div class="cuerpo" data-act="editar-pago" data-id="${p.id}">
      <div class="t">${esc(p.nombre)}</div>
      <div class="meta"><span class="badge ${e.cls}">${esc(e.txt)}</span>${c ? `<span>${esc(c.nombre)}</span>` : ''}${p.medio_id && cat(p.medio_id) ? `<span>${ic(cat(p.medio_id).icono || 'tarjeta')}${esc(cat(p.medio_id).nombre)}</span>` : ''}<span>${FRECUENCIAS[p.frecuencia][0]}</span></div>
    </div>
    <div class="derecha"><div class="monto">${p.valor != null && p.valor !== '' ? dinero(p.valor) : '<span class="badge">Variable</span>'}</div></div>
    <button type="button" class="btn chico verde pagar" data-act="pagar" data-id="${p.id}">${ic('check')}Pagado</button>
  </div>`;
}

function rangoPeriodo(tipo) {
  const h = hoyISO();
  if (tipo === 'mes') { const ini = h.slice(0, 8) + '01'; return [ini, sumarDias(sumarMeses(ini, 1), -1)]; }
  const ini = sumarDias(h, -((aFecha(h).getDay() + 6) % 7));   // lunes
  return [ini, sumarDias(ini, 6)];
}

function vistaPagos() {
  const h = hoyISO();
  const lista = db.pagos.filter((p) => !ui.catPagos || p.categoria_id === ui.catPagos).sort((a, b) => a.proxima_fecha.localeCompare(b.proxima_fecha));
  const vencidos = lista.filter((p) => p.proxima_fecha < h);
  const semana = lista.filter((p) => p.proxima_fecha >= h && diasEntre(h, p.proxima_fecha) <= 7);
  const despues = lista.filter((p) => diasEntre(h, p.proxima_fecha) > 7);
  const grupo = (t, l) => (l.length ? `<div class="grupo-t">${t}</div><div class="filas">${l.map(filaPago).join('')}</div>` : '');

  // Resumen del periodo (semana o mes)
  const [ini, fin] = rangoPeriodo(ui.resPagos);
  const pendientes = db.pagos.filter((p) => p.proxima_fecha <= fin);
  const totalPend = pendientes.reduce((s, p) => s + (Number(p.valor) || 0), 0);
  const variables = pendientes.filter((p) => p.valor == null).length;
  const pagados = db.pago_historial.filter((x) => { const f = isoDe(new Date(x.pagado_en)); return f >= ini && f <= fin; });
  const totalPagado = pagados.reduce((s, x) => s + (Number(x.valor) || 0), 0);
  const vencidosTodos = db.pagos.filter((p) => p.proxima_fecha < h).length;
  const porCat = {};
  const campo = ui.desgPagos === 'medio' ? 'medio_id' : 'categoria_id';
  pendientes.forEach((p) => { const k = p[campo] && cat(p[campo]) ? p[campo] : ''; (porCat[k] = porCat[k] || { n: 0, v: 0 }); porCat[k].n++; porCat[k].v += Number(p.valor) || 0; });
  const maxV = Math.max(1, ...Object.values(porCat).map((x) => x.v));
  const desglose = Object.entries(porCat).sort((a, b) => b[1].v - a[1].v).map(([k, x]) => {
    const c = k && cat(k);
    return `<button type="button" class="desg" ${campo === 'categoria_id' ? `data-act="cat-pagos" data-v="${k}"` : ''}><span class="dn">${c ? ic(c.icono || 'dinero') : ic('dinero')}${esc(c ? c.nombre : campo === 'medio_id' ? 'Sin medio' : 'Sin categoría')}<small>${x.n}</small></span>
      <span class="db"><i style="width:${(x.v / maxV) * 100}%"></i></span><span class="dv">${x.v ? dinero(x.v) : 'Variable'}</span></button>`;
  }).join('');
  const etiqueta = ui.resPagos === 'mes' ? mayus(aFecha(ini).toLocaleDateString('es-CO', { month: 'long' })) : `${fmtFecha(ini)} – ${fmtFecha(fin)}`;

  return `
  <div class="cabeza"><div class="txt"><h1>Pagos</h1><p>Un toque en “Pagado” y pasa al siguiente periodo</p></div>
    <button type="button" class="btn" data-act="informe" data-v="pagos" aria-label="Descargar informe">${ic('descargar')}<span class="solo-pc">Informe</span></button>
    <button type="button" class="btn primario" data-act="nuevo-pago">${ic('mas')}Nuevo</button></div>
  <section class="card resumen-pagos">
    <div class="rp-h"><div class="seg mini">${[['semana', 'Semana'], ['mes', 'Mes']].map(([k, t]) => `<button type="button" class="${ui.resPagos === k ? 'on' : ''}" data-act="res-pagos" data-v="${k}">${t}</button>`).join('')}</div><span class="rp-rango">${esc(etiqueta)}</span></div>
    <div class="rp-cifras">
      <div class="rp-c"><span class="rp-ic pend">${ic('reloj')}</span><div><div class="v">${dinero(totalPend)}</div><div class="l">Por pagar · ${plural(pendientes.length, 'pago', 'pagos')}${variables ? ` (${variables} variable${variables === 1 ? '' : 's'})` : ''}</div></div></div>
      <div class="rp-c"><span class="rp-ic ok">${ic('check')}</span><div><div class="v" style="color:var(--verde-ink)">${dinero(totalPagado)}</div><div class="l">Pagado · ${plural(pagados.length, 'pago', 'pagos')}</div></div></div>
      ${vencidosTodos ? `<div class="rp-c"><span class="rp-ic mal">${ic('alerta')}</span><div><div class="v" style="color:var(--rojo)">${vencidosTodos}</div><div class="l">${vencidosTodos === 1 ? 'Vencido' : 'Vencidos'}</div></div></div>` : ''}
    </div>
    ${desglose ? `<div class="rp-desg"><div class="rp-desg-h"><span class="lbl-mini">Desglose</span><div class="seg mini">${[['cat', 'Categoría'], ['medio', 'Medio de pago']].map(([k, t]) => `<button type="button" class="${(ui.desgPagos || 'cat') === k ? 'on' : ''}" data-act="desg-pagos" data-v="${k}">${t}</button>`).join('')}</div></div>${desglose}</div>` : ''}
  </section>
  <div class="barra-filtros">
    <label class="pill-select">${ic('lista')}<select data-cambio="cat-pagos" aria-label="Filtrar por categoría">
      <option value="">Todas las categorías</option>
      ${cats('pago').map((c) => `<option value="${c.id}" ${ui.catPagos === c.id ? 'selected' : ''}>${esc(c.nombre)}</option>`).join('')}</select></label>
    <button type="button" class="pill-btn" data-act="gestor" data-tipo="pago">${ic('editar')}Categorías</button>
    <button type="button" class="pill-btn" data-act="gestor" data-tipo="medio">${ic('tarjeta')}Medios de pago</button>
  </div>
  <section class="card">
    ${lista.length ? grupo('Vencidos', vencidos) + grupo('Próximos 7 días', semana) + grupo('Más adelante', despues)
      : `<div class="vacio">${ic('pagos')}No hay pagos registrados${ui.catPagos ? ' en esta categoría' : ''}.</div>`}
  </section>`;
}

async function pagar(id) {
  if (ocupado.has(id)) return;
  const p = db.pagos.find((x) => x.id === id);
  if (!p) return;
  ocupado.add(id);
  const antes = p.proxima_fecha;
  const sig = sumarMeses(antes, FRECUENCIAS[p.frecuencia][1]);
  try {
    const hist = await Datos.crear('pago_historial', { pago_id: id, fecha_vencimiento: antes, pagado_en: new Date().toISOString(), valor: p.valor ?? null });
    await Datos.editar('pagos', id, { proxima_fecha: sig });
    toast(`${p.nombre} pagado · próximo: ${fmtFecha(sig)}`, false, {
      txt: 'Deshacer', fn: async () => { await Datos.editar('pagos', id, { proxima_fecha: antes }); await Datos.borrar('pago_historial', hist.id); },
    });
  } catch (e) { /* ya avisado */ } finally { ocupado.delete(id); }
}

const SUGERENCIAS_PAGO = [];   // en pagos la categoría se elige primero, no se deduce del nombre
const GASTOS = [
  [/hogar|casa|vivienda/, ['Arriendo', 'Administración', 'Mercado', 'Servicios públicos', 'Internet', 'Gas', 'Celular', 'Aseo']],
  [/veh|carro|moto|transp/, ['Gasolina', 'Cuota del carro', 'SOAT', 'Seguro', 'Parqueadero', 'Lavado', 'Peajes', 'Mantenimiento']],
  [/suscrip/, ['Netflix', 'Spotify', 'Disney+', 'YouTube Premium', 'Amazon Prime', 'iCloud', 'Gimnasio']],
  [/tarjeta|cr[eé]dito|deuda|banco/, ['Tarjeta de crédito', 'Crédito libre inversión', 'Crédito hipotecario', 'Cuota de manejo']],
  [/salud|m[eé]dic/, ['Medicina prepagada', 'EPS', 'Farmacia', 'Odontología']],
  [/educa|colegio|estudio/, ['Colegio', 'Universidad', 'Cursos', 'Útiles']],
  [/mascota/, ['Comida', 'Veterinario', 'Baño']],
];
function gastosDe(catId) {
  const c = catId && cat(catId);
  const n = normalizar(c ? c.nombre : '');
  const m = GASTOS.find(([re]) => re.test(n));
  return m ? m[1] : ['Mercado', 'Servicios', 'Transporte', 'Restaurantes', 'Otro'];
}
const sugerenciasGasto = (catId) => gastosDe(catId).map((s) => `<button type="button" class="chip" data-act="sugerir" data-campo="f-pn" data-v="${esc(s)}">${esc(s)}</button>`).join('');

function formPago(id) {
  const p = id ? db.pagos.find((x) => x.id === id) : { nombre: '', frecuencia: 'mensual', proxima_fecha: '', valor: null, categoria_id: ui.catPagos, medio_id: null, notas: '' };
  const hist = id ? db.pago_historial.filter((x) => x.pago_id === id).sort((a, b) => b.pagado_en.localeCompare(a.pagado_en)).slice(0, 8) : [];
  const variable = id && p.valor == null;
  const pasos = [
    { t: 'Categoría', ayuda: '¿De qué categoría es el gasto?', html: `
      <div class="campo-f">${chipsCategoria('pago', 'categoria_id', p.categoria_id, 'grande')}</div>` },
    { t: 'Gasto', ayuda: '¿Qué gasto es?', html: `
      <div class="campo-f"><input id="f-pn" type="text" name="nombre" required value="${esc(p.nombre)}" placeholder="Ej.: Mercado" autocomplete="off" aria-label="Tipo de gasto" class="input-grande"></div>
      <div class="sugerencias" id="sug-gasto">${sugerenciasGasto(p.categoria_id)}</div>` },
    { t: 'Valor', ayuda: '¿Cuánto, cada cuánto y con qué pagas?', html: `
      <div class="campo-f">
        <div class="input-pesos"><span>$</span><input id="f-valor" type="number" name="valor" min="0" step="any" inputmode="decimal" value="${p.valor ?? ''}" placeholder="0" aria-label="Valor" ${variable ? 'disabled' : ''}></div>
        <label class="toggle" style="margin-top:8px"><input type="checkbox" name="variable" data-cambio="valor-variable" ${variable ? 'checked' : ''}><span>El valor cambia cada vez</span></label></div>
      <div class="campo-f"><span class="lbl">Frecuencia</span><div class="seg" data-seg="frecuencia">${Object.entries(FRECUENCIAS).map(([k, [t]]) => `<button type="button" class="${p.frecuencia === k ? 'on' : ''}" data-v="${k}">${t}</button>`).join('')}</div><input type="hidden" name="frecuencia" value="${esc(p.frecuencia)}"></div>
      <div class="campo-f"><span class="lbl">Medio de pago</span>${chipsCategoria('medio', 'medio_id', p.medio_id)}</div>` },
    { t: 'Fecha', ayuda: '¿Cuándo vence el próximo pago?', html: `
      <div class="sugerencias grande">${[5, 10, 15, 20, 30].map((n) => `<button type="button" class="chip" data-act="fecha-rapida" data-campo="f-prox" data-v="dia${n}">Día ${n}</button>`).join('')}<button type="button" class="chip" data-act="fecha-rapida" data-campo="f-prox" data-v="hoy">Hoy</button></div>
      <div class="campo-f"><label for="f-prox">O elige la fecha</label><input id="f-prox" type="date" name="proxima_fecha" required value="${esc(p.proxima_fecha)}"></div>
      <div class="campo-f"><label for="f-notas">Notas</label><textarea id="f-notas" name="notas" placeholder="Ej.: referencia de pago, cuenta…">${esc(p.notas || '')}</textarea></div>
      ${hist.length ? `<div class="grupo-t">Historial de pagos</div><div class="filas">${hist.map((x) => `<div class="fila"><div class="cuerpo" style="cursor:default"><div class="t">Pagado el ${fmtFecha(isoDe(new Date(x.pagado_en)))}</div><div class="meta">Vencía el ${fmtFecha(x.fecha_vencimiento)}</div></div><div class="derecha monto">${x.valor != null ? dinero(x.valor) : ''}</div></div>`).join('')}</div>` : ''}` },
  ];
  abrirSheet(`${cabezaSheet(id ? 'Editar pago' : 'Nuevo pago')}
  <form data-form="pago" data-id="${id || ''}">${wizard(pasos, id ? { borrar: `<button type="button" class="btn peligro" data-act="borrar-pago" data-id="${id}">${ic('basura')}</button>` } : null)}</form>`);
  prepararWizard();
}

// =====================================================================
// BAÚL DE DOCUMENTOS
// =====================================================================
const colorCarpeta = (c) => 'c' + (Math.max(0, cats('carpeta').findIndex((x) => x.id === c.id)) % 6);

function filaDocumento(d, mostrarCarpeta) {
  const c = d.carpeta_id && cat(d.carpeta_id);
  const e = d.fecha_vencimiento ? estadoFecha(d.fecha_vencimiento, 30) : null;
  const meta = [];
  if (mostrarCarpeta && c) meta.push(`<span>${ic(c.icono || 'carpeta')}${esc(c.nombre)}</span>`);
  if (d.persona) meta.push(`<span>${ic('persona')}${esc(d.persona)}</span>`);
  if (d.numero) meta.push(`<span>N.º ${esc(d.numero)}</span>`);
  if (d.archivos && d.archivos.length) meta.push(`<span>${ic('archivo')}${d.archivos.length}</span>`);
  return `<div class="fila"><span class="doc-ic">${ic('archivo')}</span>
    <div class="cuerpo" data-act="ir" data-v="documento" data-p="${d.id}"><div class="t">${esc(d.nombre)}</div>${meta.length ? `<div class="meta">${meta.join('')}</div>` : ''}</div>
    ${e ? `<span class="badge ${e.cls || 'verde'}">${e.cls ? esc(e.txt) : 'Vence ' + esc(e.txt)}</span>` : ''}
    <span style="color:var(--muted)">${ic('derecha')}</span></div>`;
}

const normalizar = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
function docsFiltrados() {
  const nq = normalizar(ui.busqueda.trim());
  if (!nq) return db.documentos.slice();
  return db.documentos.filter((d) => [d.nombre, d.numero, d.persona, d.notas, (cat(d.carpeta_id) || {}).nombre].some((v) => normalizar(v).includes(nq)));
}
const estadoDoc = (d) => {
  if (!d.fecha_vencimiento) return 'sin';
  const dd = diasEntre(hoyISO(), d.fecha_vencimiento);
  return dd < 0 ? 'vencido' : dd <= 30 ? 'pronto' : 'aldia';
};
const ESTADOS_DOC = [['vencido', 'Vencidos', 'rojo'], ['pronto', 'Por vencer (30 días)', 'naranja'], ['aldia', 'Al día', 'verde'], ['sin', 'Sin vencimiento', '']];

function vistaBaul() {
  const porVencer = docsPorVencer(30);
  const vencidos = porVencer.filter((d) => d.fecha_vencimiento < hoyISO()).length;
  const vistas = [['carpetas', 'Carpetas', 'carpeta'], ['lista', 'Lista', 'lista'], ['kanban', 'Kanban', 'kanban']];
  const cuerpo = ui.vistaDocs === 'lista' ? docsLista() : ui.vistaDocs === 'kanban' ? docsKanban() : docsCarpetas();
  return `
  <div class="cabeza"><div class="txt"><h1>Baúl de documentos</h1><p>${plural(db.documentos.length, 'documento guardado', 'documentos guardados')}</p></div>
    <button type="button" class="btn" data-act="informe" data-v="documentos" aria-label="Descargar informe">${ic('descargar')}<span class="solo-pc">Informe</span></button>
    <button type="button" class="btn primario" data-act="nuevo-doc">${ic('mas')}Agregar</button></div>
  <button type="button" class="card venc-card" data-act="ir" data-v="vencimientos">
    <span class="ic">${ic('alerta')}</span>
    <span class="cuerpo"><div class="t">Vencimientos</div><div class="s">${porVencer.length ? `${plural(porVencer.length, 'documento vence', 'documentos vencen')} en los próximos 30 días${vencidos ? ` · ${vencidos} ya ${vencidos === 1 ? 'vencido' : 'vencidos'}` : ''}` : 'Todo al día en los próximos 30 días'}</div></span>
    <span style="color:var(--muted)">${ic('derecha')}</span>
  </button>
  <div class="vistas" role="tablist">${vistas.map(([k, t, i]) => `<button type="button" role="tab" aria-selected="${ui.vistaDocs === k}" class="${ui.vistaDocs === k ? 'on' : ''}" data-act="vista-docs" data-v="${k}">${ic(i)}<span>${t}</span></button>`).join('')}</div>
  <div class="buscador">${ic('buscar')}<input type="search" id="busqueda" placeholder="Buscar por nombre, número, persona…" value="${esc(ui.busqueda)}" aria-label="Buscar documentos" autocomplete="off"></div>
  <div class="anim-entrada">${cuerpo}</div>`;
}

function docsCarpetas() {
  if (ui.busqueda.trim()) {
    const res = docsFiltrados().sort((a, b) => a.nombre.localeCompare(b.nombre));
    return `<section class="card">${res.length ? `<div class="filas">${res.map((d) => filaDocumento(d, true)).join('')}</div>` : `<div class="vacio">${ic('buscar')}Ningún documento coincide con “${esc(ui.busqueda)}”.</div>`}</section>`;
  }
  const sinCarpeta = db.documentos.filter((d) => !d.carpeta_id || !cat(d.carpeta_id));
  return `<div class="carpetas">
    ${cats('carpeta').map((c) => {
      const n = db.documentos.filter((d) => d.carpeta_id === c.id).length;
      return `<button type="button" class="carpeta" data-act="ir" data-v="carpeta" data-p="${c.id}"><span class="ic ${colorCarpeta(c)}">${ic(c.icono || 'carpeta')}</span><span class="n">${esc(c.nombre)}</span><span class="c">${plural(n, 'documento', 'documentos')}</span></button>`;
    }).join('')}
    ${sinCarpeta.length ? `<button type="button" class="carpeta" data-act="ir" data-v="carpeta" data-p="sin"><span class="ic c5">${ic('carpeta')}</span><span class="n">Sin carpeta</span><span class="c">${plural(sinCarpeta.length, 'documento', 'documentos')}</span></button>` : ''}
    <button type="button" class="carpeta nueva" data-act="nueva-categoria" data-tipo="carpeta">${ic('mas')}Nueva carpeta</button>
  </div>`;
}

function docsLista() {
  let docs = docsFiltrados();
  if (ui.carpetaFiltro) docs = docs.filter((d) => (ui.carpetaFiltro === 'sin' ? !d.carpeta_id || !cat(d.carpeta_id) : d.carpeta_id === ui.carpetaFiltro));
  docs.sort(ui.ordenDocs === 'az' ? (a, b) => a.nombre.localeCompare(b.nombre)
    : (a, b) => (a.fecha_vencimiento || '9999').localeCompare(b.fecha_vencimiento || '9999') || a.nombre.localeCompare(b.nombre));
  return `
  <div class="barra-filtros">
    <label class="pill-select">${ic('carpeta')}<select data-cambio="carpeta-filtro" aria-label="Filtrar por carpeta">
      <option value="">Todas las carpetas</option>
      ${cats('carpeta').map((c) => `<option value="${c.id}" ${ui.carpetaFiltro === c.id ? 'selected' : ''}>${esc(c.nombre)}</option>`).join('')}
      <option value="sin" ${ui.carpetaFiltro === 'sin' ? 'selected' : ''}>Sin carpeta</option></select></label>
    <div class="seg mini">${[['vence', 'Vence primero'], ['az', 'A–Z']].map(([k, t]) => `<button type="button" class="${ui.ordenDocs === k ? 'on' : ''}" data-act="orden-docs" data-v="${k}">${t}</button>`).join('')}</div>
  </div>
  <section class="card">${docs.length ? `<div class="filas">${docs.map((d) => filaDocumento(d, true)).join('')}</div>` : `<div class="vacio">${ic('archivo')}No hay documentos aquí.</div>`}</section>`;
}

function tarjetaKanban(d, arrastrable) {
  const e = d.fecha_vencimiento ? estadoFecha(d.fecha_vencimiento, 30) : null;
  const c = d.carpeta_id && cat(d.carpeta_id);
  return `<article class="kcard" ${arrastrable ? 'draggable="true"' : ''} data-doc="${d.id}" data-act="ir" data-v="documento" data-p="${d.id}">
    <div class="kt">${esc(d.nombre)}</div>
    <div class="kmeta">${ui.kanbanPor === 'estado' && c ? `<span>${ic(c.icono || 'carpeta')}${esc(c.nombre)}</span>` : ''}${d.persona ? `<span>${ic('persona')}${esc(d.persona)}</span>` : ''}${d.archivos && d.archivos.length ? `<span>${ic('archivo')}${d.archivos.length}</span>` : ''}</div>
    ${e ? `<span class="badge ${e.cls || 'verde'}">${e.cls ? esc(e.txt) : 'Vence ' + esc(e.txt)}</span>` : ''}
  </article>`;
}

function docsKanban() {
  const docs = docsFiltrados().sort((a, b) => (a.fecha_vencimiento || '9999').localeCompare(b.fecha_vencimiento || '9999'));
  let columnas;
  if (ui.kanbanPor === 'estado') {
    columnas = ESTADOS_DOC.map(([k, t, cls]) => ({ id: k, t, cls, docs: docs.filter((d) => estadoDoc(d) === k) }));
  } else {
    columnas = cats('carpeta').map((c) => ({ id: c.id, t: c.nombre, icono: c.icono, color: colorCarpeta(c), docs: docs.filter((d) => d.carpeta_id === c.id) }));
    const sin = docs.filter((d) => !d.carpeta_id || !cat(d.carpeta_id));
    if (sin.length) columnas.push({ id: '', t: 'Sin carpeta', icono: 'carpeta', color: 'c5', docs: sin });
  }
  const porCarpeta = ui.kanbanPor === 'carpeta';
  return `
  <div class="barra-filtros"><span class="lbl-mini">Agrupar por</span>
    <div class="seg mini">${[['carpeta', 'Carpeta'], ['estado', 'Vencimiento']].map(([k, t]) => `<button type="button" class="${ui.kanbanPor === k ? 'on' : ''}" data-act="kanban-por" data-v="${k}">${t}</button>`).join('')}</div>
    ${porCarpeta ? '<span class="lbl-mini solo-pc">Arrastra una tarjeta para cambiarla de carpeta</span>' : ''}</div>
  <div class="kanban">${columnas.map((col) => `<section class="kcol ${col.cls ? 'k-' + col.cls : ''}" ${porCarpeta ? `data-col="${col.id}"` : ''}>
      <header>${porCarpeta ? `<span class="kic ${col.color}">${ic(col.icono || 'carpeta')}</span>` : `<i class="kpunto"></i>`}<h3>${esc(col.t)}</h3><span class="kn">${col.docs.length}</span></header>
      <div class="kcards">${col.docs.map((d) => tarjetaKanban(d, porCarpeta)).join('') || '<div class="kvacio">Sin documentos</div>'}</div>
      ${porCarpeta ? `<button type="button" class="kadd" data-act="nuevo-doc" data-carpeta="${col.id}">${ic('mas')}Agregar</button>` : ''}
    </section>`).join('')}</div>`;
}

function vistaCarpeta(id) {
  const c = id === 'sin' ? { id: 'sin', nombre: 'Sin carpeta' } : cat(id);
  if (!c) return `<button type="button" class="volver" data-act="ir" data-v="baul">${ic('izquierda')}Baúl</button><div class="vacio">Esta carpeta ya no existe.</div>`;
  const docs = db.documentos.filter((d) => (id === 'sin' ? !d.carpeta_id || !cat(d.carpeta_id) : d.carpeta_id === id)).sort((a, b) => a.nombre.localeCompare(b.nombre));
  return `
  <button type="button" class="volver" data-act="ir" data-v="baul">${ic('izquierda')}Baúl</button>
  <div class="cabeza"><div class="txt"><h1>${esc(c.nombre)}</h1><p>${plural(docs.length, 'documento', 'documentos')}</p></div>
    ${id !== 'sin' ? `<button type="button" class="btn" data-act="editar-categoria" data-id="${id}">${ic('editar')}Carpeta</button>` : ''}
    <button type="button" class="btn primario" data-act="nuevo-doc" data-carpeta="${id === 'sin' ? '' : id}">${ic('mas')}Agregar documento</button></div>
  <section class="card">${docs.length ? `<div class="filas">${docs.map((d) => filaDocumento(d)).join('')}</div>` : `<div class="vacio">${ic('archivo')}Esta carpeta está vacía.</div>`}</section>`;
}

const tamano = (b) => (b > 1048576 ? (b / 1048576).toFixed(1).replace('.', ',') + ' MB' : Math.max(1, Math.round(b / 1024)) + ' KB');

function vistaDocumento(id) {
  const d = db.documentos.find((x) => x.id === id);
  if (!d) return `<button type="button" class="volver" data-act="ir" data-v="baul">${ic('izquierda')}Baúl</button><div class="vacio">Este documento ya no existe.</div>`;
  const c = d.carpeta_id && cat(d.carpeta_id);
  const e = d.fecha_vencimiento ? estadoFecha(d.fecha_vencimiento, 30) : null;
  const campo = (l, v, cls = '') => `<div class="campo ${cls}"><div class="l">${l}</div><div class="v ${cls === 'ancho' ? 'notas' : ''}">${v || '<span style="color:var(--muted);font-weight:400">—</span>'}</div></div>`;
  const archivos = d.archivos || [];
  return `
  <button type="button" class="volver" data-act="ir" data-v="${c ? 'carpeta' : 'baul'}" data-p="${c ? c.id : ''}">${ic('izquierda')}${c ? esc(c.nombre) : 'Baúl'}</button>
  <div class="cabeza"><div class="txt"><h1>${esc(d.nombre)}</h1>${e ? `<p><span class="badge ${e.cls || 'verde'}">${e.cls ? esc(e.txt) : 'Vence el ' + fmtFecha(d.fecha_vencimiento, true)}</span></p>` : ''}</div>
    <button type="button" class="btn" data-act="editar-doc" data-id="${d.id}">${ic('editar')}Editar</button></div>
  <section class="card"><div class="ficha">
    ${campo('Carpeta', c ? esc(c.nombre) : '')}
    ${campo('Pertenece a', esc(d.persona))}
    ${campo('Número', esc(d.numero))}
    ${campo('Expedición', d.fecha_expedicion ? fmtFecha(d.fecha_expedicion, true) : '')}
    ${campo('Vencimiento', d.fecha_vencimiento ? `<span class="${e && e.cls ? 'txt-' + e.cls : ''}">${fmtFecha(d.fecha_vencimiento, true)}</span>` : 'No vence')}
    ${campo('Notas', esc(d.notas), 'ancho')}
  </div></section>
  <section class="card">
    <div class="card-h"><span class="ic">${ic('archivo')}</span><h2>Archivos</h2><span class="cuenta">${archivos.length}</span></div>
    ${archivos.map((a, i) => {
      const esPdf = /pdf/i.test(a.tipo) || /\.pdf$/i.test(a.nombre);
      return `<div class="archivo"><span class="tipo ${esPdf ? 'pdf' : 'img'}">${esPdf ? 'PDF' : 'IMG'}</span>
        <div class="cuerpo" data-act="abrir-archivo" data-id="${d.id}" data-i="${i}"><div class="t">${esc(a.nombre)}</div><div class="meta">${tamano(a.tamano || 0)} · Toca para abrir</div></div>
        <button type="button" class="icono-btn" data-act="abrir-archivo" data-id="${d.id}" data-i="${i}" aria-label="Abrir">${ic('externo')}</button>
        <button type="button" class="icono-btn" data-act="borrar-archivo" data-id="${d.id}" data-i="${i}" aria-label="Quitar archivo">${ic('basura')}</button></div>`;
    }).join('') || '<div class="vacio" style="padding:8px">Sin archivos todavía.</div>'}
    <label class="subir">${ic('subir')}Subir PDF o foto<input type="file" accept="application/pdf,image/*" multiple data-subir="${d.id}"></label>
  </section>`;
}

const SUGERENCIAS_DOC = [['SOAT', 'Vehículos'], ['Tecnomecánica', 'Vehículos'], ['Tarjeta de propiedad', 'Vehículos'], ['Licencia de conducción', 'Vehículos'],
  ['Cédula', 'Personales'], ['Pasaporte', 'Personales'], ['Registro civil', 'Familia'], ['Póliza de seguro', 'Importantes'], ['Contrato', 'Importantes'], ['Escritura', 'Importantes']];

function formDocumento(id, carpetaId) {
  const d = id ? db.documentos.find((x) => x.id === id) : { nombre: '', carpeta_id: carpetaId || null, persona: '', numero: '', fecha_expedicion: '', fecha_vencimiento: '', notas: '' };
  const personas = [...new Set(['Yo', ...db.documentos.map((x) => x.persona).filter(Boolean)])].slice(0, 8);
  const pasos = [
    { t: 'Documento', ayuda: '¿Qué documento vas a guardar?', html: `
      <div class="campo-f"><label for="f-dn">Nombre</label><input id="f-dn" type="text" name="nombre" required value="${esc(d.nombre)}" placeholder="Ej.: SOAT, Pasaporte…" autocomplete="off"></div>
      ${id ? '' : sugerencias('f-dn', SUGERENCIAS_DOC.map(([n]) => n))}
      <div class="campo-f"><span class="lbl">Carpeta</span>${chipsCategoria('carpeta', 'carpeta_id', d.carpeta_id)}</div>` },
    { t: 'Detalles', ayuda: '¿De quién es y qué número tiene? Puedes dejarlo vacío.', html: `
      <div class="campo-f"><label for="f-per">Pertenece a</label><input id="f-per" type="text" name="persona" value="${esc(d.persona || '')}" placeholder="Ej.: Yo, esposa, hijo" autocomplete="off"></div>
      ${sugerencias('f-per', personas)}
      <div class="campo-f"><label for="f-num">Número del documento</label><input id="f-num" type="text" name="numero" value="${esc(d.numero || '')}" autocomplete="off"></div>` },
    { t: 'Fechas', ayuda: 'Con la fecha de vencimiento te avisamos antes de que se venza.', html: `
      <div class="campo-f"><label for="f-exp">Fecha de expedición</label><input id="f-exp" type="date" name="fecha_expedicion" value="${esc(d.fecha_expedicion || '')}">
        <div class="sugerencias"><button type="button" class="chip" data-act="fecha-rapida" data-campo="f-exp" data-v="hoy">Hoy</button></div></div>
      <div class="campo-f"><label for="f-ven">Fecha de vencimiento</label><input id="f-ven" type="date" name="fecha_vencimiento" value="${esc(d.fecha_vencimiento || '')}">
        <div class="sugerencias">${[['1a', '1 año después'], ['5a', '5 años'], ['10a', '10 años'], ['no', 'No vence']].map(([k, t]) => `<button type="button" class="chip" data-act="fecha-rapida" data-campo="f-ven" data-v="${k}">${t}</button>`).join('')}</div></div>` },
    { t: id ? 'Notas' : 'Archivos', ayuda: id ? 'Algo que quieras recordar de este documento.' : 'Sube el PDF o tómale una foto. También puedes hacerlo después.', html: `
      ${id ? '' : `<label class="subir subir-grande">${ic('subir')}<span id="sel-archivos">Elegir PDF o fotos</span><input type="file" name="archivos" accept="application/pdf,image/*" multiple></label>`}
      <div class="campo-f" style="margin-top:14px"><label for="f-dnotas">Notas</label><textarea id="f-dnotas" name="notas" placeholder="Opcional">${esc(d.notas || '')}</textarea></div>` },
  ];
  abrirSheet(`${cabezaSheet(id ? 'Editar documento' : 'Agregar documento')}
  <form data-form="documento" data-id="${id || ''}">${wizard(pasos, id ? { borrar: `<button type="button" class="btn peligro" data-act="borrar-doc" data-id="${id}">${ic('basura')}</button>` } : null)}</form>`);
  prepararWizard();
}
function prepararWizard() {
  const w = $('#sheet .wiz');
  if (!w) return;
  w.classList.add('primero');
  if (Number(w.dataset.total) === 1) w.classList.add('ultimo');
}

async function subirArchivos(docId, files) {
  const lista = [...files];
  if (!lista.length) return;
  const d = db.documentos.find((x) => x.id === docId);
  const nuevos = [];
  for (let i = 0; i < lista.length; i++) {
    toast(`Subiendo ${i + 1} de ${lista.length}…`);
    try { nuevos.push(await Archivos.subir(docId, lista[i])); }
    catch (e) { console.error(e); toast(`No se pudo subir ${lista[i].name}: ${e.message}`, true); }
  }
  if (!nuevos.length) return;
  const actual = db.documentos.find((x) => x.id === docId) || d;
  try {
    await Datos.editar('documentos', docId, { archivos: [...(actual.archivos || []), ...nuevos] });
    toast(nuevos.length === 1 ? 'Archivo guardado' : `${nuevos.length} archivos guardados`);
  } catch (e) { Archivos.borrar(nuevos); }
}

async function abrirArchivo(docId, i) {
  const d = db.documentos.find((x) => x.id === docId);
  const a = d && d.archivos[i];
  if (!a) return;
  const ventana = window.open('', '_blank');   // se abre ya para que el navegador no la bloquee
  try {
    let url = await Archivos.url(a);
    if (url.startsWith('data:')) url = URL.createObjectURL(await (await fetch(url)).blob());
    if (ventana) ventana.location.href = url; else location.href = url;
  } catch (e) { if (ventana) ventana.close(); toast('No se pudo abrir el archivo', true); }
}

// =====================================================================
// VENCIMIENTOS (documentos + pagos)
// =====================================================================
function vistaVencimientos() {
  const h = hoyISO();
  const items = [];
  if (ui.filtroVenc !== 'pagos') db.documentos.filter((d) => d.fecha_vencimiento).forEach((d) => items.push({ tipo: 'doc', fecha: d.fecha_vencimiento, d }));
  if (ui.filtroVenc !== 'docs') db.pagos.forEach((p) => items.push({ tipo: 'pago', fecha: p.proxima_fecha, p }));
  items.sort((a, b) => a.fecha.localeCompare(b.fecha));
  const fila = (it) => (it.tipo === 'doc' ? filaVencimientoDoc(it.d, true) : filaVencimientoPago(it.p));
  const vencidos = items.filter((x) => x.fecha < h);
  const pronto = items.filter((x) => x.fecha >= h && diasEntre(h, x.fecha) <= 30);
  const luego = items.filter((x) => diasEntre(h, x.fecha) > 30);
  const grupo = (t, l) => (l.length ? `<div class="grupo-t">${t} · ${l.length}</div><div class="filas">${l.map(fila).join('')}</div>` : '');
  return `
  <button type="button" class="volver" data-act="ir" data-v="baul">${ic('izquierda')}Baúl</button>
  <div class="cabeza"><div class="txt"><h1>Vencimientos</h1><p>Todo lo que tiene fecha: documentos y pagos.</p></div></div>
  <div class="chips">${[['todos', 'Todo'], ['docs', 'Documentos'], ['pagos', 'Pagos']].map(([k, t]) => `<button type="button" class="chip ${ui.filtroVenc === k ? 'on' : ''}" data-act="filtro-venc" data-v="${k}">${t}</button>`).join('')}</div>
  <section class="card">${items.length ? grupo('Vencidos', vencidos) + grupo('Próximos 30 días', pronto) + grupo('Más adelante', luego) : `<div class="vacio">${ic('calendario')}No hay nada con fecha de vencimiento.</div>`}</section>`;
}

function filaVencimientoDoc(d, conCarpeta = true) {
  const e = estadoFecha(d.fecha_vencimiento, 30);
  const c = d.carpeta_id && cat(d.carpeta_id);
  return `<div class="fila"><span class="doc-ic">${ic('archivo')}</span>
    <div class="cuerpo" data-act="ir" data-v="documento" data-p="${d.id}"><div class="t">${esc(d.nombre)}</div>
      <div class="meta">${conCarpeta && c ? `<span>${esc(c.nombre)}</span>` : ''}${d.persona ? `<span>${esc(d.persona)}</span>` : ''}<span>${fmtFecha(d.fecha_vencimiento, true)}</span></div></div>
    <span class="badge ${e.cls || 'verde'}">${esc(e.cls ? e.txt : 'Al día')}</span></div>`;
}
function filaVencimientoPago(p) {
  const e = estadoFecha(p.proxima_fecha, 3);
  return `<div class="fila"><span class="doc-ic">${ic('pagos')}</span>
    <div class="cuerpo" data-act="editar-pago" data-id="${p.id}"><div class="t">${esc(p.nombre)}</div>
      <div class="meta"><span>Pago ${FRECUENCIAS[p.frecuencia][0].toLowerCase()}</span><span>${fmtFecha(p.proxima_fecha, true)}</span>${p.valor != null ? `<span>${dinero(p.valor)}</span>` : ''}</div></div>
    <span class="badge ${e.cls || 'verde'}">${esc(e.cls ? e.txt : 'Al día')}</span></div>`;
}

// =====================================================================
// INFORMES EN PDF
// =====================================================================
let pdfListo = null;
function cargarPDF() {
  if (window.jspdf && window.jspdf.jsPDF && window.jspdf.jsPDF.API.autoTable) return Promise.resolve();
  if (pdfListo) return pdfListo;
  const cargar = (src) => new Promise((ok, mal) => { const s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = mal; document.head.appendChild(s); });
  pdfListo = cargar('vendor/jspdf.umd.min.js').then(() => cargar('vendor/jspdf.plugin.autotable.min.js')).catch((e) => { pdfListo = null; throw e; });
  return pdfListo;
}
// La fuente del PDF no tiene emojis: se quitan para que no salgan símbolos raros
const pdfTxt = (s) => String(s ?? '').replace(/[^\x00-\xFF]/g, '').trim();

async function generarInforme(tipo) {
  toast('Preparando informe…');
  try { await cargarPDF(); } catch (e) { toast('No se pudo preparar el PDF. Revisa tu conexión.', true); return; }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const h = hoyISO();
  const titulos = { habitos: 'Informe de hábitos', tareas: 'Informe de tareas', documentos: 'Informe de documentos', pagos: 'Informe de pagos' };
  const ancho = doc.internal.pageSize.getWidth();
  const VERDE = [20, 196, 127]; const GRAFITO = [17, 18, 20]; const GRIS = [91, 96, 104];
  // Encabezado de marca
  doc.setFillColor(...GRAFITO); doc.rect(0, 0, ancho, 26, 'F');
  doc.setFont('helvetica', 'bold'); doc.setFontSize(16); doc.setTextColor(255, 255, 255); doc.text('APG', 14, 16);
  doc.setTextColor(46, 229, 157); doc.text('VIDA', 14 + doc.getTextWidth('APG '), 16);
  doc.setFontSize(10); doc.setTextColor(200, 203, 206); doc.setFont('helvetica', 'normal');
  doc.text(pdfTxt(mayus(new Date().toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }))), ancho - 14, 16, { align: 'right' });
  doc.setTextColor(...GRAFITO); doc.setFont('helvetica', 'bold'); doc.setFontSize(18);
  doc.text(titulos[tipo], 14, 40);
  doc.setFont('helvetica', 'normal'); doc.setFontSize(10); doc.setTextColor(...GRIS);
  if (Cuenta.nombre()) doc.text(pdfTxt(Cuenta.nombre()), 14, 46);
  let y = 54;
  const estilos = { theme: 'grid', styles: { font: 'helvetica', fontSize: 9, cellPadding: 2.5, lineColor: [226, 228, 229], textColor: GRAFITO }, headStyles: { fillColor: GRAFITO, textColor: 255, fontStyle: 'bold' }, alternateRowStyles: { fillColor: [246, 247, 247] }, margin: { left: 14, right: 14 } };
  const resumen = (pares) => {
    const w = (ancho - 28 - (pares.length - 1) * 4) / pares.length;
    pares.forEach(([v, l], i) => {
      const x = 14 + i * (w + 4);
      doc.setFillColor(241, 242, 242); doc.roundedRect(x, y, w, 18, 2, 2, 'F');
      doc.setFont('helvetica', 'bold'); doc.setFontSize(14); doc.setTextColor(...GRAFITO); doc.text(pdfTxt(v), x + 4, y + 8);
      doc.setFont('helvetica', 'normal'); doc.setFontSize(8); doc.setTextColor(...GRIS); doc.text(pdfTxt(l), x + 4, y + 14);
    });
    y += 26;
  };
  const tabla = (titulo, head, body, extra = {}) => {
    doc.setFont('helvetica', 'bold'); doc.setFontSize(12); doc.setTextColor(...GRAFITO); doc.text(titulo, 14, y); y += 3;
    doc.autoTable({ ...estilos, startY: y, head: [head], body: body.length ? body.map((r) => r.map(pdfTxt)) : [[{ content: 'Sin datos', colSpan: head.length, styles: { halign: 'center', textColor: GRIS } }]], ...extra });
    y = doc.lastAutoTable.finalY + 10;
  };
  const colorEstado = (col) => ({ didParseCell: (d) => {
    if (d.section !== 'body' || d.column.index !== col) return;
    const t = String(d.cell.raw || '');
    if (/Venci/.test(t)) d.cell.styles.textColor = [200, 55, 45];
    else if (/^(Hoy|Mañana|En \d)/.test(t)) d.cell.styles.textColor = [168, 82, 12];
    else if (/Al día/.test(t)) d.cell.styles.textColor = [11, 138, 86];
  } });

  if (tipo === 'habitos') {
    const habs = habitosOrden();
    const ini = h.slice(0, 8) + '01';
    const diasMes = diasEntre(ini, h) + 1;
    const hoyHechos = habs.filter((x) => registro(x.id, h)).length;
    const filas = habs.map((x) => {
      const r = rachas(x.id);
      const mes = [...r.fechas].filter((f) => f >= ini && f <= h).length;
      return [x.nombre, MOMENTOS.find(([k]) => k === (x.momento || ''))[1], String(r.actual), String(r.mejor), `${mes}/${diasMes}`, Math.round((mes / diasMes) * 100) + '%', x.meta_dias ? `${r.total}/${x.meta_dias}` : '-'];
    });
    const prom = filas.length ? Math.round(filas.reduce((s, f) => s + parseInt(f[5], 10), 0) / filas.length) : 0;
    resumen([[`${hoyHechos}/${habs.length}`, 'Cumplidos hoy'], [prom + '%', 'Promedio del mes'], [String(Math.max(0, ...habs.map((x) => rachas(x.id).actual))), 'Mejor racha activa']]);
    tabla('Resumen del mes', ['Hábito', 'Momento', 'Racha', 'Mejor racha', 'Días del mes', '% mes', 'Meta'], filas);
    const dias = Array.from({ length: 7 }, (_, i) => sumarDias(h, i - 6));
    tabla('Últimos 7 días', ['Hábito', ...dias.map((f) => `${LETRAS[aFecha(f).getDay()]} ${aFecha(f).getDate()}`)],
      habs.map((x) => [x.nombre, ...dias.map((f) => (registro(x.id, f) ? 'Sí' : '-'))]),
      { didParseCell: (d) => { if (d.section === 'body' && d.column.index > 0) { d.cell.styles.halign = 'center'; if (d.cell.raw === 'Sí') { d.cell.styles.fillColor = [226, 246, 236]; d.cell.styles.textColor = [11, 138, 86]; d.cell.styles.fontStyle = 'bold'; } } } });
  }
  if (tipo === 'tareas') {
    const pend = ordenarTareas(db.tareas.filter((t) => !t.hecha));
    const hace30 = sumarDias(h, -30);
    const hechas = db.tareas.filter((t) => t.hecha && t.hecha_en && isoDe(new Date(t.hecha_en)) >= hace30).sort((a, b) => b.hecha_en.localeCompare(a.hecha_en));
    resumen([[String(pend.length), 'Pendientes'], [String(pend.filter((t) => t.fecha && t.fecha < h).length), 'Atrasadas'], [String(hechas.length), 'Hechas (30 días)']]);
    tabla('Pendientes', ['Tarea', 'Fecha', 'Lista', 'Matriz', 'Prioridad', 'Repetir'],
      pend.map((t) => [t.titulo, t.fecha ? fechaCorta(t.fecha) + (t.fecha < h ? ' (atrasada)' : '') : '-', (cat(t.lista_id) || {}).nombre || '-', nombreCuadro(cuadroDe(t)), t.prioridad ? mayus(t.prioridad) : '-', t.repetir ? NOMBRE_REPETIR[t.repetir] : '-']),
      { didParseCell: (d) => { if (d.section === 'body' && d.column.index === 1 && /atrasada/.test(d.cell.raw)) d.cell.styles.textColor = [200, 55, 45]; } });
    tabla('Completadas en los últimos 30 días', ['Tarea', 'Completada', 'Lista'], hechas.map((t) => [t.titulo, fmtFecha(isoDe(new Date(t.hecha_en)), true), (cat(t.lista_id) || {}).nombre || '-']));
  }
  if (tipo === 'documentos') {
    const docs = db.documentos.slice().sort((a, b) => (a.fecha_vencimiento || '9999').localeCompare(b.fecha_vencimiento || '9999'));
    const conteo = (k) => docs.filter((d) => estadoDoc(d) === k).length;
    resumen([[String(docs.length), 'Documentos'], [String(conteo('vencido')), 'Vencidos'], [String(conteo('pronto')), 'Vencen en 30 días']]);
    tabla('Documentos', ['Documento', 'Carpeta', 'Pertenece a', 'Número', 'Expedición', 'Vencimiento', 'Estado'],
      docs.map((d) => [d.nombre, (cat(d.carpeta_id) || {}).nombre || '-', d.persona || '-', d.numero || '-', d.fecha_expedicion ? fmtFecha(d.fecha_expedicion, true) : '-',
        d.fecha_vencimiento ? fmtFecha(d.fecha_vencimiento, true) : 'No vence', d.fecha_vencimiento ? (estadoDoc(d) === 'aldia' ? 'Al día' : estadoFecha(d.fecha_vencimiento, 30).txt) : '-']), colorEstado(6));
  }
  if (tipo === 'pagos') {
    const pagos = db.pagos.slice().sort((a, b) => a.proxima_fecha.localeCompare(b.proxima_fecha));
    const [ini, fin] = rangoPeriodo('mes');
    const delMes = pagos.filter((p) => p.proxima_fecha <= fin);
    const pagadosMes = db.pago_historial.filter((x) => { const f = isoDe(new Date(x.pagado_en)); return f >= ini && f <= fin; });
    resumen([[dinero(delMes.reduce((s, p) => s + (Number(p.valor) || 0), 0)), 'Por pagar este mes'], [dinero(pagadosMes.reduce((s, x) => s + (Number(x.valor) || 0), 0)), 'Pagado este mes'], [String(pagos.filter((p) => p.proxima_fecha < h).length), 'Vencidos']]);
    tabla('Pagos recurrentes', ['Pago', 'Categoría', 'Medio', 'Frecuencia', 'Próximo pago', 'Valor', 'Estado'],
      pagos.map((p) => { const e = estadoFecha(p.proxima_fecha, 3); return [p.nombre, (cat(p.categoria_id) || {}).nombre || '-', (cat(p.medio_id) || {}).nombre || '-', FRECUENCIAS[p.frecuencia][0], fmtFecha(p.proxima_fecha, true), p.valor != null ? dinero(p.valor) : 'Variable', e.cls ? e.txt : 'Al día']; }),
      { ...colorEstado(6), columnStyles: { 5: { halign: 'right' } } });
    tabla('Pagado este mes', ['Pago', 'Vencía', 'Pagado el', 'Valor'],
      pagadosMes.map((x) => [(db.pagos.find((p) => p.id === x.pago_id) || {}).nombre || '-', fmtFecha(x.fecha_vencimiento, true), fmtFecha(isoDe(new Date(x.pagado_en)), true), x.valor != null ? dinero(x.valor) : '-']),
      { columnStyles: { 3: { halign: 'right' } } });
  }
  // Pie con número de página
  const paginas = doc.getNumberOfPages();
  for (let i = 1; i <= paginas; i++) {
    doc.setPage(i); doc.setFontSize(8); doc.setTextColor(...GRIS);
    doc.text(`APG VIDA · ${titulos[tipo]}`, 14, doc.internal.pageSize.getHeight() - 8);
    doc.text(`Página ${i} de ${paginas}`, ancho - 14, doc.internal.pageSize.getHeight() - 8, { align: 'right' });
  }
  doc.save(`APG-VIDA-${tipo}-${h}.pdf`);
  toast('Informe descargado');
}

// =====================================================================
// AJUSTES Y CATEGORÍAS
// =====================================================================
const TIPOS = { lista: ['Listas de tareas', 'lista', 'Nueva lista'], pago: ['Categorías de pagos', 'categoría', 'Nueva categoría'], medio: ['Medios de pago', 'medio de pago', 'Nuevo medio de pago'], carpeta: ['Carpetas del baúl', 'carpeta', 'Nueva carpeta'] };
const ICONO_TIPO = { carpeta: 'carpeta', pago: 'dinero', medio: 'tarjeta', lista: 'lista' };

function vistaAjustes() {
  const fila = (tipo) => `<div class="fila"><div class="cuerpo" data-act="gestor" data-tipo="${tipo}"><div class="t">${TIPOS[tipo][0]}</div><div class="meta">${cats(tipo).map((c) => esc(c.nombre)).join(' · ') || 'Ninguna'}</div></div><span style="color:var(--muted)">${ic('derecha')}</span></div>`;
  return `
  <div class="cabeza"><div class="txt"><h1>Ajustes</h1><p>${REMOTO ? esc(sesion.user.email) : 'Modo demostración'}</p></div></div>
  <section class="card">
    <div class="card-h"><span class="ic">${ic('persona')}</span><h2>Tu nombre</h2></div>
    <form class="rapido" data-form="nombre" style="margin:0"><input type="text" name="nombre" value="${esc(Cuenta.nombre())}" placeholder="¿Cómo te saludamos?" autocomplete="given-name" aria-label="Tu nombre"><button class="btn primario">Guardar</button></form>
  </section>
  <section class="card">
    <div class="card-h"><span class="ic">${ic('inicio')}</span><h2>Estilo del Inicio</h2></div>
    <div class="seg">${[['a', 'Tarjetas de colores'], ['b', 'Progreso del día'], ['c', 'Agenda']].map(([k, t]) => `<button type="button" class="${(Cuenta.ajuste('estiloInicio') || 'c') === k ? 'on' : ''}" data-act="estilo-inicio" data-v="${k}">${t}</button>`).join('')}</div>
  </section>
  <section class="card">
    <div class="card-h"><span class="ic">${ic('candado')}</span><h2>Hábitos</h2></div>
    <label class="interruptor"><input type="checkbox" data-act="bloqueo-hab" ${habBloqueado() ? 'checked' : ''}><span class="sw"></span><span>Bloquear la edición de días anteriores<small>Así no marcas por error un día que no es.</small></span></label>
  </section>
  <section class="card">
    <div class="card-h"><span class="ic">${ic('lista')}</span><h2>Organización</h2></div>
    <div class="filas">${fila('lista')}${fila('pago')}${fila('medio')}${fila('carpeta')}
      <div class="fila"><div class="cuerpo" data-act="ir" data-v="habitos"><div class="t">Hábitos</div><div class="meta">${habitosOrden().map((x) => esc(x.nombre)).join(' · ')}</div></div><span style="color:var(--muted)">${ic('derecha')}</span></div>
    </div>
  </section>
  <section class="card">
    <div class="card-h"><span class="ic">${ic('alerta')}</span><h2>Avisos</h2><span class="badge naranja">Próximamente</span></div>
    <p style="margin:0;color:var(--muted)">Notificaciones en el celular y correo 3 días antes de cada pago y 30 días antes de que venza un documento. Mientras tanto, todo aparece resaltado en Inicio y en Vencimientos.</p>
  </section>
  <section class="card">
    <div class="card-h"><span class="ic">${ic('ajustes')}</span><h2>Cuenta</h2></div>
    <div class="acciones" style="margin-top:0">
      ${REMOTO ? `<button type="button" class="btn" data-act="cambiar-clave">Cambiar contraseña</button>
        <button type="button" class="btn peligro" data-act="salir">${ic('salir')}Cerrar sesión</button>`
        : `<button type="button" class="btn peligro" data-act="reiniciar-demo">Reiniciar datos de ejemplo</button>`}
    </div>
  </section>`;
}

function gestorCategorias(tipo) {
  const [titulo, , nueva] = TIPOS[tipo];
  const uso = (c) => (tipo === 'lista' ? db.tareas.filter((t) => t.lista_id === c.id).length
    : tipo === 'pago' ? db.pagos.filter((p) => p.categoria_id === c.id).length : tipo === 'medio' ? db.pagos.filter((p) => p.medio_id === c.id).length : db.documentos.filter((d) => d.carpeta_id === c.id).length);
  abrirSheet(`${cabezaSheet(titulo)}
    <div class="filas">${cats(tipo).map((c) => `<div class="fila"><span class="doc-ic">${ic(c.icono || 'carpeta')}</span>
      <div class="cuerpo" data-act="editar-categoria" data-id="${c.id}"><div class="t">${esc(c.nombre)}</div><div class="meta">${uso(c)} ${tipo === 'lista' ? 'tareas' : tipo === 'pago' || tipo === 'medio' ? 'pagos' : 'documentos'}</div></div>
      <button type="button" class="icono-btn" data-act="editar-categoria" data-id="${c.id}" aria-label="Editar">${ic('editar')}</button></div>`).join('') || '<div class="vacio">Todavía no hay ninguna.</div>'}</div>
    <div class="acciones"><button type="button" class="btn primario bloque" data-act="nueva-categoria" data-tipo="${tipo}">${ic('mas')}${nueva}</button></div>`);
}

function formCategoria(tipo, id, volverA) {
  const c = id ? cat(id) : { nombre: '', icono: ICONO_TIPO[tipo] || 'lista', tipo };
  tipo = c.tipo;
  const iconos = tipo === 'lista' ? ['lista', ...ICONOS_CATEGORIA] : ICONOS_CATEGORIA;
  abrirSheet(`${cabezaSheet(id ? 'Editar ' + TIPOS[tipo][1] : TIPOS[tipo][2])}
  <form data-form="categoria" data-id="${id || ''}" data-tipo="${tipo}" data-volver="${esc(volverA || '')}">
    <div class="campo-f"><label for="f-cn">Nombre</label><input id="f-cn" type="text" name="nombre" required value="${esc(c.nombre)}" autocomplete="off"></div>
    <div class="campo-f"><span class="lbl">Ícono</span><div class="iconos" data-seg="icono">${iconos.map((n) => `<button type="button" class="${c.icono === n ? 'on' : ''}" data-v="${n}" aria-label="${n}">${ic(n)}</button>`).join('')}</div><input type="hidden" name="icono" value="${esc(c.icono || '')}"></div>
    <div class="acciones">
      ${id ? `<button type="button" class="btn peligro" data-act="borrar-categoria" data-id="${id}">${ic('basura')}Borrar</button>` : ''}
      <span class="espacio"></span>
      <button type="button" class="btn" data-act="cerrar">Cancelar</button>
      <button class="btn primario">${ic('check')}Guardar</button>
    </div>
  </form>`);
}

// =====================================================================
// EVENTOS
// =====================================================================
const confirmar = (msg) => window.confirm(msg);

const ACCIONES = {
  cerrar: () => cerrarSheet(),
  reintentar: () => arrancar(),
  ir: (el) => { cerrarSheet(); if (el.dataset.v === 'habito' && ruta().vista !== 'habito') ui.mesHab = 0; ir(el.dataset.v, el.dataset.p); },
  // Tareas
  'toggle-tarea': (el) => {
    // Pequeña animación antes de que la tarea salga de la lista
    const fila = el.closest('[data-fila]');
    const t = db.tareas.find((x) => x.id === el.dataset.id);
    if (fila && t && !t.hecha) { el.classList.add('on'); fila.classList.add('saliendo'); setTimeout(() => toggleTarea(el.dataset.id), 260); }
    else toggleTarea(el.dataset.id);
  },
  'nueva-tarea': () => formTarea(null, {
    fecha: ui.vistaTareas === 'calendario' ? (ui.diaTareas || hoyISO()) : ui.vistaTareas === 'lista' && ui.filtroTareas === 'hoy' ? hoyISO() : '',
    lista_id: ui.listaTareas,
  }),
  'nueva-tarea-cuadro': (el) => { const q = CUADROS.find((x) => x.k === el.dataset.q); formTarea(null, { lista_id: ui.listaTareas, urgente: q.urgente, importante: q.importante }); },
  'vista-tareas': (el) => { ui.vistaTareas = el.dataset.v; localStorage.setItem('apgvida-vista-tareas', ui.vistaTareas); render(); },
  'mes-tareas': (el) => {
    ui.mesTareas += Number(el.dataset.v);
    const b = new Date(); b.setDate(1); b.setMonth(b.getMonth() + ui.mesTareas);
    ui.diaTareas = ui.mesTareas === 0 ? hoyISO() : isoDe(b);
    render();
  },
  'dia-tareas': (el) => { ui.diaTareas = el.dataset.v; render(); },
  'hoy-tareas': () => { ui.mesTareas = 0; ui.diaTareas = hoyISO(); render(); },
  'nombres-cuadros': () => formNombresCuadros(),
  'cuadros-defecto': () => { CUADROS.forEach((q) => { $(`#f-${q.k}`).value = q.def; }); },
  'editar-tarea': (el) => formTarea(el.dataset.id),
  'borrar-tarea': async (el) => { if (!confirmar('¿Borrar esta tarea?')) return; cerrarSheet(); await Datos.borrar('tareas', el.dataset.id); toast('Tarea borrada'); },
  'filtro-tareas': (el) => { ui.filtroTareas = el.dataset.v; render(); },
  'lista-tareas': (el) => { ui.listaTareas = el.dataset.v || null; render(); },
  'ver-hechas': () => { ui.verHechas = !ui.verHechas; render(); },
  'borrar-hechas': async () => {
    const hechas = db.tareas.filter((t) => t.hecha && (!ui.listaTareas || t.lista_id === ui.listaTareas));
    if (!confirmar(`¿Borrar ${plural(hechas.length, 'tarea completada', 'tareas completadas')}?`)) return;
    for (const t of hechas) await Datos.borrar('tareas', t.id);
    toast('Completadas borradas');
  },
  // Hábitos
  'toggle-habito': (el) => {
    if (!diaEditable(el.dataset.fecha)) {
      toast('Los días anteriores están bloqueados 🔒', false, { txt: 'Desbloquear', fn: () => ACCIONES['bloqueo-hab']() });
      return;
    }
    const fila = el.closest('.hab-fila');
    if (fila && !el.classList.contains('on')) {
      // Animación: el check se llena y la fila sale hacia "Completado"
      el.classList.add('on', 'pop'); fila.classList.add('saliendo');
      setTimeout(() => toggleHabito(el.dataset.id, el.dataset.fecha), 280);
    } else toggleHabito(el.dataset.id, el.dataset.fecha);
  },
  'estilo-inicio': async (el) => { try { await Cuenta.guardarAjuste('estiloInicio', el.dataset.v); render(); toast('Estilo guardado'); } catch (e) { avisarError(e); } },
  informe: (el) => generarInforme(el.dataset.v),
  'res-pagos': (el) => { ui.resPagos = el.dataset.v; render(); },
  fab: () => {
    const { vista, param } = ruta();
    if (vista === 'tareas') ACCIONES['nueva-tarea']();
    else if (vista === 'habitos' || vista === 'habito') formHabito(null);
    else if (vista === 'pagos') formPago(null);
    else if (vista === 'baul' || vista === 'carpeta') formDocumento(null, vista === 'carpeta' && param !== 'sin' ? param : null);
    else menuAgregar();
  },
  'bloqueo-hab': async () => {
    try { await Cuenta.guardarAjuste('bloqueoHab', !habBloqueado()); render(); toast(habBloqueado() ? 'Días anteriores bloqueados 🔒' : 'Ahora puedes editar días anteriores'); }
    catch (e) { avisarError(e); }
  },
  'desg-pagos': (el) => { ui.desgPagos = el.dataset.v; render(); },
  'vista-docs': (el) => { ui.vistaDocs = el.dataset.v; localStorage.setItem('apgvida-vista-docs', ui.vistaDocs); render(); },
  'orden-docs': (el) => { ui.ordenDocs = el.dataset.v; render(); },
  'kanban-por': (el) => { ui.kanbanPor = el.dataset.v; render(); },
  'wiz-sig': (el) => { const w = el.closest('.wiz'); moverWizard(w, Number(w.dataset.paso) + 1); },
  'wiz-atras': (el) => { const w = el.closest('.wiz'); moverWizard(w, Number(w.dataset.paso) - 1); },
  'wiz-ir': (el) => {
    const w = el.closest('.wiz'); const i = Number(el.dataset.i);
    // Se puede volver a cualquier paso; para adelantar hay que ir validando
    if (i < Number(w.dataset.paso) || w.dataset.editando === '1') moverWizard(w, i);
    else for (let k = Number(w.dataset.paso) + 1; k <= i; k++) { moverWizard(w, k); if (Number(w.dataset.paso) !== k) break; }
  },
  sugerir: (el) => {
    const campo = $('#' + el.dataset.campo);
    campo.value = el.dataset.v;
    el.parentElement.querySelectorAll('.chip').forEach((c) => c.classList.toggle('on', c === el));
    // Si el nombre sugiere una carpeta o categoría, la deja elegida
    const pista = (SUGERENCIAS_DOC.find(([n]) => n === el.dataset.v) || SUGERENCIAS_PAGO.find(([n]) => n === el.dataset.v) || [])[1];
    if (pista) {
      const seg = el.closest('form').querySelector('[data-seg="carpeta_id"], [data-seg="categoria_id"]');
      const b = seg && [...seg.querySelectorAll('button[data-v]')].find((x) => normalizar(x.textContent).includes(normalizar(pista)));
      if (b) b.click();
    }
  },
  'fecha-rapida': (el) => {
    const campo = $('#' + el.dataset.campo); const v = el.dataset.v; const h = hoyISO();
    const diaSemana = aFecha(h).getDay();
    if (v === 'hoy') campo.value = h;
    else if (v === 'manana') campo.value = sumarDias(h, 1);
    else if (v === 'finde') campo.value = sumarDias(h, diaSemana === 6 ? 7 : (6 - diaSemana));
    else if (v === 'lunes') campo.value = sumarDias(h, ((8 - diaSemana) % 7) || 7);
    else if (v === 'no') campo.value = '';
    else if (/^\d+a$/.test(v)) campo.value = sumarMeses(($('#f-exp') && $('#f-exp').value) || h, 12 * parseInt(v, 10));
    else if (/^dia\d+$/.test(v)) {
      const dia = parseInt(v.slice(3), 10);
      const [y, m, d] = h.split('-').map(Number);
      const ultimo = (yy, mm) => new Date(yy, mm, 0).getDate();
      let f = isoDe(new Date(y, m - 1, Math.min(dia, ultimo(y, m))));
      if (f < h) f = isoDe(new Date(y, m, Math.min(dia, ultimo(y, m + 1))));
      campo.value = f;
    }
    el.parentElement.querySelectorAll('.chip').forEach((c) => c.classList.toggle('on', c === el));
  },
  'nueva-cat-inline': async (el) => {
    const tipo = el.dataset.tipo;
    const nombre = (window.prompt(`Nombre de la ${TIPOS[tipo][1]} nueva:`) || '').trim();
    if (!nombre) return;
    try {
      const c = await Datos.crear('categorias', { tipo, nombre, icono: ICONO_TIPO[tipo] || 'lista', orden: cats(tipo).length });
      el.insertAdjacentHTML('beforebegin', `<button type="button" data-v="${c.id}">${ic(c.icono)}${esc(c.nombre)}</button>`);
      el.previousElementSibling.click();
    } catch (e) { /* ya avisado */ }
  },
  'vista-hab': (el) => { ui.vistaHab = el.dataset.v; localStorage.setItem('apgvida-vista-hab', ui.vistaHab); render(); },
  'dia-hab': (el) => { ui.diaHab = el.dataset.v; render(); },
  'semana-hab': (el) => { ui.semanaHab = Math.min(0, ui.semanaHab + Number(el.dataset.v)); render(); },
  'mes-hab-res': (el) => { ui.mesHabRes = Math.min(0, ui.mesHabRes + Number(el.dataset.v)); render(); },
  'ver-hab-hechos': () => { ui.verHabHechos = !ui.verHabHechos; render(); },
  'meta-rapida': (el) => { $('#f-meta').value = el.dataset.v; },
  'nuevo-habito': () => formHabito(null),
  'editar-habito': (el) => formHabito(el.dataset.id),
  'borrar-habito': async (el) => {
    if (!confirmar('¿Borrar este hábito y todo su historial?')) return;
    cerrarSheet(); await Datos.borrar('habitos', el.dataset.id); ir('habitos'); toast('Hábito borrado');
  },
  'mes-hab': (el) => { ui.mesHab = Math.min(0, ui.mesHab + Number(el.dataset.v)); render(); },
  'detalle-ejercicio': (el) => formEjercicio(el.dataset.id, el.dataset.fecha),
  'agregar-ej': () => { $('#ejs').insertAdjacentHTML('beforeend', filaEjercicio()); $('#ejs .ej-fila:last-child input').focus(); },
  'quitar-ej': (el) => { const f = el.closest('.ej-fila'); if ($('#ejs').children.length > 1) f.remove(); else f.querySelectorAll('input').forEach((i) => { i.value = ''; }); },
  // Pagos
  pagar: (el) => pagar(el.dataset.id),
  'nuevo-pago': () => formPago(null),
  'editar-pago': (el) => formPago(el.dataset.id),
  'borrar-pago': async (el) => { if (!confirmar('¿Borrar este pago y su historial?')) return; cerrarSheet(); await Datos.borrar('pagos', el.dataset.id); toast('Pago borrado'); },
  'cat-pagos': (el) => { ui.catPagos = el.dataset.v || null; render(); },
  // Baúl
  'nuevo-doc': (el) => formDocumento(null, el.dataset.carpeta || (ruta().vista === 'carpeta' && ruta().param !== 'sin' ? ruta().param : null)),
  'editar-doc': (el) => formDocumento(el.dataset.id),
  'borrar-doc': async (el) => {
    const d = db.documentos.find((x) => x.id === el.dataset.id);
    if (!d || !confirmar(`¿Borrar “${d.nombre}” y sus archivos?`)) return;
    cerrarSheet();
    const carpeta = d.carpeta_id;
    await Datos.borrar('documentos', d.id);
    Archivos.borrar(d.archivos || []);
    carpeta && cat(carpeta) ? ir('carpeta', carpeta) : ir('baul');
    toast('Documento borrado');
  },
  'abrir-archivo': (el) => abrirArchivo(el.dataset.id, Number(el.dataset.i)),
  'borrar-archivo': async (el) => {
    const d = db.documentos.find((x) => x.id === el.dataset.id);
    const a = d && d.archivos[Number(el.dataset.i)];
    if (!a || !confirmar(`¿Quitar el archivo “${a.nombre}”?`)) return;
    await Datos.editar('documentos', d.id, { archivos: d.archivos.filter((x) => x !== a) });
    Archivos.borrar([a]);
  },
  'filtro-venc': (el) => { ui.filtroVenc = el.dataset.v; render(); },
  // Categorías
  gestor: (el) => gestorCategorias(el.dataset.tipo),
  'nueva-categoria': (el) => formCategoria(el.dataset.tipo, null, $('#sheet').classList.contains('on') ? 'gestor' : ''),
  'editar-categoria': (el) => formCategoria(null, el.dataset.id, $('#sheet').classList.contains('on') ? 'gestor' : ''),
  'borrar-categoria': async (el) => {
    const c = cat(el.dataset.id);
    if (!c) return;
    const aviso = c.tipo === 'carpeta' ? 'Los documentos que tenga quedarán en “Sin carpeta”.' : c.tipo === 'lista' ? 'Las tareas quedarán sin lista.' : c.tipo === 'medio' ? 'Los pagos quedarán sin medio de pago.' : 'Los pagos quedarán sin categoría.';
    if (!confirmar(`¿Borrar “${c.nombre}”? ${aviso}`)) return;
    const tipo = c.tipo;
    await Datos.borrar('categorias', c.id);
    if (ui.listaTareas === c.id) ui.listaTareas = null;
    if (ui.catPagos === c.id) ui.catPagos = null;
    if (ruta().vista === 'carpeta' && ruta().param === c.id) { cerrarSheet(); ir('baul'); } else gestorCategorias(tipo);
    toast('Borrado');
  },
  // Cuenta
  salir: async () => { if (confirmar('¿Cerrar sesión en este dispositivo?')) await Cuenta.salir(); },
  'cambiar-clave': () => pedirNuevaClave(),
  'reiniciar-demo': () => { if (confirmar('¿Volver a los datos de ejemplo? Se pierde lo que hayas cambiado en la demostración.')) reiniciarDemo(); },
};

document.addEventListener('click', (ev) => {
  // Botones de selección dentro de formularios (prioridad, repetir, íconos)
  const seg = ev.target.closest('[data-seg] > button[data-v]');
  if (seg) {
    const cont = seg.parentElement;
    cont.querySelectorAll('button').forEach((b) => b.classList.toggle('on', b === seg));
    cont.parentElement.querySelector(`input[name="${cont.dataset.seg}"]`).value = seg.dataset.v;
    if (cont.dataset.seg === 'color') cont.closest('form').style.setProperty('--c', seg.dataset.v);
    if (cont.dataset.seg === 'categoria_id' && $('#sug-gasto')) $('#sug-gasto').innerHTML = sugerenciasGasto(seg.dataset.v);
    // En la matriz de la tarea, cada cuadro es una opción grande
    if (cont.dataset.seg === 'cuadro') cont.parentElement.querySelector('input[name="cuadro"]').value = seg.dataset.v;
    return;
  }
  const el = ev.target.closest('[data-act]');
  if (!el) return;
  const fn = ACCIONES[el.dataset.act];
  if (fn) { ev.preventDefault(); fn(el, ev); }
});

document.addEventListener('keydown', (ev) => {
  // En los formularios por pasos, Enter pasa al siguiente paso en vez de guardar
  if (ev.key === 'Enter' && ev.target.tagName === 'INPUT') {
    const w = ev.target.closest('.wiz');
    if (w && !w.classList.contains('ultimo')) { ev.preventDefault(); moverWizard(w, Number(w.dataset.paso) + 1); return; }
  } if (ev.key === 'Escape' && $('#sheet').classList.contains('on')) cerrarSheet(); });

// Kanban: arrastrar una tarjeta a otra carpeta (computador)
document.addEventListener('dragstart', (ev) => {
  const c = ev.target.closest && ev.target.closest('.kcard[draggable]');
  if (!c) return;
  ev.dataTransfer.setData('text/plain', c.dataset.doc); ev.dataTransfer.effectAllowed = 'move';
  c.classList.add('arrastrando');
});
document.addEventListener('dragend', (ev) => { const c = ev.target.closest && ev.target.closest('.kcard'); if (c) c.classList.remove('arrastrando'); document.querySelectorAll('.kcol.sobre').forEach((x) => x.classList.remove('sobre')); });
document.addEventListener('dragover', (ev) => {
  const col = ev.target.closest && ev.target.closest('.kcol[data-col]');
  if (!col) return;
  ev.preventDefault();
  document.querySelectorAll('.kcol.sobre').forEach((x) => { if (x !== col) x.classList.remove('sobre'); });
  col.classList.add('sobre');
});
document.addEventListener('drop', async (ev) => {
  const col = ev.target.closest && ev.target.closest('.kcol[data-col]');
  if (!col) return;
  ev.preventDefault(); col.classList.remove('sobre');
  const id = ev.dataTransfer.getData('text/plain');
  const d = db.documentos.find((x) => x.id === id);
  const destino = col.dataset.col || null;
  if (!d || (d.carpeta_id || null) === destino) return;
  try { await Datos.editar('documentos', id, { carpeta_id: destino }); toast(`Movido a ${destino ? cat(destino).nombre : 'Sin carpeta'}`); } catch (e) { /* ya avisado */ }
});

document.addEventListener('input', (ev) => {
  if (ev.target.id === 'busqueda') { ui.busqueda = ev.target.value; render(); }
});

document.addEventListener('change', async (ev) => {
  const t = ev.target;
  // "+ Crear nueva…" dentro de un selector de categoría
  if (t.tagName === 'SELECT' && t.value === '__nueva') {
    const tipo = t.id.replace('f-', '');
    const nombre = (window.prompt(`Nombre de la ${TIPOS[tipo][1]} nueva:`) || '').trim();
    if (!nombre) { t.value = ''; return; }
    try {
      const c = await Datos.crear('categorias', { tipo, nombre, icono: tipo === 'carpeta' ? 'carpeta' : tipo === 'pago' ? 'dinero' : 'lista', orden: cats(tipo).length });
      const op = new Option(c.nombre, c.id, true, true);
      t.insertBefore(op, t.querySelector('option[value="__nueva"]'));
    } catch (e) { t.value = ''; }
    return;
  }
  if (t.dataset.cambio === 'filtro-tareas') { ui.filtroTareas = t.value; render(); return; }
  if (t.dataset.cambio === 'lista-tareas') {
    if (t.value === '__editar') { t.value = ui.listaTareas || ''; gestorCategorias('lista'); return; }
    ui.listaTareas = t.value || null; render(); return;
  }
  if (t.dataset.cambio === 'carpeta-filtro') { ui.carpetaFiltro = t.value; render(); return; }
  if (t.dataset.cambio === 'valor-variable') { const v = $('#f-valor'); v.disabled = t.checked; if (t.checked) v.value = ''; return; }
  if (t.dataset.cambio === 'cat-pagos') { ui.catPagos = t.value || null; render(); return; }
  if (t.dataset.subir) { const files = t.files; await subirArchivos(t.dataset.subir, files); t.value = ''; return; }
  if (t.name === 'archivos' && t.type === 'file') {
    const n = t.files.length;
    $('#sel-archivos').textContent = n ? (n === 1 ? t.files[0].name : `${n} archivos elegidos`) : 'Elegir PDF o fotos';
  }
});

const vacioANull = (v) => (v === '' || v == null ? null : v);

const FORMULARIOS = {
  'tarea-rapida': async (f, datos) => {
    const titulo = (datos.get('titulo') || '').trim();
    if (!titulo) return;
    f.reset();
    await Datos.crear('tareas', { titulo, fecha: vacioANull(f.dataset.fecha), prioridad: null, lista_id: ruta().vista === 'tareas' ? ui.listaTareas : null, repetir: null, urgente: false, importante: false, hecha: false, hecha_en: null });
    const nuevo = document.querySelector('form[data-form="tarea-rapida"] input');
    if (nuevo) nuevo.focus();
  },
  tarea: async (f, datos) => {
    const v = {
      titulo: datos.get('titulo').trim(), fecha: vacioANull(datos.get('fecha')), prioridad: vacioANull(datos.get('prioridad')),
      lista_id: vacioANull(datos.get('lista_id')), repetir: vacioANull(datos.get('repetir')),
    };
    const q = CUADROS.find((c) => c.k === datos.get('cuadro')) || CUADROS[3];
    v.urgente = q.urgente; v.importante = q.importante;
    if (v.repetir && !v.fecha) v.fecha = hoyISO();
    cerrarSheet();
    if (f.dataset.id) await Datos.editar('tareas', f.dataset.id, v);
    else await Datos.crear('tareas', { ...v, hecha: false, hecha_en: null });
  },
  habito: async (f, datos) => {
    const meta = parseInt(datos.get('meta_dias'), 10);
    const v = {
      nombre: datos.get('nombre').trim(), icono: datos.get('icono') || 'estrella', es_ejercicio: datos.get('es_ejercicio') === 'on',
      color: /^#[0-9a-f]{6}$/i.test(datos.get('color')) ? datos.get('color') : null,
      momento: vacioANull(datos.get('momento')), meta_dias: meta > 0 ? Math.min(meta, 1000) : null,
    };
    cerrarSheet();
    if (f.dataset.id) await Datos.editar('habitos', f.dataset.id, v);
    else await Datos.crear('habitos', { ...v, orden: db.habitos.length });
  },
  cuadros: async (f, datos) => {
    const nombres = {};
    CUADROS.forEach((q) => { const v = (datos.get(q.k) || '').trim(); if (v && v !== q.def) nombres[q.k] = v; });
    try { await Cuenta.guardarAjuste('cuadros', nombres); cerrarSheet(); render(); toast('Nombres guardados'); }
    catch (e) { avisarError(e); }
  },
  ejercicio: async (f, datos) => {
    const nombres = datos.getAll('ej_nombre'); const reps = datos.getAll('ej_reps');
    const ejercicios = nombres.map((n, i) => ({ nombre: n.trim(), reps: reps[i] ? Number(reps[i]) : null })).filter((e) => e.nombre);
    const minutos = datos.get('minutos') ? Number(datos.get('minutos')) : null;
    const detalle = minutos || ejercicios.length ? { minutos, ejercicios } : null;
    const { id, fecha } = f.dataset;
    cerrarSheet();
    const r = registro(id, fecha);
    if (r) await Datos.editar('habito_registros', r.id, { detalle });
    else await Datos.crear('habito_registros', { habito_id: id, fecha, detalle });
    toast('Ejercicio guardado');
  },
  pago: async (f, datos) => {
    const valor = datos.get('valor');
    const v = {
      nombre: datos.get('nombre').trim(), valor: datos.get('variable') === 'on' || valor == null || valor === '' ? null : Number(valor), frecuencia: datos.get('frecuencia') || 'mensual',
      proxima_fecha: datos.get('proxima_fecha'), categoria_id: vacioANull(datos.get('categoria_id')), medio_id: vacioANull(datos.get('medio_id')), notas: vacioANull(datos.get('notas').trim()),
    };
    cerrarSheet();
    if (f.dataset.id) await Datos.editar('pagos', f.dataset.id, v);
    else await Datos.crear('pagos', v);
  },
  documento: async (f, datos) => {
    const v = {
      nombre: datos.get('nombre').trim(), carpeta_id: vacioANull(datos.get('carpeta_id')), persona: vacioANull(datos.get('persona').trim()),
      numero: vacioANull(datos.get('numero').trim()), fecha_expedicion: vacioANull(datos.get('fecha_expedicion')),
      fecha_vencimiento: vacioANull(datos.get('fecha_vencimiento')), notas: vacioANull(datos.get('notas').trim()),
    };
    const files = f.querySelector('input[type=file]') ? [...f.querySelector('input[type=file]').files] : [];
    cerrarSheet();
    if (f.dataset.id) { await Datos.editar('documentos', f.dataset.id, v); return; }
    const d = await Datos.crear('documentos', { ...v, archivos: [] });
    ir('documento', d.id);
    await subirArchivos(d.id, files);
  },
  categoria: async (f, datos) => {
    const v = { nombre: datos.get('nombre').trim(), icono: datos.get('icono') || null };
    const tipo = f.dataset.tipo;
    if (f.dataset.id) await Datos.editar('categorias', f.dataset.id, v);
    else await Datos.crear('categorias', { ...v, tipo, orden: cats(tipo).length });
    if (f.dataset.volver === 'gestor') gestorCategorias(tipo); else cerrarSheet();
  },
  nombre: async (f, datos) => {
    try { await Cuenta.cambiarNombre((datos.get('nombre') || '').trim()); render(); toast('Nombre guardado'); }
    catch (e) { avisarError(e); }
  },
  clave: async (f, datos) => {
    const c = datos.get('clave');
    if (c.length < 8) { toast('Usa al menos 8 caracteres', true); return; }
    try { await Cuenta.cambiarClave(c); cerrarSheet(); toast('Contraseña actualizada'); history.replaceState(null, '', location.pathname + '#/inicio'); }
    catch (e) { toast('No se pudo cambiar: ' + e.message, true); }
  },
};

document.addEventListener('submit', async (ev) => {
  const f = ev.target.closest('form[data-form]');
  if (!f || !FORMULARIOS[f.dataset.form]) return;
  ev.preventDefault();
  const boton = f.querySelector('button:not([type=button])');
  if (boton && boton.disabled) return;
  if (boton) boton.disabled = true;
  try { await FORMULARIOS[f.dataset.form](f, new FormData(f)); }
  catch (e) { /* los errores de guardado ya se avisan */ }
  finally { if (boton) boton.disabled = false; }
});

// =====================================================================
// INICIO DE SESIÓN
// =====================================================================
let modoLogin = 'entrar';
function mostrarLogin(mensaje = '', tipo = 'error') {
  const L = $('#login');
  $('#app').hidden = true; L.hidden = false;
  const msg = mensaje ? `<div class="${tipo}">${esc(mensaje)}</div>` : '';
  const caja = {
    entrar: `<form data-login="entrar">
        <div class="campo-f"><label for="l-email">Correo</label><input id="l-email" type="email" name="email" required autocomplete="email"></div>
        <div class="campo-f"><label for="l-clave">Contraseña</label><input id="l-clave" type="password" name="clave" required autocomplete="current-password"></div>
        <button class="btn primario bloque">Entrar</button>
      </form>
      <div class="alt"><button type="button" class="link" data-login-modo="recordar">Olvidé mi contraseña</button></div>
      <div class="alt">¿Primera vez? <button type="button" class="link" data-login-modo="registro">Crear mi cuenta</button></div>`,
    registro: `<form data-login="registro">
        <div class="campo-f"><label for="l-nombre">Tu nombre</label><input id="l-nombre" type="text" name="nombre" required autocomplete="given-name"></div>
        <div class="campo-f"><label for="l-email">Correo</label><input id="l-email" type="email" name="email" required autocomplete="email"></div>
        <div class="campo-f"><label for="l-clave">Contraseña</label><input id="l-clave" type="password" name="clave" required minlength="8" autocomplete="new-password"><span class="ayuda">Mínimo 8 caracteres.</span></div>
        <button class="btn primario bloque">Crear cuenta</button>
      </form>
      <div class="alt">APG VIDA es de uso personal: solo se puede crear una cuenta.</div>
      <div class="alt"><button type="button" class="link" data-login-modo="entrar">Ya tengo cuenta</button></div>`,
    recordar: `<form data-login="recordar">
        <div class="campo-f"><label for="l-email">Correo</label><input id="l-email" type="email" name="email" required autocomplete="email"></div>
        <button class="btn primario bloque">Enviarme un enlace</button>
      </form>
      <div class="alt"><button type="button" class="link" data-login-modo="entrar">Volver</button></div>`,
  }[modoLogin];
  L.innerHTML = `<div class="caja">${logo()}<p class="sub">Tu vida organizada en un solo lugar</p>${msg}${caja}</div>`;
}

$('#login').addEventListener('click', (ev) => {
  const b = ev.target.closest('[data-login-modo]');
  if (b) { modoLogin = b.dataset.loginModo; mostrarLogin(); }
});
$('#login').addEventListener('submit', async (ev) => {
  ev.preventDefault();
  const f = ev.target; const d = new FormData(f);
  const boton = f.querySelector('button'); boton.disabled = true;
  try {
    if (f.dataset.login === 'entrar') { await Cuenta.entrar(d.get('email').trim(), d.get('clave')); arrancar(); }
    else if (f.dataset.login === 'registro') {
      const listo = await Cuenta.registrar(d.get('nombre').trim(), d.get('email').trim(), d.get('clave'));
      if (listo) arrancar();
      else { modoLogin = 'entrar'; mostrarLogin('Te enviamos un correo para confirmar tu cuenta. Ábrelo y luego entra aquí.', 'ok'); }
    } else { await Cuenta.recordar(d.get('email').trim()); modoLogin = 'entrar'; mostrarLogin('Si el correo está registrado, te llegará un enlace para crear una contraseña nueva.', 'ok'); }
  } catch (e) {
    const m = e.message || '';
    mostrarLogin(/invalid login/i.test(m) ? 'Correo o contraseña incorrectos.'
      : /not confirmed/i.test(m) ? 'Primero confirma tu correo con el enlace que te enviamos.'
        : /registro cerrado|database error saving new user/i.test(m) ? 'El registro está cerrado: APG VIDA ya tiene su cuenta.'
          : /already registered/i.test(m) ? 'Ese correo ya tiene cuenta. Entra con tu contraseña.'
            : 'No se pudo: ' + m);
  }
});

function pedirNuevaClave() {
  abrirSheet(`${cabezaSheet('Nueva contraseña')}
  <form data-form="clave">
    <div class="campo-f"><label for="f-clave">Contraseña nueva</label><input id="f-clave" type="password" name="clave" required minlength="8" autocomplete="new-password"><span class="ayuda">Mínimo 8 caracteres.</span></div>
    <div class="acciones"><span class="espacio"></span><button class="btn primario">${ic('check')}Guardar</button></div>
  </form>`);
}

// =====================================================================
// ARRANQUE
// =====================================================================
let ultimaCarga = 0;
async function arrancar() {
  $('#login').hidden = true; $('#app').hidden = false;
  $('#view').innerHTML = '<div class="cargando">Cargando…</div>';
  try {
    await Datos.cargar();
    ultimaCarga = Date.now();
  } catch (e) {
    console.error(e);
    $('#view').innerHTML = `<div class="vacio">No se pudieron cargar tus datos.<br><button type="button" class="btn" data-act="reintentar">Reintentar</button></div>`;
    return;
  }
  render();
}

window.addEventListener('hashchange', () => { cerrarSheet(); render(); });

// Al volver a la app (por ejemplo, después de usarla en el computador) trae lo último.
document.addEventListener('visibilitychange', async () => {
  if (!REMOTO || document.visibilityState !== 'visible' || !sesion.user || Date.now() - ultimaCarga < 30000) return;
  if ($('#sheet').classList.contains('on')) return;
  try { await Datos.cargar(); ultimaCarga = Date.now(); render(); } catch (e) { console.error(e); }
});

// A medianoche cambia "hoy": refresca la vista si la app quedó abierta.
let diaActual = hoyISO();
setInterval(() => { if (hoyISO() !== diaActual) { diaActual = hoyISO(); render(); } }, 60000);

if ('serviceWorker' in navigator && location.protocol === 'https:') {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}

(async () => {
  if (!REMOTO) $('#demoBanner').hidden = false;
  try {
    if (await Cuenta.iniciar()) arrancar(); else mostrarLogin();
  } catch (e) { console.error(e); mostrarLogin('No se pudo conectar. Revisa tu conexión.'); }
})();
