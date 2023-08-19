const myParser = new RdfaParser({
  baseIRI: "https://www.rubensworks.net/",
  contentType: "text/html",
});

var log = document.querySelector("textarea").value;

myParser
  .on("data", (x) => (log += x))
  .on("error", (x) => (log += x))
  .on("end", () => (log += "All triples were parsed!"));

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
