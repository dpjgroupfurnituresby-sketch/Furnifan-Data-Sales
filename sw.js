
const CACHE_NAME = "furnifan-pwa-v2";

self.addEventListener("install", event => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key.startsWith("furnifan-pwa-") && key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== "GET" || url.origin !== self.location.origin) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(async () => {
        return (await caches.match(request)) ||
               (await caches.match("./index.html")) ||
               new Response(
                 "Aplikasi sedang offline. Sambungkan internet lalu muat ulang.",
                 { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } }
               );
      })
    );
  }
});
