const CACHE_NAME = "biblioflix-pwa-v1";
const APP_SHELL = [
  "./",
  "./index.html",
  "./catalogue.html",
  "./categories.html",
  "./livre.html",
  "./styles.css",
  "./common.js",
  "./home.js",
  "./catalogue.js",
  "./categories.js",
  "./livre.js",
  "./pwa.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => Promise.all(
        cacheNames
          .filter((cacheName) => cacheName.startsWith("biblioflix-pwa-") && cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName)),
      ))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const requestUrl = new URL(request.url);

  if (request.method !== "GET" || requestUrl.origin !== self.location.origin) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      let response;

      try {
        response = await fetch(request);
      } catch {
        const cachedPage = await cache.match(request, { ignoreSearch: true });
        if (cachedPage) {
          return cachedPage;
        }

        const homePage = await cache.match(new URL("./index.html", self.registration.scope).href);
        return homePage || Response.error();
      }

      if (response.ok) {
        const cacheUrl = new URL(request.url);
        cacheUrl.search = "";
        cacheUrl.hash = "";
        cache.put(cacheUrl.href, response.clone()).catch((error) => {
          console.error("Impossible de mettre la page en cache pour le mode hors ligne.", error);
        });
      }
      return response;
    })());
    return;
  }

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    let response;
    try {
      response = await fetch(request);
    } catch {
      return await cache.match(request, { ignoreSearch: true }) || Response.error();
    }

    if (response.ok) {
      cache.put(request, response.clone()).catch((error) => {
        console.error("Impossible de mettre la ressource en cache pour le mode hors ligne.", error);
      });
    }
    return response;
  })());
});
