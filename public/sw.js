const CACHE_NAME = "20230820T2130";

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      const requests = [
        "/",
        "/index.html",
        "https://microdata-rdf-streaming-parser.glitch.me/microdata-rdf-streaming-parser.webpack.js",
        "https://rdfa-streaming-parser.glitch.me/rdfa-streaming-parser.webpack.js",
        "https://cdn.glitch.global/a43cd5ca-78f3-480e-98d1-3ff0012d2783/favicon.png",
        "https://cdn.glitch.global/6b24e0e1-6ff5-4d1f-b67a-033177bd884c/favicon.png",
      ];

      return Promise.all(
        requests.map((url) =>
          fetch(url, { mode: "no-cors" }).then((response) =>
            cache.put(url, response)
          )
        ) //map
      ); //all
    }) //then
  ); //waitUtil
}); //addEventListener

self.addEventListener("fetch", function (event) {
  event.respondWith(
    fetch(event.request)
      .then(function (response) {
        // レスポンスをクローンしてキャッシュに保存
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, responseToCache);
        });

        // オリジナルのレスポンスを返す
        return response;
      })
      .catch(function () {
        // フェッチに失敗した場合、キャッシュからレスポンスを返す
        return caches.match(event.request);
      })
  );
});
