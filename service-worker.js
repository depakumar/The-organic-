const CACHE_NAME = "organic-store-v2"; // version badhao jab bhi update karo
const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/manifest.json",
  "https://img.icons8.com/color/96/vegetarian-food.png",
  "https://img.icons8.com/color/512/vegetarian-food.png"
];

// Install
self.addEventListener("install", (e) => {
  console.log("Service Worker: Installing...");
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Service Worker: Caching files");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate
self.addEventListener("activate", (e) => {
  console.log("Service Worker: Activating...");
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log("Service Worker: Deleting old cache:", name);
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// Fetch
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
