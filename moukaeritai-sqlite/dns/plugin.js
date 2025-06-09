module.exports = (fastify, options, next) => {
  fastify.get("/test", (request, reply) => {
    return [1, 2, 3];
  });
  fastify.post("/lookup", (request, reply) => {
    return [4, 5, 6];
  });
  fastify.register(require("@fastify/static"), {
    root: __dirname,
  });
  next();
};
