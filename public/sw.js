const CACHE_NAME = "biblioflix-pwa-v8";
const APP_SHELL = [
  "./",
  "./index.html",
  "./catalogue.html",
  "./categories.html",
  "./livre.html",
  "./confidentialite.html",
  "./styles.css",
  "./common.js",
  "./home.js",
  "./catalogue.js",
  "./categories.js",
  "./livre.js",
  "./pwa.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png?v=2",
  "./icons/icon-512.png?v=2",
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
      const fallbackUrls = [request.url];
      if (!requestUrl.pathname.endsWith("/") && !requestUrl.pathname.endsWith(".html")) {
        fallbackUrls.push(new URL(`${requestUrl.pathname}.html`, requestUrl.origin).href);
      }
      fallbackUrls.push(new URL("./index.html", self.registration.scope).href);

      let cachedPage = null;
      for (const fallbackUrl of fallbackUrls) {
        cachedPage = await cache.match(fallbackUrl, { ignoreSearch: true });
        if (cachedPage) {
          break;
        }
      }

      if (!self.navigator.onLine && cachedPage) {
        return cachedPage;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      let response;
      try {
        response = await fetch(request, { cache: "no-store", signal: controller.signal });
      } catch {
        return cachedPage || Response.error();
      } finally {
        clearTimeout(timeoutId);
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
