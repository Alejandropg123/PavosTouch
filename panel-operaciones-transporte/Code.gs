function onOpen() {

  const ui = SpreadsheetApp.getUi();

  ui.createMenu('🚛 Operación de Transporte')
    .addItem('Abrir Panel de Operación', 'abrirInterfaz')
    .addSeparator()
    .addItem('🌐 Configurar región (España)', 'configurarRegionEspana')
    .addItem('🔍 Ver configuración regional actual', 'verRegionActual')
    .addSeparator()
    .addItem('🛠️ Corregir fórmula ESTADO GENERAL (Gastos_Conductores)', 'repararFormulaEstadoGeneral')
    .addToUi();

}


/**
 * =========================================================
 * VER LA CONFIGURACIÓN REGIONAL REAL DEL ARCHIVO
 * =========================================================
 * Diagnóstico: muestra exactamente lo que Apps Script está
 * leyendo como región del archivo AHORA MISMO, sin adivinar.
 * Si esto no dice "es" o "es_ES", el archivo NO está en español
 * aunque el menú de Sheets se vea en español (el idioma del menú
 * es tu idioma de cuenta de Google, no la región del archivo).
 */
function verRegionActual() {

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const locale = ss.getSpreadsheetLocale();

  SpreadsheetApp.getUi().alert(
    '🔍 Región actual del archivo: "' + locale + '"\n\n' +
    (locale && locale.toLowerCase().indexOf('es') === 0
      ? 'Está en español. Si las fórmulas igual fallan, el problema no es de idioma.'
      : 'NO está en español — por eso las fórmulas en español dan #NAME?. ' +
        'Ve a Archivo → Configuración de la hoja de cálculo → General → ' +
        'Configuración regional, y cámbiala a "España" manualmente ahí.')
  );

}


/**
 * =========================================================
 * CONFIGURAR REGIÓN DE LA HOJA DE CÁLCULO A ESPAÑA
 * =========================================================
 * Fija la configuración regional del archivo a es_ES. Con esto,
 * TODAS las fórmulas (las que arma este script y las que el
 * usuario pega a mano) se muestran de forma consistente: nombres
 * de función en español y punto y coma (;) como separador de
 * argumentos, en vez de mezclar formato inglés (coma) y español.
 * Se deja como acción de menú (no automática en cada apertura)
 * porque es un ajuste de una sola vez para el archivo.
 */
function configurarRegionEspana() {

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const localeAnterior = ss.getSpreadsheetLocale();

  ss.setSpreadsheetLocale('es_ES');

  const localeNuevo = ss.getSpreadsheetLocale();

  SpreadsheetApp.getUi().alert(
    (localeNuevo && localeNuevo.toLowerCase().indexOf('es') === 0
      ? '✅ Región configurada a España (es_ES).'
      : '⚠️ Se intentó configurar a es_ES, pero el archivo sigue reportando "' +
        localeNuevo + '". Cámbiala manualmente desde Archivo → Configuración ' +
        'de la hoja de cálculo → General → Configuración regional.') +
    '\n\nAntes: ' + localeAnterior + '\nAhora: ' + localeNuevo + '\n\n' +
    'Cierra y vuelve a abrir la hoja de cálculo para que el cambio ' +
    'se refleje en todas las fórmulas ya escritas.'
  );

}


/**
 * =========================================================
 * ABRIR INTERFAZ
 * =========================================================
 */
function abrirInterfaz() {

  const html = HtmlService
    .createHtmlOutputFromFile('Interfaz')
    .setWidth(1200)
    .setHeight(820);

  SpreadsheetApp.getUi().showModalDialog(
    html,
    'Panel de Gestión de Operaciones'
  );

}


/**
 * =========================================================================
 * =========================================================================
 *   MODOS DE OPERACIÓN — JF (hoja 'operaciones') / LLANO (hoja 'Control_llano')
 * =========================================================================
 * =========================================================================
 *
 * Las OS de JF y Llano nunca se cruzan (prefijos "JF-" y "OS-" distintos),
 * por eso 'Gastos_Conductores' sigue siendo una sola hoja compartida entre
 * los dos modos: basta con buscar la OS tal cual, sin filtrar por modo.
 *
 * filaInicioDatos se verificó contra el Sheet real: 'operaciones' tiene
 * el encabezado en la fila 2 y los datos empiezan en la fila 3, mientras
 * que 'Control_llano' tiene una fila en blanco extra arriba (encabezado
 * en la fila 3, datos desde la fila 4) — NO son iguales.
 */
const MODOS = {
  JF: {
    hoja: 'operaciones',
    filaInicioDatos: 3,
    prefijoOS: 'JF-',
    etiqueta: 'JF - Jorge Luis Fonseca'
  },
  LLANO: {
    hoja: 'Control_llano',
    filaInicioDatos: 4,
    prefijoOS: 'OS-',
    etiqueta: 'Llano - Multiservicios Llanocarga'
  }
};

const MODO_POR_DEFECTO = 'JF';


/**
 * Normaliza cualquier valor de "modo" que llegue del cliente (o vacío/
 * inválido) a una clave válida de MODOS. Nunca lanza error: si el modo
 * no es reconocible, cae al modo por defecto en vez de romper el panel.
 */
function resolverModo(modo) {

  const clave = (modo || '').toString().trim().toUpperCase();

  return MODOS[clave] ? clave : MODO_POR_DEFECTO;

}


/**
 * Lista de modos disponibles para que el cliente arme el selector sin
 * tener que hardcodear las etiquetas ni los prefijos en el HTML.
 */
function obtenerConfiguracionModos() {

  return Object.keys(MODOS).map(function(clave) {
    return {
      clave: clave,
      etiqueta: MODOS[clave].etiqueta,
      prefijoOS: MODOS[clave].prefijoOS
    };
  });

}


function filaInicioDatosPara(modo) {

  return MODOS[resolverModo(modo)].filaInicioDatos;

}


// Columnas de datos (A..J), iguales en 'operaciones' y 'Control_llano':
// A Fecha | B OS | C EstadoFacturacion | D EstadoOperacion | E Placa
// F Ruta | G Carga | H Cliente | I Conductor | J Manifiesto/Remesa
const NUM_COLUMNAS = 10;

// Para LISTAR/BUSCAR leemos más columnas que para guardar (hasta la X:
// ESTADO GASTOS, que amarra con 'Gastos_Conductores'), así el panel puede
// mostrar si cada operación ya está facturada y/o legalizada. Guardar
// operaciones sigue usando solo NUM_COLUMNAS (A:J) — no se toca esa parte.
const NUM_COLUMNAS_TABLA = 24; // hasta la columna X

// Índices (base 0 dentro de la fila) usados para la búsqueda ampliada
const COL_OS = 1;
const COL_PLACA = 4;
const COL_RUTA = 5;
const COL_CONDUCTOR = 8;

// Índices (base 0) usados para resaltar/filtrar facturado y legalizado
const COL_ESTADO_FACTURACION = 2;  // C
const COL_ESTADO_GASTOS = 23;       // X (ESTADO GASTOS, viene de Gastos_Conductores)

// Columnas de documentos (1 = A, base 1 para getRange) — verificadas contra
// el Sheet real: son las mismas posiciones en 'operaciones' y 'Control_llano'
// aunque el bloque J:L (número de manifiesto/remesa, placa trailer,
// legalización de anticipos) tenga un orden distinto entre las dos hojas.
const DOC_COL = {
  remesa: 16,            // P - 📂 REMESA
  manifiesto: 17,         // Q - 📂 MANIFIESTO
  cumplido: 18,             // R - 📂 CUMPLIDOS
  facturaTerceros: 19,       // S - 📂 FACTURA O DOCUMENTOS DE TERCEROS
  factura: 20                // T - 💰 FACTURA DE SERVICIO / SERVICIOS FACTURADO
};


/**
 * =========================================================
 * OBTENER TODAS LAS OPERACIONES
 * =========================================================
 */
function obtenerOperaciones(modo) {

  const modoResuelto = resolverModo(modo);
  const hoja = obtenerHojaOperaciones(modoResuelto);
  const inicio = filaInicioDatosPara(modoResuelto);
  const ultimaFila = hoja.getLastRow();

  if (ultimaFila < inicio) {
    return [];
  }

  const cantidadFilas = ultimaFila - (inicio - 1);

  const datos = hoja
    .getRange(inicio, 1, cantidadFilas, NUM_COLUMNAS_TABLA)
    .getValues();

  return datos.map(convertirFilaParaHTML);

}


/**
 * =========================================================
 * BUSCAR OPERACIONES (OS, placa, ruta o conductor)
 * =========================================================
 * Búsqueda parcial e insensible a mayúsculas sobre varias
 * columnas a la vez. Si el texto está vacío devuelve todo.
 * Las coincidencias exactas de OS aparecen primero.
 */
function buscarOperaciones(textoBusqueda, modo) {

  const texto = textoBusqueda ? textoBusqueda.toString().trim() : '';
  const modoResuelto = resolverModo(modo);

  if (!texto) {
    return obtenerOperaciones(modoResuelto);
  }

  const hoja = obtenerHojaOperaciones(modoResuelto);
  const inicio = filaInicioDatosPara(modoResuelto);
  const ultimaFila = hoja.getLastRow();

  if (ultimaFila < inicio) {
    return [];
  }

  const cantidadFilas = ultimaFila - (inicio - 1);

  const datos = hoja
    .getRange(inicio, 1, cantidadFilas, NUM_COLUMNAS_TABLA)
    .getValues();

  const busqueda = texto.toLowerCase();
  const columnasBusqueda = [COL_OS, COL_PLACA, COL_RUTA, COL_CONDUCTOR];

  const coincidencias = [];

  for (let i = 0; i < datos.length; i++) {

    const fila = datos[i];
    const osActual = (fila[COL_OS] || '').toString().trim().toLowerCase();

    let coincide = false;

    for (let j = 0; j < columnasBusqueda.length; j++) {
      const valor = (fila[columnasBusqueda[j]] || '').toString().toLowerCase();
      if (valor.indexOf(busqueda) !== -1) {
        coincide = true;
        break;
      }
    }

    if (coincide) {
      coincidencias.push({
        fila: convertirFilaParaHTML(fila),
        exactaOS: osActual === busqueda
      });
    }

  }

  // Las coincidencias exactas de OS se muestran primero
  coincidencias.sort(function(a, b) {
    return (b.exactaOS ? 1 : 0) - (a.exactaOS ? 1 : 0);
  });

  return coincidencias.map(function(c) { return c.fila; });

}


/**
 * =========================================================
 * GUARDAR / ACTUALIZAR OPERACIÓN
 * =========================================================
 * Usa LockService para evitar condiciones de carrera cuando
 * dos personas guardan al mismo tiempo (por ejemplo, ambas
 * intentando crear la misma OS nueva).
 */
function guardarOperacion(operacion) {

  const lock = LockService.getScriptLock();
  const obtuvoLock = lock.tryLock(10000);

  if (!obtuvoLock) {
    throw new Error(
      'El sistema está ocupado guardando otra operación. Intenta de nuevo en unos segundos.'
    );
  }

  try {
    return guardarOperacionInterno(operacion);
  } finally {
    lock.releaseLock();
  }

}


function guardarOperacionInterno(operacion) {

  const datosValidados = validarYNormalizarOperacion(operacion);

  const hoja = obtenerHojaOperaciones(datosValidados.modo);
  const inicio = filaInicioDatosPara(datosValidados.modo);
  const datos = hoja.getDataRange().getValues();

  const osBuscada = datosValidados.os.toUpperCase();
  let filaEditar = -1;

  for (let i = inicio - 1; i < datos.length; i++) {

    const osExistente = (datos[i][COL_OS] || '').toString().trim().toUpperCase();

    if (osExistente === osBuscada) {
      filaEditar = i + 1;
      break;
    }

  }

  let fechaGuardar = datosValidados.fecha;
  const partes = datosValidados.fecha.split('-');

  if (partes.length === 3) {
    fechaGuardar = new Date(
      Number(partes[0]),
      Number(partes[1]) - 1,
      Number(partes[2])
    );
  }

  const valores = [[

    fechaGuardar,
    datosValidados.os,
    datosValidados.estadoFacturacion,
    datosValidados.estadoOperacion,
    datosValidados.placa,
    datosValidados.ruta,
    datosValidados.carga,
    datosValidados.cliente,
    datosValidados.conductor,
    datosValidados.manifiesto

  ]];

  if (filaEditar !== -1) {

    hoja.getRange(filaEditar, 1, 1, NUM_COLUMNAS).setValues(valores);

    return {
      tipo: 'actualizado',
      mensaje: '✅ La operación ' + datosValidados.os + ' fue actualizada correctamente.'
    };

  }

  hoja.appendRow(valores[0]);

  return {
    tipo: 'nuevo',
    mensaje: '✅ La operación ' + datosValidados.os + ' fue registrada correctamente.'
  };

}


/**
 * =========================================================
 * VALIDACIÓN Y NORMALIZACIÓN (SERVER-SIDE)
 * =========================================================
 * No confiamos solo en la validación del navegador: cualquiera
 * podría invocar guardarOperacion() sin pasar por el formulario.
 */
function validarYNormalizarOperacion(operacion) {

  if (!operacion || typeof operacion !== 'object') {
    throw new Error('No se recibieron los datos de la operación.');
  }

  const limpiar = function(valor) {
    return (valor === null || valor === undefined) ? '' : valor.toString().trim();
  };

  const fecha = limpiar(operacion.fecha);
  const os = limpiar(operacion.os);

  if (!fecha) {
    throw new Error('La fecha es obligatoria.');
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    throw new Error('El formato de fecha no es válido.');
  }

  if (!os) {
    throw new Error('La OS interna es obligatoria.');
  }

  if (os.length > 50) {
    throw new Error('La OS interna es demasiado larga (máximo 50 caracteres).');
  }

  return {
    modo: resolverModo(operacion.modo),
    fecha: fecha,
    os: os,
    estadoFacturacion: limpiar(operacion.estadoFacturacion),
    estadoOperacion: limpiar(operacion.estadoOperacion),
    placa: limpiar(operacion.placa).toUpperCase(),
    ruta: limpiar(operacion.ruta),
    carga: limpiar(operacion.carga),
    cliente: limpiar(operacion.cliente),
    conductor: limpiar(operacion.conductor),
    manifiesto: limpiar(operacion.manifiesto)
  };

}


/**
 * =========================================================
 * OBTENER LISTAS PARA LOS SELECT
 * =========================================================
 */
function obtenerListas(modo) {

  const modoResuelto = resolverModo(modo);
  const hoja = obtenerHojaOperaciones(modoResuelto);
  const inicio = filaInicioDatosPara(modoResuelto);
  const ultimaFila = hoja.getLastRow();

  const listasVacias = {
    estadosFacturacion: [],
    estadosOperacion: [],
    placas: [],
    rutas: [],
    cargas: [],
    clientes: [],
    conductores: []
  };

  if (ultimaFila < inicio) {
    return listasVacias;
  }

  const cantidadFilas = ultimaFila - (inicio - 1);

  const datos = hoja
    .getRange(inicio, 1, cantidadFilas, NUM_COLUMNAS)
    .getValues();

  function valoresUnicos(indice) {

    const valores = datos
      .map(function(fila) { return fila[indice]; })
      .filter(function(valor) {
        return valor !== null && valor !== undefined && valor.toString().trim() !== '';
      })
      .map(function(valor) { return valor.toString().trim(); });

    return [...new Set(valores)].sort();

  }

  return {
    estadosFacturacion: valoresUnicos(2),
    estadosOperacion: valoresUnicos(3),
    placas: valoresUnicos(4),
    rutas: valoresUnicos(5),
    cargas: valoresUnicos(6),
    clientes: valoresUnicos(7),
    conductores: valoresUnicos(8)
  };

}


/**
 * =========================================================
 * OBTENER HOJA DE OPERACIONES SEGÚN EL MODO ACTIVO (JF / LLANO)
 * =========================================================
 */
function obtenerHojaOperaciones(modo) {

  const config = MODOS[resolverModo(modo)];

  const hoja = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName(config.hoja);

  if (!hoja) {
    throw new Error(
      'No existe una hoja llamada "' + config.hoja + '". Verifica el nombre de la pestaña.'
    );
  }

  return hoja;

}


/**
 * =========================================================
 * CONVERTIR FILA PARA HTML
 * =========================================================
 */
function convertirFilaParaHTML(fila) {

  const resultado = fila.slice();

  if (resultado[0] instanceof Date) {

    resultado[0] = Utilities.formatDate(
      resultado[0],
      Session.getScriptTimeZone(),
      'yyyy-MM-dd'
    );

  } else if (resultado[0]) {

    resultado[0] = resultado[0].toString();

  }

  for (let i = 0; i < resultado.length; i++) {
    if (resultado[i] === null || resultado[i] === undefined) {
      resultado[i] = '';
    }
  }

  return resultado;

}



/**
 * =========================================================================
 * =========================================================================
 *   GASTOS POR CONDUCTOR Y ANTICIPOS — hoja 'Gastos_Conductores'
 * =========================================================================
 * =========================================================================
 *
 * Estructura: UNA FILA POR OPERACIÓN (no un log de movimientos). Cada
 * categoría de gasto es una columna que se va acumulando, y hay 3 casillas
 * fijas de anticipo (valor + fecha) por operación. Es compartida entre los
 * dos modos (JF y Llano) porque los prefijos de OS nunca se cruzan.
 *
 * Reutiliza el mismo panel/modal del menú "🚛 Operación de Transporte".
 */

const GASTOS_HOJA_NOMBRE = 'Gastos_Conductores'; // exacto, respeta mayúsculas/minúsculas

// Verificado contra el Sheet real: el encabezado está en la fila 5 y los
// datos empiezan en la fila 6 (las fórmulas de 'operaciones' ya apuntan a
// Gastos_Conductores!$B$6:$B$40, lo que lo confirma).
const GASTOS_HEADER_ROW = 5;
const GASTOS_DATA_START = 6;

// La hoja terminaba antes en la columna Z (manifiesto/remesa/factura/estado),
// pero esas 3 columnas de estado de documentos ya no existen: ahora termina
// en la columna W (ESTADO GENERAL). Se verificó contra el Sheet real.
const GASTOS_NUM_COLUMNAS = 23;

// Columnas (1 = A, 2 = B, ...) — deben coincidir con los encabezados reales
const GCOL = {
  fecha: 1,          // A
  os: 2,              // B
  conductor: 3,        // C
  placa: 4,            // D
  combustible: 5,       // E
  conductorPct: 6,       // F  "% CONDUCTOR"
  parqueadero: 7,         // G
  mantenimiento: 8,        // H
  peajes: 9,                 // I
  engrase: 10,                // J
  lavado: 11,                   // K
  otros: 12,                     // L
  totalGastos: 13,                 // M
  ant1Valor: 14,                     // N
  ant1Fecha: 15,                       // O
  ant2Valor: 16,                         // P
  ant2Fecha: 17,                           // Q
  ant3Valor: 18,                             // R
  ant3Fecha: 19,                               // S
  totalAnticipos: 20,                            // T
  diferencia: 21,                                  // U
  legalizacion: 22,                                  // V  ADJUNTAR LEGALIZACIÓN
  estado: 23                                           // W  ESTADO GENERAL
};

// Categorías válidas de gasto — deben coincidir EXACTO con las que arma
// el checklist en Interfaz.html (función GASTOS_CATEGORIAS_UI).
const GASTOS_CATEGORIAS = [
  { tipo: 'Combustible', col: GCOL.combustible },
  { tipo: '% Conductor', col: GCOL.conductorPct },
  { tipo: 'Parqueadero', col: GCOL.parqueadero },
  { tipo: 'Mantenimiento / Imprevistos', col: GCOL.mantenimiento },
  { tipo: 'Peajes', col: GCOL.peajes },
  { tipo: 'Engrase', col: GCOL.engrase },
  { tipo: 'Lavado', col: GCOL.lavado },
  { tipo: 'Otros', col: GCOL.otros }
];


/**
 * =========================================================
 * ADAPTAR UNA FÓRMULA (escrita en inglés/US) A ESPAÑOL
 * =========================================================
 * setFormula() de Apps Script en teoría acepta inglés/US siempre y
 * Sheets debería traducirla sola según la región del archivo — pero
 * en la práctica eso no está pasando de forma confiable (se detectó
 * con capturas reales: la fórmula queda en inglés con comas y la
 * celda cae en #ERROR!). Por eso esta función YA NO intenta detectar
 * la región: SIEMPRE traduce la fórmula a español antes de escribirla
 * (IF→SI, SUM→SUMA, AND→Y, UPPER→MAYUSC, IFERROR→SI.ERROR,
 * INDEX→INDICE, MATCH→COINCIDIR, y coma → punto y coma, respetando
 * las comas que estén dentro de comillas).
 */
function formulaSegunRegion(formulaEnUS) {

  const NOMBRES_FUNCION = [
    ['IFERROR', 'SI.ERROR'],
    ['INDEX', 'INDICE'],
    ['MATCH', 'COINCIDIR'],
    ['UPPER', 'MAYUSC'],
    ['SUMIFS', 'SUMAR.SI.CONJUNTO'],
    ['SUM', 'SUMA'],
    ['AND', 'Y'],
    ['IF', 'SI']
  ];

  let resultado = formulaEnUS;

  NOMBRES_FUNCION.forEach(function(par) {
    const regex = new RegExp('\\b' + par[0] + '\\(', 'g');
    resultado = resultado.replace(regex, par[1] + '(');
  });

  let final = '';
  let dentroComillas = false;

  for (let i = 0; i < resultado.length; i++) {

    const caracter = resultado[i];

    if (caracter === '"') {
      dentroComillas = !dentroComillas;
    }

    final += (caracter === ',' && !dentroComillas) ? ';' : caracter;

  }

  return final;

}


/**
 * =========================================================
 * CORREGIR LA FÓRMULA DE ESTADO GENERAL (Gastos_Conductores)
 * =========================================================
 * La fórmula original comparaba el estado de manifiesto/remesa/factura
 * (columnas que ya no existen en esta hoja — se movieron a la vista de
 * consulta) y por eso hoy cae en #REF! en toda la columna. La fórmula
 * corregida solo usa datos que SÍ siguen existiendo aquí: hay legalización
 * adjunta (columna V no vacía) y la diferencia entre anticipos y gastos
 * (columna U) no es positiva, es decir el conductor no tiene plata de
 * anticipo pendiente por devolver.
 *
 * Se deja como acción de menú (como configurarRegionEspana) porque es una
 * corrección de una sola vez sobre las filas ya existentes; las filas
 * nuevas heredan la fórmula al arrastrarla hacia abajo, igual que las
 * demás fórmulas de esta hoja.
 */
function repararFormulaEstadoGeneral() {

  const ui = SpreadsheetApp.getUi();
  const lock = LockService.getScriptLock();
  const obtuvoLock = lock.tryLock(10000);

  if (!obtuvoLock) {
    ui.alert('El sistema está ocupado. Intenta de nuevo en unos segundos.');
    return;
  }

  try {

    const hoja = obtenerHojaGastos();
    const ultimaFila = hoja.getLastRow();

    if (ultimaFila < GASTOS_DATA_START) {
      ui.alert('No hay filas de datos en "' + GASTOS_HOJA_NOMBRE + '" para corregir.');
      return;
    }

    let corregidas = 0;

    for (let fila = GASTOS_DATA_START; fila <= ultimaFila; fila++) {

      const formulaBase = 'IF(AND(V' + fila + '<>"",U' + fila + '<=0),"COMPLETO","PENDIENTE")';

      hoja.getRange(fila, GCOL.estado).setFormula('=' + formulaSegunRegion(formulaBase));
      corregidas++;

    }

    SpreadsheetApp.flush();

    ui.alert(
      '✅ Se corrigió la fórmula de ESTADO GENERAL en ' + corregidas +
      ' fila(s) de "' + GASTOS_HOJA_NOMBRE + '".'
    );

  } finally {
    lock.releaseLock();
  }

}


/**
 * =========================================================
 * OBTENER HOJA (Gastos_Conductores)
 * =========================================================
 */
function obtenerHojaGastos() {

  const hoja = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName(GASTOS_HOJA_NOMBRE);

  if (!hoja) {
    throw new Error(
      'No existe una hoja llamada "' + GASTOS_HOJA_NOMBRE + '". Verifica el nombre exacto de la pestaña.'
    );
  }

  return hoja;

}


/**
 * =========================================================
 * OBTENER LISTAS PARA EL FORMULARIO DE GASTOS
 * =========================================================
 */
function obtenerListasGastos(modo) {

  const modoResuelto = resolverModo(modo);
  const hojaOperaciones = obtenerHojaOperaciones(modoResuelto);
  const inicio = filaInicioDatosPara(modoResuelto);
  const ultimaFila = hojaOperaciones.getLastRow();

  let osDisponibles = [];

  if (ultimaFila >= inicio) {
    osDisponibles = hojaOperaciones
      .getRange(inicio, 2, ultimaFila - (inicio - 1), 1)
      .getValues()
      .map(function(fila) { return (fila[0] || '').toString().trim(); })
      .filter(function(valor) { return valor !== ''; });
  }

  return {
    tiposGasto: GASTOS_CATEGORIAS.map(function(c) { return c.tipo; }),
    osDisponibles: osDisponibles
  };

}


/**
 * =========================================================
 * ENCONTRAR FILA DE UNA OS EN 'Gastos_Conductores'
 * =========================================================
 * Devuelve el número de fila, o -1 si esa OS todavía no tiene
 * fila en esta hoja. NUNCA crea nada — es la función que debe
 * usarse en cualquier consulta de solo lectura.
 */
function encontrarFilaGastosPorOS(hoja, os) {

  const ultimaFila = hoja.getLastRow();

  if (ultimaFila < GASTOS_DATA_START) {
    return -1;
  }

  const valores = hoja
    .getRange(GASTOS_DATA_START, GCOL.os, ultimaFila - GASTOS_DATA_START + 1, 1)
    .getValues();

  const busqueda = os.toUpperCase();

  for (let i = 0; i < valores.length; i++) {

    const osFila = (valores[i][0] || '').toString().trim().toUpperCase();

    if (osFila === busqueda) {
      return GASTOS_DATA_START + i;
    }

  }

  return -1;

}


/**
 * =========================================================
 * CREAR FILA NUEVA EN 'Gastos_Conductores' PARA UNA OS
 * =========================================================
 * Solo se usa si la OS existe en la hoja de operaciones activa (JF o
 * Llano, según el modo) pero todavía no tiene fila en
 * 'Gastos_Conductores' (por ejemplo, una operación agregada después de
 * armar la hoja).
 */
function crearFilaGastosParaOS(hoja, os, modo) {

  const modoResuelto = resolverModo(modo);
  const hojaOps = obtenerHojaOperaciones(modoResuelto);
  const opRow = buscarFilaOperacionPorOS(os, modoResuelto);

  if (opRow === -1) {
    throw new Error(
      'La OS "' + os + '" no existe en la hoja "' + MODOS[modoResuelto].hoja + '". Verifica el número.'
    );
  }

  let filaDestino = GASTOS_DATA_START;

  while (true) {

    const valorOs = hoja.getRange(filaDestino, GCOL.os).getValue();

    if (valorOs === '' || valorOs === null) {
      break;
    }

    filaDestino++;

  }

  // IMPORTANTE: esta función YA NO escribe fórmulas (SI/SUMA/etc.),
  // solo valores planos — así se evita por completo cualquier
  // problema de #NAME?/#ERROR! ligado al idioma de las funciones.
  // Escribe la fecha de la operación y la OS como VALOR (no fórmula).
  // CONDUCTOR, PLACA, TOTAL GASTOS, TOTAL ANTICIPOS, DIFERENCIA y ESTADO
  // quedan en blanco: el usuario pone su propia fórmula una vez en una
  // fila y la arrastra hacia abajo para las filas siguientes.
  const fechaOperacion = hojaOps.getRange(opRow, 1).getValue();

  hoja.getRange(filaDestino, GCOL.fecha).setValue(fechaOperacion);
  hoja.getRange(filaDestino, GCOL.os).setValue(os.toUpperCase());

  SpreadsheetApp.flush();

  return filaDestino;

}


/**
 * =========================================================
 * OBTENER (O CREAR) LA FILA DE GASTOS DE UNA OS
 * =========================================================
 * Solo debe usarse en flujos de ESCRITURA (guardar gasto, agregar
 * anticipo, actualizar). La vista de consulta de solo lectura usa
 * encontrarFilaGastosPorOS() en su lugar, para no crear filas por
 * el simple hecho de consultar.
 */
function obtenerOCrearFilaGastos(hoja, os, modo) {

  const filaExistente = encontrarFilaGastosPorOS(hoja, os);

  if (filaExistente !== -1) {
    return filaExistente;
  }

  return crearFilaGastosParaOS(hoja, os, modo);

}


/**
 * =========================================================
 * GUARDAR GASTOS DE CONDUCTOR (EN LOTE, POR CATEGORÍA)
 * =========================================================
 * Cada categoría marcada SE SUMA a lo que ya tenía esa OS en esa
 * columna (no la reemplaza) — así puedes ir registrando varios
 * peajes o varias cargas de combustible a lo largo del viaje.
 */
function guardarGastosLote(payload) {

  const lock = LockService.getScriptLock();
  const obtuvoLock = lock.tryLock(10000);

  if (!obtuvoLock) {
    throw new Error(
      'El sistema está ocupado guardando otro gasto. Intenta de nuevo en unos segundos.'
    );
  }

  try {
    return guardarGastosLoteInterno(payload);
  } finally {
    lock.releaseLock();
  }

}


function guardarGastosLoteInterno(payload) {

  const datosValidados = validarYNormalizarLoteGastos(payload);

  const hoja = obtenerHojaGastos();
  const fila = obtenerOCrearFilaGastos(hoja, datosValidados.os, datosValidados.modo);

  const tiposGuardados = [];

  datosValidados.items.forEach(function(item) {

    const categoria = GASTOS_CATEGORIAS.filter(function(c) { return c.tipo === item.tipo; })[0];
    const celda = hoja.getRange(fila, categoria.col);
    const valorActual = Number(celda.getValue()) || 0;

    celda.setValue(valorActual + item.valor);
    tiposGuardados.push(item.tipo);

  });

  if (datosValidados.legalizacion) {
    hoja.getRange(fila, GCOL.legalizacion).setValue(datosValidados.legalizacion);
  }

  SpreadsheetApp.flush();

  return {
    mensaje: '✅ Se sumaron ' + tiposGuardados.length + ' gasto(s) (' +
      tiposGuardados.join(', ') + ') a la OS ' + datosValidados.os + '.',
    resumen: obtenerResumenOS(datosValidados.os, datosValidados.modo)
  };

}


/**
 * =========================================================
 * VALIDACIÓN Y NORMALIZACIÓN DEL LOTE DE GASTOS (SERVER-SIDE)
 * =========================================================
 */
function validarYNormalizarLoteGastos(payload) {

  if (!payload || typeof payload !== 'object') {
    throw new Error('No se recibieron los datos del gasto.');
  }

  const limpiar = function(valor) {
    return (valor === null || valor === undefined) ? '' : valor.toString().trim();
  };

  const os = limpiar(payload.os);
  const legalizacion = limpiar(payload.legalizacion);

  if (!os) {
    throw new Error('La OS interna es obligatoria.');
  }

  if (!Array.isArray(payload.items) || payload.items.length === 0) {
    throw new Error('Marca al menos un tipo de gasto (combustible, peajes, % conductor, engrase, etc.).');
  }

  const tiposValidos = GASTOS_CATEGORIAS.map(function(c) { return c.tipo; });

  const items = payload.items.map(function(item) {

    const tipo = limpiar(item && item.tipo);
    const valor = Number(item && item.valor);

    if (tiposValidos.indexOf(tipo) === -1) {
      throw new Error('"' + tipo + '" no es un tipo de gasto válido.');
    }

    if (!valor || isNaN(valor) || valor <= 0) {
      throw new Error('El valor de "' + tipo + '" debe ser mayor a cero.');
    }

    return { tipo: tipo, valor: valor };

  });

  return {
    modo: resolverModo(payload.modo),
    os: os,
    legalizacion: legalizacion,
    items: items
  };

}


/**
 * =========================================================
 * AGREGAR UN ANTICIPO (VALOR + FECHA) A UNA OS
 * =========================================================
 * Usa la primera de las 3 casillas de anticipo que esté libre.
 * Si las 3 ya están ocupadas, avisa para corregir directo en la
 * hoja (por ejemplo, si hubo más de 3 anticipos reales).
 */
function agregarAnticipo(payload) {

  const lock = LockService.getScriptLock();
  const obtuvoLock = lock.tryLock(10000);

  if (!obtuvoLock) {
    throw new Error(
      'El sistema está ocupado guardando otro movimiento. Intenta de nuevo en unos segundos.'
    );
  }

  try {
    return agregarAnticipoInterno(payload);
  } finally {
    lock.releaseLock();
  }

}


function agregarAnticipoInterno(payload) {

  const datosValidados = validarYNormalizarAnticipo(payload);

  const hoja = obtenerHojaGastos();
  const fila = obtenerOCrearFilaGastos(hoja, datosValidados.os, datosValidados.modo);

  const slots = [
    [GCOL.ant1Valor, GCOL.ant1Fecha],
    [GCOL.ant2Valor, GCOL.ant2Fecha],
    [GCOL.ant3Valor, GCOL.ant3Fecha]
  ];

  let slotLibre = null;

  for (let i = 0; i < slots.length; i++) {

    const valorCelda = hoja.getRange(fila, slots[i][0]).getValue();

    if (valorCelda === '' || valorCelda === null) {
      slotLibre = slots[i];
      break;
    }

  }

  if (!slotLibre) {
    throw new Error(
      'La OS ' + datosValidados.os + ' ya tiene los 3 anticipos permitidos registrados. ' +
      'Corrige uno existente directamente en la hoja "Gastos_Conductores" si hubo un anticipo adicional.'
    );
  }

  let fechaGuardar = datosValidados.fecha;
  const partes = datosValidados.fecha.split('-');

  if (partes.length === 3) {
    fechaGuardar = new Date(
      Number(partes[0]),
      Number(partes[1]) - 1,
      Number(partes[2])
    );
  }

  hoja.getRange(fila, slotLibre[0]).setValue(datosValidados.valor);
  hoja.getRange(fila, slotLibre[1]).setValue(fechaGuardar);

  SpreadsheetApp.flush();

  return {
    mensaje: '✅ Anticipo de ' + datosValidados.valor + ' registrado para la OS ' + datosValidados.os + '.',
    resumen: obtenerResumenOS(datosValidados.os, datosValidados.modo)
  };

}


function validarYNormalizarAnticipo(payload) {

  if (!payload || typeof payload !== 'object') {
    throw new Error('No se recibieron los datos del anticipo.');
  }

  const limpiar = function(valor) {
    return (valor === null || valor === undefined) ? '' : valor.toString().trim();
  };

  const os = limpiar(payload.os);
  const fecha = limpiar(payload.fecha);
  const valor = Number(payload.valor);

  if (!os) {
    throw new Error('La OS interna es obligatoria.');
  }

  if (!fecha) {
    throw new Error('La fecha del anticipo es obligatoria.');
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    throw new Error('El formato de fecha no es válido.');
  }

  if (!valor || isNaN(valor) || valor <= 0) {
    throw new Error('El valor del anticipo debe ser mayor a cero.');
  }

  return { modo: resolverModo(payload.modo), os: os, fecha: fecha, valor: valor };

}


/**
 * =========================================================
 * ACTUALIZAR (SOBRESCRIBIR) GASTOS Y ANTICIPOS DE UNA OS
 * =========================================================
 * A diferencia de guardarGastosLote() y agregarAnticipo() (que
 * SUMAN / ocupan el siguiente slot libre), esta función REEMPLAZA
 * directamente el valor que hubiera en cada celda por el nuevo que
 * llega del formulario de edición. Se usa para corregir un gasto o
 * anticipo que ya se había registrado mal.
 *
 * payload = {
 *   os: 'JF-205',
 *   modo: 'JF',
 *   categorias: [{ tipo: 'Combustible', valor: 120000 }, ...]   // opcional, solo las que cambian
 *   anticipos: [{ valor: 500000, fecha: '2026-08-10' }, { valor: 0, fecha: '' }, null]
 *              // hasta 3 posiciones (slot 1, 2, 3). null/undefined = no tocar ese slot.
 *              // valor 0 o vacío = borra ese anticipo (valor y fecha).
 * }
 */
function actualizarGastosOS(payload) {

  const lock = LockService.getScriptLock();
  const obtuvoLock = lock.tryLock(10000);

  if (!obtuvoLock) {
    throw new Error(
      'El sistema está ocupado guardando otro cambio. Intenta de nuevo en unos segundos.'
    );
  }

  try {
    return actualizarGastosOSInterno(payload);
  } finally {
    lock.releaseLock();
  }

}


function actualizarGastosOSInterno(payload) {

  if (!payload || typeof payload !== 'object') {
    throw new Error('No se recibieron los datos a actualizar.');
  }

  const os = payload.os ? payload.os.toString().trim() : '';
  const modoResuelto = resolverModo(payload.modo);

  if (!os) {
    throw new Error('La OS interna es obligatoria.');
  }

  const hoja = obtenerHojaGastos();
  const fila = obtenerOCrearFilaGastos(hoja, os, modoResuelto);

  const tiposValidos = GASTOS_CATEGORIAS.map(function(c) { return c.tipo; });
  let categoriasActualizadas = 0;

  (payload.categorias || []).forEach(function(item) {

    if (!item || item.tipo === undefined || item.tipo === null) {
      return;
    }

    const tipo = item.tipo.toString().trim();
    const categoria = GASTOS_CATEGORIAS.filter(function(c) { return c.tipo === tipo; })[0];

    if (!categoria) {
      throw new Error('"' + tipo + '" no es un tipo de gasto válido.');
    }

    const valor = Number(item.valor);

    if (isNaN(valor) || valor < 0) {
      throw new Error('El valor de "' + tipo + '" no es válido.');
    }

    hoja.getRange(fila, categoria.col).setValue(valor);
    categoriasActualizadas++;

  });

  const slots = [
    [GCOL.ant1Valor, GCOL.ant1Fecha],
    [GCOL.ant2Valor, GCOL.ant2Fecha],
    [GCOL.ant3Valor, GCOL.ant3Fecha]
  ];

  let anticiposActualizados = 0;

  (payload.anticipos || []).forEach(function(item, i) {

    if (!item || i > 2) {
      return;
    }

    const [colValor, colFecha] = slots[i];
    const valor = Number(item.valor) || 0;

    if (valor <= 0) {
      // Sin valor: se borra ese anticipo (valor y fecha).
      hoja.getRange(fila, colValor).setValue('');
      hoja.getRange(fila, colFecha).setValue('');
      anticiposActualizados++;
      return;
    }

    const fechaTexto = item.fecha ? item.fecha.toString().trim() : '';
    let fechaGuardar = fechaTexto;
    const partes = fechaTexto.split('-');

    if (partes.length === 3) {
      fechaGuardar = new Date(Number(partes[0]), Number(partes[1]) - 1, Number(partes[2]));
    }

    hoja.getRange(fila, colValor).setValue(valor);
    hoja.getRange(fila, colFecha).setValue(fechaGuardar);
    anticiposActualizados++;

  });

  if (categoriasActualizadas === 0 && anticiposActualizados === 0) {
    throw new Error('No hay ningún cambio para guardar.');
  }

  SpreadsheetApp.flush();

  return {
    mensaje: '✅ Se actualizaron los datos de la OS ' + os + '.',
    resumen: obtenerResumenOS(os, modoResuelto)
  };

}


/**
 * =========================================================
 * ARMAR EL RESUMEN DE GASTOS A PARTIR DE UNA FILA YA CONOCIDA
 * =========================================================
 * Helper compartido entre obtenerResumenOS() (pestaña "Gastos por
 * conductor", que sí puede crear la fila si hace falta) y
 * consultarOperacionCompleta() (pestaña "Consultar Operación", que es
 * de solo lectura). Ya NO incluye manifiesto/remesa/factura: esos
 * documentos se muestran en la vista de consulta a partir de la hoja
 * de operación, no de aquí.
 */
function construirResumenGastos(hoja, fila, textoOS) {

  const rango = hoja.getRange(fila, 1, 1, GASTOS_NUM_COLUMNAS).getValues()[0];

  const leerFecha = function(valor) {
    if (valor instanceof Date) {
      return Utilities.formatDate(valor, Session.getScriptTimeZone(), 'yyyy-MM-dd');
    }
    return valor || '';
  };

  const categorias = GASTOS_CATEGORIAS.map(function(c) {
    return { tipo: c.tipo, valor: Number(rango[c.col - 1]) || 0 };
  });

  const anticipos = [
    { valor: Number(rango[GCOL.ant1Valor - 1]) || 0, fecha: leerFecha(rango[GCOL.ant1Fecha - 1]) },
    { valor: Number(rango[GCOL.ant2Valor - 1]) || 0, fecha: leerFecha(rango[GCOL.ant2Fecha - 1]) },
    { valor: Number(rango[GCOL.ant3Valor - 1]) || 0, fecha: leerFecha(rango[GCOL.ant3Fecha - 1]) }
  ].filter(function(a) { return a.valor > 0; });

  // Igual que 'anticipos' pero SIN filtrar — siempre trae los 3 slots
  // (aunque estén vacíos), para que el formulario de edición pueda
  // mostrar y sobrescribir cada uno de los 3 anticipos posibles.
  const anticiposSlots = [
    { valor: Number(rango[GCOL.ant1Valor - 1]) || 0, fecha: leerFecha(rango[GCOL.ant1Fecha - 1]) },
    { valor: Number(rango[GCOL.ant2Valor - 1]) || 0, fecha: leerFecha(rango[GCOL.ant2Fecha - 1]) },
    { valor: Number(rango[GCOL.ant3Valor - 1]) || 0, fecha: leerFecha(rango[GCOL.ant3Fecha - 1]) }
  ];

  return {
    os: rango[GCOL.os - 1] || textoOS,
    conductor: rango[GCOL.conductor - 1] || '',
    placa: rango[GCOL.placa - 1] || '',
    fecha: leerFecha(rango[GCOL.fecha - 1]),
    categorias: categorias,
    totalGastos: Number(rango[GCOL.totalGastos - 1]) || 0,
    anticipos: anticipos,
    anticiposSlots: anticiposSlots,
    espaciosAnticipoLibres: 3 - anticipos.length,
    totalAnticipos: Number(rango[GCOL.totalAnticipos - 1]) || 0,
    diferencia: Number(rango[GCOL.diferencia - 1]) || 0,
    legalizacion: rango[GCOL.legalizacion - 1] || '',
    estado: rango[GCOL.estado - 1] || ''
  };

}


/**
 * =========================================================
 * OBTENER RESUMEN DE UNA OS (fila completa de Gastos_Conductores)
 * =========================================================
 * Crea la fila si todavía no existe (siempre que la OS sí exista
 * en la hoja de operaciones activa), y devuelve el desglose por
 * categoría, los 3 anticipos, totales, legalización y estado general.
 * Ya no muestra manifiesto/remesa/factura: eso se consulta en la
 * pestaña "🔎 Consultar Operación".
 */
function obtenerResumenOS(os, modo) {

  const texto = os ? os.toString().trim() : '';

  if (!texto) {
    throw new Error('Escribe una OS interna para ver su resumen.');
  }

  const hoja = obtenerHojaGastos();
  const fila = obtenerOCrearFilaGastos(hoja, texto, modo);

  return construirResumenGastos(hoja, fila, texto);

}


/**
 * =========================================================
 * BUSCAR LA FILA (1-based) DE UNA OS EN LA HOJA DE OPERACIÓN ACTIVA
 * =========================================================
 * Devuelve -1 si no existe. Recorre 'operaciones' o 'Control_llano'
 * según el modo indicado.
 */
function buscarFilaOperacionPorOS(os, modo) {

  const modoResuelto = resolverModo(modo);
  const hojaOps = obtenerHojaOperaciones(modoResuelto);
  const inicio = filaInicioDatosPara(modoResuelto);
  const datosOps = hojaOps.getDataRange().getValues();
  const busqueda = os.toString().trim().toUpperCase();

  for (let i = inicio - 1; i < datosOps.length; i++) {

    const osExistente = (datosOps[i][COL_OS] || '').toString().trim().toUpperCase();

    if (osExistente === busqueda) {
      return i + 1;
    }

  }

  return -1;

}


/**
 * =========================================================================
 * =========================================================================
 *   CONSULTAR OPERACIÓN — vista agrupada de solo lectura
 * =========================================================================
 * =========================================================================
 *
 * Reúne conductor/vehículo, datos del viaje, documentos (remesa,
 * manifiesto, cumplido, factura) desde la hoja de operación activa, y
 * gastos/legalización desde 'Gastos_Conductores' — todo en un solo
 * llamado, para la pestaña "🔎 Consultar Operación".
 *
 * ES DE SOLO LECTURA: usa encontrarFilaGastosPorOS() (nunca
 * obtenerOCrearFilaGastos()), así que jamás crea una fila nueva en
 * 'Gastos_Conductores' solo porque el usuario consultó una OS.
 */
function consultarOperacionCompleta(os, modo) {

  const texto = os ? os.toString().trim() : '';

  if (!texto) {
    throw new Error('Escribe una OS interna para consultar.');
  }

  const modoResuelto = resolverModo(modo);
  const opRow = buscarFilaOperacionPorOS(texto, modoResuelto);

  if (opRow === -1) {
    return {
      encontrada: false,
      os: texto,
      modo: modoResuelto
    };
  }

  const hojaOps = obtenerHojaOperaciones(modoResuelto);
  const filaOp = hojaOps.getRange(opRow, 1, 1, NUM_COLUMNAS_TABLA).getValues()[0];

  const leerFechaOp = function(valor) {
    if (valor instanceof Date) {
      return Utilities.formatDate(valor, Session.getScriptTimeZone(), 'yyyy-MM-dd');
    }
    return valor || '';
  };

  const operacion = {
    fecha: leerFechaOp(filaOp[0]),
    os: filaOp[1] || '',
    estadoFacturacion: filaOp[2] || '',
    estadoOperacion: filaOp[3] || '',
    placa: filaOp[4] || '',
    ruta: filaOp[5] || '',
    carga: filaOp[6] || '',
    cliente: filaOp[7] || '',
    conductor: filaOp[8] || '',
    placaTrailer: filaOp[10] || '', // columna K (índice 0-based 10)
    valorFlete: filaOp[12] || '',    // columna M
    documentos: {
      remesa: filaOp[DOC_COL.remesa - 1] || '',
      manifiesto: filaOp[DOC_COL.manifiesto - 1] || '',
      cumplido: filaOp[DOC_COL.cumplido - 1] || '',
      factura: filaOp[DOC_COL.factura - 1] || ''
    }
  };

  const hojaGastos = obtenerHojaGastos();
  const filaGastos = encontrarFilaGastosPorOS(hojaGastos, texto);
  const gastos = filaGastos === -1 ? null : construirResumenGastos(hojaGastos, filaGastos, texto);

  return {
    encontrada: true,
    os: texto,
    modo: modoResuelto,
    operacion: operacion,
    gastos: gastos
  };

}
