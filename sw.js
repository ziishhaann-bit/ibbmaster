/* ═══════════════════════════════════════════════════════════════════
   IBBMASTER Service Worker  —  sw.js
   Scope: /ibbmaster/
   ═══════════════════════════════════════════════════════════════════ */

const APP_CACHE  = 'ibbmaster-v27';
const FONT_CACHE = 'ibbmaster-fonts-v1';
const OFFLINE_URLS = ['/ibbmaster/', '/ibbmaster/index.html'];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(APP_CACHE)
      .then(cache => cache.addAll(OFFLINE_URLS).catch(() => {}))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== APP_CACHE && k !== FONT_CACHE)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  /* 1. Anthropic API — always network */
  if (url.hostname.includes('anthropic')) {
    event.respondWith(
      fetch(event.request).catch(() =>
        new Response(JSON.stringify({ error: 'offline' }), {
          status: 503,
          headers: { 'Content-Type': 'application/json' }
        })
      )
    );
    return;
  }

  /* 2. Google Fonts — stale-while-revalidate */
  if (
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com')
  ) {
    event.respondWith(
      caches.open(FONT_CACHE).then(cache =>
        cache.match(event.request).then(cached => {
          const fetchPromise = fetch(event.request).then(resp => {
            if (resp && resp.status === 200) cache.put(event.request, resp.clone());
            return resp;
          }).catch(() => cached || new Response('', { status: 503 }));
          return cached || fetchPromise;
        })
      )
    );
    return;
  }

  /* 3. Everything else — cache-first */
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(resp => {
        if (resp && resp.status === 200) {
          caches.open(APP_CACHE).then(c => c.put(event.request, resp.clone()));
        }
        return resp;
      }).catch(() =>
        caches.match('/ibbmaster/').then(fallback =>
          fallback || new Response('IBBMASTER is offline. Please reload when connected.', {
            status: 503,
            headers: { 'Content-Type': 'text/plain' }
          })
        )
      );
    })
  );
});
