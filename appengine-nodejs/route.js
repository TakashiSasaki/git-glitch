const route = (fastify) => {
  fastify.get("/json", (request, reply) => reply.send({ hello: "world" }));

  fastify.get("/get", (request, reply) => {
    const { CloudMemcacheClient } = require("@google-cloud/memcache").v1;
    const memcacheClient = new CloudMemcacheClient();
  });

  fastify.get("/datastore", (request, reply) => {
    const { Datastore } = require("@google-cloud/datastore");
    const datastore = new Datastore();
    reply.send("datastore");
  });

  fastify.get("/count", (request, reply) => {
    if (typeof request.session.count !== "number") {
      request.session.count = 1;
      request.session.countType = typeof request.session.count;
    } else {
      request.session.count = request.session.count + 1;
    }
    reply.send(JSON.stringify(request.session));
  });
};

module.exports = {
  route: route,
};
