//const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const dns = require("dns");

const database = new sqlite3.Database("/app/.data/dns.sqlite3", (error) => {
  if (!error) return;
  console.log(error);
});

function createTable() {
  console.log("createTable");
  database.run(
    "CREATE TABLE reverse (ipv4 TEXT, fqdn TEXT, timestamp DATE)",
    (error) => {
      if (!error) return;
      console.log(error);
    }
  );
} //function createTable

function recreateTable() {
  console.log("recreateTable()");
  database.run("DROP TABLE reverse", (error) => {
    if (!error) return;
    if (/no such table/.test(error.toString())) {
      return;
    }
    console.log(error.toString());
  });
  createTable();
} //function recreateTable

function insertIntoReverseStatement() {
  return new Promise((ok, ng) => {
    const statement = database.prepare(
      "INSERT INTO reverse (ipv4, fqdn, timestamp) VALUES(?,?,?)",
      (error) => {
        if (!error) {
          throw error;
        } else if (/no such table/.test(error.toString())) {
          recreateTable();
          return;
        } else {
          ng(error);
          return;
        }
      }
    );
    ok(statement);
    //statement.finalize();
  });
} //function statement

function lookup(ipAddress) {
return      new Promise((ok, ng) => {
        dns.reverse(ipAddress, (x, y) => {
          console.log("callback of dns.reverse");
          s.run([ipAddress, y, new Date()], (error) => {
            console.log("callback of statement.run");
            if (!error) ok();
            if (/table .+ already exists/.test(error.toString())) {
              console.log(error.toString());
            }
            ng(error);
          });
        });
      })
  );
} //function lookup

function get(ipAddress) {
  return new Promise((ok, ng) => {
    const SQL =
      "SELECT ipv4, fqdn, MAX(timestamp) FROM reverse GROUP BY ipv4, fqdn";
    database.all(SQL, (error, rows) => {
      if (!error) {
        console.log(rows.length);
        return ok(rows);
      } else {
        ng(error);
      }
    });
  });
} //function select

exports.lookup = lookup;
exports.get = get;

if (require.main === module) {
  console.log("This file was run directly.");
  lookup("133.71.200.68").then(() => {
    get("133.71.200.68").then((rows) => console.log(rows));
  });
} else {
  console.log("This file was imported as a module.");
}
