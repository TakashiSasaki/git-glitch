const route = (fastify) => {
  fastify.get("/json", (request, reply) => reply.send({ hello: "world" }));

  fastify.get("/datastore", (request, reply) => {
    const { Datastore } = require("@google-cloud/datastore");
    const datastore = new Datastore();
    reply.send("datastore");
  });

  fastify.get("/count", (request, reply) => {
    if (typeof request.session.count2 !== "number") {
      request.session.count2 = 1;
      request.session.timestamp = new Date();
    } else {
      request.session.count2 += 1;
    }
    reply.send(JSON.stringify(request.session));
  });

  fastify.get("/session", (request, reply) => {
    reply.send(JSON.stringify(request.session));
  });
};

module.exports = route;
