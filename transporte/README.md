# ControlOps · Control de Operaciones (prototipo)

App web instalable (PWA) para la operación de transporte de **Llano Carga** y **Jorge Fonseca**.
Funciona en computador y en celular ("Agregar a pantalla de inicio").

> ⚠️ Prototipo con **datos de ejemplo inventados**. Los cambios se guardan solo en el navegador
> de quien la usa (localStorage). El botón ↺ restablece los datos de ejemplo.

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

## Siguiente fase
Conectar a Supabase (base de datos, usuarios con roles y almacenamiento de archivos) y publicar en Vercel / Netlify / Cloudflare Pages.
