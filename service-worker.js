/* FinTrack PWA service worker — resilient on GitHub Pages project paths. */
const CACHE_NAME = 'fintrack-shell-v2';
const APP_ROOT = new URL('./', self.registration.scope);
const APP_FILES = [
  new URL('./', APP_ROOT).href,
  new URL('./index.html', APP_ROOT).href,
  new URL('./manifest.json', APP_ROOT).href,
  new URL('./icon-192.png', APP_ROOT).href,
  new URL('./icon-512.png', APP_ROOT).href
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    // Cache each resource independently so one missing optional file cannot
    // make the entire service-worker installation fail without explanation.
    const results = await Promise.allSettled(APP_FILES.map(url => cache.add(url)));
    const failures = results.map((result, i) => result.status === 'rejected' ? APP_FILES[i] : null).filter(Boolean);
    if (failures.length) console.error('[FinTrack PWA] Falha ao armazenar em cache:', failures);
    // index.html is essential; if it failed, fail installation and show the cause.
    if (failures.includes(new URL('./index.html', APP_ROOT).href)) {
      throw new Error('Não foi possível armazenar index.html em cache. Verifique o caminho de publicação.');
    }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('fintrack-shell-') && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response && response.ok && response.type === 'basic') {
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, response.clone()).catch(error => console.warn('[FinTrack PWA] Cache opcional falhou:', error));
      }
      return response;
    } catch (error) {
      if (request.mode === 'navigate') {
        const fallback = await caches.match(new URL('./index.html', APP_ROOT).href);
        if (fallback) return fallback;
      }
      throw error;
    }
  })());
});
