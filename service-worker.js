const CACHE_NAME = "organic-store-v3"; // Increment version on update
const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/manifest.json",
  "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap",
  "https://img.icons8.com/color/96/vegetarian-food.png",
  "https://img.icons8.com/color/512/vegetarian-food.png",
  "/hero-bg.jpg"
];

// Install - cache all necessary files
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Service Worker: Caching Files");
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Activate - delete old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activating...");
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if(name !== CACHE_NAME) {
            console.log("Service Worker: Removing old cache", name);
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch - serve cached files if offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      if(cached) {
        return cached;
      }
      return fetch(event.request)
        .then(response => {
          // Cache new requests dynamically
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
        .catch(() => {
          // Optional: fallback page/image
          if(event.request.destination === "image") {
            return caches.match("/hero-bg.jpg");
          }
        });
    })
  );
});
