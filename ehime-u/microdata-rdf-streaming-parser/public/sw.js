const CACHE_NAME = "20230820T2133";

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      const requests = [
        "/",
        "/index.html",
        "/manifest.json",
        "/microdata-rdf-streaming-parser.webpack.js",
        "https://microdata-rdf-streaming-parser.glitch.me/microdata-rdf-streaming-parser.webpack.js",
        "https://rdfa-streaming-parser.glitch.me/rdfa-streaming-parser.webpack.js",
        "https://cdn.glitch.global/a43cd5ca-78f3-480e-98d1-3ff0012d2783/favicon.png",
        "https://cdn.glitch.global/6b24e0e1-6ff5-4d1f-b67a-033177bd884c/favicon.png",
        "https://platform.twitter.com/js/button.e7f9415a2e000feaab02c86dd5802747.js",
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

self.addEventListener("fetch", function (event) {
  event.respondWith(
    fetch(event.request)
      .then(function (response) {
        // レスポンスをクローンしてキャッシュに保存
        const responseToCache = response.clone();
        caches
          .open(CACHE_NAME)
          .then(function (cache) {
            cache
              .put(event.request, responseToCache)
              .catch((e) => console.log(e));
          })
          .catch((e) => console.log(e));

        // オリジナルのレスポンスを返す
        return response;
      })
      .catch(function () {
        // フェッチに失敗した場合、キャッシュからレスポンスを返す
        return caches.match(event.request);
      })
  );
});
