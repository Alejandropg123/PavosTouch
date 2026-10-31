// Datos de EJEMPLO (inventados) para probar la app.
// En la versión final esto vendrá de la base de datos (Supabase).

const EMPRESAS = [
  { id: 'llano', nombre: 'Llano Carga', corto: 'Llano', prefijo: '00-', color: '#c6f432' },
  { id: 'jf', nombre: 'Jorge Fonseca', corto: 'JF', prefijo: 'JF-', color: '#7cc7ff' },
];

const ETAPAS = [
  { id: 'pendiente', nombre: 'Pendiente', color: '#8ea6ff' },
  { id: 'acta', nombre: 'Pendiente de acta', color: '#e9c46a' },
  { id: 'finalizado', nombre: 'Finalizado', color: '#f4978e' },
  { id: 'facturado', nombre: 'Facturado', color: '#7ee2a8' },
];

const DOCS_OPERACION = [
  ['remesa', 'Remesa'],
  ['manifiesto', 'Manifiesto'],
  ['cumplido', 'Cumplido'],
  ['terceros', 'Factura de terceros'],
  ['factura', 'Factura de servicio'],
];

const CATEGORIAS_GASTO = [
  ['combustible', 'Combustible'],
  ['pctConductor', '% Conductor'],
  ['parqueadero', 'Parqueadero'],
  ['mantenimiento', 'Mantenimiento / imprevistos'],
  ['peajes', 'Peajes'],
  ['engrase', 'Engrase'],
  ['lavado', 'Lavado'],
  ['otros', 'Otros'],
];

function seedData() {
  const hoy = new Date();
  const d = (n) => { const x = new Date(hoy); x.setDate(x.getDate() + n); return x.toISOString().slice(0, 10); };
  let s = 11;
  const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  const pick = (a) => a[Math.floor(rnd() * a.length)];
  const r50 = (v) => Math.round(v / 50000) * 50000;

  const clientes = [
    ['c1', 'Petroservicios del Meta S.A.S', '901.234.567-1', 'Villavicencio', 'Laura Méndez', '310 555 0101'],
    ['c2', 'Transportes Andinos S.A.S', '900.876.543-2', 'Bogotá', 'Camilo Ruiz', '311 555 0102'],
    ['c3', 'Logística Multimodal Caribe S.A.S', '901.112.233-4', 'Cartagena', 'Paola Herrera', '312 555 0103'],
    ['c4', 'Ingeniería Orinoquía Ltda', '830.445.566-7', 'Puerto Gaitán', 'Diego Salcedo', '313 555 0104'],
    ['c5', 'Shipping Andes Logistics S.A.S', '901.778.899-0', 'Mosquera', 'Natalia Prieto', '314 555 0105'],
    ['c6', 'Tubos y Equipos del Llano S.A.S', '900.332.211-5', 'Acacías', 'Hernán Vargas', '315 555 0106'],
    ['c7', 'Agroindustrial La Llanura S.A.S', '901.667.554-3', 'Yopal', 'Sandra Castro', '316 555 0107'],
  ].map(([id, nombre, nit, ciudad, contacto, telefono], i) => ({
    id, nombre, nit, ciudad, contacto, telefono,
    docs: [
      { tipo: 'RUT', vence: null, archivo: `RUT ${nombre.split(' ')[0]}.pdf` },
      { tipo: 'Cámara de Comercio', vence: d([-6, 12, 45, 90, 150, 25, 200][i]), archivo: 'Camara de comercio.pdf' },
      { tipo: 'Contrato / Oferta comercial', vence: d([300, 60, 18, 240, 120, 365, 80][i]), archivo: i % 3 === 0 ? '' : 'Contrato.pdf' },
    ],
  }));

  const vehiculos = [
    ['v1', 'TKR512', 'Tractocamión', 'Kenworth T800 · 2018', 'R41208'],
    ['v2', 'SVN204', 'Tractocamión', 'International ProStar · 2017', 'R33961'],
    ['v3', 'WPL873', 'Tractocamión', 'Freightliner Cascadia · 2020', 'S52740'],
    ['v4', 'TMZ330', 'Camión sencillo', 'Chevrolet FVR · 2019', ''],
    ['v5', 'XKD618', 'Tractocamión', 'Kenworth T880 · 2021', 'R28815'],
  ].map(([id, placa, tipo, modelo, trailer], i) => ({
    id, placa, tipo, modelo, trailer,
    docs: [
      { tipo: 'SOAT', vence: d([22, -3, 140, 9, 260][i]), archivo: 'SOAT.pdf' },
      { tipo: 'Revisión tecnicomecánica', vence: d([95, 40, 12, 210, -15][i]), archivo: 'RTM.pdf' },
      { tipo: 'Póliza RCC / RCE', vence: d([180, 27, 300, 64, 150][i]), archivo: 'Poliza.pdf' },
      { tipo: 'Tarjeta de propiedad', vence: null, archivo: 'Tarjeta propiedad.pdf' },
    ],
  }));

  const conductores = [
    ['p1', 'Carlos Rincón', '1.121.000.101', '320 555 0201'],
    ['p2', 'Andrés Pabón', '80.000.202', '321 555 0202'],
    ['p3', 'Wilson Ardila', '1.070.000.303', '322 555 0203'],
    ['p4', 'Fabián Gaitán', '86.000.404', '323 555 0204'],
    ['p5', 'Óscar Lizcano', '1.006.000.505', '324 555 0205'],
  ].map(([id, nombre, cedula, telefono], i) => ({
    id, nombre, cedula, telefono,
    docs: [
      { tipo: 'Licencia C3', vence: d([400, 19, 700, -8, 320][i]), archivo: 'Licencia.pdf' },
      { tipo: 'Seguridad social (planilla)', vence: d([4, 14, 2, 21, 7][i]), archivo: 'Planilla.pdf' },
      { tipo: 'Curso manejo defensivo', vence: d([120, 250, 33, 90, 400][i]), archivo: i === 2 ? '' : 'Certificado.pdf' },
      { tipo: 'Cédula', vence: null, archivo: 'Cedula.pdf' },
    ],
  }));

  const rutas = [
    ['Villavicencio', 'Puerto Gaitán', 'Tubería'],
    ['Puerto Gaitán', 'Bogotá', 'Equipo petrolero'],
    ['Gachancipá', 'Orito', 'Herramienta petrolera'],
    ['Cartagena', 'Mosquera', "Contenedor 40'"],
    ['Yopal', 'Puerto Gaitán', 'Tanque 500 gal'],
    ['Palmira', 'Cartagena', 'Maquinaria amarilla'],
    ['Villavicencio', 'Castilla la Nueva', 'Tubería'],
    ['Mosquera', 'Tocancipá', 'Insumos industriales'],
    ['Acacías', 'Bogotá', 'Equipo petrolero'],
    ['Bogotá', 'Santa Marta', "Contenedor 20'"],
  ];
  const fletes = [1850000, 2800000, 3500000, 4200000, 5600000, 7800000, 9500000, 12500000];

  const operaciones = [];
  const gastos = [];
  const consecutivo = { llano: 430, jf: 248 };
  let factura = 340;

  for (let i = 25; i >= 0; i--) {
    const empresa = rnd() < 0.58 ? 'llano' : 'jf';
    const n = ++consecutivo[empresa];
    const os = empresa === 'llano' ? `00-${n}` : `JF-${n}`;
    const [origen, destino, carga] = pick(rutas);
    const v = pick(vehiculos);
    const p = pick(conductores);
    const c = pick(clientes);
    let etapa = i <= 4 ? 'pendiente' : i <= 8 ? 'acta' : i <= 14 ? 'finalizado' : 'facturado';
    if (etapa === 'facturado' && rnd() < 0.15) etapa = 'finalizado';
    if (etapa === 'acta' && rnd() < 0.25) etapa = 'pendiente';
    const flete = pick(fletes);
    const anticipo = rnd() < 0.7 ? r50(flete * 0.3) : 0;
    const manifiesto = empresa === 'llano' ? `MC000${700 + n - 430}` : String(470000 + Math.floor(rnd() * 9000));
    const remesa = empresa === 'llano' ? `00-${380 + n - 430}` : `${manifiesto}-01`;
    const avance = ETAPAS.findIndex((e) => e.id === etapa);
    const op = {
      id: 'o' + (operaciones.length + 1),
      empresa, os, fecha: d(-(i * 2) - Math.floor(rnd() * 2)), etapa,
      vehiculoId: v.id, trailer: v.trailer, conductorId: p.id, clienteId: c.id,
      origen, destino, carga, remesa, manifiesto, flete, anticipo,
      obs: rnd() < 0.2 ? 'Cliente solicita cita de cargue antes de las 7 a.m.' : '',
      facturaNo: etapa === 'facturado' ? `FE ${++factura}` : '',
      docs: {
        remesa: avance >= 1 || rnd() < 0.4 ? `Remesa ${remesa} ${v.placa}.pdf` : '',
        manifiesto: `Manifiesto ${manifiesto} ${v.placa}.pdf`,
        cumplido: avance >= 2 ? `Cumplido ${manifiesto}.pdf` : '',
        terceros: avance >= 2 && rnd() < 0.5 ? 'Factura tercero.pdf' : '',
        factura: etapa === 'facturado' ? `FE ${factura} ${c.nombre.split(' ')[0]}.pdf` : '',
      },
    };
    operaciones.push(op);

    if (avance >= 1) {
      const g = {
        id: 'g' + (gastos.length + 1), opId: op.id, fecha: op.fecha,
        combustible: r50(800000 + rnd() * 900000),
        pctConductor: r50(flete * 0.1),
        parqueadero: [0, 15000, 22000, 30000][Math.floor(rnd() * 4)],
        mantenimiento: rnd() < 0.2 ? r50(150000 + rnd() * 300000) : 0,
        peajes: Math.round((80000 + rnd() * 220000) / 1000) * 1000,
        engrase: rnd() < 0.3 ? 35000 : 0,
        lavado: rnd() < 0.3 ? 40000 : 0,
        otros: 0,
        anticipos: [],
        legalizado: etapa === 'facturado' && rnd() < 0.8,
        soporte: etapa === 'facturado' ? 'Legalizacion.pdf' : '',
      };
      const total = CATEGORIAS_GASTO.reduce((t, [k]) => t + g[k], 0);
      const a1 = r50(total * 0.6);
      g.anticipos.push({ valor: a1, fecha: op.fecha });
      g.anticipos.push({ valor: r50(total * (0.3 + rnd() * 0.15)), fecha: op.fecha });
      gastos.push(g);
    }
  }
  operaciones.reverse();
  return { clientes, vehiculos, conductores, operaciones, gastos, consecutivo };
}
