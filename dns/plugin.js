module.exports = (fastify, options, next) => {
  fastify.get("/test", (request, reply) => {
    return [1, 2, 3];
  });
  fastify.register(require("@fastify/static"), {
    root: __dirname,
  });
  next();
};
