/* Mis Tareas — app de tareas personal (estilo TickTick).
   Todo se guarda en este navegador (localStorage). Sin servidor, sin dependencias. */
(() => {
'use strict';

// ---------- Utilidades ----------
const $ = (s, r = document) => r.querySelector(s);
const uid = () => Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pad = (n) => String(n).padStart(2, '0');
const ymd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parseYmd = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const today = () => ymd(new Date());
const addDays = (s, n) => { const d = parseYmd(s); d.setDate(d.getDate() + n); return ymd(d); };
const addMonths = (s, n) => {
  const d = parseYmd(s); const day = d.getDate();
  d.setDate(1); d.setMonth(d.getMonth() + n);
  const last = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  d.setDate(Math.min(day, last)); return ymd(d);
};
const diffDays = (a, b) => Math.round((parseYmd(b) - parseYmd(a)) / 86400000);
const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const DIAS_C = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const ICONS = {
  inbox: '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  sunrise: '<path d="M17 18a5 5 0 0 0-10 0M12 2v7M4.2 10.2l1.4 1.4M1 18h2M21 18h2M18.4 11.6l1.4-1.4M23 22H1M8 6l4-4 4 4"/>',
  week: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>',
  all: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  done: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4 12 14.01l-3-3"/>',
  cal: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
  habit: '<path d="M12 22c5.5 0 9-3.5 9-8.5C21 8 16 4 12 2 8 4 3 8 3 13.5 3 18.5 6.5 22 12 22z"/><path d="m9 13 2 2 4-4"/>',
  timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M5 3 2 6M22 6l-3-3M10 2h4"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  chev: '<path d="m6 9 6 6 6-6"/>',
  left: '<path d="m15 18-6-6 6-6"/>',
  right: '<path d="m9 18 6-6-6-6"/>',
  trash: '<path d="M3 6h18M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  repeat: '<path d="m17 1 4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>',
  sub: '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
  note: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8"/>',
  tag: '<path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><path d="M7 7h.01"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>',
  play: '<path d="M6 3l14 9-14 9z"/>',
  pause: '<path d="M6 4h4v16H6zM14 4h4v16h-4z"/>',
  reset: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
};
const icon = (n, cls = 'ico') => `<svg class="${cls}" viewBox="0 0 24 24">${ICONS[n] || ''}</svg>`;

// ---------- Datos ----------
const KEY = 'mis-tareas-v1';
const ACCENTS = ['#4F6BED', '#7C5CFC', '#E5484D', '#F76B15', '#F5A524', '#2FB36E', '#12A594', '#0B8A56', '#3E63DD', '#D6409F', '#1B1D22'];
const LIST_COLORS = ['#4F6BED', '#E5484D', '#F5A524', '#2FB36E', '#7C5CFC', '#12A594', '#D6409F', '#8A8F99'];
const PRIOS = [
  { v: 3, name: 'Alta' }, { v: 2, name: 'Media' }, { v: 1, name: 'Baja' }, { v: 0, name: 'Ninguna' },
];
const REPEATS = { '': 'No se repite', daily: 'Cada día', weekdays: 'Días hábiles (L-V)', weekly: 'Cada semana', monthly: 'Cada mes', yearly: 'Cada año' };
const SMART = [
  { id: 'today', name: 'Hoy', icon: 'sun' },
  { id: 'tomorrow', name: 'Mañana', icon: 'sunrise' },
  { id: 'week', name: 'Próximos 7 días', icon: 'week' },
  { id: 'inbox', name: 'Bandeja de entrada', icon: 'inbox' },
  { id: 'all', name: 'Todas', icon: 'all' },
  { id: 'done', name: 'Completadas', icon: 'done' },
];
const TOOLS = [
  { id: 'calendar', name: 'Calendario', icon: 'cal' },
  { id: 'matrix', name: 'Matriz de prioridades', icon: 'grid' },
  { id: 'habits', name: 'Hábitos', icon: 'habit' },
  { id: 'focus', name: 'Pomodoro', icon: 'timer' },
];

function seed() {
  const t = today();
  const personal = uid(), trabajo = uid(), compras = uid();
  const mk = (title, o = {}) => ({ id: uid(), title, notes: '', listId: null, due: null, time: null, priority: 0, tags: [], subtasks: [], repeat: '', done: false, doneAt: null, createdAt: Date.now(), ...o });
  return {
    lists: [
      { id: personal, name: 'Personal', emoji: '🏠', color: '#2FB36E' },
      { id: trabajo, name: 'Trabajo', emoji: '💼', color: '#4F6BED' },
      { id: compras, name: 'Compras', emoji: '🛒', color: '#F5A524' },
    ],
    tasks: [
      mk('Bienvenido 👋 Toca una tarea para ver sus detalles', { notes: 'Escribe en la barra de arriba. Puedes usar palabras como "mañana", "viernes 3pm", "#etiqueta", "!alta" o "^Trabajo".' }),
      mk('Revisar el informe semanal', { listId: trabajo, due: t, time: '10:00', priority: 3, tags: ['oficina'] }),
      mk('Llamar al veterinario', { listId: personal, due: addDays(t, 1), priority: 2 }),
      mk('Mercado de la semana', { listId: compras, due: addDays(t, 2), subtasks: [{ id: uid(), title: 'Huevos', done: false }, { id: uid(), title: 'Café', done: true }, { id: uid(), title: 'Frutas', done: false }] }),
      mk('Pagar servicios', { listId: personal, due: addDays(t, -1), priority: 3, repeat: 'monthly' }),
      mk('Ejercicio 30 min', { listId: personal, due: t, repeat: 'daily', priority: 1 }),
    ],
    habits: [
      { id: uid(), name: 'Tomar 2 litros de agua', emoji: '💧', color: '#4C8DF6', log: {} },
      { id: uid(), name: 'Leer 20 minutos', emoji: '📖', color: '#7C5CFC', log: {} },
    ],
    focusLog: {},
    settings: {
      name: '', accent: '#4F6BED', theme: 'auto', weekStart: 1, defaultList: null,
      smart: { today: true, tomorrow: true, week: true, inbox: true, all: true, done: true },
      tools: { calendar: true, matrix: true, habits: true, focus: true },
      pomo: 25, shortBreak: 5, longBreak: 15, showHint: true, notify: false, sound: true,
    },
  };
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return seed();
    const d = JSON.parse(raw); const s = seed();
    d.settings = { ...s.settings, ...d.settings, smart: { ...s.settings.smart, ...(d.settings?.smart || {}) }, tools: { ...s.settings.tools, ...(d.settings?.tools || {}) } };
    d.lists ||= []; d.tasks ||= []; d.habits ||= []; d.focusLog ||= {};
    return d;
  } catch (e) { console.warn('Datos dañados, se reinicia', e); return seed(); }
}
let db = load();
let saveTimer = null;
function save() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try { localStorage.setItem(KEY, JSON.stringify(db)); }
    catch (e) { if (!save.warned) { save.warned = true; toast('Este navegador no deja guardar: los cambios se perderán al cerrar'); } }
  }, 150);
}

// ---------- Estado de la interfaz ----------
const ui = {
  view: { type: 'smart', id: 'today' },
  sel: null,                 // tarea abierta en el panel
  closed: { done: true },    // grupos plegados
  sort: 'date',              // date | priority | title
  calMonth: today().slice(0, 7),
  calDay: today(),
  search: '',
};

const listById = (id) => db.lists.find((l) => l.id === id);
const taskById = (id) => db.tasks.find((t) => t.id === id);

// ---------- Escritura rápida en lenguaje natural ----------
// "Llamar a Ana mañana 3pm #clientes !alta ^Trabajo cada semana"
function parseQuick(text, base = {}) {
  let s = ' ' + text + ' ';
  const out = { due: base.due ?? null, time: null, priority: base.priority ?? 0, tags: [], listId: base.listId ?? null, repeat: '' };
  const take = (re, fn) => { s = s.replace(re, (...m) => { fn(...m); return ' '; }); };
  const t = today();

  take(/\s!(alta|media|baja|[123])(?=\s)/i, (_, p) => { out.priority = { alta: 3, media: 2, baja: 1, 1: 1, 2: 2, 3: 3 }[p.toLowerCase()]; });
  take(/\s#([\p{L}\p{N}_-]+)/gu, (_, tg) => { out.tags.push(tg.toLowerCase()); });
  take(/\s\^([\p{L}\p{N}_-]+)/u, (_, ln) => {
    const l = db.lists.find((x) => x.name.toLowerCase().replace(/\s+/g, '') .startsWith(ln.toLowerCase()));
    if (l) out.listId = l.id;
  });
  take(/\s(cada d[ií]a|diariamente|todos los d[ií]as)(?=\s)/i, () => { out.repeat = 'daily'; });
  take(/\s(cada semana|semanalmente)(?=\s)/i, () => { out.repeat = 'weekly'; });
  take(/\s(cada mes|mensualmente)(?=\s)/i, () => { out.repeat = 'monthly'; });
  take(/\s(cada año|anualmente)(?=\s)/i, () => { out.repeat = 'yearly'; });
  take(/\s(d[ií]as h[aá]biles|entre semana)(?=\s)/i, () => { out.repeat = 'weekdays'; });
  // Hora: 3pm, 3:30pm, 15:30, a las 3, a las 9am
  take(/\s(?:a las\s)?(\d{1,2})(?::(\d{2}))?\s?(am|pm|a\.m\.|p\.m\.)(?=\s)/i, (_, h, m, ap) => {
    h = +h; const pm = ap.toLowerCase().startsWith('p');
    if (pm && h < 12) h += 12; if (!pm && h === 12) h = 0;
    out.time = `${pad(h)}:${m || '00'}`;
  });
  take(/\s(?:a las\s)?([01]?\d|2[0-3]):([0-5]\d)(?=\s)/, (_, h, m) => { out.time = `${pad(+h)}:${m}`; });
  take(/\sa las (\d{1,2})(?=\s)/i, (_, h) => { h = +h; if (h < 7) h += 12; out.time = `${pad(h)}:00`; });
  // Fecha
  take(/\spasado mañana(?=\s)/i, () => { out.due = addDays(t, 2); });
  take(/\smañana(?=\s)/i, () => { out.due = addDays(t, 1); });
  take(/\shoy(?=\s)/i, () => { out.due = t; });
  take(/\s(?:el\s|este\s|próximo\s|proximo\s)?(lunes|martes|mi[eé]rcoles|jueves|viernes|s[aá]bado|domingo)(?=\s)/i, (_, d) => {
    const norm = d.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    const idx = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'].indexOf(norm);
    let n = (idx - new Date().getDay() + 7) % 7; if (n === 0) n = 7;
    out.due = addDays(t, n);
  });
  take(/\sen (\d{1,3}) d[ií]as(?=\s)/i, (_, n) => { out.due = addDays(t, +n); });
  take(/\s(?:la\s)?pr[oó]xima semana(?=\s)/i, () => { out.due = addDays(t, 7); });
  take(/\s(?:el\s)?(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?(?=\s)/, (_, d, m, y) => {
    const now = new Date(); let yy = y ? +y : now.getFullYear(); if (yy < 100) yy += 2000;
    let cand = `${yy}-${pad(+m)}-${pad(+d)}`;
    if (!y && cand < t) cand = `${yy + 1}-${pad(+m)}-${pad(+d)}`;
    out.due = cand;
  });
  take(/\s(?:el\s)?(\d{1,2}) de (enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|setiembre|octubre|noviembre|diciembre)(?=\s)/i, (_, d, mes) => {
    const mi = mes.toLowerCase() === 'setiembre' ? 8 : MESES.indexOf(mes.toLowerCase());
    const yy = new Date().getFullYear(); let cand = `${yy}-${pad(mi + 1)}-${pad(+d)}`;
    if (cand < t) cand = `${yy + 1}-${pad(mi + 1)}-${pad(+d)}`;
    out.due = cand;
  });
  if ((out.time || out.repeat) && !out.due) out.due = t;
  out.title = s.replace(/\s+/g, ' ').trim();
  return out;
}

function addTask(text, base = {}) {
  const p = parseQuick(text, base);
  if (!p.title) return null;
  const task = {
    id: uid(), title: p.title, notes: '', listId: p.listId ?? db.settings.defaultList ?? null,
    due: p.due, time: p.time, priority: p.priority, tags: p.tags, subtasks: [], repeat: p.repeat,
    done: false, doneAt: null, createdAt: Date.now(),
  };
  if (task.listId && !listById(task.listId)) task.listId = null;
  db.tasks.push(task); save();
  return task;
}

function nextDue(due, rep) {
  switch (rep) {
    case 'daily': return addDays(due, 1);
    case 'weekly': return addDays(due, 7);
    case 'monthly': return addMonths(due, 1);
    case 'yearly': return addMonths(due, 12);
    case 'weekdays': { let d = addDays(due, 1); while ([0, 6].includes(parseYmd(d).getDay())) d = addDays(d, 1); return d; }
    default: return null;
  }
}

function toggleDone(id) {
  const t = taskById(id); if (!t) return;
  if (!t.done && t.repeat && t.due) {
    // Tarea que se repite: se guarda una copia completada y la original pasa a la siguiente fecha.
    db.tasks.push({ ...t, id: uid(), done: true, doneAt: Date.now(), repeat: '', subtasks: t.subtasks.map((s) => ({ ...s })) });
    let n = nextDue(t.due, t.repeat);
    while (n < today() && t.repeat !== 'yearly') n = nextDue(n, t.repeat); // si estaba atrasada, salta a la próxima vigente
    t.due = n; t.subtasks.forEach((s) => { s.done = false; }); t.notified = false;
    toast(`Repetida → ${fmtDate(n)}`);
  } else {
    t.done = !t.done; t.doneAt = t.done ? Date.now() : null;
    if (t.done) toast('Tarea completada', () => { t.done = false; t.doneAt = null; save(); render(); });
  }
  save(); render();
}

function deleteTask(id) {
  const i = db.tasks.findIndex((t) => t.id === id); if (i < 0) return;
  const [t] = db.tasks.splice(i, 1);
  if (ui.sel === id) ui.sel = null;
  save(); render();
  toast('Tarea eliminada', () => { db.tasks.splice(i, 0, t); save(); render(); });
}

// ---------- Fechas legibles ----------
function fmtDate(s) {
  if (!s) return '';
  const n = diffDays(today(), s);
  if (n === 0) return 'Hoy';
  if (n === 1) return 'Mañana';
  if (n === -1) return 'Ayer';
  const d = parseYmd(s);
  if (n > 1 && n < 7) return cap(DIAS[d.getDay()]);
  const sameYear = d.getFullYear() === new Date().getFullYear();
  return `${d.getDate()} ${MESES[d.getMonth()].slice(0, 3)}${sameYear ? '' : ' ' + d.getFullYear()}`;
}
function fmtLong(s) {
  const d = parseYmd(s);
  return `${cap(DIAS[d.getDay()])} ${d.getDate()} de ${MESES[d.getMonth()]}`;
}

// ---------- Selección de tareas por vista ----------
function sortTasks(arr) {
  const by = ui.sort;
  return arr.sort((a, b) => {
    if (by === 'priority' && b.priority !== a.priority) return b.priority - a.priority;
    if (by === 'title') return a.title.localeCompare(b.title, 'es');
    const da = (a.due || '9999') + (a.time || '99'), dbb = (b.due || '9999') + (b.time || '99');
    if (da !== dbb) return da < dbb ? -1 : 1;
    if (b.priority !== a.priority) return b.priority - a.priority;
    return a.createdAt - b.createdAt;
  });
}

function viewTasks(v = ui.view) {
  const t = today(); const all = db.tasks;
  const open = all.filter((x) => !x.done);
  const q = ui.search.trim().toLowerCase();
  if (q) return all.filter((x) => (x.title + ' ' + x.notes + ' ' + x.tags.join(' ')).toLowerCase().includes(q));
  if (v.type === 'list') return all.filter((x) => x.listId === v.id);
  if (v.type === 'tag') return all.filter((x) => x.tags.includes(v.id));
  switch (v.id) {
    case 'today': return all.filter((x) => x.due && (x.done ? x.due === t : x.due <= t));
    case 'tomorrow': return all.filter((x) => x.due === addDays(t, 1));
    case 'week': return all.filter((x) => x.due && (x.done ? x.due >= t && x.due <= addDays(t, 6) : x.due <= addDays(t, 6)));
    case 'inbox': return all.filter((x) => !x.listId);
    case 'all': return open;
    case 'done': return all.filter((x) => x.done);
    default: return [];
  }
}
const countOpen = (v) => viewTasks(v).filter((x) => !x.done).length;

function groupTasks(tasks) {
  const t = today(); const v = ui.view;
  const open = sortTasks(tasks.filter((x) => !x.done));
  const done = tasks.filter((x) => x.done).sort((a, b) => (b.doneAt || 0) - (a.doneAt || 0));
  const groups = [];
  const push = (key, name, items, cls = '') => { if (items.length) groups.push({ key, name, items, cls }); };
  if (v.type === 'smart' && v.id === 'done') {
    const byDay = {};
    done.forEach((x) => { const k = x.doneAt ? ymd(new Date(x.doneAt)) : 'sin'; (byDay[k] ||= []).push(x); });
    Object.keys(byDay).sort().reverse().forEach((k) => push('d' + k, k === 'sin' ? 'Sin fecha' : fmtLong(k), byDay[k]));
    return groups;
  }
  if (ui.sort === 'priority') {
    PRIOS.forEach((p) => push('p' + p.v, 'Prioridad ' + p.name.toLowerCase(), open.filter((x) => x.priority === p.v)));
  } else if (v.type === 'smart' && v.id === 'week' && ui.sort === 'date') {
    push('late', 'Vencidas', open.filter((x) => x.due < t), 'red');
    for (let i = 0; i < 7; i++) { const d = addDays(t, i); push(d, i === 0 ? 'Hoy' : i === 1 ? 'Mañana' : fmtLong(d), open.filter((x) => x.due === d)); }
  } else if (ui.sort === 'date') {
    push('late', 'Vencidas', open.filter((x) => x.due && x.due < t), 'red');
    push('today', 'Hoy', open.filter((x) => x.due === t));
    push('tom', 'Mañana', open.filter((x) => x.due === addDays(t, 1)));
    push('next', 'Próximos 7 días', open.filter((x) => x.due > addDays(t, 1) && x.due <= addDays(t, 7)));
    push('later', 'Más adelante', open.filter((x) => x.due > addDays(t, 7)));
    push('none', 'Sin fecha', open.filter((x) => !x.due));
  } else {
    push('open', 'Pendientes', open);
  }
  push('done', 'Completadas', done);
  return groups;
}

// ---------- Render: barra lateral ----------
function navItem(v, label, ico, count, extra = '') {
  const on = !ui.search && ui.view.type === v.type && ui.view.id === v.id;
  return `<button class="nav-item${on ? ' on' : ''}" data-act="nav" data-type="${v.type}" data-id="${esc(v.id)}" ${extra}>
    ${ico}<span class="name">${esc(label)}</span>${count ? `<span class="count">${count}</span>` : ''}</button>`;
}

function renderSidebar() {
  const s = db.settings;
  const tags = [...new Set(db.tasks.flatMap((x) => x.tags))].sort();
  const hello = s.name ? `Hola, ${esc(s.name)}` : 'Mis Tareas';
  $('#sidebar').innerHTML = `
    <div class="side-head"><span class="logo">${icon('check')}</span><div><b>${hello}</b><small>${cap(fmtLong(today()))}</small></div></div>
    <div class="quick" style="box-shadow:none;margin:0 2px 6px">${icon('search')}<input id="search" placeholder="Buscar" value="${esc(ui.search)}"></div>
    <div class="nav-sec">
      ${SMART.filter((x) => s.smart[x.id]).map((x) => navItem({ type: 'smart', id: x.id }, x.name, icon(x.icon), x.id === 'done' ? '' : countOpen({ type: 'smart', id: x.id }) || '')).join('')}
    </div>
    <div class="nav-sec">
      <div class="nav-title">Listas <button data-act="new-list" title="Nueva lista">${icon('plus', 'ico')}</button></div>
      ${db.lists.map((l) => navItem({ type: 'list', id: l.id }, l.name, l.emoji ? `<span class="emo">${esc(l.emoji)}</span>` : `<span class="dot" style="background:${esc(l.color)}"></span>`, countOpen({ type: 'list', id: l.id }) || '', 'data-drop="list"')).join('')}
    </div>
    ${tags.length ? `<div class="nav-sec"><div class="nav-title">Etiquetas</div>
      ${tags.map((tg) => navItem({ type: 'tag', id: tg }, '#' + tg, icon('tag'), countOpen({ type: 'tag', id: tg }) || '')).join('')}</div>` : ''}
    <div class="nav-sec">
      <div class="nav-title">Herramientas</div>
      ${TOOLS.filter((x) => s.tools[x.id]).map((x) => navItem({ type: 'tool', id: x.id }, x.name, icon(x.icon), x.id === 'focus' && timer.running ? fmtClock(timer.left()) : '')).join('')}
      ${navItem({ type: 'tool', id: 'settings' }, 'Personalizar', icon('gear'))}
    </div>`;
}

// ---------- Render: tarea ----------
function taskRow(x, opts = {}) {
  const t = today(); const l = listById(x.listId);
  const meta = [];
  if (x.due) {
    const cls = !x.done && x.due < t ? 'late' : x.due === t ? 'today' : '';
    meta.push(`<span class="${cls}">${icon('cal')}${fmtDate(x.due)}${x.time ? ' ' + x.time : ''}</span>`);
  }
  if (x.repeat) meta.push(`<span title="${REPEATS[x.repeat]}">${icon('repeat')}</span>`);
  if (x.subtasks.length) meta.push(`<span>${icon('sub')}${x.subtasks.filter((s) => s.done).length}/${x.subtasks.length}</span>`);
  if (x.notes) meta.push(`<span>${icon('note')}</span>`);
  x.tags.forEach((tg) => meta.push(`<span class="tag">#${esc(tg)}</span>`));
  if (l && !opts.hideList && !(ui.view.type === 'list' && !ui.search)) meta.push(`<span>${l.emoji ? esc(l.emoji) : ''} ${esc(l.name)}</span>`);
  return `<div class="task p${x.priority}${x.done ? ' done' : ''}${ui.sel === x.id ? ' sel' : ''}" data-act="open" data-id="${x.id}" draggable="true">
    <button class="check" data-act="toggle" data-id="${x.id}" aria-label="Completar">${icon('check', '')}</button>
    <div class="t-body"><div class="t-title">${esc(x.title)}</div>${meta.length ? `<div class="t-meta">${meta.join('')}</div>` : ''}</div>
  </div>`;
}

function viewTitle() {
  if (ui.search) return { title: `Buscar “${esc(ui.search)}”`, ico: icon('search') };
  const v = ui.view;
  if (v.type === 'list') { const l = listById(v.id); return { title: esc(l?.name || 'Lista'), ico: l?.emoji ? esc(l.emoji) : '' }; }
  if (v.type === 'tag') return { title: '#' + esc(v.id), ico: '' };
  const s = SMART.find((x) => x.id === v.id); return { title: s ? s.name : '', ico: '' };
}

function quickBar(placeholder) {
  return `<form class="quick" data-form="quick"><span class="plus">${icon('plus')}</span>
    <input name="q" autocomplete="off" placeholder="${esc(placeholder)}" enterkeyhint="done"></form>
    ${db.settings.showHint ? `<div class="hint">Atajos: <code>mañana 3pm</code> <code>viernes</code> <code>15/12</code> <code>#etiqueta</code> <code>!alta</code> <code>^lista</code> <code>cada semana</code></div>` : '<div style="height:12px"></div>'}`;
}

// ---------- Render: vistas ----------
function renderListView() {
  const { title, ico } = viewTitle();
  const v = ui.view; const tasks = viewTasks();
  const groups = groupTasks(tasks);
  const canAdd = !(v.type === 'smart' && v.id === 'done') && !ui.search;
  const sub = v.type === 'smart' && v.id === 'today' ? `<span class="sub">${fmtLong(today())}</span>` : '';
  return `
    <div class="head">
      <button class="icon-btn menu-btn" data-act="open-sidebar">${icon('menu')}</button>
      <h1>${ico} ${title} ${sub}</h1>
      <div class="seg">
        ${[['date', 'Fecha'], ['priority', 'Prioridad'], ['title', 'A-Z']].map(([k, n]) => `<button class="${ui.sort === k ? 'on' : ''}" data-act="sort" data-v="${k}">${n}</button>`).join('')}
      </div>
      ${v.type === 'list' ? `<button class="icon-btn" data-act="edit-lists" title="Editar lista">${icon('gear')}</button>` : ''}
    </div>
    ${canAdd ? quickBar(addPlaceholder()) : ''}
    ${groups.length ? groups.map((g) => `
      <div class="group">
        <button class="group-h ${g.cls}${ui.closed[g.key] ? ' closed' : ''}" data-act="fold" data-k="${g.key}">${icon('chev')}${esc(g.name)} <span class="n">${g.items.length}</span></button>
        ${ui.closed[g.key] ? '' : `<div class="tasks">${g.items.map((x) => taskRow(x)).join('')}</div>`}
      </div>`).join('') : `<div class="empty"><div class="big">${ui.search ? '🔍' : '🎉'}</div>${ui.search ? 'Nada coincide con la búsqueda' : 'No hay tareas aquí. ¡Disfruta!'}</div>`}`;
}
function addPlaceholder() {
  const v = ui.view;
  if (v.type === 'smart' && v.id === 'today') return 'Agregar tarea para hoy…';
  if (v.type === 'smart' && v.id === 'tomorrow') return 'Agregar tarea para mañana…';
  if (v.type === 'list') return `Agregar tarea a “${listById(v.id)?.name || ''}”…`;
  return 'Agregar tarea…';
}
function viewDefaults() {
  const v = ui.view; const t = today();
  if (v.type === 'list') return { listId: v.id };
  if (v.type === 'smart' && (v.id === 'today' || v.id === 'week')) return { due: t };
  if (v.type === 'smart' && v.id === 'tomorrow') return { due: addDays(t, 1) };
  return {};
}

function renderCalendar() {
  const [y, m] = ui.calMonth.split('-').map(Number);
  const first = new Date(y, m - 1, 1);
  const ws = db.settings.weekStart;
  const offset = (first.getDay() - ws + 7) % 7;
  const start = ymd(new Date(y, m - 1, 1 - offset));
  const t = today();
  const byDay = {};
  db.tasks.forEach((x) => { if (x.due) (byDay[x.due] ||= []).push(x); });
  const cells = [];
  const weeks = Math.ceil((offset + new Date(y, m, 0).getDate()) / 7);
  for (let i = 0; i < weeks * 7; i++) {
    const d = addDays(start, i); const list = sortTasks(byDay[d] || []);
    const shown = list.slice(0, 3);
    cells.push(`<div class="cal-d${d.slice(0, 7) !== ui.calMonth ? ' out' : ''}${d === t ? ' today' : ''}${d === ui.calDay ? ' sel' : ''}" data-act="cal-day" data-d="${d}">
      <div class="num">${parseYmd(d).getDate()}</div>
      ${shown.map((x) => `<div class="ev${x.done ? ' done' : ''}" style="--lc:${esc(listById(x.listId)?.color || 'var(--accent)')}">${esc(x.title)}</div>`).join('')}
      ${list.length > 3 ? `<div class="more">+${list.length - 3} más</div>` : ''}
    </div>`);
  }
  const heads = Array.from({ length: 7 }, (_, i) => `<div>${DIAS_C[(i + ws) % 7]}</div>`).join('');
  const dayTasks = sortTasks((byDay[ui.calDay] || []).slice());
  return `
    <div class="head">
      <button class="icon-btn menu-btn" data-act="open-sidebar">${icon('menu')}</button>
      <h1>${cap(MESES[m - 1])} <span class="sub">${y}</span></h1>
      <button class="chip-btn" data-act="cal-today">Hoy</button>
      <button class="icon-btn" data-act="cal-move" data-n="-1">${icon('left')}</button>
      <button class="icon-btn" data-act="cal-move" data-n="1">${icon('right')}</button>
    </div>
    <div class="cal"><div class="cal-w">${heads}</div><div class="cal-g">${cells.join('')}</div></div>
    <div class="cal-day">
      <h3>${fmtLong(ui.calDay)}</h3>
      <form class="quick" data-form="quick" data-due="${ui.calDay}"><span class="plus">${icon('plus')}</span><input name="q" autocomplete="off" placeholder="Agregar tarea para este día…"></form>
      ${dayTasks.length ? `<div class="tasks" style="margin-top:10px">${dayTasks.map((x) => taskRow(x)).join('')}</div>` : '<div class="empty" style="padding:24px">Sin tareas este día</div>'}
    </div>`;
}

function renderMatrix() {
  const Q = [
    { p: 3, name: 'Urgente e importante', hint: 'Hazlo ya' },
    { p: 2, name: 'Importante, no urgente', hint: 'Planéalo' },
    { p: 1, name: 'Urgente, no importante', hint: 'Delégalo' },
    { p: 0, name: 'Ni urgente ni importante', hint: 'Elimínalo' },
  ];
  const open = db.tasks.filter((x) => !x.done);
  return `
    <div class="head"><button class="icon-btn menu-btn" data-act="open-sidebar">${icon('menu')}</button><h1>Matriz de prioridades <span class="sub">arrastra para cambiar</span></h1></div>
    <div class="matrix">
      ${Q.map((q) => { const items = sortTasks(open.filter((x) => x.priority === q.p)); return `
        <div class="quad p${q.p}" data-drop="quad" data-p="${q.p}">
          <h3>${q.name} <small>${q.hint} · ${items.length}</small></h3>
          <div class="tasks">${items.map((x) => taskRow(x)).join('')}</div>
          <form data-form="quick" data-prio="${q.p}"><input name="q" autocomplete="off" placeholder="+ Agregar"></form>
        </div>`; }).join('')}
    </div>`;
}

function habitStreak(h) {
  let n = 0; let d = today();
  if (!h.log[d]) d = addDays(d, -1);
  while (h.log[d]) { n++; d = addDays(d, -1); }
  return n;
}
function renderHabits() {
  const t = today();
  const days = Array.from({ length: 7 }, (_, i) => addDays(t, i - 6));
  return `
    <div class="head"><button class="icon-btn menu-btn" data-act="open-sidebar">${icon('menu')}</button><h1>Hábitos</h1></div>
    ${db.habits.map((h) => {
      const total = Object.keys(h.log).length; const st = habitStreak(h);
      return `<div class="habit" style="--hc:${esc(h.color)}">
        <div class="emo">${esc(h.emoji || '⭐')}</div>
        <div class="info"><b>${esc(h.name)}</b><small>${st ? `🔥 ${st} día${st > 1 ? 's' : ''} seguidos · ` : ''}${total} en total</small></div>
        <div class="week">${days.map((d) => `<div class="wd">${DIAS_C[parseYmd(d).getDay()].slice(0, 2)}<button class="${h.log[d] ? 'on' : ''}" data-act="habit" data-id="${h.id}" data-d="${d}" title="${fmtLong(d)}">${h.log[d] ? icon('check', '') : ''}</button></div>`).join('')}</div>
        <button class="icon-btn" data-act="del-habit" data-id="${h.id}" title="Eliminar hábito">${icon('trash')}</button>
      </div>`; }).join('') || '<div class="empty">Aún no tienes hábitos</div>'}
    <form class="card add-row" data-form="habit">
      <input class="inp" name="emoji" placeholder="😀" style="flex:0 0 60px;min-width:0;text-align:center" maxlength="4">
      <input class="inp" name="name" placeholder="Nuevo hábito (ej. Meditar 10 min)" required>
      <input type="color" name="color" value="${db.settings.accent}">
      <button class="btn primary">${icon('plus')}Agregar</button>
    </form>`;
}

// ---------- Pomodoro ----------
const timer = {
  mode: 'pomo', running: false, endAt: 0, remaining: null, taskId: null, count: 0, tick: null,
  dur() { const s = db.settings; return (this.mode === 'pomo' ? s.pomo : this.mode === 'short' ? s.shortBreak : s.longBreak) * 60; },
  left() { return this.running ? Math.max(0, Math.round((this.endAt - Date.now()) / 1000)) : (this.remaining ?? this.dur()); },
  start() { this.endAt = Date.now() + this.left() * 1000; this.running = true; this.loop(); },
  pause() { this.remaining = this.left(); this.running = false; clearInterval(this.tick); },
  reset() { this.running = false; this.remaining = null; clearInterval(this.tick); },
  setMode(m) { this.reset(); this.mode = m; },
  loop() {
    clearInterval(this.tick);
    this.tick = setInterval(() => {
      if (this.left() <= 0) return this.finish();
      if (ui.view.id === 'focus') updateRing(); else if (Date.now() % 60000 < 1000) renderSidebar();
    }, 1000);
  },
  finish() {
    clearInterval(this.tick); this.running = false; this.remaining = null;
    beep();
    if (this.mode === 'pomo') {
      const t = today(); db.focusLog[t] = (db.focusLog[t] || 0) + 1; save();
      this.count++;
      notify('🍅 ¡Pomodoro terminado!', 'Tómate un descanso.');
      this.mode = this.count % 4 === 0 ? 'long' : 'short';
    } else {
      notify('⏰ Descanso terminado', 'A enfocarse de nuevo.');
      this.mode = 'pomo';
    }
    render();
  },
};
const fmtClock = (sec) => `${pad(Math.floor(sec / 60))}:${pad(sec % 60)}`;
function updateRing() {
  const el = $('#ringTime'); if (!el) return;
  const left = timer.left(); el.textContent = fmtClock(left);
  const fg = $('#ringFg'); const C = 2 * Math.PI * 120;
  fg.style.strokeDashoffset = String(C * (1 - left / timer.dur()));
  document.title = timer.running ? `${fmtClock(left)} · Mis Tareas` : 'Mis Tareas';
}
function renderFocus() {
  const C = 2 * Math.PI * 120; const left = timer.left();
  const t = today(); const todayN = db.focusLog[t] || 0;
  const weekN = Array.from({ length: 7 }, (_, i) => db.focusLog[addDays(t, -i)] || 0).reduce((a, b) => a + b, 0);
  const totalN = Object.values(db.focusLog).reduce((a, b) => a + b, 0);
  const open = sortTasks(db.tasks.filter((x) => !x.done));
  return `
    <div class="head"><button class="icon-btn menu-btn" data-act="open-sidebar">${icon('menu')}</button><h1>Pomodoro</h1></div>
    <div class="focus">
      <div class="seg">
        ${[['pomo', 'Enfoque'], ['short', 'Descanso corto'], ['long', 'Descanso largo']].map(([k, n]) => `<button class="${timer.mode === k ? 'on' : ''}" data-act="pomo-mode" data-v="${k}">${n}</button>`).join('')}
      </div>
      <div class="ring">
        <svg viewBox="0 0 260 260"><circle class="bg" cx="130" cy="130" r="120"/><circle class="fg" id="ringFg" cx="130" cy="130" r="120" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - left / timer.dur())}"/></svg>
        <div class="time"><b id="ringTime">${fmtClock(left)}</b><small>${timer.mode === 'pomo' ? 'Enfoque' : 'Descanso'}</small></div>
      </div>
      <select class="inp" data-change="pomo-task" style="max-width:340px">
        <option value="">— Enfocarme en… (opcional) —</option>
        ${open.map((x) => `<option value="${x.id}" ${timer.taskId === x.id ? 'selected' : ''}>${esc(x.title)}</option>`).join('')}
      </select>
      <div class="actions">
        <button class="btn primary" data-act="pomo-toggle">${timer.running ? icon('pause') + 'Pausar' : icon('play') + 'Iniciar'}</button>
        <button class="btn" data-act="pomo-reset">${icon('reset')}Reiniciar</button>
        ${timer.taskId ? `<button class="btn" data-act="toggle" data-id="${timer.taskId}">${icon('check')}Completar tarea</button>` : ''}
      </div>
      <div class="stats"><div><b>${todayN}</b><small>Hoy</small></div><div><b>${weekN}</b><small>7 días</small></div><div><b>${totalN}</b><small>Total</small></div></div>
    </div>`;
}

// ---------- Personalizar ----------
function renderSettings() {
  const s = db.settings;
  return `
    <div class="head"><button class="icon-btn menu-btn" data-act="open-sidebar">${icon('menu')}</button><h1>Personalizar</h1></div>
    <div class="card">
      <h3>Tú y la apariencia</h3>
      <div class="field"><label>Tu nombre</label><input data-set="name" value="${esc(s.name)}" placeholder="Para saludarte"></div>
      <div class="field"><label>Color de acento</label><div class="swatches">
        ${ACCENTS.map((c) => `<button class="sw${s.accent.toLowerCase() === c.toLowerCase() ? ' on' : ''}" style="--c:${c}" data-act="accent" data-v="${c}" aria-label="${c}"></button>`).join('')}
        <input type="color" data-set="accent" value="${esc(s.accent)}" title="Otro color"></div></div>
      <div class="field"><label>Tema</label><div class="seg">
        ${[['auto', 'Automático'], ['light', 'Claro'], ['dark', 'Oscuro']].map(([k, n]) => `<button class="${s.theme === k ? 'on' : ''}" data-act="theme" data-v="${k}">${n}</button>`).join('')}</div></div>
      <div class="field"><label>La semana empieza</label><div class="seg">
        ${[[1, 'Lunes'], [0, 'Domingo']].map(([k, n]) => `<button class="${s.weekStart === k ? 'on' : ''}" data-act="week-start" data-v="${k}">${n}</button>`).join('')}</div></div>
      <label class="toggle"><input type="checkbox" data-set="showHint" ${s.showHint ? 'checked' : ''}> Mostrar ayuda de atajos debajo de la barra de tareas</label>
    </div>
    <div class="card">
      <h3>Menú lateral</h3>
      ${SMART.map((x) => `<label class="toggle"><input type="checkbox" data-set="smart.${x.id}" ${s.smart[x.id] ? 'checked' : ''}> ${x.name}</label>`).join('')}
      ${TOOLS.map((x) => `<label class="toggle"><input type="checkbox" data-set="tools.${x.id}" ${s.tools[x.id] ? 'checked' : ''}> ${x.name}</label>`).join('')}
    </div>
    <div class="card" id="listsCard">
      <h3>Listas</h3>
      ${db.lists.map((l) => `<div class="list-edit">
        <input class="inp emo-inp" data-list="${l.id}" data-k="emoji" value="${esc(l.emoji)}" maxlength="4">
        <input class="inp" type="text" data-list="${l.id}" data-k="name" value="${esc(l.name)}">
        <input type="color" data-list="${l.id}" data-k="color" value="${esc(l.color)}">
        <button class="icon-btn" data-act="del-list" data-id="${l.id}" title="Eliminar lista">${icon('trash')}</button></div>`).join('')}
      <button class="btn" data-act="new-list" style="margin-top:6px">${icon('plus')}Nueva lista</button>
      <div class="field" style="margin-top:10px"><label>Lista por defecto</label><select data-set="defaultList">
        <option value="">Bandeja de entrada</option>${db.lists.map((l) => `<option value="${l.id}" ${s.defaultList === l.id ? 'selected' : ''}>${esc(l.name)}</option>`).join('')}</select></div>
    </div>
    <div class="card">
      <h3>Pomodoro y recordatorios</h3>
      <div class="field"><label>Enfoque (min)</label><input type="number" min="1" max="180" data-set="pomo" value="${s.pomo}"></div>
      <div class="field"><label>Descanso corto (min)</label><input type="number" min="1" max="60" data-set="shortBreak" value="${s.shortBreak}"></div>
      <div class="field"><label>Descanso largo (min)</label><input type="number" min="1" max="90" data-set="longBreak" value="${s.longBreak}"></div>
      <label class="toggle"><input type="checkbox" data-set="sound" ${s.sound ? 'checked' : ''}> Sonido al terminar</label>
      <label class="toggle"><input type="checkbox" data-set="notify" ${s.notify ? 'checked' : ''}> Avisos del sistema a la hora de cada tarea (con la app abierta)</label>
    </div>
    <div class="card">
      <h3>Tus datos</h3>
      <p style="margin:0 0 10px;color:var(--ink-soft);font-size:13px">Todo se guarda solo en este dispositivo. Descarga una copia para pasarla a otro equipo.</p>
      <div class="add-row">
        <button class="btn" data-act="export">Descargar copia</button>
        <label class="btn" style="cursor:pointer">Cargar copia<input type="file" accept="application/json" data-change="import" hidden></label>
        <button class="btn danger" data-act="reset-all">Borrar todo</button>
      </div>
    </div>`;
}

// ---------- Panel de detalle ----------
function renderDetail() {
  const el = $('#detail');
  const x = ui.sel && taskById(ui.sel);
  if (!x) { el.hidden = true; el.innerHTML = ''; return; }
  el.hidden = false;
  el.innerHTML = `
    <div class="d-top">
      <button class="check p${x.priority}${x.done ? '' : ''}" style="${x.done ? 'background:var(--ink-soft);border-color:var(--ink-soft)' : ''}" data-act="toggle" data-id="${x.id}">${icon('check', '')}</button>
      <span class="sp"></span>
      <button class="icon-btn" data-act="delete" data-id="${x.id}" title="Eliminar">${icon('trash')}</button>
      <button class="icon-btn" data-act="close-detail" title="Cerrar">${icon('x')}</button>
    </div>
    <textarea class="d-title" rows="1" data-field="title">${esc(x.title)}</textarea>
    <div class="field"><label>Fecha</label><div class="row2"><input type="date" data-field="due" value="${x.due || ''}"><input type="time" data-field="time" value="${x.time || ''}" ></div></div>
    <div class="field"><label>Repetir</label><select data-field="repeat">${Object.entries(REPEATS).map(([k, n]) => `<option value="${k}" ${x.repeat === k ? 'selected' : ''}>${n}</option>`).join('')}</select></div>
    <div class="field"><label>Prioridad</label><div class="seg">${PRIOS.map((p) => `<button class="p${p.v}${x.priority === p.v ? ' on' : ''}" data-act="prio" data-v="${p.v}"><span class="flag"></span>${p.name}</button>`).join('')}</div></div>
    <div class="field"><label>Lista</label><select data-field="listId"><option value="">📥 Bandeja de entrada</option>${db.lists.map((l) => `<option value="${l.id}" ${x.listId === l.id ? 'selected' : ''}>${esc(l.emoji)} ${esc(l.name)}</option>`).join('')}</select></div>
    <div class="field"><label>Etiquetas</label><input data-field="tags" value="${esc(x.tags.join(', '))}" placeholder="separadas por coma"></div>
    <div class="d-sec">
      <h4>Subtareas ${x.subtasks.length ? `(${x.subtasks.filter((s) => s.done).length}/${x.subtasks.length})` : ''}</h4>
      ${x.subtasks.map((s) => `<div class="sub${s.done ? ' done' : ''}">
        <button class="check" style="${s.done ? 'background:var(--ink-soft);border-color:var(--ink-soft)' : ''}" data-act="sub-toggle" data-s="${s.id}">${icon('check', '')}</button>
        <input value="${esc(s.title)}" data-sub="${s.id}"><button class="x" data-act="sub-del" data-s="${s.id}">${icon('x')}</button></div>`).join('')}
      <form class="sub" data-form="sub"><span class="plus" style="color:var(--accent)">${icon('plus')}</span><input name="q" placeholder="Agregar subtarea" autocomplete="off"></form>
    </div>
    <div class="d-sec"><h4>Notas</h4><textarea class="d-notes" data-field="notes" placeholder="Escribe detalles, enlaces, ideas…">${esc(x.notes)}</textarea></div>
    <div class="d-foot">Creada ${new Date(x.createdAt).toLocaleString('es-CO', { dateStyle: 'medium', timeStyle: 'short' })}${x.doneAt ? ` · Completada ${new Date(x.doneAt).toLocaleString('es-CO', { dateStyle: 'medium', timeStyle: 'short' })}` : ''}</div>`;
  autosize($('.d-title', el));
}
const autosize = (ta) => { if (!ta) return; ta.style.height = 'auto'; ta.style.height = ta.scrollHeight + 'px'; };

// ---------- Render principal ----------
function applyTheme() {
  const s = db.settings; const root = document.documentElement;
  const dark = s.theme === 'dark' || (s.theme === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
  root.dataset.theme = dark ? 'dark' : 'light';
  root.style.setProperty('--accent', s.accent);
  $('meta[name=theme-color]').setAttribute('content', dark ? '#1D1F23' : s.accent);
}

function render() {
  applyTheme();
  renderSidebar();
  const v = ui.view; const main = $('#main');
  const keepScroll = main.scrollTop;
  let html;
  if (ui.search) html = renderListView();
  else if (v.type === 'tool') html = { calendar: renderCalendar, matrix: renderMatrix, habits: renderHabits, focus: renderFocus, settings: renderSettings }[v.id]();
  else html = renderListView();
  main.innerHTML = html;
  main.scrollTop = keepScroll;
  renderDetail();
}

function go(v) {
  ui.view = v; ui.search = ''; $('#main').scrollTop = 0;
  $('.app').classList.remove('side-open');
  render();
}

// ---------- Diálogos propios (reemplazan prompt/confirm del navegador) ----------
function ask(msg, { input = false, value = '', ok = 'Aceptar', danger = false } = {}) {
  return new Promise((resolve) => {
    const wrap = document.createElement('div');
    wrap.className = 'dlg-wrap';
    wrap.innerHTML = `<form class="dlg" role="dialog" aria-modal="true">
      <p>${esc(msg)}</p>
      ${input ? `<input class="inp" name="v" value="${esc(value)}" autocomplete="off">` : ''}
      <div class="dlg-btns"><button type="button" class="btn" data-x>Cancelar</button>
      <button class="btn ${danger ? 'danger-fill' : 'primary'}">${esc(ok)}</button></div></form>`;
    const close = (v) => { wrap.remove(); document.removeEventListener('keydown', onKey, true); resolve(v); };
    const onKey = (e) => { if (e.key === 'Escape') { e.stopPropagation(); close(input ? null : false); } };
    document.addEventListener('keydown', onKey, true);
    wrap.addEventListener('click', (e) => { if (e.target === wrap || e.target.closest('[data-x]')) close(input ? null : false); });
    const form = wrap.querySelector('form');
    form._submit = () => close(input ? wrap.querySelector('input').value : true);
    form.addEventListener('submit', (e) => { e.preventDefault(); e.stopPropagation(); form._submit(); });
    document.body.appendChild(wrap);
    (wrap.querySelector('input') || wrap.querySelector('.btn.primary, .danger-fill')).focus();
  });
}

// ---------- Avisos ----------
let toastTimer;
function toast(msg, undo) {
  const el = $('#toast');
  el.innerHTML = `<span>${esc(msg)}</span>${undo ? '<button data-act="undo">Deshacer</button>' : ''}`;
  el.hidden = false; el._undo = undo;
  clearTimeout(toastTimer); toastTimer = setTimeout(() => { el.hidden = true; el._undo = null; }, 4000);
}
let audioCtx;
function beep() {
  if (!db.settings.sound) return;
  try {
    audioCtx ||= new (window.AudioContext || window.webkitAudioContext)();
    [0, 0.25, 0.5].forEach((d) => {
      const o = audioCtx.createOscillator(), g = audioCtx.createGain();
      o.frequency.value = 880; o.connect(g); g.connect(audioCtx.destination);
      g.gain.setValueAtTime(0.2, audioCtx.currentTime + d); g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + d + 0.2);
      o.start(audioCtx.currentTime + d); o.stop(audioCtx.currentTime + d + 0.22);
    });
  } catch (e) { /* sin audio */ }
}
function notify(title, body) {
  toast(title);
  if (db.settings.notify && 'Notification' in window && Notification.permission === 'granted') {
    try { new Notification(title, { body, icon: 'icon.svg' }); } catch (e) { /* algunos móviles no lo permiten */ }
  }
}
// Revisa cada 30 s si llegó la hora de alguna tarea.
setInterval(() => {
  if (!db.settings.notify) return;
  const now = new Date(); const d = ymd(now); const hm = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
  db.tasks.forEach((x) => {
    if (!x.done && x.due === d && x.time && x.time <= hm && !x.notified) {
      x.notified = true; save(); notify('⏰ ' + x.title, 'Es la hora de esta tarea');
    }
  });
}, 30000);

// ---------- Eventos ----------
document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-act]'); if (!el) return;
  const a = el.dataset.act; const id = el.dataset.id;
  const sel = ui.sel && taskById(ui.sel);
  switch (a) {
    case 'nav': go({ type: el.dataset.type, id: el.dataset.id }); break;
    case 'open-sidebar': $('.app').classList.add('side-open'); break;
    case 'close-sidebar': $('.app').classList.remove('side-open'); break;
    case 'open': ui.sel = id; render(); break;
    case 'toggle': e.stopPropagation(); toggleDone(id); break;
    case 'delete': deleteTask(id); break;
    case 'close-detail': ui.sel = null; render(); break;
    case 'fold': ui.closed[el.dataset.k] = !ui.closed[el.dataset.k]; render(); break;
    case 'sort': ui.sort = el.dataset.v; render(); break;
    case 'prio': if (sel) { sel.priority = +el.dataset.v; save(); render(); } break;
    case 'sub-toggle': if (sel) { const s = sel.subtasks.find((z) => z.id === el.dataset.s); s.done = !s.done; save(); render(); } break;
    case 'sub-del': if (sel) { sel.subtasks = sel.subtasks.filter((z) => z.id !== el.dataset.s); save(); render(); } break;
    case 'new-list': {
      ask('Nombre de la nueva lista', { input: true, ok: 'Crear' }).then((name) => {
        if (!name?.trim()) return;
        const l = { id: uid(), name: name.trim(), emoji: '📁', color: LIST_COLORS[db.lists.length % LIST_COLORS.length] };
        db.lists.push(l); save(); go({ type: 'list', id: l.id });
      }); break;
    }
    case 'edit-lists': go({ type: 'tool', id: 'settings' }); setTimeout(() => $('#listsCard')?.scrollIntoView({ behavior: 'smooth' }), 50); break;
    case 'del-list': {
      const l = listById(id); const n = db.tasks.filter((x) => x.listId === id).length;
      ask(`¿Eliminar la lista “${l.name}”?${n ? ` Sus ${n} tareas pasarán a la Bandeja de entrada.` : ''}`, { ok: 'Eliminar', danger: true }).then((yes) => {
        if (!yes) return;
        db.lists = db.lists.filter((x) => x.id !== id);
        db.tasks.forEach((x) => { if (x.listId === id) x.listId = null; });
        if (db.settings.defaultList === id) db.settings.defaultList = null;
        save(); render();
      }); break;
    }
    case 'cal-day': ui.calDay = el.dataset.d; if (ui.calDay.slice(0, 7) !== ui.calMonth) ui.calMonth = ui.calDay.slice(0, 7); render(); break;
    case 'cal-move': ui.calMonth = addMonths(ui.calMonth + '-01', +el.dataset.n).slice(0, 7); render(); break;
    case 'cal-today': ui.calMonth = today().slice(0, 7); ui.calDay = today(); render(); break;
    case 'habit': {
      const h = db.habits.find((z) => z.id === id); const d = el.dataset.d;
      if (h.log[d]) delete h.log[d]; else h.log[d] = true; save(); render(); break;
    }
    case 'del-habit': ask('¿Eliminar este hábito y su historial?', { ok: 'Eliminar', danger: true }).then((yes) => { if (yes) { db.habits = db.habits.filter((z) => z.id !== id); save(); render(); } }); break;
    case 'pomo-mode': timer.setMode(el.dataset.v); render(); break;
    case 'pomo-toggle': if (timer.running) timer.pause(); else timer.start(); render(); break;
    case 'pomo-reset': timer.reset(); document.title = 'Mis Tareas'; render(); break;
    case 'accent': db.settings.accent = el.dataset.v; save(); render(); break;
    case 'theme': db.settings.theme = el.dataset.v; save(); render(); break;
    case 'week-start': db.settings.weekStart = +el.dataset.v; save(); render(); break;
    case 'export': {
      const blob = new Blob([JSON.stringify(db, null, 2)], { type: 'application/json' });
      const aEl = document.createElement('a'); aEl.href = URL.createObjectURL(blob); aEl.download = `mis-tareas-${today()}.json`; aEl.click();
      setTimeout(() => URL.revokeObjectURL(aEl.href), 1000); break;
    }
    case 'reset-all':
      ask('¿Borrar TODAS tus tareas, listas y hábitos? Esto no se puede deshacer.', { ok: 'Borrar todo', danger: true }).then((yes) => {
        if (yes) { db = seed(); db.tasks = []; db.habits = []; save(); ui.sel = null; go({ type: 'smart', id: 'today' }); }
      }); break;
    case 'undo': { const t = $('#toast'); if (t._undo) t._undo(); t.hidden = true; break; }
  }
});

// Los formularios se manejan por Enter y por clic (no dependen del envío nativo, que algunos marcos aislados bloquean).
document.addEventListener('submit', (e) => { e.preventDefault(); const f = e.target.closest('[data-form]'); if (f) handleForm(f); });
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter' || e.isComposing || e.target.tagName !== 'INPUT') return;
  const f = e.target.closest('form'); if (!f) return;
  e.preventDefault();
  if (f.dataset.form) handleForm(f); else f._submit?.();
});
document.addEventListener('click', (e) => {
  const btn = e.target.closest('form button:not([type=button])'); if (!btn || btn.dataset.act) return;
  const f = btn.closest('form'); e.preventDefault();
  if (f.dataset.form) handleForm(f); else f._submit?.();
}, true);
function handleForm(f) {
  const kind = f.dataset.form;
  if (kind === 'quick') {
    const inp = f.elements.q; const text = inp.value.trim(); if (!text) return;
    const base = f.dataset.due ? { due: f.dataset.due } : f.dataset.prio != null ? { priority: +f.dataset.prio } : viewDefaults();
    const t = addTask(text, base);
    render();
    const again = document.querySelector(`[data-form="quick"]${f.dataset.prio != null ? `[data-prio="${f.dataset.prio}"]` : ''} input`);
    again?.focus();
    if (t && !viewTasks().includes(t) && ui.view.type !== 'tool') toast(`Agregada${t.due ? ' para ' + fmtDate(t.due).toLowerCase() : ''}${t.listId ? ' en ' + listById(t.listId).name : ''}`);
  } else if (kind === 'sub') {
    const sel = taskById(ui.sel); const v = f.elements.q.value.trim(); if (!sel || !v) return;
    sel.subtasks.push({ id: uid(), title: v, done: false }); save(); render();
    $('[data-form="sub"] input')?.focus();
  } else if (kind === 'habit') {
    const name = f.elements.name.value.trim(); if (!name) return;
    db.habits.push({ id: uid(), name, emoji: f.elements.emoji.value.trim() || '⭐', color: f.elements.color.value, log: {} });
    save(); render();
  }
}

// Cambios en el panel de detalle y en Personalizar
document.addEventListener('input', (e) => {
  const el = e.target;
  if (el.id === 'search') {
    ui.search = el.value; const pos = el.selectionStart;
    render(); const s = $('#search'); s.focus(); s.setSelectionRange(pos, pos); return;
  }
  const sel = ui.sel && taskById(ui.sel);
  if (el.dataset.field && sel) {
    const f = el.dataset.field;
    if (f === 'title') { sel.title = el.value.replace(/\n/g, ' '); autosize(el); }
    else if (f === 'notes') sel.notes = el.value;
    else if (f === 'tags') sel.tags = [...new Set(el.value.split(',').map((z) => z.trim().replace(/^#/, '').toLowerCase()).filter(Boolean))];
    save(); refreshLater(); return;
  }
  if (el.dataset.sub && sel) { const s = sel.subtasks.find((z) => z.id === el.dataset.sub); if (s) s.title = el.value; save(); refreshLater(); return; }
  if (el.dataset.list && el.dataset.k !== 'color') { const l = listById(el.dataset.list); l[el.dataset.k] = el.value; save(); renderSidebar(); return; }
  if (el.dataset.set === 'name') { db.settings.name = el.value; save(); renderSidebar(); }
});
// Refresca la lista sin perder el foco del panel mientras se escribe
let refreshT;
function refreshLater() {
  clearTimeout(refreshT);
  refreshT = setTimeout(() => {
    const main = $('#main'); const st = main.scrollTop;
    const v = ui.view;
    if (v.type !== 'tool' || v.id !== 'settings') {
      renderSidebar();
      main.innerHTML = ui.search || v.type !== 'tool' ? renderListView() : { calendar: renderCalendar, matrix: renderMatrix, habits: renderHabits, focus: renderFocus }[v.id]();
      main.scrollTop = st;
    }
  }, 400);
}

document.addEventListener('change', (e) => {
  const el = e.target; const sel = ui.sel && taskById(ui.sel);
  if (el.dataset.field && sel && ['due', 'time', 'repeat', 'listId'].includes(el.dataset.field)) {
    const f = el.dataset.field; sel[f] = el.value || (f === 'repeat' ? '' : null);
    if (f === 'repeat' && sel.repeat && !sel.due) sel.due = today();
    if (f === 'due' || f === 'time') sel.notified = false;
    save(); render(); return;
  }
  if (el.dataset.list && el.dataset.k === 'color') { listById(el.dataset.list).color = el.value; save(); render(); return; }
  if (el.dataset.set) {
    const k = el.dataset.set; const s = db.settings;
    if (k.includes('.')) { const [a, b] = k.split('.'); s[a][b] = el.checked; }
    else if (el.type === 'checkbox') s[k] = el.checked;
    else if (el.type === 'number') s[k] = Math.max(1, +el.value || 1);
    else if (k === 'defaultList') s[k] = el.value || null;
    else s[k] = el.value;
    if (k === 'notify' && el.checked && 'Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission().then((p) => { if (p !== 'granted') { s.notify = false; save(); render(); toast('El navegador no dio permiso para avisos'); } });
    }
    if (['pomo', 'shortBreak', 'longBreak'].includes(k) && !timer.running) timer.remaining = null;
    save(); render(); return;
  }
  if (el.dataset.change === 'pomo-task') { timer.taskId = el.value || null; render(); return; }
  if (el.dataset.change === 'import') {
    const file = el.files[0]; if (!file) return;
    file.text().then((txt) => {
      const d = JSON.parse(txt);
      if (!Array.isArray(d.tasks) || !Array.isArray(d.lists)) throw new Error('formato');
      return ask('Esto reemplazará los datos actuales por los de la copia. ¿Continuar?', { ok: 'Reemplazar', danger: true }).then((yes) => {
        if (!yes) return;
        try { localStorage.setItem(KEY, JSON.stringify(d)); db = load(); } catch (e) { db = d; }
        ui.sel = null; save(); render(); toast('Copia cargada');
      });
    }).catch(() => toast('Ese archivo no es una copia válida')).finally(() => { el.value = ''; });
  }
});

// Arrastrar tareas: a una lista del menú, o entre cuadrantes de la matriz
document.addEventListener('dragstart', (e) => {
  const t = e.target.closest?.('.task'); if (!t) return;
  e.dataTransfer.setData('text/plain', t.dataset.id); e.dataTransfer.effectAllowed = 'move';
});
document.addEventListener('dragover', (e) => {
  const z = e.target.closest?.('[data-drop]'); if (!z) return;
  e.preventDefault(); z.classList.add('drop');
});
document.addEventListener('dragleave', (e) => { e.target.closest?.('[data-drop]')?.classList.remove('drop'); });
document.addEventListener('drop', (e) => {
  const z = e.target.closest?.('[data-drop]'); if (!z) return;
  e.preventDefault(); z.classList.remove('drop');
  const t = taskById(e.dataTransfer.getData('text/plain')); if (!t) return;
  if (z.dataset.drop === 'quad') t.priority = +z.dataset.p;
  if (z.dataset.drop === 'list') { t.listId = z.dataset.id; toast(`Movida a ${listById(t.listId).name}`); }
  save(); render();
});

document.addEventListener('keydown', (e) => {
  const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName);
  if (e.key === 'Escape') {
    if (typing) document.activeElement.blur();
    else if (ui.sel) { ui.sel = null; render(); }
    $('.app').classList.remove('side-open');
  }
  if (!typing && (e.key === 'n' || e.key === 'N')) { const q = $('[data-form="quick"] input'); if (q) { e.preventDefault(); q.focus(); } }
  if (!typing && e.key === '/') { e.preventDefault(); $('#search')?.focus(); }
  if (e.target.classList?.contains('d-title') && e.key === 'Enter') { e.preventDefault(); e.target.blur(); }
});

matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', applyTheme);
// A medianoche, "Hoy" cambia: refresca cada minuto si cambió el día.
let lastDay = today();
setInterval(() => { if (today() !== lastDay) { lastDay = today(); render(); } }, 60000);

// Para pruebas desde la consola
window.__tareas = { parseQuick, get db() { return db; } };

render();
})();
