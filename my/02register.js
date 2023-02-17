import { _fetch, registerCredential, unregisterCredential } from "/clients.js";

window.addEventListener("load", (event) => {
  document.querySelector("button").addEventListener("click", (event) => {
    registerCredential();
  });
});
