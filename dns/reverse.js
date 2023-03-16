//const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const dns = require("dns");

const database = new sqlite3.Database("/app/.data/dns.sqlite3", (error) => {
  if (!error) return;
  throw error;
});

var hasTableCreated = false;

function createTable() {
  console.log("createTable()");
  return new Promise((ok, ng) => {
    database.run(
      "CREATE TABLE reverse (ipv4 TEXT, fqdn TEXT, timestamp DATE)",
      (error) => {
        if (!error) {
          ok();
          return;
        } //if
        if (/exists/.test(error.toString())) {
          ok();
          return;
        } //if
        throw error;
      } //lambda
    );
  });
} //function createTable

var hasTableRecreated = false;

function dropTable() {
  console.log("recreateTable()");
  return new Promise((ok, ng) => {
    database.run("DROP TABLE reverse", (error) => {
      if (!error) {
        ok();
        return;
      } //if
      if (/no such/.test(error.toString())) {
        ok();
        return;
      } //if
      throw error;
    });
  });
} //function recreateTable

function insertIntoReverse(ipAddress, fqdn) {
  console.log(`insertIntoReverse(${ipAddress}, ${fqdn})`);
  return new Promise((ok, ng) => {
    const statement = database.prepare(
      "INSERT INTO reverse (ipv4, fqdn, timestamp) VALUES(?,?,?)",
      (error) => {
        if (!error) {
          statement.run([ipAddress, fqdn, new Date()], (error) => {
            if (!error) {
              ok();
              return;
            }
            if (/no such table/.test(error.toString())) {
              createTable().then(() => insertIntoReverse(ipAddress, fqdn));
              ok();
              return;
            }
            throw error;
          });
        }
        if(/no such table/.test(error.toString())){
          createTable().then(()=>insertIntoReverse(ipAddress, fqdn))          ;
        }
        throw error;
      }
    );
  });
} //function statement

function lookup(ipAddress) {
  return new Promise((ok, ng) => {
    dns.reverse(ipAddress, (x, y) => {
      console.log("callback of dns.reverse");
      insertIntoReverse(ipAddress, y).then(ok()).catch(ng);
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
