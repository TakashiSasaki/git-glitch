const route = (fastify) => {
  fastify.get("/json", (request, reply) => reply.send({ hello: "world" }));

  fastify.get("/get", (request, reply) => {
    const { CloudMemcacheClient } = require("@google-cloud/memcache").v1;
    const memcacheClient = new CloudMemcacheClient();
  });
};

module.exports = {
  route: route,
};
