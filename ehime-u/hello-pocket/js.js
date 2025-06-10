window.addEventListener("load", (event) => {
  refreshAuthorization();
  document
    .querySelector("#getBySinceButton")
    .addEventListener("click", (event) => {
      const since = document.querySelector("#sinceInput").value;
      const count = document.querySelector("#countInput").value;
      google.script.run
        .withSuccessHandler((x) => {
          document.querySelector("textarea").value = x;
        })
        .getBySince(offset, count);
    });

  document
    .querySelector("#getByOffsetButton")
    .addEventListener("click", (event) => {
      const offset = document.querySelector("#offsetInput").value;
      const count = document.querySelector("#countInput").value;
      google.script.run
        .withSuccessHandler((x) => {
          document.querySelector("textarea").value = x;
        })
        .getByOffset(offset, count);
    });
});

function refreshAuthorization() {
  google.script.run
    .withSuccessHandler((accessToken) => {
      document.querySelector("#accessTokenInput").value = accessToken;
    })
    .getUserProperty("accessToken");
  google.script.run
    .withSuccessHandler((username) => {
      document.querySelector("#usernameInput").value = username;
    })
    .getUserProperty("username");
}
