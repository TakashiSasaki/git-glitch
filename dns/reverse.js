const sqlite3 = require("sqlite3");
const dns = require("dns");
const database = new sqlite3.Database("/app/.data/dns.sqlite");

function createTable() {
  database.run("CREATE TABLE reverse (ipv4 TEXT, fqdn TEXT)");
  //a.reverse("133.71.200.68", (x,y)=>console.log(y))
}//createTable

function reverseLookup(ipAddress) {
  dns.reverse(ipAddress, (x, y) => {
    const statement = database.prepare("INSERT INTO reverse VALUES(?,?)");
    statement.run(ipAddress, y);
    statement.finalize();
  });
}//reverseLookup

function test(){
  reverseLookup("133.71.200.68");
}

exports.test = test

