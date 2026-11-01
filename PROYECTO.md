# EventosApp — Excalibur Producciones

> Nombre visible de la app: **Excalibur**. Logo, colores y datos de ejemplo en `eventosapp-assets/`.

App web interna para gestionar el ciclo completo de un evento: cotizar, confirmar, agendar, alistar equipos, operar, cobrar y controlar gastos.

> **Estado:** definición de requisitos (entrevista). Todavía no hay código.
> **Referencia técnica:** repositorio `Alejandropg123/controlops` (`PROYECTO.md`, `CLAUDE.md`, `BASE_PARA_NUEVOS_PROYECTOS.md`).

---

## 1. Objetivo del proceso
Reemplazar el manejo disperso en Excel por una sola app, con trazabilidad por número de **OS**, control de inventario, personal y vehículos, y utilidad por evento.

La empresa alquila sonido, pantallas, mesas, tarimas y carpas, y hace eventos y espectáculos completos.

## 2. Usuarios
Solo personal interno, con inicio de sesión obligatorio. No hay web pública ni acceso para clientes. Es una web responsive (computador, tablet y celular), instalable como PWA.

| Rol | Ve y hace (borrador, a afinar) |
|---|---|
| **Gerencia** | Todo, incluidos finanzas y usuarios. **Es la única que puede pulsar "Confirmar y operar".** |
| **Contabilidad** | Cotizaciones y precios, facturas, cobros, gastos y datos bancarios. |
| **Operativo** | OS, agenda y hojas de ruta. No ve finanzas. |
| **Bodega** | Inventario y checklists de despacho e ingreso. No ve precios ni finanzas. |

## 3. Flujo paso a paso
1. **Cotización:** se arma eligiendo elementos del catálogo. Se edita descripción, cantidad y precio en cada línea, y se pueden agregar líneas libres. IVA por defecto, con excepciones. PDF con la marca de Excalibur. Queda guardada.
2. **Confirmación interna:** se hace por fuera de la app.
3. **Botón "Confirmar y operar":** crea la **OS**, un número consecutivo que identifica al evento (ej.: "6140, Ecopetrol en Yopal"). Si no hubo cotización, la OS se crea directamente y queda marcada "sin cotización".
4. **Operaciones:** agenda en **calendario, tablero y lista agrupada**. Se asignan fecha, personal, vehículos y elementos. Las fechas se pueden mover, con historial de cambios.
5. **Alertas (sin bloqueo):** faltante de stock por fechas, vacantes de personal sin asignar, vehículos con documentos vencidos.
6. **Checklist:** documento interno por OS, con dos versiones.
   - **Operación:** nombres comerciales y cantidades, encargado del evento, vehículos, personal, horarios y datos del evento.
   - **Bodega:** desglose completo de piezas. El bodeguero alista, marca la salida y recibe al regreso.
7. **Evento realizado.**
8. **Factura:** se hace en Siigo. En la app solo se anota el número o nombre de la factura (sin subir PDFs).
9. **Cobro:** abonos y saldo, como en ControlOps.
10. **Recogida:** el checklist de ingreso compara lo que volvió con lo que salió. Se registran faltantes y daños. Si el equipo pasa directo a otro evento, se registra como **traslado directo** (ej.: "de la OS 6140 a la 6150").
11. **Gastos por OS:** los registra contabilidad. Con ellos se calcula la utilidad y el libro columnario.

## 4. Inputs necesarios
- **Catálogo de elementos:** producto o servicio, descripción, elementos que lo componen (texto), precio de referencia opcional y stock total.
- **Cinco bases maestras:**
  - **Clientes:** nombre o razón social, documento, contacto.
  - **Personal:** empleados y freelancers.
  - **Vehículos:** propios y de terceros.
  - **Proveedores:** contacto, qué ofrecen y datos de pago.
  - **Elementos de bodega:** el catálogo anterior.
- **Por cada cotización:** cliente, evento, fecha, lugar, líneas, IVA y condiciones.
- **Gastos:** OS, fecha, rubro, valor, proveedor o persona y nota.

**Datos del personal:** nombre, cédula, teléfono, correo, dirección, datos bancarios, cargo o especialidad, tipo (empleado o freelance), afiliación ARL con fechas y, si conduce, licencia con vencimiento.

**Documentos de vehículos:** SOAT, tecnomecánica y seguro, con vencimiento.

## 5. Outputs esperados
- PDF de cotización con la marca de Excalibur.
- Checklist de operación y checklist de bodega.
- Agenda en tres vistas.
- Alertas de stock, personal y documentos por vencer.
- Saldo por cobrar por OS.
- **Libro columnario:** resumen de gastos por rubro, descargable a Excel.
- Utilidad por OS (cobrado menos gastos).
- Historial por cliente, por freelancer y por vehículo.

## 6. Reglas principales
- **La OS es una llave:** nace al confirmar una cotización o al crearse directa. Todo cuelga de ella.
- **El precio no es fijo.** Depende del cliente y del lugar. El del catálogo es solo referencia. Lo editado en una cotización no afecta al catálogo ni a otras cotizaciones.
- **IVA por defecto,** que se puede desactivar en excepciones negociadas.
- **Solo Gerencia confirma y opera:** el botón "Confirmar y operar" (y crear una OS directa) es exclusivo de Gerencia.
- **Los pagos no bloquean:** anticipo, pago total y crédito son solo información. Gerencia conoce y avala cada evento por fuera de la app.
- **Las alertas avisan, nunca bloquean.**
- **Disponibilidad por fechas,** no por conteo rígido de bodega. Un equipo puede pasar directo de un evento a otro.
- **El bodeguero** alista y recibe todo lo de cada evento.
- **Las facturas viven en Siigo.** No se suben PDFs a la app.
- **Cada gasto es una fila.** El libro columnario es una vista generada, no 300 columnas guardadas.
- **Datos sensibles** (cédula, datos bancarios) solo visibles para Gerencia y Contabilidad.

## 7. Excepciones y casos límite
- OS sin cotización previa.
- Eventos que se adelantan o se atrasan, con historial de fechas.
- Faltante de stock, que se resuelve alquilando a un proveedor.
- Vacantes de personal sin nombre hasta último momento.
- Trabajadores de cualquier cargo (contador, administrativos) que salen a eventos.
- Gastos que no aparecen en el checklist.
- Eventos con muchos rubros (hasta 200 o 300).
- Vehículos de terceros con documentos propios.
- Descuentos negociados, que se manejan como una línea manual.

## 8. Criterios de calidad
- Se genera una cotización en PDF en pocos minutos, sin retipear.
- "Confirmar y operar" crea la OS con todos los datos cargados.
- El checklist se imprime o se ve en el celular, completo y legible.
- Las alertas de faltantes dicen qué falta, qué día y qué OS lo causan.
- Cada rol ve solo lo que le corresponde.
- Funciona en computador, tablet y celular.
- El libro columnario cuadra con el detalle de gastos.

## 9. Riesgos o ambigüedades pendientes
- **Formato oficial de cotización:** se empieza con uno general y se reemplaza cuando se tenga.
- **Excel del inventario** (3.000 a 4.000 elementos): sin acceso por ahora. Se carga después.
- **Libro columnario real:** no hay ejemplo. Se usa un catálogo inicial de unos 35 rubros, a ajustar.
- **Colores exactos de la marca:** se aproximan desde la foto (negro, rojo, plateado/gris y amarillo para alertas).
- **Numeración:** las OS empiezan en **610**. Falta confirmar el formato de las cotizaciones (propuesto: COT-0001).
- **Descuentos:** sin reglas definidas.
- **Trajes y vajilla:** casos especiales (por talla, por prenda) sin abordar.
- **Datos personales:** hace falta autorización de tratamiento (Ley 1581 de 2012) y revisar cómo se protege la información bancaria.

### Catálogo inicial de rubros de gasto (borrador)
| Categoría | Rubros |
|---|---|
| Personal | Técnicos de sonido, técnicos de luces, operadores de pantalla, logística y montaje, conductores, seguridad social y ARL |
| Transporte | Combustible, peajes, alquiler de vehículos, parqueadero, fletes |
| Alquileres a proveedores | Equipos de sonido, pantallas, tarimas y carpas, mobiliario, plantas eléctricas |
| Alimentación y alojamiento | Alimentación del equipo, hospedaje, viáticos |
| Compras y consumibles | Cinta, cables y conectores, repuestos, papelería, otros materiales |
| Permisos y legal | Permisos, pólizas, Sayco-Acinpro, impuestos del evento |
| Publicidad y diseño | Diseño, impresión, pauta, freelance creativo |
| Imprevistos | Reposición de daños, multas, gastos varios |

## 10. Siguiente acción recomendada
**Antes de construir:**
1. Crear el repositorio `EventosApp` vacío en GitHub.
2. Crear un proyecto nuevo en Supabase y uno en Vercel.
3. Abrir una sesión de Claude Code con `EventosApp` y `controlops` (de referencia).

**Construcción por etapas** (con vista previa con datos de ejemplo antes de publicar):
- **Etapa 1:** base, login, roles, catálogo, clientes, cotización con PDF y botón "Confirmar y operar".
- **Etapa 2:** agenda (calendario, tablero y lista), checklists, personal, vehículos, proveedores y alertas.
- **Etapa 3:** cobros, gastos por OS, libro columnario y utilidad.
- **Etapa 4:** carga masiva del inventario, recetas de piezas, mantenimiento y daños, publicidad y freelance.

## Para después (fuera de la primera versión)
- Mantenimiento y daños de equipos.
- Publicidad y freelance como servicios aparte.
- Recetas de piezas y control por unidad con código.
- Carga masiva del inventario desde Excel.

## Forma de trabajo
- Español, sin jerga. El dueño no es programador: guiar paso a paso.
- Siempre una vista previa con datos de ejemplo antes de publicar. Publicar solo cuando diga "publícala".
- Presentar el plan antes de construir y esperar el visto bueno.
- Probar en computador (1440 px) y celular (390 px), en tema oscuro y claro.
- Marca: negro y grafito de base, rojo como color principal, plateado para detalles y amarillo solo para alertas y vencimientos.
