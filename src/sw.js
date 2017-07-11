const CACHE_NAME = '{{cache}}';

const CRITICAL = [
    '/',
    'index.html',
    '/bundle.js',
    '/icons/icon-144x144.png'
];

const NON_CRITICAL = [
    '/favicon.ico'
];

const hnapi = 'https://node-hnapi.herokuapp.com/';

const addToCache = (request, response) => {
    caches.open(CACHE_NAME).then(cache => cache.put(request, response));
};

// Respond with cached resources
self.addEventListener('fetch', function (event) {
    let notFromCache = event.request.url.indexOf(hnapi) !== -1;

    event.respondWith(
        notFromCache
            ? fetch(event.request)
            : caches.match(event.request).then(function (response) {
                return response || fetch(event.request).then(res => {
                        let clone = res.clone();
                        addToCache(event.request, clone);
                        return res;
                    });
        })
    );
});

// Cache resources
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                // Add the non-important resources
                cache.addAll(NON_CRITICAL);

                // Add the critical ones
                return cache.addAll(CRITICAL)
            })
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