const path = require("path");
const fastify = require("fastify")({
  logger: false,
  trustProxy: true,
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


const fastifySessionOptions = {
  secret: process.env.FASTIFY_SESSION_SECRET,
  cookie: {
    secure: false,
    sameSite: "Lax",
    httpOnly: false,
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

fastify.register(require("@fastify/cookie"));
fastify.register(require("@fastify/session"), fastifySessionOptions);

fastify.addHook("preHandler", (request, reply, next) => {
  
  // add ip addresses
  if (!request.session.ipAddresses) {
    request.session.ipAddresses = [];
  }
  if (request.session.ipAddresses.indexOf(request.ip) < 0) {
    request.session.ipAddresses.push(request.ip);
  }
  if (request.ips) {
    request.ips.forEach((x) => {
      if (request.session.ipAddresses.indexOf(x) < 0) {
        request.session.ipAddresses.push(x);
      }
    });
  }

  //increment counter
  if (typeof request.session.count !== "number") {
    request.session.count = 1;
  } else {
    request.session.count += 1;
  }

  //add timestamp
  if (typeof request.session.timestamps === "undefined") {
    request.session.timestamps = [];
  }
  request.session.timestamps.push(new Date());
  if (request.session.timestamps.length >= 10) {
    request.session.timestamps = request.session.timestamps.slice(1, -1);
  }

  //next();
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
