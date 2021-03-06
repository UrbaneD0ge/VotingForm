const cacheName = 'sw-cache-v1';
const filesToCache = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './NPU Logo Black-10.png',
  './manifest',
  './manifest/manifest.webmanifest',
];

self.addEventListener('install', async e => {
  try {
  const cache = await caches.open(cacheName);
    await cache.addAll(filesToCache);
    console.log('Cached all files');
  } catch (error) {
    console.log('Error caching files');
  }
  return self.skipWaiting();
});

self.addEventListener('activate', e => {
  self.clients.claim();
});

self.addEventListener('fetch', async e => {
  const req = e.request;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
   e.respondWith(cacheFirst(req));
} else {
  e.respondWith(networkAndCache(req));
}
});

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  return cached || fetch(req);
}

async function networkAndCache(req) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(req);
    await cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(req);
    return cached;
  }
}

var GHPATH = '/VotingForm';

var APP_PREFIX = 'voting_';

var VERSION = 'v1';

var URLS = [
  `${GHPATH}/`,
  `${GHPATH}/index.html`,
  `${GHPATH}/style.css`,
  `${GHPATH}/app.js`,
  `${GHPATH}/NPU Logo Black-10.png`,
  `${GHPATH}/manifest`,
  `${GHPATH}/manifest/manifest.webmanifest`,
];
