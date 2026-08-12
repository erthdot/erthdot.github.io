// Minimal service worker — its only job is to exist, so Chrome/Android
// treats client-preview.html and the Creator Dashboard as installable apps.
// It does a basic network-first pass-through (no offline caching of
// client data, since projects change and must always show live status).

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
