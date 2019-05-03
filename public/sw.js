const
  FILES_TO_CACHE = [
    '/',
    '/index.html', 
    '/css/app.99aaa9fb.css',
    '/js/app.24378527.js',
    '/favicon.ico',
    '/js/chunk-vendors.bae45f6d.js',
  ],
  LOGOS_TO_CACHE = [
    '/static/logos/Access Bank PLC Logo.svg',
    '/static/logos/Ecobank Logo.svg',
    '/static/logos/Fidelity Bank Nigeria Logo.svg',
    '/static/logos/First Bank Nigeria Logo.svg',
    '/static/logos/First City Monument Bank Ltd Logo.svg',
    '/static/logos/Guaranty Trust Bank Logo.svg',
    '/static/logos/Heritage Bank PLC Logo.svg',
    '/static/logos/Keystone Bank Limited Logo.svg',
    '/static/logos/Polaris Bank Logo.svg',
    '/static/logos/Stanbic IBTC Bank Logo.svg',
    '/static/logos/Standard Chartered Logo.svg',
    '/static/logos/Sterling Bank Plc Logo.svg',
    '/static/logos/UBA Logo.svg',
    '/static/logos/Union Bank Nigeria Logo.svg',
    '/static/logos/Wema Bank Logo.svg',
    '/static/logos/Zenith Bank Logo.svg',
  ]

  SITE_CACHE = {
    'bankie-static-v1': FILES_TO_CACHE,
    'bankie-logos': LOGOS_TO_CACHE
  };


self.addEventListener('install', event => {
  console.log('[service-worker] Install event');
  event.waitUntil(function() {
    const cacheNames = Object.keys(SITE_CACHE)
    return Promise.all(
      cacheNames.map(
        cacheName => {
          caches.open(cacheName).then(cache => {
            return cache.addAll(SITE_CACHE[cacheName])
          })
      })
    ).then( () => self.skipWaiting());
  }());
})

self.addEventListener('activate', event => {
  console.log('[service-worker] Activate event')
  event.waitUntil( async function() {
    const cacheNames = await caches.keys();
    return Promise.all(
      cacheNames.map(cacheName => {
        if ( !(cacheName in SITE_CACHE)) {
          caches.delete(cacheName);
        }
      })
    ).then(() => self.clients.claim());
  }());
});


self.addEventListener('fetch', event => {
  console.log('[service-worker] Fetch event');
  event.respondWith(async function() {
    const response =  await caches.match(event.request);
    return response || fetch(event.request);
  }())
})

