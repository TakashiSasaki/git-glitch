// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const fs = require("fs");
const express = require("express");
const app = express();

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

app.get("/", (req, res) =>{
  res.set("Content-Type", "text/html");
  var text = fs.readFileSync(__dirname + "/views/index.html").toString();
  const o = {};
  o.headers = req.headers;
  res.send(text.replace(/JSONJSONJSON/g, JSON.stringify(o)));
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
