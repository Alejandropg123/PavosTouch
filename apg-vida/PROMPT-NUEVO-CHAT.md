Hola. Seguimos mejorando mi app personal **APG VIDA**. No soy programador: explícame paso a paso, en español simple, y dime qué botón tocar.

**Dónde está**
- App: https://apg-vida.vercel.app (PWA, la uso en Android y PC, una sola cuenta: yo).
- Código: repo `Alejandropg123/PavosTouch`, carpeta `apg-vida/`. No tocar `transporte/` ni el `index.html` raíz (son otras apps).
- Contexto completo en `apg-vida/CONTEXTO.md`: léelo solo si necesitas más detalle.

**Cómo se hace un cambio**: rama → commit → pull request a `main` → yo lo apruebo (FUSIONAR) → Vercel publica solo. Subir la versión de caché en `sw.js` (`apg-vida-vN`) si cambia la interfaz. Probar antes en modo demostración (`config.js` vacío + `python3 -m http.server` + Playwright 390×844).

**Tecnología**: HTML/CSS/JS puro, sin build. `app.js` (vistas `vistaX()` que devuelven HTML, acciones `data-act` → `ACCIONES`, formularios `data-form` → `FORMULARIOS`, selectores `data-cambio`, rutas `#/vista/param`, formularios por pasos con `wizard()`), `data.js` (`Datos.crear/editar/borrar`, cuenta, archivos, datos demo), `styles.css`, `vercel.json` (CSP estricta: nada de `onclick` ni `<script>` en línea). Texto del usuario siempre con `esc()`. PDF con jsPDF en `vendor/`.

**Marca**: Grafito #111214, Carbón #2A2D31, Verde #14C47F (texto #0B8A56, sobre negro #2EE59D), Humo #F1F2F2 / #5B6068. Montserrat (títulos) + Lato (texto).

**Supabase**: proyecto `apg-vida` (id `jvcydooqmiqxvghhqjke`, plan gratis; `excalibur-eventos` pausado para liberar cupo). Tablas: categorias (tipo lista|pago|medio|carpeta), tareas, habitos, habito_registros, pagos, pago_historial, documentos. RLS por usuario, bucket privado `documentos` (PDF/imágenes, 20 MB), trigger de una sola cuenta. Preferencias en `user_metadata`: nombre, estiloInicio, cuadros, bloqueoHab. Mantener `supabase/schema.sql` al día. Solo la clave pública en `config.js`.

**Funciones actuales**
- Inicio (estilo Agenda): píldoras, lista "Tu día" (tareas/pagos/docs con acción), fila de hábitos, botón flotante +.
- Tareas: Lista / Calendario / Matriz Eisenhower (urgente×importante), formulario por pasos, listas con color, repetición.
- Hábitos: Hoy / Semana / Mes, solo check (ejercicio con tiempo y reps), color, momento, meta, rachas, días anteriores bloqueados.
- Pagos recurrentes: resumen semana/mes por categoría o medio; formulario Categoría → Gasto → Valor+frecuencia+medio → Fecha; medios Nequi, Bancolombia, Tarjeta, Efectivo.
- Baúl: Carpetas / Lista / Kanban, ficha con vencimiento y archivos, vista Vencimientos.
- Informes PDF de hábitos, tareas, documentos y pagos.

**Decisiones**: sin IA, hábitos solo check, finanzas solo pagos recurrentes, sin correo/calendario conectados por ahora.

**Pendiente**: avisos al celular y correo (3 días antes de pagos, 30 días antes de vencimientos); verificar Site URL en Supabase = https://apg-vida.vercel.app; ideas: hábitos de "dejar de hacer algo", modo oscuro.

**Lo que quiero ahora**: [escribe aquí tu idea]
