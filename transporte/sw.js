// Guarda la app en el teléfono para que abra rápido y funcione sin señal.
const CACHE = 'controlops-v3';
const FILES = ['./', 'index.html', 'styles.css', 'app.js', 'data.js', 'remote.js', 'config.js', 'vendor/supabase.js', 'manifest.webmanifest', 'icon.svg'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
// Primero la red (para ver siempre lo último); si no hay señal, lo guardado.
self.addEventListener('fetch', (e) => {
  // Solo los archivos de la propia app; las llamadas a Supabase nunca se guardan en caché.
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    fetch(e.request).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(e.request, copy));
      return res;
    }).catch(() => caches.match(e.request))
  );
});
