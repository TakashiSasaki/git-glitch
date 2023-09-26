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
          "/euvc2023contents/board/jpg/01HOUBU.jpg",
          "/euvc2023contents/board/jpg/i_report.jpg",
          "/euvc2023contents/board/jpg/infinity.jpg",
          "/euvc2023contents/board/jpg/02KYOUIKU.jpg",
          "/euvc2023contents/board/jpg/03SHAKYO.jpg",
          "/euvc2023contents/board/jpg/04RIGAKU.jpg",
          "/euvc2023contents/board/jpg/05IGAKU.jpg",
          "/euvc2023contents/board/jpg/06KOUGAKU.jpg",
          "/euvc2023contents/board/jpg/07NOUGAKU.jpg",
          "/euvc2023contents/board/jpg/08JYUKEN.jpg",
          "/euvc2023contents/board/jpg/09OGYA.jpg",
          "/euvc2023contents/board/jpg/10OSHPITAL.jpg",
          "/euvc2023contents/board/jpg/11datascience.jpg",
          "/euvc2023contents/board/jpg/12rstock.jpg",
          "/euvc2023contents/board/jpg/13newcomer.jpg",
          "/euvc2023contents/board/jpg/14lr.jpg",
          "/euvc2023contents/board/jpg/15bousai.jpg",
          "/euvc2023contents/board/jpg/16SDGS.jpg",
          "/euvc2023contents/board/jpg/17byouin.jpg",
          "/euvc2023contents/board/jpg/18kikin.jpg",
          "/euvc2023contents/board/jpg/19mirainoaidaisei.jpg",
          "/euvc2023contents/board/jpg/20seikatujyouhou.jpg",
          "/euvc2023contents/board/jpg/21iikurashi.jpg",
          "/euvc2023contents/board/jpg/22youchien.jpg",
          "/euvc2023contents/board/jpg/23shougakko.jpg",
          "/euvc2023contents/board/jpg/24chuugaku.jpg",
          "/euvc2023contents/board/jpg/25koukou.jpg",
          "/euvc2023contents/board/jpg/26tokubetushien.jpg",
          "/euvc2023contents/board/jpg/27enshuurin.jpg",
          "/euvc2023contents/board/jpg/28museum.jpg",
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
  [
    "/euvc2023contents/board/image/news/01HOUBU.png",
    "/euvc2023contents/board/jpg/01HOUBU.jpg",
  ],
  [
    "/euvc2023contents/board/image/news/02KYOUIKU.png",
    "/euvc2023contents/board/jpg/02KYOUIKU.jpg",
  ],
  [
    "/euvc2023contents/board/image/news/25koukou.png",
    "/euvc2023contents/board/jpg/25koukou.jpg",
  ],
  [
    "/euvc2023contents/board/image/news/i_report.png",
    "/euvc2023contents/board/jpg/i_report.jpg",
  ],
  [
    "/euvc2023contents/board/image/news/20seikatujyouhou.png",
    "/euvc2023contents/board/jpg/20seikatujyouhou.jpg",
  ],
  [
    "/euvc2023contents/board/image/news/22youchien.png",
    "/euvc2023contents/board/jpg/22youchien.jpg",
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
    console.log(
      `${fetchEvent.request.url} should be mapped to alternative path ${mappedRequest[1]}`
    );
    mappedRequest = new Request(foundMapping[1], {
      method: fetchEvent.request.method,
      headers: fetchEvent.request.headers,
      mode: fetchEvent.request.mode,
      credentials: fetchEvent.request.credentials,
      redirect: fetchEvent.request.redirect,
      referrer: fetchEvent.request.referrer,
      integrity: fetchEvent.request.integrity,
    });
  } else {
    console.log(
      `${fetchEvent.request.url} should not be mapped to alternative path.`
    );
  }

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
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) =>
              cache.put(mappedRequest, responseClone).catch((e) => {
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
    console.log(
      `${fetchEvent.request.url} didn't match the regular expression for caching.`
    );
    fetchEvent.respondWith(fetch(fetchEvent.request));
  }
});
