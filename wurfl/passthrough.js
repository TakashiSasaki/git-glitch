self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      return fetch(event.request, {mode: "no-cors"});
    })()
  );
});
