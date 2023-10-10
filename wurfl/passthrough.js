self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request, {
      mode: "no-cors",
      headers: {
        Referer: "https://euvc-pr-ehime-u.glitch.me/",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Edg/117.0.2045.47",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
    })
  );
});
