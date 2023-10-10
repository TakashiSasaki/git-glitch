importScripts("./paths.js");

const CACHE_NAME = "20230925T1000";
const PRODUCTION_DOMAIN = "euvc.pr.ehime-u.ac.jp";

self.addEventListener("install", (e) => {
  setTimeout(() => {
    caches.open(CACHE_NAME).then(function (cache) {
      if (self.location.hostname === PRODUCTION_DOMAIN) {
        cache
          .addAll(UNITY_PATHS)
          .catch((e) => console.log("Caching failed:", e));
      } else {
        console.log(`Ignore UNITY_PATHS in ${self.location.hostname}`);
      } //if
    });
  }, 1000);

  setTimeout(() => {
    caches.open(CACHE_NAME).then(function (cache) {
      if (self.location.hostname === PRODUCTION_DOMAIN) {
        cache.addAll(JPEG_PATHS).catch((e) => console.log(e));
      } else {
        console.log(`Ignore JPEG_PATHS in ${self.location.hostname}`);
      } //if
    });
  }, 3000);

  /*
  setTimeout(() => {
    caches.open(CACHE_NAME).then(function (cache) {
      cache
        .addAll(MP4_PATHS)
        .catch((e) => console.log("Caching failed:", e));
    });
  }, 10000);
  */

  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        LANDING_PATHS.map((url) =>
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
  /\/.+\/.+\.MP4/,
  /\/.+\/.+\.png/,
  /\/.+\/.+\.jpg/,
  /\/.+\/.+\.css/,
  /\/.+\/.+\.webp/,
]; // 複数の正規表現を配列で設定

self.addEventListener("fetch", function (fetchEvent) {
  const url = new URL(fetchEvent.request.url);
  const foundMapping = URL_MAPPINGS.find((mapping) =>
    fetchEvent.request.url.match(mapping[0])
  );

  var mappedRequest = fetchEvent.request;
  if (foundMapping) {
    console.log(
      `${fetchEvent.request.url} should be mapped to alternative path ${foundMapping[1]}`
    );
    mappedRequest = new Request(
      fetchEvent.request.url.replace(foundMapping[0], foundMapping[1]),
      {
        method: fetchEvent.request.method,
        headers: fetchEvent.request.headers,
        mode: fetchEvent.request.mode,
        credentials: fetchEvent.request.credentials,
        redirect: fetchEvent.request.redirect,
        referrer: fetchEvent.request.referrer,
        integrity: fetchEvent.request.integrity,
      }
    );
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
    fetchEvent.respondWith(fetch(fetchEvent.request, {mode: 'no-cors'}));
  }
});
