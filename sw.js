const CACHE_NAME = "20230821T0000";
const URLS = [
  "/",
  "/index.html",
  "/index.js",
  "/index.css",
  "/manifest.json",
  "5a0146b7-8744-49cc-a69d-b38fad10b940.bat",
  "https://rdfa-streaming-parser.glitch.me/rdfa-streaming-parser.webpack.js",
  "https://cdn.glitch.global/24ccdc30-220b-4578-a211-8cf3f3e1bcff/favicon.png?v=1692564673448",
];

import "./sw-common.js";

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(
        URLs.map((url) =>
          fetch(url, { mode: "no-cors" })
            .then((URLs) =>
              cache.put(url, response).catch((e) => console.log(e))
            )
            .catch((e) => console.log(e))
        ) //map
      )
    ) //then
  ); //waitUtil
}); //addEventListener

self.addEventListener(
  "fetch",
  (fetchEvent) =>
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
        .catch((ex) =>
          caches
            .match(fetchEvent.request)
            .then((response) => response)
            .catch(() => reponse)
        )
    ) //respondWith
); //addEventListener
