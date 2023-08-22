const CACHE_NAME = "20230821T0000";

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      const requests = [
        "/",
        "/index.html",
        "/index.js",
        "/index.css",
        "/manifest.json",
        "https://rdfa-streaming-parser.glitch.me/rdfa-streaming-parser.webpack.js",
        "https://cdn.glitch.global/24ccdc30-220b-4578-a211-8cf3f3e1bcff/favicon.png?v=1692564673448",
      ];
      return Promise.all(
        requests.map((url) =>
          fetch(url, { mode: "no-cors" })
            .then((response) =>
              cache.put(url, response).catch((e) => console.log(e))
            )
            .catch((e) => console.log(e))
        ) //map
      ); //all
    }) //then
  ); //waitUtil
}); //addEventListener

self.addEventListener("fetch", (fetchEvent) =>
  fetchEvent.respondWith(
    fetch(fetchEvent.request, { mode: fetchEvent.request.mode })
      .then((response) => {
        const responseToCache = response.clone();
        return caches.open(CACHE_NAME).then((cache) =>
          cache
            .put(fetchEvent.request, responseToCache)
            .then(() => response)
            .catch(() => response)
        );
      })
      .catch((ex) => {
        return caches
          .match(fetchEvent.request)
          .then((response) => response)
          .catch(() => reponse);
      })
  )
); //addEventListener
