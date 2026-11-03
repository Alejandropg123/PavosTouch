# 05 · Traspaso a otro chat — EventosApp (Excalibur Producciones)

> Documento para continuar el proyecto **EventosApp** en un chat nuevo sin perder contexto.
> Pega el bloque de la sección 1 como primer mensaje del chat nuevo.

---

## 1. Mensaje para pegar en el chat nuevo

```
Vamos a construir EventosApp para Excalibur Producciones.
Antes de escribir código, lee estos archivos del repositorio
Alejandropg123/pavostouch, rama claude/events-company-project-structure-dcxgfb:

- PROYECTO.md  → requisitos completos (flujo, roles, reglas, etapas)
- eventosapp-assets/MARCA_Y_DATOS_EJEMPLO.md → colores, tipografía, numeración y datos de ejemplo
- eventosapp-assets/logo_excalibur.png → logo
- docs/05_TRASPASO_A_OTRO_CHAT.md (rama ccr-5d20ff77-uypnis) → este resumen

Usa como referencia técnica la app ControlOps (carpeta transporte/ en la rama main
de ese mismo repositorio, o el repositorio Alejandropg123/controlops).

Empezamos por la Etapa 1. Preséntame el plan y espera mi visto bueno antes de construir.
```

---

## 2. Qué es EventosApp

App web interna (PWA, responsive) para **Excalibur Producciones**, empresa que alquila sonido,
pantallas, mesas, tarimas y carpas y hace eventos completos. Gestiona todo el ciclo:
**cotizar → confirmar → agendar → alistar → operar → cobrar → controlar gastos**, con todo
colgando de un número de **OS** (orden de servicio).

- Nombre visible de la app: **Excalibur**.
- Solo personal interno, con inicio de sesión. Sin web pública ni acceso de clientes.

## 3. Estado actual

| Tema | Estado |
|---|---|
| Requisitos | ✅ Definidos en `PROYECTO.md` (entrevista terminada) |
| Marca y datos de ejemplo | ✅ En `eventosapp-assets/` (logo en baja resolución, colores medidos de la imagen) |
| Código | ❌ No hay código todavía |
| Repositorio propio `EventosApp` | ❌ Por crear (hoy los archivos viven en PavosTouch) |
| Supabase / Vercel para EventosApp | ❌ Por crear |

Ubicación de los archivos hoy (repositorio `Alejandropg123/pavostouch`):

- Rama `claude/events-company-project-structure-dcxgfb`: `PROYECTO.md`, `eventosapp-assets/MARCA_Y_DATOS_EJEMPLO.md`, `eventosapp-assets/logo_excalibur.png`.
- Rama `main`, carpeta `transporte/`: app **ControlOps**, que sirve de base técnica.

## 4. Decisiones ya tomadas (no volver a discutir)

- **Solo Gerencia** puede pulsar "Confirmar y operar" y crear OS directas.
- Las **OS empiezan en 610** y son consecutivas. Cotizaciones propuestas como `COT-0001` (por confirmar).
- Una OS puede nacer **sin cotización** (queda marcada así).
- **El precio no es fijo:** el del catálogo es solo referencia; editar una línea de cotización no toca el catálogo.
- **IVA por defecto**, desactivable por excepción.
- **Pagos y alertas no bloquean nada**: solo informan.
- **Disponibilidad por fechas**, con traslado directo de equipos entre OS.
- **Facturas en Siigo**: en la app solo se anota el número, sin PDFs.
- **Cada gasto es una fila**; el libro columnario es una vista generada, descargable a Excel.
- Cédula y datos bancarios: solo **Gerencia y Contabilidad**.

Roles: **Gerencia** (todo), **Contabilidad** (cotizaciones, cobros, gastos, bancos),
**Operativo** (OS, agenda, hojas de ruta; sin finanzas), **Bodega** (inventario y checklists; sin precios).

## 5. Base técnica sugerida (igual que ControlOps)

- HTML + CSS + JavaScript sin framework, instalable como PWA (`manifest.webmanifest`, `sw.js`).
- **Supabase**: base de datos, usuarios, roles y archivos. Registro público apagado; usuarios invitados.
  Permisos por rol con políticas RLS en `supabase/schema.sql`.
- Librerías incluidas localmente (sin CDN), como `vendor/supabase.js` en ControlOps.
- **Modo demostración** con datos de ejemplo cuando `config.js` está vacío, para las vistas previas.
- Publicación en **Vercel**. Guía paso a paso como `transporte/DESPLIEGUE.md`.

## 6. Plan por etapas

1. **Etapa 1:** base, login, roles, catálogo, clientes, cotización con PDF y botón "Confirmar y operar".
2. **Etapa 2:** agenda (calendario, tablero y lista), checklists de operación y bodega, personal, vehículos, proveedores y alertas.
3. **Etapa 3:** cobros, gastos por OS, libro columnario y utilidad.
4. **Etapa 4:** carga masiva del inventario, recetas de piezas, mantenimiento y daños, publicidad y freelance.

## 7. Pendientes que necesitan respuesta del dueño

- Formato oficial de la cotización (por ahora se usa uno general).
- Excel del inventario (3.000 a 4.000 elementos): se carga después.
- Ejemplo real del libro columnario (por ahora, unos 35 rubros de borrador).
- Confirmar el formato `COT-0001` y el amarillo de alertas `#FFC61A`.
- Reglas de descuentos (por ahora, línea manual).
- Trajes y vajilla (por talla o prenda): sin definir.
- Autorización de datos personales (Ley 1581 de 2012) y protección de datos bancarios.
- Logo original en SVG o PNG de buena resolución.

## 8. Antes de construir (lo hace el dueño)

1. Crear el repositorio `EventosApp` vacío en GitHub.
2. Crear un proyecto nuevo en Supabase (región São Paulo) y otro en Vercel.
3. Abrir el chat nuevo de Claude Code con `EventosApp` y, como referencia, `controlops` o `pavostouch`.
4. Copiar a `EventosApp` los archivos `PROYECTO.md` y la carpeta `eventosapp-assets/`.

## 9. Forma de trabajo

- Español, sin jerga. El dueño no es programador: guiar paso a paso.
- Presentar el plan antes de construir y esperar el visto bueno.
- Siempre una **vista previa con datos de ejemplo** antes de publicar. Publicar solo cuando diga **"publícala"**.
- Probar en computador (1440 px) y celular (390 px), en tema oscuro y claro.
- Marca: negro `#0B0B0D` y grafito `#17181B` de base, rojo `#E00616` como principal,
  plateado `#A9A6A7` en detalles y amarillo `#FFC61A` solo para alertas y vencimientos.
  El logo va sobre fondo oscuro (en tema claro y en el PDF, sobre una franja negra).
