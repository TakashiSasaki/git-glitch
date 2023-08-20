const CACHE_NAME = "20230821T0000";

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      const requests = [
        "/",
        "/index.html",
        "https://rdfa-streaming-parser.glitch.me/rdfa-streaming-parser.webpack.js"
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
