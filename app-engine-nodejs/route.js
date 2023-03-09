const route = (fastify) => {
  fastify.get("/json", (request, reply) => reply.send({ hello: "world" }));
};

module.exports = {
  route: route
};
