const parsedDiv = document.getElementById("parsedDiv");

function parse() {
  const parser = new RdfaParser();
  parser.on("data", (data) => addQuad(data));
  parser.write(document.documentElement.outerHTML);
} //parse()

function addQuad(o) {
  const pre = document.createElement("pre");
  const code = document.createElement("code");
  pre.appendChild(code);
  code.innerText = JSON.stringify(o, null, 2);
  parsedDiv.appendChild(pre);
} //addQuad()

window.addEventListener("load", parse);
