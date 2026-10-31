# Cómo poner ControlOps en línea

Son dos servicios gratuitos para empezar:

- **Supabase**: base de datos, usuarios y archivos (PDF y fotos).
- **Vercel**: publica la app en una dirección web propia.

Tiempo aproximado: 20 minutos. No hay que programar nada.

---

## Parte 1 · Supabase (base de datos)

1. Entra a **https://supabase.com** → *Start your project* → crea la cuenta (puedes usar tu cuenta de GitHub).
2. **New project**
   - *Name*: `controlops`
   - *Database password*: crea una y **guárdala** en un lugar seguro.
   - *Region*: **South America (São Paulo)**, la más cercana a Colombia.
   - Clic en *Create new project* y espera 1–2 minutos.
3. Menú izquierdo → **SQL Editor** → *New query*.
   Abre el archivo [`supabase/schema.sql`](supabase/schema.sql), copia **todo** su contenido, pégalo y clic en **Run**.
   Debe decir *Success. No rows returned*.
4. Cierra el registro público (solo entra quien tú invites):
   **Authentication** → **Sign In / Providers** → apaga **Allow new users to sign up** → *Save*.
5. Crea tu usuario (el primero queda como **administrador**):
   **Authentication** → **Users** → **Add user** → *Create new user* → tu correo y una contraseña → marca **Auto Confirm User** → *Create user*.
6. Copia las credenciales públicas:
   **Project Settings** → **API Keys** (o **Data API**):
   - **Project URL** (algo como `https://abcdxyz.supabase.co`)
   - **anon / public key** o **Publishable key** (empieza por `eyJ…` o por `sb_publishable_…`)

   ⚠️ Nunca compartas la clave **service_role** ni la **secret key**. Esas sí son privadas.

7. Pon esos dos datos en [`config.js`](config.js):

   ```js
   window.CONTROLOPS_CONFIG = {
     supabaseUrl: 'https://abcdxyz.supabase.co',
     supabaseAnonKey: 'eyJ...',
   };
   ```

   (O mándaselos a Claude y él actualiza el archivo.)

> Mientras `config.js` esté vacío, la app abre en **modo demostración** con datos de ejemplo.

---

## Parte 2 · Vercel (publicar la app)

1. Entra a **https://vercel.com** → *Sign Up* → **Continue with GitHub**.
2. **Add New…** → **Project** → busca el repositorio **PavosTouch** → *Import*.
3. En la configuración:
   - **Root Directory**: clic en *Edit* → elige la carpeta **`transporte`**.
   - **Framework Preset**: *Other*.
   - No hay que cambiar nada más.
4. Clic en **Deploy**. En 30 segundos te da la dirección, por ejemplo `https://controlops.vercel.app`.
   Puedes cambiar el nombre en *Settings → Domains* o conectar un dominio propio (ej. `ops.llanocarga.com`).

Vercel publica automáticamente cada cambio que se guarde en la rama principal (`main`) del repositorio.

---

## Parte 3 · Conectar los dos

En Supabase → **Authentication** → **URL Configuration**:

- **Site URL**: la dirección de Vercel (ej. `https://controlops.vercel.app`)
- **Redirect URLs**: agrega la misma dirección.

Esto hace que los correos de invitación y de "olvidé mi contraseña" lleven a la app.

---

## Usar la app en el celular

Abre la dirección en el celular:

- **Android (Chrome)**: menú ⋮ → *Agregar a la pantalla principal* / *Instalar app*.
- **iPhone (Safari)**: botón compartir → *Agregar a inicio*.

Queda con ícono propio y abre a pantalla completa.

---

## Agregar personas

Supabase → **Authentication** → **Users** → **Invite user** → escribe el correo.
La persona recibe un correo, toca el enlace y crea su contraseña dentro de la app.

**Roles**

| Rol | Puede |
|---|---|
| `admin` | Todo, incluido **eliminar** viajes y documentos |
| `operador` | Ver, crear y editar todo, pero **no eliminar** |

Para cambiar el rol: Supabase → **Table Editor** → tabla **perfiles** → columna **rol** → `admin` u `operador`.

---

## Bueno saber

- **Plan gratis de Supabase**: 500 MB de base de datos y 1 GB de archivos. El proyecto se pausa si pasa **una semana sin uso** (se reactiva desde el panel). Para la operación diaria se recomienda el plan **Pro (US$25/mes)**, que incluye copias de seguridad diarias.
- **Números de OS**: el próximo número lo asigna la base de datos, así que nunca se repite aunque dos personas creen viajes a la vez. El punto de partida está en la tabla **empresas** (columna `consecutivo`): 451 para Llano Carga y 266 para Jorge Fonseca. Si el último número real es otro, cámbialo ahí.
- **Archivos**: se guardan privados; solo los ve quien tiene sesión iniciada. Máximo 20 MB por archivo.
