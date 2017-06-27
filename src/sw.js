const CACHE_NAME = '1-vanilla_hn';
const URLS = [
    '/',
    '/index.html',
    '/lib/firebase.js',
    '/icons/192x192.png',
    '/icons/384x384.png',
    '/icons/512x512.png',
    '/favicon.png',
    '/manifest.json',
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
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(URLS)
        })
    );
});

const clearOldCaches = () => {
    return caches.keys().then(keys => {
        return Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)));
    });
};

// Delete outdated caches
self.addEventListener('activate', function (event) {
    event.waitUntil(
        clearOldCaches().then(() => self.clients.claim())
    );
});