importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js"
);

// Cache .png images with a Cache First strategy
workbox.routing.registerRoute(
  // Match .png image files
  /.*\.png$/,
  // Use a Cache First strategy
  new workbox.strategies.CacheFirst({
    // Put all cached files in a cache named 'images'
    cacheName: "images",
  })
);

workbox.routing.registerRoute(
  // Check to see if the request's destination is style css, script, or worker
  ({ request }) => request.destination === "image",
  // Use a Cache First strategy
  new workbox.strategies.CacheFirst({
    // Put all cached files in a cache named 'images'
    cacheName: "images",
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [200],
      }),
      // Don't cache more than 50 items, and expire them after 30 days
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 5, // 5 Days
      }),
    ],
  })
);

workbox.routing.registerRoute(
  // Check to see if the request is a navigation to a new page
  ({ request }) => request.mode === "navigate",
  // Use a Network First strategy
  new workbox.strategies.CacheFirst({
    // Put all cached files in a cache named 'pages'
    cacheName: "pages",
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [200],
      }),
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 5, // 5 Days
      }),
    ],
  })
);

workbox.routing.registerRoute(
  /jquery-1\.9\.1\.min\.js$/,
  new workbox.strategies.CacheFirst({
    cacheName: "jquery-cache",
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [200],
      }),
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 60 * 60, // 1 hour
      }),
    ],
  })
);

workbox.routing.registerRoute(
  /.*\.css$/,
  new workbox.strategies.CacheFirst({
    cacheName: "css-cache",
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [200],
      }),
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 60 * 60, // 1 hour
      }),
    ],
  })
);

workbox.routing.registerRoute(
  ({ request }) => request.destination === "style",
  new workbox.strategies.CacheFirst({
    cacheName: "css-cache",
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [200],
      }),
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 10, // 10 days
      }),
    ],
  })
);

workbox.routing.registerRoute(
  /nicepage\.js$/,
  new workbox.strategies.CacheFirst({
    cacheName: "js-cache",
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [200],
      }),
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
      }),
    ],
  })
);
workbox.routing.registerRoute(
  /([a-f0-9]{32})\.(js|wasm|data)$/,
  new workbox.strategies.CacheFirst({
    cacheName: "unity-cache",
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [200],
      }),
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24, // 1 day
      }),
    ],
  })
);
