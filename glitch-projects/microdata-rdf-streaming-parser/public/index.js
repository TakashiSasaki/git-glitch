const inputText = `<html>
<head></head>
<body>
    <span id="b">Name: <span itemprop="prop2">b</span></span>
    <span id="a" itemprop="prop" itemscope itemtype="http://example2.org/SubPerson" itemref="b">a</span>
    <span itemscope itemid="http://example.org/subject" itemtype="http://example.org/Person" itemref="a"></span>
</body>
</html>`;

const myParser = new MicrodataRdfParser({
  contentType: "text/html",
});

var textarea = document.querySelector("textarea");

myParser
  .on("data", (x) => (textarea.value += JSON.stringify(x, null, 2) + "\n"))
  .on("error", (x) => (textarea.value += JSON.stringify(x, null, 2) + "\n"))
  .on("end", () => (textarea.value += "All triples were parsed!"));

myParser.write(inputText);
myParser.end();
