const CACHE_NAME = '{{cache}}';
const URLS = [
    '/',
    '/index.html',
    '/lib/firebase.js',
    '/icons/icon-72x72.png',
    '/icons/icon-96x96.png',
    '/icons/icon-128x128.png',
    '/icons/icon-144x144.png',
    '/icons/icon-152x152.png',
    '/icons/icon-192x192.png',
    '/icons/icon-384x384.png',
    '/icons/icon-512x512.png',
    '/favicon.ico',
    '/bundle.js'
];

// Respond with cached resources
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (request) {
            return request || fetch(event.request)
        })
    );
});

// Cache resources
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(URLS))
            .then(() => self.skipWaiting())
    );
});

const clearOldCaches = () => {
    return caches.keys().then(keys => {
        return Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => {
            console.log('[sw] remove cache', key);
            caches.delete(key);
        }));
    });
};

// Delete outdated caches
self.addEventListener('activate', function (event) {
    event.waitUntil(
        clearOldCaches().then(() => self.clients.claim())
    );
});