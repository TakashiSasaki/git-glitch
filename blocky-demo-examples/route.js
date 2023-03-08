const fs = require("fs");
const path = require("path");
const fastify = require("fastify")();

const PREFIX = "/blocky-demo-examples";

fastify.get(PREFIX + "/", (request, reply) => {
  reply.type("text/html");
  reply.send(fs.createReadStream(path.join(__dirname, "public/index.html")));
});

fastify.get("/index.html", (request, reply) => {
  reply.type("text/html");
  reply.send(fs.createReadStream(path.join(__dirname, "public/index.html")));
});

fastify.get(
  PREFIX + "/:demoname([a-z-_]+)/:filename([a-z_-]+).html",
  (request, reply) => {
    reply.type("text/html");
    reply.send(
      fs.createReadStream(
        path.join(
          __dirname,
          "public/" +
            request.params.demoname +
            "/" +
            request.params.filename +
            ".html"
        )
      )
    );
  }
);

fastify.get(PREFIX + "/:demoname([a-z-_]+)/:filename.js", (request, reply) => {
  reply.type("application/javascript");
  reply.send(
    fs.createReadStream(
      path.join(
        __dirname,
        "public/" +
          request.params.demoname +
          "/" +
          request.params.filename +
          ".js"
      )
    )
  );
});

fastify.get(PREFIX + "/:demoname([a-z-_]+)/:filename.css", (request, reply) => {
  reply.type("text/css");
  reply.send(
    fs.createReadStream(
      path.join(
        __dirname,
        "public/" +
          request.params.demoname +
          "/" +
          request.params.filename +
          ".css"
      )
    )
  );
});

fastify.get(
  PREFIX + "/:demoname([a-z-_]+)/media/:filename.svg",
  (request, reply) => {
    reply.type("image/svg+xml");
    reply.send(
      fs.createReadStream(
        path.join(
          __dirname,
          "public/" +
            request.params.demoname +
            "/media/" +
            request.params.filename +
            ".svg"
        )
      )
    );
  }
);

fastify.get(
  PREFIX + "/:demoname([a-z-_]+)/media/:filename.png",
  (request, reply) => {
    reply.redirect(
      "https://cdn.glitch.me/2875e037-75af-4fc3-a115-4e66391bf721%2F" +
        request.params.filename +
        ".png"
    );
  }
);

fastify.get(
  PREFIX + "/:demoname([a-z-_]+)/generated/:filename.js",
  (request, reply) => {
    reply.type("application/javascript");
    reply.send(
      fs.createReadStream(
        path.join(
          __dirname,
          "public/" +
            request.params.demoname +
            "/generated/" +
            request.params.filename +
            ".js"
        )
      )
    );
  }
);

fastify.get(
  PREFIX + "/:demoname([a-z-_]+)/soy/:filename.js",
  (request, reply) => {
    reply.type("application/javascript");
    reply.send(
      fs.createReadStream(
        path.join(
          __dirname,
          "public/" +
            request.params.demoname +
            "/soy/" +
            request.params.filename +
            ".js"
        )
      )
    );
  }
);

fastify.get(
  PREFIX + "/:demoname([a-z-_]+)/node_modules/blockly/:filename.js",
  (request, reply) => {
    reply.type("application/javascript");
    reply.send(
      fs.createReadStream(
        path.join(
          __dirname,
          "node_modules/blockly/" + request.params.filename + ".js"
        )
      )
    );
  }
);

fastify.get(
  PREFIX + "/:demoname([a-z-_]+)/node_modules/blockly/msg/:filename.js",
  (request, reply) => {
    reply.type("application/javascript");
    reply.send(
      fs.createReadStream(
        path.join(
          __dirname,
          "node_modules/blockly/msg/" + request.params.filename + ".js"
        )
      )
    );
  }
);
