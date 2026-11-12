/* Somo service worker (scope: /Xprize-Kenya/somo2/). It makes Somo work offline.
   - The app shell (somo2/, letters/, trail/, setup/, the manifest and icons) is cached when the worker installs.
     Pages are network-first: with internet you always get the newest push; without it, the cached copy opens.
   - The voice pack (audio/en.json or audio/en-mp3.json, about 13 to 16 MB) is cached by the app the first time,
     with a progress bar, in its own cache, so a new version of the pages does not download it again.
   - Supabase (progress, chats) and the AI relay are never cached here: they always go to the network, and the app
     already falls back gracefully when there is no internet.
   - To force every phone to refresh everything, change VERSION. To refresh the voice pack, change AUDIO. */
const VERSION = 'somo-shell-v1', AUDIO = 'somo-audio-v1', FONTS = 'somo-fonts-v1';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png', './letters/', './trail/', './setup/'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => Promise.all(SHELL.map(u => c.add(new Request(u, { cache: 'reload' })).catch(() => null)))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => ![VERSION, AUDIO, FONTS].includes(k)).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('message', e => { if (e.data === 'skip-waiting') self.skipWaiting(); });
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  /* fonts: use the saved copy, refresh it in the background */
  if (/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
    e.respondWith(caches.open(FONTS).then(c => c.match(req).then(hit => { const net = fetch(req).then(r => { if (r.ok || r.type === 'opaque') c.put(req, r.clone()); return r; }).catch(() => hit); return hit || net; })));
    return;
  }
  if (url.origin !== location.origin || !url.pathname.startsWith(new URL(self.registration.scope).pathname)) return; /* Supabase, the AI relay and other sites: straight to the network */
  /* the voice pack: from the cache once it is there */
  if (/\/audio\/[^/]+\.json$/.test(url.pathname)) {
    e.respondWith(caches.open(AUDIO).then(c => c.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(r => { if (r.ok) c.put(req, r.clone()); return r; }))));
    return;
  }
  /* pages and other files: network first, the cached copy when offline */
  e.respondWith(fetch(req).then(r => { if (r.ok) { const copy = r.clone(); caches.open(VERSION).then(c => c.put(req, copy)); } return r; })
    .catch(() => caches.match(req, { ignoreSearch: true }).then(hit => hit || (req.mode === 'navigate' ? caches.match(new URL('./', self.registration.scope).href) : Response.error()))));
});
