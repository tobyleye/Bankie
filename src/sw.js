// sw.js
const DEBUG = true 
const { assets } = serviceWorkerOption

const isExcluded = f => /hot-update|sockjs/.test(f);

const FILES_TO_CACHE = [
  '/',
  ...assets.filter(file => !isExcluded(file))
]; 
  
const LOGOS_TO_CACHE = [
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

const SITE_CACHE = {
  'bankie-static-v4.3': FILES_TO_CACHE,
  'bankie-logos-v1': LOGOS_TO_CACHE
};

// catch app assets upfront 
const preCache = () => {
  const cacheNames = Object.keys(SITE_CACHE);
  return Promise.all(cacheNames.map(cacheName => {
    return caches
      .open(cacheName)
      .then(cache => cache.addAll(SITE_CACHE[cacheName]))
  }))
}


self.addEventListener('install', event => {
  if (DEBUG) {
    console.log('[service-worker] Install event');
  }
  self.skipWaiting();

  // Add core app files to cache during service worker installation
  event.waitUntil(preCache());
})


self.addEventListener('activate', event => {
  if (DEBUG) {
    console.log('[service-worker] Activate event');
  }

  // clean the cache
  event.waitUntil( async function() {
    const cacheNames = await caches.keys();
    return Promise.all(
      cacheNames.map(cacheName => {
        if ( !(cacheName in SITE_CACHE)) {
          caches.delete(cacheName);
        }
      })
    );
  }());

  return self.clients.claim()
});


self.addEventListener('fetch', event => {
  if (DEBUG) {
    console.log('[service-worker] Fetch event');
  }

  // fetch resources from the cache first if there's a match 
  event.respondWith(async function() {
    const response =  await caches.match(event.request);
    if (response) {
      if (DEBUG) {
        console.log('[service-worker] Found in cache', event.request.url, response);
      }
      return response;
    }

    return fetch(event.request)
  }())
})

