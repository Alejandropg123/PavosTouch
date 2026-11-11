# Mis Tareas

App de tareas personal al estilo TickTick. Se instala en el celular o el computador (PWA), funciona sin internet
y guarda todo en el propio dispositivo. No necesita servidor ni cuentas.

## Qué incluye
- **Listas inteligentes**: Hoy, Mañana, Próximos 7 días, Bandeja de entrada, Todas, Completadas.
- **Listas propias** con emoji y color, y **etiquetas** (`#trabajo`).
- **Escritura rápida en español**: `Llamar a Ana mañana 3pm #clientes !alta ^Trabajo`
  - Fechas: `hoy`, `mañana`, `pasado mañana`, `viernes`, `en 3 días`, `próxima semana`, `15/12`, `el 5 de enero`
  - Hora: `3pm`, `15:30`, `a las 4`
  - Prioridad: `!alta`, `!media`, `!baja` (o `!3`, `!2`, `!1`)
  - Lista: `^nombre` · Repetir: `cada día`, `cada semana`, `cada mes`, `cada año`, `días hábiles`
- **Detalle de tarea**: fecha y hora, repetición, prioridad, lista, etiquetas, subtareas y notas.
- **Calendario** mensual con las tareas de cada día.
- **Matriz de Eisenhower** (por prioridad), con arrastrar y soltar.
- **Hábitos** con registro de la semana y racha 🔥.
- **Pomodoro** con descansos cortos/largos, sonido y estadísticas.
- **Personalizar**: tu nombre, color de acento, tema claro/oscuro, inicio de semana, qué mostrar en el menú,
  listas, lista por defecto, duración del pomodoro, avisos, copia de seguridad (descargar/cargar).
- Atajos de teclado: `N` nueva tarea, `/` buscar, `Esc` cerrar.

## Probar localmente
```
cd tareas && python3 -m http.server 8000
```
Abrir http://localhost:8000

## Archivos
- `index.html`, `styles.css`, `app.js`: la aplicación.
- `sw.js`, `manifest.webmanifest`, `icon.svg`: instalación y uso sin conexión.
