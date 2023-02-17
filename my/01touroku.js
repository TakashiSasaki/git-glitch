window.addEventListener("load", () => {
  document.querySelector("button").addEventListener("click", (e) => {
    const username = document.querySelector("input").value;
    fetch("/auth/username", { method: "POST", 
                             headers:{
                               "Content-Type":"form/"
                             },
                             body: "username=" + username })
      .then((response) => response.text())
      .then((text) => (document.querySelector("textarea").value = text));
  });
});
