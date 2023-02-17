window.addEventListener("load", () => {
  document.querySelector("button").addEventListener("click", (e) => {
    const username = document.querySelector("input").value;
    fetch("/auth/username", {
      method: "POST",
      headers: {
        //"Content-Type": "application/x-www-form-urlencoded",
        "Content-Type": "application/json"
      },
      //body: "username=" + username,
      body: JSON.stringify({"username": username});
    })
      .then((response) => response.text())
      .then((text) => (document.querySelector("textarea").value = text));
  });
});
