# APG VIDA · cómo ponerla en línea

La base de datos ya está lista en Supabase (proyecto **apg-vida**, São Paulo), con:
- tablas, permisos y la carpeta privada de documentos;
- un bloqueo para que **solo se pueda crear una cuenta**: la tuya.

Solo falta publicar la app y crear tu cuenta.

## 1. Publicar en Vercel (5 minutos)

1. Entra a **https://vercel.com** → **Add New… → Project** → importa el repositorio **PavosTouch**.
2. **Root Directory** → *Edit* → elige la carpeta **`apg-vida`**.
3. **Framework Preset**: *Other*. Clic en **Deploy**.
4. Te da una dirección, por ejemplo `https://apg-vida.vercel.app`.

## 2. Decirle a Supabase cuál es tu dirección

Para que los correos de confirmación y de "olvidé mi contraseña" te lleven a la app:

Supabase → proyecto **apg-vida** → **Authentication → URL Configuration**
- **Site URL**: la dirección de Vercel (ej. `https://apg-vida.vercel.app`)
- **Redirect URLs**: agrega la misma dirección.

## 3. Crear tu cuenta

1. Abre la app → **Crear mi cuenta** → tu nombre, correo y contraseña.
2. Confirma con el enlace que te llega al correo y entra.
3. Desde ese momento nadie más puede registrarse.

## 4. Instalarla en el celular

- **iPhone (Safari)**: botón Compartir → **Agregar a inicio**.
- **Android (Chrome)**: menú ⋮ → **Instalar app** o **Agregar a la pantalla principal**.

## Modo demostración

Si `config.js` queda sin credenciales, la app abre con datos de ejemplo guardados solo en el navegador. Sirve para probar sin tocar tus datos reales.

## Pendiente (segunda etapa)

Avisos por **notificación en el celular** y **correo** (3 días antes de cada pago y 30 días antes de que venza un documento). Requiere un servicio de envío de correos (por ejemplo Resend) y una tarea automática diaria en Supabase.
