// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

app.get("/", function (request, response) {
  //response.sendFile(__dirname + '/views/index.html');
  response.sendFile(__dirname + '/public/muuri.html');
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/index", function (request, response) {
  //response.sendFile(__dirname + '/views/index.html');
  response.sendFile(__dirname + '/public/index.html');
});

app.get("/muuri.html", function(request, response){
  response.sendFile(__dirname + "/public/muuri.html");
});

app.get("/hello-firebase", function(request, response){
  response.sendFile(__dirname + "/public/hello-firebase.html");
});

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
