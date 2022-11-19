function generateRegistrationOptions() {
  const x = await fetch("generateRegistrationOptions", {});
  document.querySelector("TEXTAREA").value = x;
}
