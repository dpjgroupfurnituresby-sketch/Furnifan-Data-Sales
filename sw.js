const CACHE_NAME="furnifan-shell-v1";
const SHELL=["./","./index.html","./manifest.json","./icon-192.png","./icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(SHELL)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(u.origin===self.location.origin&&e.request.method==="GET")e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request)))});
