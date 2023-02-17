const dq = (selector) => document.querySelector(selector);

window.addEventListener("load", () => {
  dq("button").addEventListener("click", (e) => {
    fetch("/auth/password", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: dq("#password").value,
        username: dq("#username").value,
      }),
    })
      .then((response) => response.text())
      .then((text) => (dq("textarea").value = text));
  });

  dq("#username").value = localStorage.getItem("username");
  dq("#username").addEventListener("change", (event) => {
    localStorage.setItem("username", event.target.value);
  });
  dq("#password").value = localStorage.getItem("password");
  dq("#password").addEventListener("change", (event) => {
    localStorage.setItem("password", event.target.value);
  });
});
