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

self.addEventListener("fetch", function (event) {
  event.respondWith(
    fetch(event.request, { mode: event.request.mode })
      .then(function (response) {
        // レスポンスをクローンしてキャッシュに保存
        const responseToCache = response.clone();
        return caches.open(CACHE_NAME).then(function (cache) {
          return cache
            .put(event.request, responseToCache)
            .then(() => response) // オリジナルのレスポンスを返す
            .catch((e) => {
              console.log(e);
              return response; // エラーが発生してもオリジナルのレスポンスを返す
            });
        });
      })
      .catch(function (ex) {
        console.log(ex);
        // fetchが失敗した場合、キャッシュからレスポンスを返す
        return caches.match(event.request).then(response=> 
          return response || new Response("キャッシュが見つかりません")
        );
      })
  ); //respondWith
});
