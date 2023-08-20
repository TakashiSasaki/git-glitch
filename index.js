const parseSection = document.getElementById("parseSection");

function parse() {
  const parser = new RdfaParser();
  parser.on("data", (data) => addQuad(data));
  parser.write(document.html.outerHtml);
} //parse()

function addQuad(o) {
  const pre = document.createElement("pre");
  const code = document.createElement("code");
  pre.appendChild(code);
  code.innerText = JSON.parse(o);
  parseSection.appendChild(pre);
} //addQuad()

window.addEventListener("load", parse);