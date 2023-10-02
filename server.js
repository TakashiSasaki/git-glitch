const path = require("path");
const fastify = require("fastify")({ logger: false });
const cheerio = require("cheerio");
//const staticServe = require("fastify-static");

// Setup our static files
fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
  prefix: "/", // optional: default '/'
});

// 静的ファイルを提供する設定
//fastify.register(staticServe, {
//  root: path.join(__dirname, "public"),
//  prefix: "/public/", // オプション
//});

fastify.post("/extract-text", async (request, reply) => {
  const htmlContent = request.body.htmlContent;
  const $ = cheerio.load(htmlContent);
  const extractedText = $("body").text();
  return reply.send({ extractedText });
});

fastify.get("/", async (request, reply) => {
  return reply.sendFile("index.html"); // 'public' フォルダ内の 'index.html' を指す
});

//const start = async () => {
//  try {
//    await fastify.listen(3000);
//    fastify.log.info(`Server running on http://localhost:3000/`);
//  } catch (err) {
//    fastify.log.error(err);
//    process.exit(1);
//  }
//};

//start();

// Run the server and report out to the logs
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
