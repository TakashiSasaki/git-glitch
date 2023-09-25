const CACHE_NAME = "20230925T1000";

self.addEventListener("install", (e) => {
  setTimeout(() => {
    caches.open(CACHE_NAME).then(function (cache) {
      cache
        .addAll([
          "/euvc2023/EhimeWebGL/Build/66037178c278503228e0f5f2511b301a.data",
          "/euvc2023/EhimeWebGL/Build/dd9ff5803245e1a33787af0195f3d3d8.wasm",
          "/euvc2023/EhimeWebGL/Build/faf84e8f082175e7c8af023ce113f1ba.js",
        ])
        .catch((e) => console.log("Caching failed:", e));
    });
  }, 1000);

  setTimeout(() => {
    caches.open(CACHE_NAME).then(function (cache) {
      cache
        .addAll([
          "/euvc2023contents/board/webp/01HOUBU.webp",
          "/euvc2023contents/board/webp/i_report.webp",
          "/euvc2023contents/board/image/news/infinity.png",
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
        ])
        .catch((e) => console.log(e));
    });
  }, 3000);

  /*
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
  */

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

const URL_MAPPINGS = [
  ["/oldpath/image1.png", "/newpath/image1.webp"],
  ["/oldpath/image2.png", "/newpath/image2.webp"],
];

const REGEX_PATTERNS = [
  /\/.*\/[a-f0-9]+\.data/,
  /\/.*\/[a-f0-9]+\.wasm/,
  /\/.*\/[a-f0-9]+\.js/,
  /\/.+\/.+\.mp4/,
  /\/.+\/.+\.MP4/,
  /\/.+\/.+\.png/,
  /\/.+\/.+\.jpg/,
  /\/.+\/.+\.css/,
  /\/.+\/.+\.webp/,
]; // 複数の正規表現を配列で設定

self.addEventListener("fetch", function (fetchEvent) {
  var cacheCandidateRequest = fetchEvent.request;

  const url = new URL(fetchEvent.request.url);
  const foundMapping = URL_MAPPINGS.find(
    (mapping) => mapping[0] === url.pathname
  );

  if (foundMapping) {
    cacheCandidateRequest = new Request(foundMapping[1], {
      method: event.request.method,
      headers: event.request.headers,
      mode: event.request.mode,
      credentials: event.request.credentials,
      redirect: event.request.redirect,
      referrer: event.request.referrer,
      integrity: event.request.integrity,
    });
  } //if

  console.log(fetchEvent);
  // いずれかの正規表現にマッチする場合のみキャッシュ処理を行う
  if (REGEX_PATTERNS.some((pattern) => fetchEvent.request.url.match(pattern))) {
    console.log(
      `${fetchEvent.request.url} matched the regular expression for caching.`
    );
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(function (cachedResponse) {
        if (cachedResponse) {
          console.log(cachedResponse);
          return cachedResponse;
        } //if

        console.log("Trying to cache in cors mode.");
        return fetch(fetchEvent.request, { mode: "cors" })
          .then((response) => {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) =>
              cache.put(fetchEvent.request, responseToCache).catch((e) => {
                console.log(e);
                if (responseToCache.status === 206) {
                  fetch(fetchEvent.request.url)
                    .then((fullResponse) =>
                      cache
                        .put(fetchEvent.request.url, fullResponse.clone())
                        .then(() =>
                          console.log(
                            `${fetchEvent.request.url} has been successfully cached.`
                          )
                        )
                    )
                    .catch((fetchError) => console.log(fetchError));
                } //if
              })
            );
            return response;
          })
          .catch((corsFetchError) => {
            console.log(corsFetchError);
            console.log("Trying to cache in no-cors mode.");
            return fetch(fetchEvent.request, { mode: "no-cors" })
              .then((response) => {
                const responseToCache = response.clone();
                caches.open(CACHE_NAME).then(function (cache) {
                  cache
                    .put(fetchEvent.request, responseToCache)
                    .catch((e) => console.log(e));
                });
                return response;
              })
              .catch((fetchError) => caches.match(event.request));
          });
      })
    ); //respondWith
  } else {
    // 正規表現にマッチしない場合、通常のフェッチ処理を行う
    console.log("target.url didn't match the regular expression for caching.");
    event.respondWith(fetch(fetchEvent.request));
  }
});
