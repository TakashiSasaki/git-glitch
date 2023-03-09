const path = require("path");
const fastify = require("fastify")({
  logger: false,
});

fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "."),
  prefix: "/", // optional: default '/'
});

fastify.register(require("@fastify/formbody"));

fastify.register(require("@fastify/view"), {
  engine: {
    handlebars: require("handlebars"),
  },
});

require("./route").route(fastify);

fastify.listen(
  { port: process.env.PORT, host: "0.0.0.0" },
  function (err, address) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Your app is listening on ${address}`);
  }
);
