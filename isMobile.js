const WURFL = import("/wurfl.js");
console.log(WRFL);
console.log(WRFL.is_mobile);

function isNarrow() {
  if (window.matchMedia && window.matchMedia("(max-width: 767px)").matches) {
    return true;
  } else {
    return false;
  } //if
} //isNarrow

export function isMobile() {
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
