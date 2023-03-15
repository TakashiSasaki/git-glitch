const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const dns = require("dns");

function createTable() {
  const database = new sqlite3.Database("/app/.data/dns.sqlite3");
  database.run("CREATE TABLE reverse (ipv4 TEXT, fqdn TEXT)", (error) => {
    console.log(error);
  });
  //a.reverse("133.71.200.68", (x,y)=>console.log(y))
} //createTable

function reverseLookup(ipAddress) {
  dns.reverse(ipAddress, (x, y) => {
    const database = new sqlite3.Database("/app/.data/dns.sqlite", (error) => {
      console.log(error);
    });
    const statement = database.prepare(
      "INSERT INTO reverse (ipv4, fqdn) VALUES(?,?)"
    );

    statement.run([ipAddress, y], (error) => {
      if (/no such table/.test("a" + error.toString() + "b")) {
        console.log("CREATE TABLE");
        console.log("a" + error.toString() + "b");
        createTable();
        return;
      }
      if (/table .+ already exists/.test(error.toString())) {
        console.log(error.toString());
        console.log("ALREADY EXISTS");
        return;
      }
      console.log("unknown error");
      console.log(error);
    });
    statement.finalize();
  });
} //reverseLookup

exports.createTable = createTable;
exports.reverseLookup = reverseLookup;

if (require.main === module) {
  console.log("This file was run directly.");
  reverseLookup("133.71.200.68");
} else {
  console.log("This file was imported as a module.");
}
