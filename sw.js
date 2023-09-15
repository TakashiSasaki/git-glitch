const CACHE_NAME = "20230915T1400";

function supplementalCache(urlsToCache, msec) {
  if (msec === undefined) msec = 1000;
  setTimeout(
    () =>
      caches.open(CACHE_NAME).then(async function (cache) {
        const cacheKeys = await cache.keys();
        const existingUrls = cacheKeys.map((request) => request.url);
        const newUrls = urlsToCache.filter(
          (url) => !existingUrls.includes(url)
        );
        if (newUrls.length > 0) {
          cache.addAll(newUrls).catch((e) => console.log("Caching failed:", e));
        } //if
      }),
    msec
  );
} //supplementalCache

function cacheEhimeWebGL() {
  supplementalCache(
    [
      "/euvc2023/EhimeWebGL/Build/0ee8aa74d1e94e24178ce4e8a180376e.data",
      "/euvc2023/EhimeWebGL/Build/e82b3426b38d0abb532c72e4e3170425.wasm",
      "/euvc2023/EhimeWebGL/Build/a0eee379177e2ae2bd6c86de7f72ed55.js",
    ],
    1000
  );
} //cacheEhimeWebGL

function cacheImages() {
  supplementalCache(
    [
      "/euvc2023contents/board/image/news/01HOUBU.png",
      "/euvc2023contents/board/image/news/i_report.png",
      "/euvc2023contents/board/image/news/02KYOUIKU.png",
      "/euvc2023contents/board/image/news/03SHAKYO.png",
      "/euvc2023contents/board/image/news/04RIGAKU.png",
      "/euvc2023contents/board/image/news/05IGAKU.png",
      "/euvc2023contents/board/image/news/06KOUGAKU.png",
      "/euvc2023contents/board/image/news/07NOUGAKU.png",
      "/euvc2023contents/board/image/news/08JYUKEN.png",
      "/euvc2023contents/board/image/news/09OGYA.png",
      "/euvc2023contents/board/image/news/10HOSPITAL.png",
      "/euvc2023contents/board/image/news/11datascience.png",
      "/euvc2023contents/board/image/news/12rstock.png",
      "/euvc2023contents/board/image/news/13newcomer.png",
      "/euvc2023contents/board/image/news/14lr.png",
      "/euvc2023contents/board/image/news/15bousai.png",
      "/euvc2023contents/board/image/news/16SDGS.png",
      "/euvc2023contents/board/image/news/17byouin.png",
      "/euvc2023contents/board/image/news/18kikin.png",
      "/euvc2023contents/board/image/news/19mirainoaidaisei.png",
      "/euvc2023contents/board/image/news/20seikatujyouhou.png",
      "/euvc2023contents/board/image/news/21iikurashi.png",
      "/euvc2023contents/board/image/news/22youchien.png",
      "/euvc2023contents/board/image/news/23shougakko.png",
      "/euvc2023contents/board/image/news/24chuugaku.png",
      "/euvc2023contents/board/image/news/25koukou.png",
      "/euvc2023contents/board/image/news/26tokubetushien.png",
      "/euvc2023contents/board/image/news/27enshuurin.png",
      "/euvc2023contents/board/image/news/28museum.png",
      "/euvc2023contents/board/image/news/i_report.png",
      "/euvc2023contents/board/image/news/infinity.png",
    ],
    2000
  );
} //cacheImages

self.addEventListener("install", (e) => {
  setTimeout(() => {
    caches.open(CACHE_NAME).then(function (cache) {
      cache.addAll().catch((e) => console.log("Caching failed:", e));
    });
  }, 5000);

  setTimeout(() => {
    caches.open(CACHE_NAME).then(function (cache) {
      cache
        .addAll([
          "/euvc2023contents/board/movie/newsdata/EU08_480.mp4",
          "/euvc2023contents/board/movie/newsdata/EU04_1080.mp4",
          "/euvc2023contents/board/movie/newsdata/OGYA_CHAP1.mp4",
          "/euvc2023contents/board/movie/newsdata/EU03_1080.mp4",
          "/euvc2023contents/board/movie/newsdata/EU10_1080.mp4",
        ])
        .catch((e) => console.log("Caching failed:", e));
    });
  }, 10000);

  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      const requests = [
        "/",
        "/favicon.ico",
        "/landing.html",
        "/landing/nicepage.css",
        "/landing/nicepage.js",
        "/landing/jquery-1.9.1.min.js",
        "/landing/B13_2.jpg",
        "/landing/eurc-2023.jpg",
        "/landing/euvc-landing-20230914.jpg",
      ];

      return Promise.all(
        requests.map((url) =>
          fetch(url, { mode: "no-cors" })
            .then((response) => cache.put(url, response))
            .catch((e) => console.log(e))
        ) //map
      ); //all
    }) //then
  ); //waitUtil
}); //addEventListener

const REGEX_PATTERNS = [
  /\/.*\/[a-f0-9]+\.data/,
  /\/.*\/[a-f0-9]+\.wasm/,
  /\/.*\/[a-f0-9]+\.js/,
  /\/.+\/.+\.mp4/,
  /\/.+\/.+\.png/,
  /\/.+\/.+\.jpg/,
  /\/.+\/.+\.css/,
]; // 複数の正規表現を配列で設定

self.addEventListener("fetch", function (event) {
  // いずれかの正規表現にマッチする場合のみキャッシュ処理を行う
  if (REGEX_PATTERNS.some((pattern) => event.request.url.match(pattern))) {
    event.respondWith(
      caches.match(event.request).then(function (cachedResponse) {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request, { mode: "cors" })
          .then(function (response) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(function (cache) {
              cache
                .put(event.request, responseToCache)
                .catch((e) => console.log(e));
            });

            return response;
          })
          .catch(function () {
            return fetch(event.request, { mode: "no-cors" })
              .then(function (response) {
                const responseToCache = response.clone();
                caches.open(CACHE_NAME).then(function (cache) {
                  cache
                    .put(event.request, responseToCache)
                    .catch((e) => console.log(e));
                });

                return response;
              })
              .catch(function () {
                return caches.match(event.request);
              });
          });
      })
    );
  } else {
    // 正規表現にマッチしない場合、通常のフェッチ処理を行う
    event.respondWith(fetch(event.request));
  }
});
