function refreshAuthorization() {
  google.script.run.withSuccessHandler((accessToken) => {
    document.querySelector("accessTokenInput").value = accessToken;
  }).getUserProperty("accessToken");
}
