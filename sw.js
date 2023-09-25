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
          "/euvc2023contents/board/webp/infinity.webp",
          "/euvc2023contents/board/webp/02KYOUIKU.webp",
          "/euvc2023contents/board/webp/03SHAKYO.webp",
          "/euvc2023contents/board/webp/04RIGAKU.webp",
          "/euvc2023contents/board/webp/05IGAKU.webp",
          "/euvc2023contents/board/webp/06KOUGAKU.webp",
          "/euvc2023contents/board/webp/07NOUGAKU.webp",
          "/euvc2023contents/board/webp/08JYUKEN.webp",
          "/euvc2023contents/board/webp/09OGYA.webp",
          "/euvc2023contents/board/webp/10HOSPITAL.webp",
          "/euvc2023contents/board/webp/11datascience.webp",
          "/euvc2023contents/board/webp/12rstock.webp",
          "/euvc2023contents/board/webp/13newcomer.webp",
          "/euvc2023contents/board/webp/14lr.webp",
          "/euvc2023contents/board/webp/15bousai.webp",
          "/euvc2023contents/board/webp/16SDGS.webp",
          "/euvc2023contents/board/webp/17byouin.webp",
          "/euvc2023contents/board/webp/18kikin.webp",
          "/euvc2023contents/board/webp/19mirainoaidaisei.webp",
          "/euvc2023contents/board/webp/20seikatujyouhou.webp",
          "/euvc2023contents/board/webp/21iikurashi.webp",
          "/euvc2023contents/board/webp/22youchien.webp",
          "/euvc2023contents/board/webp/23shougakko.webp",
          "/euvc2023contents/board/webp/24chuugaku.webp",
          "/euvc2023contents/board/webp/25koukou.webp",
          "/euvc2023contents/board/webp/26tokubetushien.webp",
          "/euvc2023contents/board/webp/27enshuurin.webp",
          "/euvc2023contents/board/webp/28museum.webp",
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

const URL_MAPPINGS = [];

const URL_MAPPINGS_2 = [
  [
    "/euvc2023contents/board/image/news/01HOUBU.png",
    "/euvc2023contents/board/webp/01HOUBU.webp",
  ],
  [
    "/euvc2023contents/board/image/news/02KYOUIKU.png",
    "/euvc2023contents/board/webp/02KYOUIKU.webp",
  ],
  [
    "/euvc2023contents/board/image/news/25koukou.png",
    "/euvc2023contents/board/webp/25koukou.webp",
  ],
  [
    "/euvc2023contents/board/image/news/i_report.png",
    "/euvc2023contents/board/webp/i_report.webp",
  ],
  [
    "/euvc2023contents/board/image/news/20seikatujyouhou.png",
    "/euvc2023contents/board/webp/20seikatujyouhou.webp",
  ],
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
  const url = new URL(fetchEvent.request.url);
  const foundMapping = URL_MAPPINGS.find(
    (mapping) => mapping[0] === url.pathname
  );

  var mappedRequest = fetchEvent.request;
  if (foundMapping) {
    mappedRequest = new Request(foundMapping[1], {
      method: fetchEvent.request.method,
      headers: fetchEvent.request.headers,
      mode: fetchEvent.request.mode,
      credentials: fetchEvent.request.credentials,
      redirect: fetchEvent.request.redirect,
      referrer: fetchEvent.request.referrer,
      integrity: fetchEvent.request.integrity,
    });
  } //if

  console.log(fetchEvent);
  // いずれかの正規表現にマッチする場合のみキャッシュ処理を行う
  if (REGEX_PATTERNS.some((pattern) => mappedRequest.url.match(pattern))) {
    console.log(
      `${fetchEvent.request.url} matched the regular expression for caching.`
    );
    fetchEvent.respondWith(
      caches.match(mappedRequest).then(function (cachedResponse) {
        if (cachedResponse) {
          console.log(cachedResponse);
          return cachedResponse;
        } //if

        console.log("Trying to cache in cors mode.");
        return fetch(mappedRequest, { mode: "cors" })
          .then((response) => {
            //const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) =>
              cache.put(mappedRequest, response.clone()).catch((e) => {
                console.log(e);
                if (response.status === 206) {
                  fetch(mappedRequest.url)
                    .then((fullResponse) =>
                      cache
                        .put(mappedRequest.url, fullResponse.clone())
                        .then(() =>
                          console.log(
                            `${mappedRequest.url} has been successfully cached.`
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
            return fetch(mappedRequest, { mode: "no-cors" })
              .then((noCorsResponse) => {
                //const responseToCache = response.clone();
                caches.open(CACHE_NAME).then(function (cache) {
                  cache
                    .put(mappedRequest, noCorsResponse.clone())
                    .catch((e) => console.log(e));
                });
                return noCorsResponse;
              })
              .catch((fetchError) => fetch(fetchEvent.request));
          });
      })
    ); //respondWith
  } else {
    // 正規表現にマッチしない場合、通常のフェッチ処理を行う
    console.log("target.url didn't match the regular expression for caching.");
    fetchEvent.respondWith(fetch(fetchEvent.request));
  }
});
