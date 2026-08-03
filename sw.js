const CACHE_NAME = 'ryuhuu-store-kill-cache-v2';

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(key => caches.delete(key))))
      .then(() => self.clients.matchAll({ type: 'window' }))
      .then(clients => {
        clients.forEach(client => {
          client.navigate(client.url);
        });
      })
      .then(() => self.registration.unregister())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request, { cache: 'no-store' })
  );
});
