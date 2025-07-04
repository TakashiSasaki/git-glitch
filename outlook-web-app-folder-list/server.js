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
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// send the default array of dreams to the webpage
app.get("/dreams", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.json(dreams);
});

// It doesn't work because of subdomain.
app.get("/.well-known/microsoft-identity-association", (request, response)=>{
  //response.writeHead(200, {'Content-Type': 'application/json' });
  response.setHeader("Content-Type", "application/json");
  const text = fs.readFileSync("public/microsoft-identity-association.json").toString();
  //response.sendFile(__dirname + "/public/microsoft-identity-association.json")
  response.send(text)
});

// It doesn't work because of subdomain.
app.get("/.well-known/microsoft-identity-association.json", (request, response)=>{
  response.setHeader("Content-Type", "application/json");
  const text = fs.readFileSync("public/microsoft-identity-association.json").toString();
  //response.sendFile(__dirname + "/public/microsoft-identity-association.json")
  response.send(text)
});


// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
