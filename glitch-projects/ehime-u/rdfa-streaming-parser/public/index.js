const myParser = new RdfaParser({
  baseIRI: "https://www.rubensworks.net/",
  contentType: "text/html",
});

var textarea = document.querySelector("textarea");

myParser
  .on("data", (x) => (textarea.value += JSON.stringify(x, null, 2) + "\n"))
  .on("error", (x) => (textarea.value += JSON.stringify(x, null, 2) + "\n"))
  .on("end", () => (textarea.value += "All triples were parsed!"));

myParser.write('<?xml version="1.0"?>');
myParser.write(`<!DOCTYPE html>
<html>

<head prefix="foaf: http://xmlns.com/foaf/0.1/">`);
myParser.write(
  `<link rel="foaf:primaryTopic foaf:maker" href="https://www.rubensworks.net/#me" />`
);
myParser.write(`</head>`);
myParser.write(`<body>`);
myParser.write(`</body>`);
myParser.write(`</html>`);
myParser.end();
