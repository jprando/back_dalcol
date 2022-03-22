const http = require("http");

const app = require("./app");
const config = require("./app/config");

const { HOST, PORT } = config.httpServer;

const server = http.createServer(app);

server.listen(PORT, HOST, () =>
  console.info(`listening at http://localhost:${PORT}`)
);
