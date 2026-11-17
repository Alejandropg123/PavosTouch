# APG VIDA · contexto para seguir trabajando

Léelo al empezar una conversación nueva sobre la app. Resume qué es, cómo está hecha, qué se decidió y qué falta.

## Qué es
App personal de **Alejandro** (dueño de la marca APG) para organizar su vida en un solo lugar.
Uso: celular (Android, navegador Huawei) y computador, sincronizada. **Una sola cuenta** (solo él).
Idioma: español de Colombia, trato cercano. Él no es programador: explicarle paso a paso y en lenguaje simple.

- App en línea: **https://apg-vida.vercel.app**
- Código: repositorio `Alejandropg123/PavosTouch`, carpeta **`apg-vida/`** (el resto del repo son otras apps: `transporte/` = ControlOps y `index.html` raíz = PavosTouch; no tocarlas).

## Cómo se publica un cambio
1. Trabajar en una rama, hacer commit y push.
2. Abrir un pull request a `main`.
3. Alejandro lo aprueba en la app de GitHub del celular (botón verde **FUSIONAR**, sin tocar la flechita).
4. Vercel publica solo en 1–2 minutos (proyecto `apg-vida`, equipo APG GENESIS, Root Directory `apg-vida`).
5. Subir la versión de la caché en `sw.js` (`apg-vida-vN`) cuando cambie la interfaz.

## Tecnología
- **Sin framework ni build**: HTML + CSS + JavaScript puro. App instalable (PWA: `manifest.webmanifest`, `sw.js`).
- `index.html` (marco) · `styles.css` · `data.js` (datos, cuenta, archivos, datos de ejemplo) · `app.js` (todas las vistas y acciones) · `config.js` (URL y clave pública de Supabase).
- Interfaz por cadenas HTML: cada vista es una función `vistaX()` que devuelve HTML. Todo texto del usuario pasa por `esc()`.
- Eventos por delegación: botones con `data-act="..."` → objeto `ACCIONES`; formularios con `data-form` → `FORMULARIOS`; selectores con `data-cambio`.
- Rutas con `#/vista/param` (inicio, tareas, habitos, habito, pagos, baul, carpeta, documento, vencimientos, ajustes).
- `Datos.crear / editar / borrar(tabla, …)`: actualiza la pantalla al instante y guarda en Supabase; si falla, deshace.
- Formularios **por pasos**: helper `wizard(pasos, opciones)` + `moverWizard()`.
- Informes PDF: jsPDF + autotable en `vendor/`, cargados solo al pedir un informe (`generarInforme(tipo)`).
- **Modo demostración**: si `config.js` está vacío, usa datos de ejemplo en el navegador. Para probar: copiar la carpeta a un directorio temporal con `config.js` vacío y servirla con `python3 -m http.server`; probar con Playwright (viewport 390×844).
- Marca APG: Negro Grafito `#111214`, Carbón `#2A2D31`, Verde Impulso `#14C47F` (texto `#0B8A56`, sobre negro `#2EE59D`), Gris Humo `#F1F2F2` / `#5B6068`. Fuentes Montserrat (títulos) y Lato (texto).

## Supabase (base de datos, cuenta y archivos)
- Proyecto **`apg-vida`**, id `jvcydooqmiqxvghhqjke`, región São Paulo, organización APG GENESIS (plan gratuito: máximo 2 proyectos activos; `excalibur-eventos` quedó **pausado** para liberar el cupo).
- Esquema completo en `supabase/schema.sql` (mantenerlo al día con cada cambio que se aplique).
- Tablas: `categorias` (tipo `lista` | `pago` | `medio` | `carpeta`), `tareas`, `habitos`, `habito_registros`, `pagos`, `pago_historial`, `documentos`.
- Seguridad: RLS en todas las tablas (cada usuario solo ve lo suyo); bucket privado `documentos` (solo PDF e imágenes, 20 MB) con carpeta por usuario; trigger que **impide crear más de una cuenta**.
- Preferencias pequeñas en `user_metadata` de la cuenta: `nombre`, `estiloInicio`, `cuadros` (nombres de la matriz), `bloqueoHab`.
- En `config.js` solo va la clave **pública** (`sb_publishable_…`). Nunca poner la `service_role` ni claves secretas.
- `vercel.json` pone cabeceras de seguridad (CSP sin scripts en línea: no usar `onclick=` ni `<script>` en línea; agregar dominios nuevos a la CSP si hacen falta).

## Qué tiene la app hoy
- **Inicio** (estilo C · Agenda por defecto; A y B elegibles en Ajustes): píldoras de resumen, lista única **"Tu día"** (tareas, pagos y documentos con su acción) y fila de hábitos de hoy.
- **Botón flotante +** en el celular: en Inicio abre menú (Tarea, Pago, Documento, Hábito); en cada sección agrega lo de esa sección.
- **Tareas**: vistas Lista / Calendario / Matriz de Eisenhower (urgente × importante, nombres de cuadros editables). Barra compacta con selectores. Formulario por pasos (Tarea → Cuándo → Importancia). Listas con color, prioridad, repetición.
- **Hábitos**: vistas Hoy (tira de 7 días, grupos Mañana/Tarde/Noche, Completado), Semana (cuadrícula) y Mes (tarjetas con calendario, rachas y meta). Solo check; el ejercicio permite anotar tiempo y repeticiones. Color, momento y meta de días por hábito. **Días anteriores bloqueados** por defecto. Confeti al completar el día.
- **Pagos recurrentes**: resumen Semana/Mes con desglose por categoría o medio de pago. Formulario Categoría → Gasto (sugerido por categoría) → Valor (+ frecuencia + medio de pago) → Fecha. "Pagado" pasa al siguiente periodo, con deshacer e historial. Medios: Nequi, Bancolombia, Tarjeta de crédito, Efectivo (personalizables).
- **Baúl de documentos**: vistas Carpetas / Lista / Kanban (por carpeta o vencimiento; arrastrar en computador). Ficha con persona, número, expedición, vencimiento, notas y archivos (PDF/fotos). Formulario por pasos. Vista **Vencimientos** (documentos + pagos).
- **Informes PDF** de hábitos, tareas, documentos y pagos.
- **Ajustes**: nombre, estilo del inicio, bloqueo de hábitos, listas/categorías/medios/carpetas, cambiar contraseña, cerrar sesión.

## Decisiones tomadas con Alejandro
- Sin IA en el baúl (solo baúl de documentos con fichas).
- Hábitos solo con check (sin cantidades), sin rutinas ni menús ni peso.
- Finanzas: solo pagos recurrentes (sin presupuesto ni metas de ahorro por ahora).
- Panel sin conexión a correo ni calendario por ahora.
- Carpetas iniciales: Familia, Personales, Importantes, Vehículos, Otros (lista normal, sin placa).
- Matriz de Eisenhower por urgente + importante (no por prioridad).

## Pendiente / ideas
- **Avisos** por notificación en el celular y por correo: 3 días antes de cada pago y 30 días antes de que venza un documento (requiere servicio de correo, p. ej. Resend, y tarea diaria en Supabase).
- Confirmar con Alejandro qué quiso decir con "3 o 4 opciones de customización" en medios de pago (se interpretó como medios predefinidos personalizables).
- En Supabase → Authentication → URL Configuration, el **Site URL** debe ser `https://apg-vida.vercel.app` (verificar que lo haya configurado; si no, "Olvidé mi contraseña" lleva a una página de error).
- Posibles: hábitos de "dejar de hacer algo" (Dejar el azúcar, Nop), conexión futura a Gmail/Calendar, modo oscuro.
