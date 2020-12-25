// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const fs = require("fs");
const express = require("express");
const app = express();

// our default array of dreams
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/index", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/", (req, res) =>{
  res.set("Content-Type", "text/html");
  var text = fs.readFileSync(__dirname + "/views/index.html").toString();
  const o = {};
  o.headers = req.headers;
  text.replace("JSONJSONJSON", JSON.stringify(o));
  res.send(text);
});

// send the default array of dreams to the webpage
app.get("/dreams", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.json(dreams);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
