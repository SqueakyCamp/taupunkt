// Offline: App-Hülle vorab, Folien und CDN beim ersten Abruf cachen.
const SHELL = "taupunkt-shell-1", DATA = "taupunkt-data-1";
const FILES = ["./", "index.html", "style.css?v=1", "c_learn.js?v=1", "c_quiz.js?v=1", "c_build.js?v=1", "phys.js?v=1", "widgets.js?v=1", "drills.js?v=1", "app.js?v=1", "icon.svg", "slides/manifest.json", "slides/salt.txt", "slides/check.bin"];
self.addEventListener("install", e => { e.waitUntil(caches.open(SHELL).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== SHELL && k !== DATA).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET") return;
  const isData = u.pathname.includes("/slides/") && u.pathname.endsWith(".bin") || u.host !== location.host;
  if (isData) {
    e.respondWith(caches.open(DATA).then(async c => { const hit = await c.match(e.request); if (hit) return hit; const r = await fetch(e.request); if (r.ok) c.put(e.request, r.clone()); return r; }));
  } else {
    e.respondWith(fetch(e.request).then(r => { if (r.ok) { const cp = r.clone(); caches.open(SHELL).then(c => c.put(e.request, cp)); } return r; }).catch(() => caches.match(e.request).then(r => r || caches.match("index.html"))));
  }
});
