window.onlaod = () => {
  setTimeout(() => {
    const iframeSrc = window.localStorage.getItem("iframeSrc");
    if (typeof iframeSrc === "string") {
      document.querySelector("iframe").setAttribute("src", iframeSrc);
    }
  }, 10);
};

function setIframeSrc(button) {
  window.localStorage.setItem("iframeSrc", button.value);
  document.querySelector("iframe").setAttribute("src", button.value);
}
