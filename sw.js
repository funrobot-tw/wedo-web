/* WeDo Web offline copy.
   Network first, so a new version shows up as soon as there is a connection;
   the saved copy when the network fails or takes longer than 3 s (a Wi-Fi with
   no internet tends to hang rather than fail). Bump CACHE when the file list
   changes. Only this site's own files are handled; the guide's QR code library
   comes from a CDN and is simply missing offline. */
const CACHE = 'wedo-web-v1';
const FILES = [
  './', 'index.html', 'guide.html', 'manifest.webmanifest',
  'icons/icon-180.png', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png',
  'images/guide/ipad-01-home.jpg', 'images/guide/ipad-02-editor.jpg', 'images/guide/ipad-03-search.jpg',
  'images/guide/ipad-04-select-device.jpg', 'images/guide/ipad-05-connected.jpg',
  'images/guide/android-01-home.jpg', 'images/guide/android-02-editor.jpg', 'images/guide/android-03-search.jpg',
  'images/guide/android-04-select-device.jpg', 'images/guide/android-05-pair.jpg',
  'images/guide/android-06-connected.jpg', 'images/guide/android-07-panel-connected.jpg',
];
const NETWORK_WAIT = 3000;

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      const res = await Promise.race([
        fetch(req),
        new Promise((_, fail) => setTimeout(() => fail(new Error('network too slow')), NETWORK_WAIT)),
      ]);
      if (res.ok) cache.put(req, res.clone());
      return res;
    } catch (err) {
      /* ?v=… and #p=… don't matter; a page the cache has never seen falls back to the app */
      const hit = await cache.match(req, { ignoreSearch: true })
        || (req.mode === 'navigate' && await cache.match(/guide\.html$/.test(url.pathname) ? 'guide.html' : 'index.html'));
      if (hit) return hit;
      throw err;
    }
  })());
});
