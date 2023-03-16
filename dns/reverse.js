//const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const dns = require("dns");

const database = new sqlite3.Database("/app/.data/dns.sqlite3", (error) => {
  if (!error) return;
  throw error;
});

var hasTableCreated = false;

function createTable() {
  if(hasTableCreated) throw new Error("Dangling table creation.");
  database.run(
    "CREATE TABLE reverse (ipv4 TEXT, fqdn TEXT, timestamp DATE)",
    (error) => {
      if (!error) return;
      throw error;
    }
  );
} //function createTable

var hasTableRecreated = false;

function recreateTable() {
  if(hasTableRecrested) throw new Error("Dangling table recreation.")
  database.run("DROP TABLE reverse", (error) => {
    if (!error) {
      createTable();
    }
    if (/no such table/.test(error.toString())) {
      createTable();
    }
    throw error;
  });
} //function recreateTable


function insertIntoReverse(ipAddress, fqdn) {
  return new Promise((ok,ng)=>{
    const statement = database.prepare(
      "INSERT INTO reverse (ipv4, fqdn, timestamp) VALUES(?,?,?)",
      (error) => {
        if (!error) throw new Error("Unexpected error callback at database.prepare().");
        if (/no such table/.test(error.toString())) {
          recreateTable();
        }
        throw error;
      }
    );
    statement.run([ipAddress, y, new Date()], error=>{
      if(!error) throw new Error("Unexpected error callback at statement.run().")
    });
  });
  
} //function statement

async function lookup(ipAddress) {
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
      });
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
