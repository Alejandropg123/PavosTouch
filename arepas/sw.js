// Guarda una copia de la app para que abra sin internet (primero red, si no hay, la copia).
const CACHE = "arepas-v1";
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => {
  if(e.request.method !== "GET") return;
  e.respondWith(fetch(e.request).then(r => {
    const copia = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copia)); return r;
  }).catch(() => caches.match(e.request, {ignoreSearch:true})));
});
