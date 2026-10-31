# ControlOps · Control de Operaciones (prototipo)

App web instalable (PWA) para la operación de transporte de **Llano Carga** y **Jorge Fonseca**.
Funciona en computador y en celular ("Agregar a pantalla de inicio").

Funciona en dos modos:

- **Conectada a Supabase** (cuando `config.js` tiene las credenciales): inicio de sesión, datos
  compartidos entre todos los usuarios en vivo, archivos guardados en la nube y roles (admin / operador).
- **Demostración** (cuando `config.js` está vacío): datos de ejemplo inventados guardados en el navegador.

👉 Para ponerla en línea sigue **[DESPLIEGUE.md](DESPLIEGUE.md)**.

## Qué incluye
- **Resumen**: operaciones activas, flete del mes, por facturar, documentos en alerta.
- **Operaciones**: tablero por etapa (Pendiente → Pendiente de acta → Finalizado → Facturado) con arrastrar y soltar, vista lista con todas las columnas de la hoja actual, filtros por empresa y conductor, búsqueda y exportación CSV.
- **Ficha de operación**: datos del viaje, documentos (remesa, manifiesto, cumplido, factura de terceros, factura de servicio) y gastos/anticipos del conductor.
- **Gastos**: combustible, % conductor, parqueadero, mantenimiento, peajes, engrase, lavado, otros; anticipos ilimitados; diferencia y legalización.
- **Clientes, Vehículos, Conductores**: fichas con documentos y vencimientos, y todas sus operaciones relacionadas.
- **Documentos**: vencidos, por vencer (≤30 días) y faltantes.

## Probar localmente
```
cd transporte && python3 -m http.server 8000
```
Abrir http://localhost:8000

## Archivos
- `index.html`, `styles.css`, `app.js`: la aplicación.
- `remote.js`: conexión con Supabase (sesión, guardado, archivos, cambios en vivo).
- `config.js`: credenciales públicas de Supabase.
- `supabase/schema.sql`: tablas, relaciones, permisos y almacenamiento.
- `data.js`: catálogos (empresas, etapas, documentos) y datos de ejemplo del modo demostración.
- `vendor/supabase.js`: librería oficial `@supabase/supabase-js` 2.118.0 (incluida para no depender de un CDN).
