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

fastify.register(require("@fastify/cookie"));

const fastifySessionOptions = {
  secret: process.env.FASTIFY_SESSION_SECRET,
  cookie: {
    secure: false,
    sameSite: "Lax",
    domain: "moukaeritai-appengine.glitch.me",
  },
};

if (process.env.USE_GOOGLE_DATASTORE == "yes") {
  const { Datastore } = require("@google-cloud/datastore");
  const datastore = new Datastore();
  const { DatastoreStore } = require("@google-cloud/connect-datastore");
  const datastorestore = new DatastoreStore({
    kind: "sessions",
    expirationMs: 0,
    dataset: new Datastore(),
  });
  fastifySessionOptions.store = datastorestore;
} //if

fastify.register(require("@fastify/session"), fastifySessionOptions);

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
