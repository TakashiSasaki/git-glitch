//var WURFL;
import("/wurfl.js")
  .then((x) => {
    //WURFL = x;
    //console.log("WURFL", WURFL);
  })
  .catch("failed to load wurfl.js");

var Modernizr;
import("/modernizr-webgl.js")
  .then((x) => {
    Modernizr = x;
    console.log("Modernizr", Modernizr);
  })
  .catch("failed to load modernizr-webgl.js");

function isNarrow() {
  if (window.matchMedia && window.matchMedia("(max-width: 767px)").matches) {
    return true;
  } else {
    return false;
  } //if
} //isNarrow

export function isMobile() {
  console.log(WURFL.is_mobile);
  if (typeof WURFL !== "undefined") {
    if (WURFL.is_mobile || WURFL.form_factor !== "Desktop") return true;
  }
  if (typeof navigator.connection !== "undefined") {
    if (
      navigator.connection.downlink < 8 ||
      navigator.connection.rtt > 100 ||
      navigator.connection.saveData ||
      navigator.connection.effectiveType !== "4g"
    )
      return true;
  }
  if (typeof Modernizr !== "undefined") {
    if (!Modernizr.webgl || !Modernizr.webglextensions) return true;
  }
  if (typeof isNarrow !== "undefined") {
    if (isNarrow()) return true;
  }
  return false;
}

window.isMobile = isMobile;
