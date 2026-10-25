// Generated at build time. Precaches the whole game for offline play.
const CACHE = 'soft-sl-1.1.0-1792928051281';
const FILES = ["./","assets/baloo-2-latin-500-normal-BSdEhq8m.woff","assets/baloo-2-latin-500-normal-CmLZ27r7.woff2","assets/baloo-2-latin-700-normal-CqTg7A15.woff2","assets/baloo-2-latin-700-normal-Ld3Zm3l2.woff","assets/baloo-2-latin-800-normal-B8BXfZF7.woff","assets/baloo-2-latin-800-normal-BbF3Etk1.woff2","assets/index-Cd9g1XLA.js","assets/noto-nastaliq-urdu-arabic-400-normal-BVDOj1dq.woff2","assets/noto-nastaliq-urdu-arabic-400-normal-Df9iHKj9.woff","assets/noto-nastaliq-urdu-arabic-700-normal-CV4fHIsl.woff2","assets/noto-nastaliq-urdu-arabic-700-normal-DLTMJhMG.woff","boards/board_a.jpg","boards/board_b.jpg","brand/sfea_qr.png","brand/shaoor_logo.png","brand/soft_logo.png","content/ladder_messages.txt","content/snake_messages.txt","content/tile_texts.txt","content/ui_strings.json","icons/icon-192.png","icons/icon-512.png","icons/icon-maskable-512.png","index.html","manifest.webmanifest"];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  // Content files: network first so NGO edits on the server show up, cache as fallback.
  if (url.pathname.includes('/content/')) {
    e.respondWith(fetch(e.request).then((r) => { const copy = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); return r; }).catch(() => caches.match(e.request)));
    return;
  }
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then((r) => r || fetch(e.request)));
});
