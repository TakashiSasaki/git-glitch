const dq = (selector) => document.querySelector(selector);

window.addEventListener("load", () => {
  dq("button").addEventListener("click", (e) => {
    const username = dq("input").value;
    fetch("/auth/username", {
      method: "POST",
      headers: {
        //"Content-Type": "application/x-www-form-urlencoded",
        "Content-Type": "application/json",
      },
      //body: "username=" + username,
      body: JSON.stringify({ username: username }),
    })
      .then((response) => response.text())
      .then((text) => (dq("textarea").value = text));
  });

  dq("input").value = localStorage.getItem("username");
  dq("input").addEventListener("change", (event) => {
    localStorage.setItem("username", event.target.value);
  });
});
