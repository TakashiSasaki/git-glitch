const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const dns = require("dns");

const database = new sqlite3.Database("/app/.data/dns.sqlite3", (error) => {
  if (!error) return;
  console.log(error);
});

function createTable() {
  database.run("CREATE TABLE reverse (ipv4 TEXT, fqdn TEXT, timestamp DATE)", (error) => {
    if (!error) return;
    console.log(error);
  });
} //createTable

function recreateTable(){
  database.run("DROP TABLE reverse");
  createTable();
}

function reverseLookup(ipAddress) {
  dns.reverse(ipAddress, (x, y) => {
    const statement = database.prepare(
      "INSERT INTO reverse (ipv4, fqdn) VALUES(?,?)"
    );

    statement.run([ipAddress, y], (error) => {
      if (!error) return;
      if (/no such table/.test(error.toString())) {
        recreateTable();
        return;
      }
      if (/table .+ already exists/.test(error.toString())) {
        console.log(error.toString());
        return;
      }
      console.log(error.toString());
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
