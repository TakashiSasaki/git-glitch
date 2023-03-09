const route = (fastify) => {
  fastify.get("/json", (request, reply) => reply.send({ hello: "world" }));

  fastify.get("/get", (request, reply) => {
    const { CloudMemcacheClient } = require("@google-cloud/memcache").v1;
    const memcacheClient = new CloudMemcacheClient();
  });

  fastify.get("/datastore", (request, reply) => {
    const {Datastore} = require("@google-cloud/datastore");
    const datastore = new Datastore();
    reply.send("datastore");
  });
};

module.exports = {
  route: route,
};
