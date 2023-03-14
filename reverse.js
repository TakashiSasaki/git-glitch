const sqlite3 = require("sqlite3");
const database = new sqlite3.Database("/app/.data/dns.sqlite");

function createTable() {
  database.run("CREATE TABLE reverse (ipv4 TEXT, fqdn TEXT)");
  //a.reverse("133.71.200.68", (x,y)=>console.log(y))
}

function reverseLookup(ipAddress){
  const statement =   
}