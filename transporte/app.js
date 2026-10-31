// ControlOps · prototipo con datos de ejemplo guardados en este navegador (localStorage).

const KEY = 'controlops_demo_v1';
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

const ICONS = {
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  truck: '<path d="M2.5 6.5h11v9.5h-11zM13.5 9.5h4l3.5 3.5v3h-7.5"/><circle cx="6.5" cy="17.5" r="2"/><circle cx="17" cy="17.5" r="2"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  home: '<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  board: '<rect x="3" y="4" width="5" height="16" rx="1.5"/><rect x="10" y="4" width="5" height="10" rx="1.5"/><rect x="17" y="4" width="4" height="13" rx="1.5"/>',
  file: '<path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M14 3v5h5"/>',
  wallet: '<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 10h18M16 15h2"/>',
  bell: '<path d="M6 16v-5a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/>',
  money: '<path d="M12 3v18M17 7H9.5a3 3 0 0 0 0 6h5a3 3 0 0 1 0 6H6"/>',
  trend: '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
  cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  alert: '<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17v.5"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
  upload: '<path d="M12 16V5M7 10l5-5 5 5M5 20h14"/>',
  route: '<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8.5 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.5"/>',
  check: '<path d="M5 12l5 5 9-10"/>',
  reset: '<path d="M4 12a8 8 0 1 0 2.5-5.8"/><path d="M4 4v5h5"/>',
  edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/>',
  trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
  more: '<circle cx="5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="19" cy="12" r="1.3"/>',
  cols: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16M15 4v16"/>',
  filter: '<path d="M3 5h18l-7 8v6l-4 2v-8z"/>',
  chev: '<path d="m9 6 6 6-6 6"/>',
  building: '<rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M10 21v-3h4v3"/>',
};
const ico = (n, cls = '') => `<svg class="i ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[n]}</svg>`;

const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const COP = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
const money = (n) => COP.format(n || 0);
const short = (n) => {
  n = n || 0;
  if (n < 0) return '-' + short(-n);
  if (Math.abs(n) >= 1e6) return '$' + (n / 1e6).toLocaleString('es-CO', { maximumFractionDigits: 1 }) + ' M';
  if (Math.abs(n) >= 1e3) return '$' + Math.round(n / 1e3) + ' mil';
  return '$' + n;
};
const fdate = (iso) => iso ? new Date(iso + 'T12:00:00').toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' }).replace('.', '') : '—';
const fdateS = (iso) => iso ? new Date(iso + 'T12:00:00').toLocaleDateString('es-CO', { day: 'numeric', month: 'short' }).replace('.', '') : '—';
const todayISO = () => new Date().toISOString().slice(0, 10);
const daysTo = (iso) => Math.round((new Date(iso + 'T12:00:00') - new Date(todayISO() + 'T12:00:00')) / 864e5);
const initials = (name) => name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
const PALETTE = ['#ffc61a', '#e8e8e8', '#ffd966', '#b5b5b5', '#e0a800', '#8f8f8f', '#fff0b3'];
const colorFor = (id) => PALETTE[[...id].reduce((a, c) => a + c.charCodeAt(0), 0) % PALETTE.length];

// ---------- Estado ----------
let db = load();
const ui = { view: 'resumen', empresa: 'todas', mode: 'group', groupBy: 'vehiculo', gastosBy: 'conductor', q: '', f: { vehiculo: '', conductor: '', cliente: '', etapa: '' }, docFilter: 'alerta', open: new Set() };

// El navegador puede bloquear el almacenamiento (modo privado, visores embebidos): la app sigue funcionando en memoria.
function storeGet() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
function storeSet(v) { try { localStorage.setItem(KEY, v); } catch (e) { /* sin almacenamiento */ } }
function load() {
  try { const raw = storeGet(); if (raw) return JSON.parse(raw); } catch (e) { /* datos corruptos: se regeneran */ }
  const fresh = seedData(); storeSet(JSON.stringify(fresh)); return fresh;
}
const save = () => storeSet(JSON.stringify(db));

const byId = (list, id) => db[list].find((x) => x.id === id);
const cliente = (id) => byId('clientes', id) || { nombre: '—', id: '' };
const vehiculo = (id) => byId('vehiculos', id) || { placa: '—', id: '' };
const conductor = (id) => byId('conductores', id) || { nombre: '—', id: '' };
const empresa = (id) => EMPRESAS.find((e) => e.id === id);
const etapa = (id) => ETAPAS.find((e) => e.id === id);
const gastoDe = (opId) => db.gastos.find((g) => g.opId === opId);

function totalesGasto(g) {
  if (!g) return { gastos: 0, anticipos: 0, diferencia: 0 };
  const gastos = CATEGORIAS_GASTO.reduce((t, [k]) => t + (+g[k] || 0), 0);
  const anticipos = g.anticipos.reduce((t, a) => t + (+a.valor || 0), 0);
  return { gastos, anticipos, diferencia: anticipos - gastos };
}

function opsFiltradas({ ignoreSearch = false } = {}) {
  const q = ui.q.trim().toLowerCase();
  return db.operaciones.filter((o) => {
    if (ui.empresa !== 'todas' && o.empresa !== ui.empresa) return false;
    if (ui.f.vehiculo && o.vehiculoId !== ui.f.vehiculo) return false;
    if (ui.f.conductor && o.conductorId !== ui.f.conductor) return false;
    if (ui.f.cliente && o.clienteId !== ui.f.cliente) return false;
    if (ui.f.etapa && o.etapa !== ui.f.etapa) return false;
    if (!ignoreSearch && q) {
      const hay = [o.os, o.origen, o.destino, o.carga, o.remesa, o.manifiesto, o.facturaNo,
        cliente(o.clienteId).nombre, vehiculo(o.vehiculoId).placa, conductor(o.conductorId).nombre].join(' ').toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  }).sort((a, b) => b.fecha.localeCompare(a.fecha) || b.os.localeCompare(a.os));
}
const opsEmpresa = () => db.operaciones.filter((o) => ui.empresa === 'todas' || o.empresa === ui.empresa);

function todosDocs() {
  const out = [];
  db.vehiculos.forEach((v) => v.docs.forEach((d, i) => out.push({ ...d, idx: i, tipoEnt: 'vehiculos', ent: v, nombre: v.placa })));
  db.conductores.forEach((p) => p.docs.forEach((d, i) => out.push({ ...d, idx: i, tipoEnt: 'conductores', ent: p, nombre: p.nombre })));
  db.clientes.forEach((c) => c.docs.forEach((d, i) => out.push({ ...d, idx: i, tipoEnt: 'clientes', ent: c, nombre: c.nombre })));
  return out;
}
function estadoDoc(d) {
  if (!d.archivo) return { cls: 'bad', txt: 'Falta', rank: 0 };
  if (!d.vence) return { cls: 'ok', txt: 'Sin vencimiento', rank: 9 };
  const n = daysTo(d.vence);
  if (n < 0) return { cls: 'bad', txt: `Vencido hace ${-n} d`, rank: 1 };
  if (n <= 30) return { cls: 'warn', txt: n === 0 ? 'Vence hoy' : `Vence en ${n} d`, rank: 2 };
  return { cls: 'ok', txt: `Vigente · ${fdateS(d.vence)}`, rank: 5 };
}
const alertasDocs = () => todosDocs().filter((d) => estadoDoc(d).rank <= 2);

// Alertas agrupadas: una entrada por vehículo / conductor / cliente
function alertasPorEntidad() {
  const out = [];
  ['vehiculos', 'conductores', 'clientes'].forEach((tipo) => db[tipo].forEach((e) => {
    const docs = e.docs.filter((d) => estadoDoc(d).rank <= 2).sort((a, b) => estadoDoc(a).rank - estadoDoc(b).rank);
    if (docs.length) out.push({ tipo, e, docs, rank: Math.min(...docs.map((d) => estadoDoc(d).rank)) });
  }));
  return out.sort((a, b) => a.rank - b.rank || b.docs.length - a.docs.length);
}

// ---------- Componentes ----------
const NAV = [
  ['resumen', 'Resumen', 'home'],
  ['operaciones', 'Operaciones', 'board'],
  ['gastos', 'Gastos', 'wallet'],
  ['clientes', 'Clientes', 'building'],
  ['vehiculos', 'Vehículos', 'truck'],
  ['conductores', 'Conductores', 'users'],
  ['documentos', 'Documentos', 'file'],
];

function renderChrome() {
  $('#logo').innerHTML = ico('truck');
  $('#pills').innerHTML = NAV.map(([id, n]) => `<button class="pill ${ui.view === id ? 'on' : ''}" data-act="nav" data-view="${id}">${n}</button>`).join('');
  $('#empresaSeg').innerHTML = [['todas', 'Ambas', '']].concat(EMPRESAS.map((e) => [e.id, e.nombre, e.color]))
    .map(([id, n, c]) => `<button class="${ui.empresa === id ? 'on' : ''}" data-act="empresa" data-id="${id}">${c ? `<span class="dot" style="background:${c}"></span>` : ''}<span class="lg">${n}</span></button>`).join('');
  if (innerWidth <= 900) $$('#empresaSeg .lg').forEach((el, i) => { el.textContent = ['Ambas', ...EMPRESAS.map((e) => e.corto)][i]; });
  const n = alertasPorEntidad().length;
  $('#bellBtn').innerHTML = ico('bell') + (n ? `<span class="badge">${n}</span>` : '');
  $('#rail').innerHTML = `
    <button class="accent" data-act="new-op" title="Nueva operación">${ico('plus')}</button>
    <button data-act="focus-search" title="Buscar">${ico('search')}</button>
    <hr>
    <button data-act="nav" data-view="operaciones" title="Operaciones">${ico('board')}</button>
    <button data-act="nav" data-view="vehiculos" title="Vehículos">${ico('truck')}</button>
    <button data-act="nav" data-view="conductores" title="Conductores">${ico('users')}</button>
    <button data-act="nav" data-view="documentos" title="Documentos">${ico('file')}</button>
    <hr>
    <button data-act="reset" title="Restablecer datos de ejemplo">${ico('reset')}</button>`;
  const bn = [['resumen', 'Inicio', 'home'], ['operaciones', 'Viajes', 'board'], ['new', '', 'plus'], ['documentos', 'Docs', 'file'], ['more', 'Más', 'more']];
  $('#bottomnav').innerHTML = bn.map(([id, n, i]) => id === 'new'
    ? `<button class="fab" data-act="new-op" aria-label="Nueva operación">${ico(i)}</button>`
    : `<button class="${ui.view === id || (id === 'more' && ['gastos', 'clientes', 'vehiculos', 'conductores'].includes(ui.view)) ? 'on' : ''}" data-act="${id === 'more' ? 'more' : 'nav'}" data-view="${id}">${ico(i)}${n}</button>`).join('');
}

const empTag = (id) => { const e = empresa(id); return `<span class="emp" style="color:${e.color};border-color:${e.color}55">${e.corto}</span>`; };
const etapaTag = (id) => { const e = etapa(id); return `<span class="tag"><span class="dot" style="background:${e.color}"></span>${e.nombre}</span>`; };
const docCount = (o) => DOCS_OPERACION.filter(([k]) => o.docs[k]).length;

function stat(icon, val, lbl) {
  return `<div class="stat"><span class="ic glass">${ico(icon)}</span><div><b>${val}</b><small>${lbl}</small></div></div>`;
}

// ---------- Vistas ----------
const views = {};

views.resumen = () => {
  const ops = opsEmpresa();
  const mes = todayISO().slice(0, 7);
  const delMes = ops.filter((o) => o.fecha.startsWith(mes));
  const activas = ops.filter((o) => o.etapa === 'pendiente' || o.etapa === 'acta');
  const porFacturar = ops.filter((o) => o.etapa === 'finalizado');
  const alertas = alertasPorEntidad();
  const maxEt = Math.max(1, ...ETAPAS.map((e) => ops.filter((o) => o.etapa === e.id).length));
  const saldoCond = db.gastos.filter((g) => !g.legalizado && ops.some((o) => o.id === g.opId)).length;
  const hoy = new Date().toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' });

  return `
  <div class="head"><div><h1>Buen día</h1><div class="sub">${hoy[0].toUpperCase() + hoy.slice(1)} · ${ui.empresa === 'todas' ? 'Ambas empresas' : empresa(ui.empresa).nombre}</div></div></div>
  <div class="kpis">
    <div class="kpi glass hl"><div class="lbl">${ico('route')} Operaciones activas</div><div class="val">${activas.length}</div><div class="hint">Pendientes y pendientes de acta</div></div>
    <div class="kpi glass"><div class="lbl">${ico('trend')} Flete del mes</div><div class="val">${short(delMes.reduce((t, o) => t + o.flete, 0))}</div><div class="hint">${delMes.length} operaciones en ${new Date().toLocaleDateString('es-CO', { month: 'long' })}</div></div>
    <div class="kpi glass"><div class="lbl">${ico('money')} Por facturar</div><div class="val">${short(porFacturar.reduce((t, o) => t + o.flete, 0))}</div><div class="hint">${porFacturar.length} finalizadas sin factura</div></div>
    <div class="kpi glass"><div class="lbl">${ico('alert')} Alertas de documentos</div><div class="val" style="color:${alertas.length ? 'var(--warn)' : 'inherit'}">${alertas.length}</div><div class="hint">${alertas.filter((a) => a.tipo === 'vehiculos').length} vehículos · ${alertas.filter((a) => a.tipo === 'conductores').length} conductores · ${alertas.filter((a) => a.tipo === 'clientes').length} clientes</div></div>
  </div>
  <div class="grid2">
    <div style="display:flex;flex-direction:column;gap:14px">
      <div class="panel glass">
        <h3>${ico('board')} Operaciones por etapa<span class="spacer"></span><button class="link" data-act="nav" data-view="operaciones">Ver tablero →</button></h3>
        <div class="bars">${ETAPAS.map((e) => { const n = ops.filter((o) => o.etapa === e.id).length; return `
          <div class="bar-row"><span>${e.nombre}</span><div class="bar"><span style="width:${(n / maxEt) * 100}%;background:${e.color}"></span></div><b class="num">${n}</b></div>`; }).join('')}
        </div>
        <div class="emp-split">${EMPRESAS.map((e) => { const eo = db.operaciones.filter((o) => o.empresa === e.id && o.fecha.startsWith(mes)); return `
          <div class="emp-box"><span class="tag"><span class="dot" style="background:${e.color}"></span>${e.nombre}</span><b>${short(eo.reduce((t, o) => t + o.flete, 0))}</b><span class="s" style="color:var(--muted);font-size:12px">${eo.length} viajes este mes</span></div>`; }).join('')}
        </div>
      </div>
      <div class="panel glass">
        <h3>${ico('cal')} Últimas operaciones<span class="spacer"></span><button class="link" data-act="mode-list">Ver lista →</button></h3>
        <div class="rows">${ops.slice().sort((a, b) => b.fecha.localeCompare(a.fecha)).slice(0, 6).map((o) => `
          <div class="row" data-act="op" data-id="${o.id}">
            <span class="plate">${esc(vehiculo(o.vehiculoId).placa)}</span>
            <div style="min-width:0"><div class="t">${esc(o.origen)} → ${esc(o.destino)}</div><div class="s">${esc(o.os)} · ${esc(cliente(o.clienteId).nombre)}</div></div>
            <div class="r"><div class="t">${short(o.flete)}</div><div class="s">${fdateS(o.fecha)}</div></div>
          </div>`).join('')}
        </div>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:14px">
      <div class="panel glass">
        <h3>${ico('alert')} Alertas de documentos<span class="spacer"></span><button class="link" data-act="nav" data-view="documentos">Ver todas →</button></h3>
        <div class="rows">${alertas.slice(0, 7).map(alertaRow).join('') || '<div class="empty">Todo al día 🎉</div>'}
        </div>
      </div>
      <div class="panel glass">
        <h3>${ico('wallet')} Gastos de conductores<span class="spacer"></span><button class="link" data-act="nav" data-view="gastos">Ver gastos →</button></h3>
        <div class="kv">
          <div><small>Legalizaciones pendientes</small><b style="font-size:20px">${saldoCond}</b></div>
          <div><small>Anticipos girados (mes)</small><b style="font-size:20px">${short(db.gastos.filter((g) => g.fecha.startsWith(mes)).reduce((t, g) => t + totalesGasto(g).anticipos, 0))}</b></div>
        </div>
      </div>
    </div>
  </div>`;
};

views.operaciones = () => {
  const ops = opsFiltradas();
  const abiertas = ops.filter((o) => o.etapa !== 'facturado');
  const porFact = ops.filter((o) => o.etapa === 'finalizado');
  const mes = todayISO().slice(0, 7);

  const board = `<div class="board">${ETAPAS.map((e) => {
    const list = ops.filter((o) => o.etapa === e.id);
    return `<div class="col glass" data-etapa="${e.id}">
      <div class="col-h"><span class="dot" style="background:${e.color};color:${e.color}"></span>${e.nombre}<span class="count">${list.length}</span>
        <button class="add" data-act="new-op" data-etapa="${e.id}" title="Agregar">${ico('plus')}</button></div>
      <div class="col-sum">${short(list.reduce((t, o) => t + o.flete, 0))}</div>
      <div class="cards">${list.map(card).join('') || '<div class="empty">Arrastra aquí una operación</div>'}</div>
    </div>`;
  }).join('')}</div>`;

  const list = tablaCompleta(ops);
  const groupBar = ui.mode === 'group' ? `<div class="toolbar"><span class="lbl-s">Agrupar por</span><div class="toggle glass">${['vehiculo', 'cliente', 'conductor'].map((k) => `<button class="${ui.groupBy === k ? 'on' : ''}" data-act="groupby" data-id="${k}">${AGRUPAR[k].n}</button>`).join('')}</div>
    <span class="spacer"></span><button class="link" data-act="grp-all">${ui.open.size ? 'Cerrar todo' : 'Abrir todo'}</button></div>` : '';

  return `
  <div class="head">
    <div><h1>Operaciones</h1><div class="sub">${ui.empresa === 'todas' ? 'Llano Carga + Jorge Fonseca' : empresa(ui.empresa).nombre}</div></div>
    <div class="stats">
      ${stat('trend', short(abiertas.reduce((t, o) => t + o.flete, 0)), 'Flete abierto')}
      ${stat('money', short(porFact.reduce((t, o) => t + o.flete, 0)), 'Por facturar')}
      ${stat('cal', ops.filter((o) => o.fecha.startsWith(mes)).length, 'Viajes este mes')}
    </div>
  </div>
  <div class="toolbar">
    <label class="search glass">${ico('search')}<input id="q" placeholder="Buscar OS, placa, cliente, manifiesto…" value="${esc(ui.q)}"></label>
    <span class="spacer"></span>
    <div class="toggle glass">${[['group', 'Agrupado'], ['board', 'Tablero'], ['list', 'Lista']].map(([m, n]) => `<button class="${ui.mode === m ? 'on' : ''}" data-act="mode" data-mode="${m}">${n}</button>`).join('')}</div>
    ${ui.mode === 'list' ? `<button class="btn ghost cols-btn" data-act="cols" title="Columnas">${ico('cols')}<span class="lbl"> Columnas</span> <span class="count">${colsVisibles().length}</span></button>` : ''}
    <button class="icon-btn glass hide-m" data-act="export" title="Exportar a Excel (CSV)">${ico('download')}</button>
    <button class="btn primary hide-m" data-act="new-op">${ico('plus')} Nueva operación</button>
  </div>
  ${filtrosRapidos()}
  ${groupBar}
  ${ui.mode === 'board' ? board : ui.mode === 'list' ? list : opsAgrupadas(ops)}`;
};

function card(o) {
  const p = conductor(o.conductorId);
  const n = docCount(o);
  return `<div class="card glass" draggable="true" data-act="op" data-id="${o.id}">
    <div class="meta"><span>${esc(o.os)} · ${fdateS(o.fecha)}</span>${empTag(o.empresa)}</div>
    <div class="route">${esc(o.origen)}<span class="arr">→</span>${esc(o.destino)}</div>
    <div class="client">${esc(cliente(o.clienteId).nombre)} · ${esc(o.carga)}</div>
    <div class="foot">
      <span class="money">${short(o.flete)}</span>
      <span class="plate">${esc(vehiculo(o.vehiculoId).placa)}</span>
      <span class="docdots" title="${n} de ${DOCS_OPERACION.length} documentos">${DOCS_OPERACION.map(([k]) => `<i class="${o.docs[k] ? 'ok' : ''}"></i>`).join('')}</span>
      <span class="ini" style="background:${colorFor(p.id || 'x')}" title="${esc(p.nombre)}">${p.id ? initials(p.nombre) : '?'}</span>
    </div>
  </div>`;
}

// ---------- Agrupación ----------
const AGRUPAR = {
  vehiculo: { n: 'Placa', key: 'vehiculoId', tipo: 'vehiculos' },
  cliente: { n: 'Cliente', key: 'clienteId', tipo: 'clientes' },
  conductor: { n: 'Conductor', key: 'conductorId', tipo: 'conductores' },
};
const KEY_DE = { clientes: 'clienteId', vehiculos: 'vehiculoId', conductores: 'conductorId' };
const TIPO_N = { clientes: 'Cliente', vehiculos: 'Vehículo', conductores: 'Conductor' };
const TIPO_ICO = { clientes: 'building', vehiculos: 'truck', conductores: 'user' };

const opsDe = (tipo, id) => opsEmpresa().filter((o) => o[KEY_DE[tipo]] === id).sort((a, b) => b.fecha.localeCompare(a.fecha));
const entTitulo = (tipo, e) => tipo === 'vehiculos' ? `<span class="plate">${esc(e.placa)}</span>` : `<b>${esc(e.nombre)}</b>`;
const uniq = (arr) => [...new Set(arr)];
const viajes = (n, plano) => (plano ? n : `<b>${n}</b>`) + (n === 1 ? ' viaje' : ' viajes');

// Una sola pastilla por ficha en lugar de una por documento
function docsPill(e) {
  const al = e.docs.filter((d) => estadoDoc(d).rank <= 2);
  if (!al.length) return `<span class="tag ok">${ico('check')} Al día</span>`;
  const cls = al.some((d) => estadoDoc(d).cls === 'bad') ? 'bad' : 'warn';
  return `<span class="tag ${cls}">${ico('alert')} ${al.length} ${al.length === 1 ? 'alerta' : 'alertas'}</span>`;
}

function grupo(key, head, body) {
  return `<div class="grp glass ${ui.open.has(key) ? 'open' : ''}">
    <div class="grp-h" data-act="grp" data-key="${esc(key)}">${ico('chev', 'chev')}${head}</div>
    <div class="grp-b">${body}</div></div>`;
}

function opRow(o, ocultar = '') {
  const et = etapa(o.etapa);
  const extra = [
    ocultar !== 'vehiculo' ? esc(vehiculo(o.vehiculoId).placa) : '',
    ocultar !== 'cliente' ? esc(cliente(o.clienteId).nombre) : '',
    ocultar !== 'conductor' ? esc(conductor(o.conductorId).nombre) : '',
  ].filter(Boolean).join(' · ');
  return `<div class="row" data-act="op" data-id="${o.id}">
    <span class="sdot" style="background:${et.color}" title="${et.nombre}"></span>
    <div style="min-width:0"><div class="t">${esc(o.origen)} → ${esc(o.destino)}</div><div class="s">${esc(o.os)} · ${fdateS(o.fecha)} · ${extra}</div></div>
    <div class="r"><div class="t">${short(o.flete)}</div><div class="s">${et.nombre}</div></div></div>`;
}

function opsAgrupadas(ops) {
  const g = AGRUPAR[ui.groupBy];
  const grupos = db[g.tipo].map((e) => ({ e, list: ops.filter((o) => o[g.key] === e.id) })).filter((x) => x.list.length)
    .sort((a, b) => b.list.length - a.list.length);
  if (!grupos.length) return '<div class="empty">Sin resultados</div>';
  return `<div class="grps">${grupos.map(({ e, list }) => {
    const activas = list.filter((o) => o.etapa === 'pendiente' || o.etapa === 'acta').length;
    const porFact = list.filter((o) => o.etapa === 'finalizado').length;
    const sub = g.tipo === 'vehiculos' ? `${esc(e.modelo)} · ${esc(conductor(list[0].conductorId).nombre)}`
      : g.tipo === 'clientes' ? `${esc(e.ciudad)} · ${uniq(list.map((o) => vehiculo(o.vehiculoId).placa)).length} placas`
        : uniq(list.map((o) => vehiculo(o.vehiculoId).placa)).join(' · ');
    const head = `<div class="gt"><div style="min-width:0">${entTitulo(g.tipo, e)}<small>${sub}</small></div></div>
      <div class="gm"><span class="m">${viajes(list.length)}</span><span class="m"><b>${short(list.reduce((t, o) => t + o.flete, 0))}</b></span>
      ${activas ? `<span class="tag hide-s">${activas} en curso</span>` : ''}${porFact ? `<span class="tag warn hide-s">${porFact} por facturar</span>` : ''}${docsPill(e)}</div>`;
    const body = `<div class="rows">${list.map((o) => opRow(o, ui.groupBy)).join('')}</div>
      <div class="grp-f"><button class="btn ghost sm" data-act="ent" data-tipo="${g.tipo}" data-id="${e.id}">Ver ficha de ${esc(g.tipo === 'vehiculos' ? e.placa : e.nombre.split(' ')[0])}</button></div>`;
    return grupo(`ops-${ui.groupBy}-${e.id}`, head, body);
  }).join('')}</div>`;
}

// ---------- Lista: columnas configurables ----------
const COLUMNAS = [
  ['fecha', 'Fecha', (o) => fdateS(o.fecha)],
  ['os', 'OS', (o) => `<b>${esc(o.os)}</b>`],
  ['empresa', 'Empresa', (o) => empTag(o.empresa)],
  ['estado', 'Estado', (o) => etapaTag(o.etapa === 'facturado' ? 'finalizado' : o.etapa)],
  ['facturacion', 'Facturación', (o) => o.etapa === 'facturado' ? '<span class="tag ok">Facturada</span>' : '<span class="tag warn">Pendiente</span>'],
  ['placa', 'Placa', (o) => `<span class="plate">${esc(vehiculo(o.vehiculoId).placa)}</span>`],
  ['trailer', 'Tráiler', (o) => esc(o.trailer) || '—'],
  ['ruta', 'Ruta', (o) => `${esc(o.origen)} → ${esc(o.destino)}`],
  ['carga', 'Carga', (o) => esc(o.carga)],
  ['cliente', 'Cliente', (o) => esc(cliente(o.clienteId).nombre)],
  ['conductor', 'Conductor', (o) => esc(conductor(o.conductorId).nombre)],
  ['remesa', 'Remesa', (o) => esc(o.remesa) || '—'],
  ['manifiesto', 'Manifiesto', (o) => esc(o.manifiesto) || '—'],
  ['flete', 'Flete', (o) => money(o.flete), 'num'],
  ['anticipo', 'Anticipo', (o) => money(o.anticipo), 'num'],
  ['docs', 'Docs', (o) => `${docCount(o)}/${DOCS_OPERACION.length}`],
  ['factura', 'Factura', (o) => esc(o.facturaNo) || '—'],
  ['obs', 'Observaciones', (o) => esc(o.obs) || '—'],
];
const PRESETS = [
  ['basica', 'Básica', ['fecha', 'os', 'placa', 'ruta', 'estado', 'flete']],
  ['operacion', 'Operación', ['fecha', 'os', 'estado', 'placa', 'trailer', 'ruta', 'carga', 'cliente', 'conductor', 'remesa', 'manifiesto']],
  ['facturacion', 'Facturación', ['fecha', 'os', 'cliente', 'facturacion', 'flete', 'anticipo', 'factura', 'docs']],
  ['completa', 'Completa', COLUMNAS.map(([k]) => k)],
];
const COLS_KEY = () => 'controlops_cols_' + (innerWidth <= 900 ? 'movil' : 'pc');
function colsVisibles() {
  try { const v = JSON.parse(localStorage.getItem(COLS_KEY())); if (Array.isArray(v) && v.length) return v; } catch (e) { /* sin almacenamiento */ }
  if (ui.cols && ui.cols[COLS_KEY()]) return ui.cols[COLS_KEY()];
  return innerWidth <= 900 ? PRESETS[0][2] : PRESETS[1][2].concat(['flete', 'facturacion']);
}
function setCols(list) {
  const orden = COLUMNAS.map(([k]) => k).filter((k) => list.includes(k));
  ui.cols = { ...(ui.cols || {}), [COLS_KEY()]: orden };
  try { localStorage.setItem(COLS_KEY(), JSON.stringify(orden)); } catch (e) { /* sin almacenamiento */ }
}

function tablaCompleta(ops) {
  const vis = colsVisibles();
  const cols = COLUMNAS.filter(([k]) => vis.includes(k));
  const total = ops.reduce((t, o) => t + o.flete, 0);
  return `<div class="list-info"><span>${ops.length} ${ops.length === 1 ? 'operación' : 'operaciones'} · ${money(total)} en fletes</span></div>
  <div class="table-wrap glass"><table class="tbl">
    <thead><tr>${cols.map(([, n, , c]) => `<th class="${c || ''}">${n}</th>`).join('')}</tr></thead>
    <tbody>${ops.map((o) => `<tr data-act="op" data-id="${o.id}">${cols.map(([, , fn, c]) => `<td class="${c || ''}">${fn(o)}</td>`).join('')}</tr>`).join('')
      || `<tr><td colspan="${cols.length}"><div class="empty">Sin resultados con estos filtros</div></td></tr>`}</tbody></table></div>`;
}

function colsSheet() {
  const vis = colsVisibles();
  const preset = PRESETS.find(([, , l]) => l.length === vis.length && l.every((k) => vis.includes(k)));
  openModal(`
  <div class="d-head"><div><h2>Columnas de la lista</h2><div class="s">Elige qué tan extensa quieres ver la tabla</div></div>
    <button class="icon-btn glass x" data-act="close-modal">${ico('x')}</button></div>
  <div class="d-body">
    <div class="sec"><h5>Vistas rápidas</h5><div class="presets">${PRESETS.map(([id, n, l]) => `
      <button class="preset ${preset && preset[0] === id ? 'on' : ''}" data-act="preset" data-id="${id}"><b>${n}</b><small>${l.length} columnas</small></button>`).join('')}</div></div>
    <div class="sec"><h5>O escoge una por una</h5><div class="colgrid">${COLUMNAS.map(([k, n]) => `
      <label class="colck ${vis.includes(k) ? 'on' : ''}"><input type="checkbox" data-col="${k}" ${vis.includes(k) ? 'checked' : ''}><span class="box">${ico('check')}</span>${n}</label>`).join('')}</div></div>
  </div>
  <div class="d-foot"><button class="btn primary" data-act="close-modal">${ico('check')} Listo</button></div>`);
}

// ---------- Filtros rápidos ----------
function filtrosRapidos() {
  const base = opsEmpresa();
  const usados = (key) => new Set(base.map((o) => o[key]));
  const sel = (k, icon, placeholder, options) => `
    <label class="fsel glass ${ui.f[k] ? 'on' : ''}">${ico(icon)}<span class="fv">${esc((options.find(([v]) => v === ui.f[k]) || [, placeholder])[1])}</span>
      <select data-filter="${k}" aria-label="${placeholder}"><option value="">${placeholder}: todos</option>${options.map(([v, n]) => `<option value="${v}" ${ui.f[k] === v ? 'selected' : ''}>${esc(n)}</option>`).join('')}</select>
      ${ico('chev', 'dd')}</label>`;
  const activos = Object.values(ui.f).filter(Boolean).length;
  return `<div class="filters">
    ${activos ? `<button class="fclear" data-act="clear-f">${ico('x')} Limpiar (${activos})</button>` : ''}
    ${sel('vehiculo', 'truck', 'Placa', db.vehiculos.filter((v) => usados('vehiculoId').has(v.id)).map((v) => [v.id, v.placa]))}
    ${sel('conductor', 'user', 'Conductor', db.conductores.filter((p) => usados('conductorId').has(p.id)).map((p) => [p.id, p.nombre]))}
    ${sel('cliente', 'building', 'Cliente', db.clientes.filter((c) => usados('clienteId').has(c.id)).map((c) => [c.id, c.nombre]))}
    ${sel('etapa', 'filter', 'Estado', ETAPAS.map((e) => [e.id, e.nombre]))}
  </div>`;
}

function alertaRow({ tipo, e, docs }) {
  const worst = estadoDoc(docs[0]);
  return `<div class="row" data-act="ent" data-tipo="${tipo}" data-id="${e.id}">
    <span class="ric">${ico(TIPO_ICO[tipo])}</span>
    <div style="min-width:0"><div class="t">${entTitulo(tipo, e)}</div><div class="s">${docs.map((d) => esc(d.tipo)).join(' · ')}</div></div>
    <div class="r"><span class="tag ${worst.cls}">${docs.length > 1 ? `${docs.length} docs` : worst.txt}</span></div></div>`;
}

const docRow = (d, upload = '') => { const st = estadoDoc(d); return `
  <div class="mini"><span class="sdot" style="background:var(--${st.cls})"></span><span class="t">${esc(d.tipo)}</span>
    <span class="r"><span class="tag ${st.cls}">${st.txt}</span>${upload}</span></div>`; };

// ---------- Gastos ----------
views.gastos = () => {
  const ops = opsEmpresa();
  const rows = db.gastos.map((g) => ({ g, o: ops.find((o) => o.id === g.opId) })).filter((r) => r.o)
    .sort((a, b) => b.o.fecha.localeCompare(a.o.fecha));
  const tot = rows.reduce((t, { g }) => { const x = totalesGasto(g); t.g += x.gastos; t.a += x.anticipos; return t; }, { g: 0, a: 0 });
  const toggle = `<div class="toolbar"><span class="lbl-s">Agrupar por</span><div class="toggle glass">${[['conductor', 'Conductor'], ['vehiculo', 'Placa'], ['ninguno', 'Sin agrupar']]
    .map(([k, n]) => `<button class="${ui.gastosBy === k ? 'on' : ''}" data-act="gastosby" data-id="${k}">${n}</button>`).join('')}</div></div>`;

  let body;
  if (ui.gastosBy === 'ninguno') {
    body = `<div class="table-wrap glass"><table>
    <thead><tr><th>Fecha</th><th>OS</th><th>Conductor</th><th>Placa</th>${CATEGORIAS_GASTO.map(([, n]) => `<th class="num">${n}</th>`).join('')}<th class="num">Total gastos</th><th class="num">Anticipos</th><th class="num">Diferencia</th><th>Estado</th></tr></thead>
    <tbody>${rows.map(({ g, o }) => { const t = totalesGasto(g); return `<tr data-act="op" data-id="${o.id}">
      <td>${fdate(g.fecha)}</td><td><b>${esc(o.os)}</b></td><td>${esc(conductor(o.conductorId).nombre)}</td><td><span class="plate">${esc(vehiculo(o.vehiculoId).placa)}</span></td>
      ${CATEGORIAS_GASTO.map(([k]) => `<td class="num">${g[k] ? money(g[k]) : '<span style="color:var(--faint)">—</span>'}</td>`).join('')}
      <td class="num"><b>${money(t.gastos)}</b></td><td class="num">${money(t.anticipos)}</td>
      <td class="num ${t.diferencia < 0 ? 'neg' : t.diferencia > 0 ? 'pos' : ''}">${money(t.diferencia)}</td>
      <td>${g.legalizado ? '<span class="tag ok">Legalizado</span>' : '<span class="tag warn">Pendiente</span>'}</td></tr>`; }).join('') || '<tr><td colspan="16"><div class="empty">Sin gastos registrados</div></td></tr>'}</tbody>
    </table></div>`;
  } else {
    const tipo = ui.gastosBy === 'conductor' ? 'conductores' : 'vehiculos';
    const key = KEY_DE[tipo];
    body = `<div class="grps">${db[tipo].map((e) => ({ e, list: rows.filter((r) => r.o[key] === e.id) })).filter((x) => x.list.length).map(({ e, list }) => {
      const t = list.reduce((a, { g }) => { const x = totalesGasto(g); a.g += x.gastos; a.a += x.anticipos; return a; }, { g: 0, a: 0 });
      const pend = list.filter((r) => !r.g.legalizado).length;
      const dif = t.a - t.g;
      const head = `<div class="gt"><div style="min-width:0">${entTitulo(tipo, e)}<small>${list.length === 1 ? '1 viaje' : list.length + ' viajes'} con gastos</small></div></div>
        <div class="gm"><span class="m hide-s">Gastos <b>${short(t.g)}</b></span><span class="m hide-s">Anticipos <b>${short(t.a)}</b></span>
        <span class="m ${dif < 0 ? 'neg' : 'pos'}"><b>${short(dif)}</b></span>${pend ? `<span class="tag warn">${pend} sin legalizar</span>` : '<span class="tag ok">Legalizado</span>'}</div>`;
      const inner = `<div class="rows">${list.map(({ g, o }) => { const x = totalesGasto(g); return `
        <div class="row" data-act="op" data-id="${o.id}"><span class="sdot" style="background:var(--${g.legalizado ? 'ok' : 'warn'})"></span>
          <div style="min-width:0"><div class="t">${esc(o.os)} · ${esc(o.origen)} → ${esc(o.destino)}</div><div class="s">${fdateS(o.fecha)} · ${tipo === 'conductores' ? esc(vehiculo(o.vehiculoId).placa) : esc(conductor(o.conductorId).nombre)} · gastos ${money(x.gastos)} · anticipos ${money(x.anticipos)}</div></div>
          <div class="r"><div class="t ${x.diferencia < 0 ? 'neg' : 'pos'}">${money(x.diferencia)}</div><div class="s">${g.legalizado ? 'Legalizado' : 'Pendiente'}</div></div></div>`; }).join('')}</div>`;
      return grupo(`gas-${ui.gastosBy}-${e.id}`, head, inner);
    }).join('') || '<div class="empty">Sin gastos registrados</div>'}</div>`;
  }

  return `
  <div class="head">
    <div><h1>Gastos y anticipos</h1><div class="sub">Legalización por conductor y por vehículo</div></div>
    <div class="stats">
      ${stat('wallet', short(tot.g), 'Total gastos')}
      ${stat('money', short(tot.a), 'Total anticipos')}
      ${stat('alert', rows.filter((r) => !r.g.legalizado).length, 'Sin legalizar')}
    </div>
  </div>${toggle}${body}`;
};

// ---------- Vehículos, conductores y clientes (agrupados) ----------
function entGrupos(tipo) {
  return `<div class="grps">${db[tipo].map((e) => {
    const eo = opsDe(tipo, e.id);
    const placas = uniq(eo.map((o) => o.vehiculoId)).map((id) => vehiculo(id));
    const conds = uniq(eo.map((o) => o.conductorId)).map((id) => conductor(id));
    const activas = eo.filter((o) => o.etapa === 'pendiente' || o.etapa === 'acta');
    let sub;
    if (tipo === 'vehiculos') sub = `${esc(e.modelo)}${eo[0] ? ' · ' + esc(conductor(eo[0].conductorId).nombre) : ''}`;
    else if (tipo === 'conductores') sub = placas.map((v) => esc(v.placa)).join(' · ') || 'Sin viajes';
    else sub = `NIT ${esc(e.nit)} · ${esc(e.ciudad)}`;
    const head = `<div class="gt">${tipo === 'conductores' ? `<span class="ini" style="background:${colorFor(e.id)}">${initials(e.nombre)}</span>` : ''}<div style="min-width:0">${entTitulo(tipo, e)}<small>${sub}</small></div></div>
      <div class="gm"><span class="m">${viajes(eo.length)}</span><span class="m hide-s"><b>${short(eo.reduce((t, o) => t + o.flete, 0))}</b></span>
      ${activas.length ? `<span class="tag hide-s">${activas.length} en curso</span>` : ''}${docsPill(e)}</div>`;

    // Relación: vehículo ↔ conductores, conductor ↔ placas, cliente ↔ placas
    const relTipo = tipo === 'vehiculos' ? 'conductores' : 'vehiculos';
    const rel = tipo === 'vehiculos' ? conds : placas;
    const relHtml = rel.map((r) => `<div class="mini click" data-act="ent" data-tipo="${relTipo}" data-id="${r.id}">
        ${relTipo === 'vehiculos' ? `<span class="plate">${esc(r.placa)}</span>` : `<span class="ini" style="background:${colorFor(r.id)}">${initials(r.nombre)}</span><span class="t">${esc(r.nombre)}</span>`}
        <span class="r"><span class="s">${viajes(eo.filter((o) => o[KEY_DE[relTipo]] === r.id).length, true)}</span>${docsPill(r)}</span></div>`).join('') || '<div class="empty">—</div>';

    const body = `<div class="gcols">
        <div><h5>${ico('file')} Documentos</h5>${e.docs.map((d) => docRow(d)).join('')}</div>
        <div><h5>${ico(TIPO_ICO[relTipo])} ${tipo === 'vehiculos' ? 'Conductores' : 'Vehículos (placas)'}</h5>${relHtml}</div>
      </div>
      <h5>${ico('board')} Últimos viajes</h5><div class="rows">${eo.slice(0, 5).map((o) => opRow(o, tipo === 'vehiculos' ? 'vehiculo' : tipo === 'clientes' ? 'cliente' : 'conductor')).join('') || '<div class="empty">Sin viajes</div>'}</div>
      <div class="grp-f"><button class="btn ghost sm" data-act="ent" data-tipo="${tipo}" data-id="${e.id}">Ver ficha completa${eo.length > 5 ? ` (${eo.length} viajes)` : ''}</button></div>`;
    return grupo(`${tipo}-${e.id}`, head, body);
  }).join('')}</div>`;
}
const entHead = (t, s, btn) => `<div class="head"><div><h1>${t}</h1><div class="sub">${s}</div></div><span class="spacer"></span>${btn}</div>`;
const abrirTodo = () => `<div class="toolbar"><span class="spacer"></span><button class="link" data-act="grp-all">${ui.open.size ? 'Cerrar todo' : 'Abrir todo'}</button></div>`;
views.vehiculos = () => entHead('Vehículos', `${db.vehiculos.length} placas · documentos, conductores y viajes de cada una`, `<button class="btn primary" data-act="new-ent" data-tipo="vehiculos">${ico('plus')} Nuevo vehículo</button>`) + abrirTodo() + entGrupos('vehiculos');
views.conductores = () => entHead('Conductores', `${db.conductores.length} conductores · licencias, placas que manejan y viajes`, `<button class="btn primary" data-act="new-ent" data-tipo="conductores">${ico('plus')} Nuevo conductor</button>`) + abrirTodo() + entGrupos('conductores');
views.clientes = () => entHead('Clientes', `${db.clientes.length} clientes · documentos, placas asignadas y viajes`, `<button class="btn primary" data-act="new-ent" data-tipo="clientes">${ico('plus')} Nuevo cliente</button>`) + abrirTodo() + entGrupos('clientes');

// ---------- Documentos (agrupados por ficha) ----------
views.documentos = () => {
  const soloAlerta = ui.docFilter === 'alerta';
  const alertas = alertasPorEntidad();
  const secciones = ['vehiculos', 'conductores', 'clientes'].map((tipo) => {
    const ents = soloAlerta ? alertas.filter((a) => a.tipo === tipo) : db[tipo].map((e) => ({ tipo, e, docs: e.docs.filter((d) => estadoDoc(d).rank <= 2) }));
    if (!ents.length) return '';
    return `<div class="sec-t">${ico(TIPO_ICO[tipo])} ${{ vehiculos: 'Vehículos', conductores: 'Conductores', clientes: 'Clientes' }[tipo]} <span class="count">${ents.length}</span></div>
      <div class="grps">${ents.map(({ e, docs }) => {
        const head = `<div class="gt"><div style="min-width:0">${entTitulo(tipo, e)}<small>${docs.length ? docs.map((d) => esc(d.tipo)).join(' · ') : 'Todo al día'}</small></div></div><div class="gm">${docsPill(e)}</div>`;
        const lista = soloAlerta ? docs : e.docs;
        const body = lista.map((d) => docRow(d, `<label class="btn ghost sm" title="Subir / reemplazar">${ico('upload')}<input type="file" accept="application/pdf,image/*" hidden data-entupload="${tipo}|${e.id}|${e.docs.indexOf(d)}"></label>`)).join('')
          + `<div class="grp-f"><button class="btn ghost sm" data-act="ent" data-tipo="${tipo}" data-id="${e.id}">Ver ficha</button></div>`;
        return grupo(`doc-${tipo}-${e.id}`, head, body);
      }).join('')}</div>`;
  }).join('');
  return `
  ${entHead('Documentos', 'Agrupados por vehículo, conductor y cliente', '')}
  <div class="toolbar"><div class="toggle glass">${[['alerta', `Con alertas (${alertas.length})`], ['todos', 'Todos']].map(([id, n]) => `<button class="${ui.docFilter === id ? 'on' : ''}" data-act="docfilter" data-id="${id}">${n}</button>`).join('')}</div>
  <span class="spacer"></span><button class="link" data-act="grp-all">${ui.open.size ? 'Cerrar todo' : 'Abrir todo'}</button></div>
  ${secciones || '<div class="empty">Sin documentos en alerta 🎉</div>'}`;
};


// ---------- Render ----------
function render() {
  renderChrome();
  $('#view').innerHTML = views[ui.view]();
  bindView();
}

function bindView() {
  const q = $('#q');
  if (q) q.addEventListener('input', (e) => {
    ui.q = e.target.value;
    const pos = e.target.selectionStart;
    $('#view').innerHTML = views[ui.view](); bindView();
    const nq = $('#q'); nq.focus(); nq.setSelectionRange(pos, pos);
  });
  // Arrastrar y soltar entre columnas (computador)
  $$('.card[draggable]').forEach((c) => {
    c.addEventListener('dragstart', (e) => { e.dataTransfer.setData('text/plain', c.dataset.id); c.classList.add('dragging'); });
    c.addEventListener('dragend', () => c.classList.remove('dragging'));
  });
  $$('.col').forEach((col) => {
    col.addEventListener('dragover', (e) => { e.preventDefault(); col.classList.add('over'); });
    col.addEventListener('dragleave', () => col.classList.remove('over'));
    col.addEventListener('drop', (e) => {
      e.preventDefault(); col.classList.remove('over');
      moverEtapa(e.dataTransfer.getData('text/plain'), col.dataset.etapa);
    });
  });
}

function moverEtapa(opId, et) {
  const o = byId('operaciones', opId);
  if (!o || o.etapa === et) return;
  o.etapa = et;
  if (et === 'facturado' && !o.facturaNo) o.facturaNo = 'FE (por asignar)';
  save(); render();
  toast(`${o.os} → ${etapa(et).nombre}`);
}

function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), 1800);
}

// ---------- Drawer / modal ----------
function openDrawer(html) { $('#drawer').innerHTML = html; $('#drawer').classList.add('show'); $('#overlay').classList.add('show'); }
function openModal(html) { $('#modal').style.width = ''; $('#modal').innerHTML = html; $('#modal').classList.add('show'); $('#overlay').classList.add('show'); }
function closeAll() { ['#drawer', '#modal'].forEach((s) => $(s).classList.remove('show')); $('#overlay').classList.remove('show'); }
function closeModal() { $('#modal').classList.remove('show'); if (!$('#drawer').classList.contains('show')) $('#overlay').classList.remove('show'); }

function opDrawer(id) {
  const o = byId('operaciones', id); if (!o) return;
  const v = vehiculo(o.vehiculoId), p = conductor(o.conductorId), c = cliente(o.clienteId);
  const g = gastoDe(o.id), t = totalesGasto(g);
  const cur = ETAPAS.findIndex((e) => e.id === o.etapa);
  openDrawer(`
  <div class="d-head">
    <div><h2>${esc(o.origen)} → ${esc(o.destino)}</h2><div class="s"><b style="color:var(--text)">OS ${esc(o.os)}</b> ${empTag(o.empresa)} · ${fdate(o.fecha)}</div></div>
    <button class="icon-btn glass x" data-act="close">${ico('x')}</button>
  </div>
  <div class="d-body">
    <div class="sec"><h5>Etapa</h5><div class="stepper">${ETAPAS.map((e, i) => `<button class="step ${i < cur ? 'done' : ''} ${i === cur ? 'cur' : ''}" style="${i === cur ? `background:${e.color};border-color:${e.color}` : i < cur ? `border-color:${e.color}66` : ''}" data-act="stage" data-id="${o.id}" data-etapa="${e.id}">${e.nombre}</button>`).join('')}</div></div>
    <div class="sec"><h5>${ico('route')} Viaje</h5><div class="kv">
      <div><small>Cliente</small><span class="lk" data-act="ent" data-tipo="clientes" data-id="${c.id}">${esc(c.nombre)}</span></div>
      <div><small>Carga</small>${esc(o.carga) || '—'}</div>
      <div><small>Vehículo</small><span class="lk" data-act="ent" data-tipo="vehiculos" data-id="${v.id}">${esc(v.placa)}</span></div>
      <div><small>Tráiler</small>${esc(o.trailer) || '—'}</div>
      <div><small>Conductor</small><span class="lk" data-act="ent" data-tipo="conductores" data-id="${p.id}">${esc(p.nombre)}</span></div>
      <div><small>Remesa / Manifiesto</small>${esc(o.remesa) || '—'} / ${esc(o.manifiesto) || '—'}</div>
      <div><small>Valor flete</small><b>${money(o.flete)}</b></div>
      <div><small>Valor anticipo</small>${money(o.anticipo)}</div>
      <div><small>Factura</small>${esc(o.facturaNo) || '—'}</div>
      <div><small>Facturación</small>${o.etapa === 'facturado' ? '<span class="tag ok">Facturada</span>' : '<span class="tag warn">Pendiente facturar</span>'}</div>
      ${o.obs ? `<div style="grid-column:1/-1"><small>Observaciones</small>${esc(o.obs)}</div>` : ''}
    </div></div>
    <div class="sec"><h5>${ico('file')} Documentos de la operación · ${docCount(o)}/${DOCS_OPERACION.length}</h5><div class="doclist">${DOCS_OPERACION.map(([k, n]) => `
      <div class="doc ${o.docs[k] ? 'has' : ''}"><span class="ic">${o.docs[k] ? ico('check') : ico('file')}</span>
        <div style="min-width:0"><div class="t">${n}</div><div class="s">${esc(o.docs[k]) || 'Sin adjuntar'}</div></div>
        <div class="r">${o.docs[k] ? `<button class="btn ghost sm" data-act="doc-del" data-id="${o.id}" data-k="${k}">Quitar</button>` : `<label class="btn ghost sm">${ico('upload')} Subir<input type="file" accept="application/pdf,image/*" hidden data-upload="${o.id}" data-k="${k}"></label>`}</div>
      </div>`).join('')}</div></div>
    <div class="sec"><h5>${ico('wallet')} Gastos del conductor</h5>
      ${g ? `<div class="gbox">
        ${CATEGORIAS_GASTO.filter(([k]) => g[k]).map(([k, n]) => `<div class="gline"><span>${n}</span><span>${money(g[k])}</span></div>`).join('')}
        <div class="gline tot"><span>Total gastos</span><span>${money(t.gastos)}</span></div>
        ${g.anticipos.map((a, i) => `<div class="gline"><span>Anticipo ${i + 1} · ${fdateS(a.fecha)}</span><span>${money(a.valor)}</span></div>`).join('')}
        <div class="gline tot"><span>Diferencia (anticipos − gastos)</span><span class="${t.diferencia < 0 ? 'neg' : 'pos'}">${money(t.diferencia)}</span></div>
        <div style="display:flex;gap:8px;margin-top:10px;align-items:center">${g.legalizado ? '<span class="tag ok">Legalizado</span>' : '<span class="tag warn">Pendiente de legalizar</span>'}<span class="spacer"></span>
          <button class="btn ghost sm" data-act="legalizar" data-id="${g.id}">${g.legalizado ? 'Marcar pendiente' : 'Marcar legalizado'}</button>
          <button class="btn ghost sm" data-act="gasto-form" data-id="${o.id}">${ico('edit')} Editar</button></div>
      </div>` : `<div class="empty">Sin gastos registrados<br><br><button class="btn ghost sm" data-act="gasto-form" data-id="${o.id}">${ico('plus')} Registrar gastos</button></div>`}
    </div>
  </div>
  <div class="d-foot"><button class="btn danger" data-act="del-op" data-id="${o.id}">${ico('trash')} Eliminar</button><span class="spacer"></span><button class="btn primary" data-act="edit-op" data-id="${o.id}">${ico('edit')} Editar</button></div>`);
}

function entDrawer(tipo, id) {
  const e = byId(tipo, id); if (!e) return;
  const key = { clientes: 'clienteId', vehiculos: 'vehiculoId', conductores: 'conductorId' }[tipo];
  const eo = db.operaciones.filter((o) => o[key] === id).sort((a, b) => b.fecha.localeCompare(a.fecha));
  const title = tipo === 'vehiculos' ? e.placa : e.nombre;
  const info = tipo === 'clientes'
    ? [['NIT', e.nit], ['Ciudad', e.ciudad], ['Contacto', e.contacto], ['Teléfono', e.telefono]]
    : tipo === 'vehiculos' ? [['Tipo', e.tipo], ['Marca / modelo', e.modelo], ['Tráiler habitual', e.trailer || '—'], ['Viajes', eo.length]]
      : [['Cédula', e.cedula], ['Teléfono', e.telefono], ['Viajes', eo.length], ['Último viaje', eo[0] ? fdate(eo[0].fecha) : '—']];
  openDrawer(`
  <div class="d-head"><div><h2>${tipo === 'vehiculos' ? `<span class="plate" style="font-size:18px">${esc(title)}</span>` : esc(title)}</h2>
    <div class="s">${{ clientes: 'Cliente', vehiculos: 'Vehículo', conductores: 'Conductor' }[tipo]} · ${eo.length} operaciones · ${short(eo.reduce((t, o) => t + o.flete, 0))} en fletes</div></div>
    <button class="icon-btn glass x" data-act="close">${ico('x')}</button></div>
  <div class="d-body">
    <div class="sec"><h5>Información</h5><div class="kv">${info.map(([k, v]) => `<div><small>${k}</small>${esc(v)}</div>`).join('')}</div></div>
    <div class="sec"><h5>${ico('file')} Documentos</h5><div class="doclist">${e.docs.map((d, i) => { const st = estadoDoc(d); return `
      <div class="doc ${d.archivo ? 'has' : ''}"><span class="ic">${d.archivo ? ico('check') : ico('file')}</span>
        <div style="min-width:0"><div class="t">${esc(d.tipo)}</div><div class="s">${esc(d.archivo) || 'Sin adjuntar'}${d.vence ? ' · vence ' + fdate(d.vence) : ''}</div></div>
        <div class="r"><span class="tag ${st.cls}">${st.txt}</span>
          <label class="btn ghost sm" title="Subir / reemplazar">${ico('upload')}<input type="file" accept="application/pdf,image/*" hidden data-entupload="${tipo}|${id}|${i}"></label></div>
      </div>`; }).join('')}</div></div>
    <div class="sec"><h5>${ico('board')} Operaciones relacionadas</h5><div class="rows">${eo.map((o) => `
      <div class="row" data-act="op" data-id="${o.id}">${tipo === 'vehiculos' ? `<span class="ini" style="background:${colorFor(o.conductorId)}">${initials(conductor(o.conductorId).nombre)}</span>` : `<span class="plate">${esc(vehiculo(o.vehiculoId).placa)}</span>`}
        <div style="min-width:0"><div class="t">${esc(o.origen)} → ${esc(o.destino)}</div><div class="s">${esc(o.os)} · ${fdateS(o.fecha)} · ${etapa(o.etapa).nombre}</div></div>
        <div class="r">${short(o.flete)}</div></div>`).join('') || '<div class="empty">Sin operaciones</div>'}</div></div>
  </div>`);
}

const opt = (list, sel, label) => list.map((x) => `<option value="${x.id}" ${x.id === sel ? 'selected' : ''}>${esc(label(x))}</option>`).join('');

function opForm(id, etapaInicial) {
  const o = id ? byId('operaciones', id) : {
    empresa: ui.empresa === 'todas' ? 'llano' : ui.empresa, fecha: todayISO(), etapa: etapaInicial || 'pendiente',
    clienteId: '', vehiculoId: '', conductorId: '', trailer: '', origen: '', destino: '', carga: '', remesa: '', manifiesto: '', flete: '', anticipo: '', obs: '', facturaNo: '',
  };
  const f = (name, label, val, type = 'text', cls = '') => `<div class="f ${cls}"><label>${label}</label><input name="${name}" type="${type}" value="${esc(val)}" ${type === 'number' ? 'min="0" step="1000" inputmode="numeric"' : ''}></div>`;
  openModal(`
  <form id="opForm" style="display:contents">
    <div class="d-head"><div><h2>${id ? 'Editar operación ' + esc(o.os) : 'Nueva operación'}</h2><div class="s">${id ? '' : 'El número de OS se asigna automáticamente según la empresa'}</div></div>
      <button type="button" class="icon-btn glass x" data-act="close-modal">${ico('x')}</button></div>
    <div class="d-body"><div class="form">
      <div class="f"><label>Empresa</label><select name="empresa" ${id ? 'disabled' : ''}>${EMPRESAS.map((e) => `<option value="${e.id}" ${e.id === o.empresa ? 'selected' : ''}>${e.nombre} (${e.prefijo}…)</option>`).join('')}</select></div>
      ${f('fecha', 'Fecha operación', o.fecha, 'date')}
      <div class="f"><label>Etapa</label><select name="etapa">${ETAPAS.map((e) => `<option value="${e.id}" ${e.id === o.etapa ? 'selected' : ''}>${e.nombre}</option>`).join('')}</select></div>
      <div class="f"><label>Cliente</label><select name="clienteId" required><option value="">Seleccionar…</option>${opt(db.clientes, o.clienteId, (x) => x.nombre)}</select></div>
      <h6>Vehículo y conductor</h6>
      <div class="f"><label>Placa vehículo</label><select name="vehiculoId" required><option value="">Seleccionar…</option>${opt(db.vehiculos, o.vehiculoId, (x) => `${x.placa} · ${x.tipo}`)}</select></div>
      ${f('trailer', 'Placa tráiler', o.trailer)}
      <div class="f full"><label>Conductor</label><select name="conductorId" required><option value="">Seleccionar…</option>${opt(db.conductores, o.conductorId, (x) => x.nombre)}</select></div>
      <h6>Ruta y carga</h6>
      ${f('origen', 'Origen', o.origen)}${f('destino', 'Destino', o.destino)}
      ${f('carga', 'Carga', o.carga, 'text', 'full')}
      <h6>Documentos y valores</h6>
      ${f('remesa', 'No. remesa', o.remesa)}${f('manifiesto', 'No. manifiesto', o.manifiesto)}
      ${f('flete', 'Valor flete', o.flete, 'number')}${f('anticipo', 'Valor anticipo', o.anticipo, 'number')}
      ${f('facturaNo', 'No. factura de servicio', o.facturaNo, 'text', 'full')}
      <div class="f full"><label>Observaciones</label><textarea name="obs">${esc(o.obs)}</textarea></div>
    </div></div>
    <div class="d-foot"><button type="button" class="btn ghost" data-act="close-modal">Cancelar</button><button class="btn primary" type="submit">${ico('check')} Guardar</button></div>
  </form>`);
  $('#opForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    data.flete = +data.flete || 0; data.anticipo = +data.anticipo || 0;
    let op;
    if (id) { op = byId('operaciones', id); Object.assign(op, data); }
    else {
      const emp = empresa(data.empresa);
      db.consecutivo[emp.id] = (db.consecutivo[emp.id] || 0) + 1;
      op = { id: 'o' + Date.now(), os: emp.prefijo + db.consecutivo[emp.id], docs: Object.fromEntries(DOCS_OPERACION.map(([k]) => [k, ''])), ...data };
      db.operaciones.unshift(op);
    }
    save(); closeModal(); render(); opDrawer(op.id);
    toast(id ? 'Operación actualizada' : `Operación ${op.os} creada`);
  });
}

function gastoForm(opId) {
  const o = byId('operaciones', opId);
  const g = gastoDe(opId) || { opId, fecha: o.fecha, anticipos: [{ valor: o.anticipo || '', fecha: o.fecha }], legalizado: false };
  const antRow = (a, i) => `<div class="f"><label>Anticipo ${i + 1} · valor</label><input name="av${i}" type="number" min="0" step="1000" inputmode="numeric" value="${esc(a.valor)}"></div>
    <div class="f"><label>Anticipo ${i + 1} · fecha</label><input name="af${i}" type="date" value="${esc(a.fecha)}"></div>`;
  openModal(`
  <form id="gForm" style="display:contents">
    <div class="d-head"><div><h2>Gastos · OS ${esc(o.os)}</h2><div class="s">${esc(conductor(o.conductorId).nombre)} · ${esc(vehiculo(o.vehiculoId).placa)}</div></div>
      <button type="button" class="icon-btn glass x" data-act="close-modal">${ico('x')}</button></div>
    <div class="d-body"><div class="form" id="gFields">
      <h6>Gastos por categoría</h6>
      ${CATEGORIAS_GASTO.map(([k, n]) => `<div class="f"><label>${n}</label><input name="${k}" type="number" min="0" step="1000" inputmode="numeric" value="${g[k] || ''}"></div>`).join('')}
      <h6>Anticipos</h6>
      <div id="ants" class="form full" style="grid-template-columns:inherit">${g.anticipos.map(antRow).join('')}</div>
      <div class="full"><button type="button" class="btn ghost sm" id="addAnt">${ico('plus')} Agregar anticipo</button></div>
    </div></div>
    <div class="d-foot"><button type="button" class="btn ghost" data-act="close-modal">Cancelar</button><button class="btn primary" type="submit">${ico('check')} Guardar</button></div>
  </form>`);
  let n = g.anticipos.length;
  $('#addAnt').addEventListener('click', () => { $('#ants').insertAdjacentHTML('beforeend', antRow({ valor: '', fecha: todayISO() }, n++)); });
  $('#gForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = Object.fromEntries(new FormData(e.target));
    const rec = gastoDe(opId) || (db.gastos.push({ id: 'g' + Date.now(), opId, fecha: o.fecha, legalizado: false }), db.gastos[db.gastos.length - 1]);
    CATEGORIAS_GASTO.forEach(([k]) => { rec[k] = +fd[k] || 0; });
    rec.anticipos = [];
    for (let i = 0; i < n; i++) if (+fd['av' + i]) rec.anticipos.push({ valor: +fd['av' + i], fecha: fd['af' + i] || o.fecha });
    save(); closeModal(); render(); opDrawer(opId); toast('Gastos guardados');
  });
}

function entForm(tipo) {
  const campos = {
    clientes: [['nombre', 'Razón social'], ['nit', 'NIT'], ['ciudad', 'Ciudad'], ['contacto', 'Contacto'], ['telefono', 'Teléfono']],
    vehiculos: [['placa', 'Placa'], ['tipo', 'Tipo (tractocamión, sencillo…)'], ['modelo', 'Marca / modelo'], ['trailer', 'Tráiler habitual']],
    conductores: [['nombre', 'Nombre completo'], ['cedula', 'Cédula'], ['telefono', 'Teléfono']],
  }[tipo];
  const docs = {
    clientes: ['RUT', 'Cámara de Comercio', 'Contrato / Oferta comercial'],
    vehiculos: ['SOAT', 'Revisión tecnicomecánica', 'Póliza RCC / RCE', 'Tarjeta de propiedad'],
    conductores: ['Licencia C3', 'Seguridad social (planilla)', 'Curso manejo defensivo', 'Cédula'],
  }[tipo];
  const sinVence = ['RUT', 'Tarjeta de propiedad', 'Cédula'];
  openModal(`
  <form id="eForm" style="display:contents">
    <div class="d-head"><div><h2>Nuevo ${{ clientes: 'cliente', vehiculos: 'vehículo', conductores: 'conductor' }[tipo]}</h2></div>
      <button type="button" class="icon-btn glass x" data-act="close-modal">${ico('x')}</button></div>
    <div class="d-body"><div class="form">
      ${campos.map(([k, n], i) => `<div class="f ${i === 0 && tipo === 'clientes' ? 'full' : ''}"><label>${n}</label><input name="${k}" ${i === 0 ? 'required' : ''}></div>`).join('')}
      <h6>Fechas de vencimiento</h6>
      ${docs.filter((d) => !sinVence.includes(d)).map((d, i) => `<div class="f"><label>${d}</label><input type="date" name="vence${i}"></div>`).join('')}
    </div></div>
    <div class="d-foot"><button type="button" class="btn ghost" data-act="close-modal">Cancelar</button><button class="btn primary" type="submit">${ico('check')} Guardar</button></div>
  </form>`);
  $('#eForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = Object.fromEntries(new FormData(e.target));
    const rec = { id: tipo[0] + Date.now() };
    campos.forEach(([k]) => { rec[k] = tipo === 'vehiculos' && k === 'placa' ? fd[k].toUpperCase().replace(/\s/g, '') : fd[k]; });
    let j = 0;
    rec.docs = docs.map((d) => ({ tipo: d, vence: sinVence.includes(d) ? null : (fd['vence' + j++] || null), archivo: '' }));
    db[tipo].push(rec); save(); closeModal(); render(); entDrawer(tipo, rec.id); toast('Guardado');
  });
}

function confirmar(titulo, detalle, okLabel, fn) {
  confirmar.fn = fn;
  openModal(`
  <div class="d-head"><div><h2>${esc(titulo)}</h2><div class="s">${esc(detalle)}</div></div></div>
  <div class="d-foot"><button class="btn ghost" data-act="close-modal">Cancelar</button><button class="btn danger" data-act="confirm-ok">${esc(okLabel)}</button></div>`);
  $('#modal').style.width = 'min(440px, calc(100vw - 24px))';
}

function moreSheet() {
  openModal(`
  <div class="d-head"><div><h2>Más</h2></div><button class="icon-btn glass x" data-act="close-modal">${ico('x')}</button></div>
  <div class="d-body"><div class="more-sheet">
    ${[['gastos', 'Gastos y anticipos', 'wallet'], ['clientes', 'Clientes', 'building'], ['vehiculos', 'Vehículos', 'truck'], ['conductores', 'Conductores', 'users']]
      .map(([id, n, i]) => `<button class="btn ghost" style="height:52px;justify-content:flex-start" data-act="nav" data-view="${id}">${ico(i)} ${n}</button>`).join('')}
    <button class="btn ghost" style="height:52px;justify-content:flex-start" data-act="export">${ico('download')} Exportar operaciones (CSV)</button>
    <button class="btn danger" style="height:52px;justify-content:flex-start" data-act="reset">${ico('reset')} Restablecer datos de ejemplo</button>
  </div></div>`);
}

function exportCSV() {
  const cols = ['Fecha', 'OS', 'Empresa', 'Estado operación', 'Estado facturación', 'Placa', 'Tráiler', 'Origen', 'Destino', 'Carga', 'Cliente', 'Conductor', 'Remesa', 'Manifiesto', 'Flete', 'Anticipo', 'Factura', 'Observaciones'];
  const rows = opsFiltradas().map((o) => [o.fecha, o.os, empresa(o.empresa).nombre, o.etapa === 'facturado' ? 'Finalizado' : etapa(o.etapa).nombre,
    o.etapa === 'facturado' ? 'Facturada' : 'Pendiente facturar', vehiculo(o.vehiculoId).placa, o.trailer, o.origen, o.destino, o.carga,
    cliente(o.clienteId).nombre, conductor(o.conductorId).nombre, o.remesa, o.manifiesto, o.flete, o.anticipo, o.facturaNo, o.obs]);
  const csv = '﻿' + [cols, ...rows].map((r) => r.map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`).join(';')).join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  a.download = `operaciones_${todayISO()}.csv`; a.click();
  toast('Archivo descargado');
}

// ---------- Eventos ----------
document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-act]');
  if (!el) return;
  const { act, id } = el.dataset;
  switch (act) {
    case 'nav': ui.view = el.dataset.view; ui.open.clear(); closeAll(); render(); scrollTo(0, 0); break;
    case 'empresa': ui.empresa = id; ui.f = { vehiculo: '', conductor: '', cliente: '', etapa: '' }; render(); break;
    case 'mode': ui.mode = el.dataset.mode; render(); break;
    case 'mode-list': ui.view = 'operaciones'; ui.mode = 'group'; render(); break;
    case 'grp': {
      const k = el.dataset.key;
      ui.open.has(k) ? ui.open.delete(k) : ui.open.add(k);
      el.closest('.grp').classList.toggle('open');
      break;
    }
    case 'grp-all':
      if (ui.open.size) ui.open.clear(); else $$('.grp-h').forEach((h) => ui.open.add(h.dataset.key));
      render(); break;
    case 'groupby': ui.groupBy = id; ui.open.clear(); render(); break;
    case 'gastosby': ui.gastosBy = id; ui.open.clear(); render(); break;
    case 'clear-f': ui.f = { vehiculo: '', conductor: '', cliente: '', etapa: '' }; render(); break;
    case 'cols': colsSheet(); break;
    case 'preset': setCols(PRESETS.find((x) => x[0] === id)[2]); render(); colsSheet(); break;
    case 'docfilter': ui.docFilter = id; render(); break;
    case 'op': opDrawer(id); break;
    case 'ent': if (id) entDrawer(el.dataset.tipo, id); break;
    case 'stage': moverEtapa(id, el.dataset.etapa); opDrawer(id); break;
    case 'new-op': opForm(null, el.dataset.etapa); break;
    case 'edit-op': opForm(id); break;
    case 'del-op': {
      const o = byId('operaciones', id);
      confirmar(`¿Eliminar la operación ${o.os}?`, 'Esta acción no se puede deshacer.', 'Eliminar', () => {
        db.operaciones = db.operaciones.filter((x) => x.id !== id); db.gastos = db.gastos.filter((g) => g.opId !== id);
        save(); closeAll(); render(); toast('Operación eliminada');
      });
      break;
    }
    case 'doc-del': byId('operaciones', id).docs[el.dataset.k] = ''; save(); render(); opDrawer(id); break;
    case 'legalizar': { const g = byId('gastos', id); g.legalizado = !g.legalizado; save(); render(); opDrawer(g.opId); break; }
    case 'gasto-form': gastoForm(id); break;
    case 'new-ent': entForm(el.dataset.tipo); break;
    case 'more': moreSheet(); break;
    case 'export': exportCSV(); break;
    case 'focus-search': if (ui.view !== 'operaciones') { ui.view = 'operaciones'; render(); } $('#q').focus(); break;
    case 'reset':
      confirmar('¿Restablecer los datos de ejemplo?', 'Se perderán los cambios hechos en este navegador.', 'Restablecer', () => {
        db = seedData(); save(); closeAll(); render(); toast('Datos de ejemplo restablecidos');
      });
      break;
    case 'confirm-ok': { const fn = confirmar.fn; confirmar.fn = null; closeModal(); if (fn) fn(); break; }
    case 'close': closeAll(); break;
    case 'close-modal': closeModal(); break;
  }
});

// Subir archivos (en el prototipo solo se guarda el nombre; en la versión final se sube a la nube)
document.addEventListener('change', (e) => {
  const inp = e.target;
  if (inp.dataset.filter) { ui.f[inp.dataset.filter] = inp.value; ui.open.clear(); render(); return; }
  if (inp.dataset.col) {
    const vis = new Set(colsVisibles());
    inp.checked ? vis.add(inp.dataset.col) : vis.delete(inp.dataset.col);
    if (!vis.size) { inp.checked = true; return; }
    setCols([...vis]); render(); inp.closest('.colck').classList.toggle('on', inp.checked);
    $$('.preset').forEach((b) => b.classList.remove('on'));
    return;
  }
  const file = inp.files && inp.files[0];
  if (!file) return;
  if (inp.dataset.upload) {
    byId('operaciones', inp.dataset.upload).docs[inp.dataset.k] = file.name;
    save(); render(); opDrawer(inp.dataset.upload); toast('Documento adjuntado');
  } else if (inp.dataset.entupload) {
    const [tipo, id, i] = inp.dataset.entupload.split('|');
    byId(tipo, id).docs[+i].archivo = file.name;
    save(); render(); entDrawer(tipo, id); toast('Documento adjuntado');
  }
});

document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAll(); });
let lastNarrow = innerWidth <= 900;
addEventListener('resize', () => { const n = innerWidth <= 900; if (n !== lastNarrow) { lastNarrow = n; render(); } });

render();
