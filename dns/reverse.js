const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const dns = require("dns");

function createTable() {
  const database = new sqlite3.Database("/app/.data/dns.sqlite3");
  database.run("CREATE TABLE reverse (ipv4 TEXT, fqdn TEXT)");
  //a.reverse("133.71.200.68", (x,y)=>console.log(y))
} //createTable

function reverseLookup(ipAddress) {
  dns.reverse(ipAddress, (x, y) => {
    const database = new sqlite3.Database("/app/.data/dns.sqlite");
    try {
      console.log(1);
      const statement = database.prepare("INSERT INTO reverse VALUES(?,?)");
      console.log(2);
      statement.run([ipAddress, y]);
      console.log(3);
      statement.finalize();
      console.log(4);
    } catch (e) {
      console.log(5);
      console.log(e);
      console.log(6);
      createTable();
    } finally{
      //database.close();
    }
  });
} //reverseLookup

exports.test = test;

if (require.main === module) {
  console.log('This file was run directly.');
  reverseLookup("133.71.200.68");  
} else {
  console.log('This file was imported as a module.');
}