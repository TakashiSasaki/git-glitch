// users.js
const path = require("path");
const fastify = require('fastify')();

async function handler(request, reply) {
  const users = [{ name: 'John' }, { name: 'Jane' }];
  return { users };
}


fastify.get('/dns/test', handler);
fastify.register(require("fastify-static"), {
  root: path.join("__dirname", "dns"),
  prefix: "/dns/"
});

module.exports = fastify;

