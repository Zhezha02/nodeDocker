const net = require("net");
const fs = require("fs");
const http = require("http");
const handler = require("./utils");
const dockerHandler = require("./dockerHandler");

const options = {
  socketPath: "/var/run/docker.sock",
};

const server = net.createServer((socketServer) => {
  socketServer
    .on("end", exitHandler)
    .on("error", (err) => {
      console.log(err.message);
    })
    .on("data", (data) => {
      const { cmd, path } = handler(data.toString());
      console.log("TO DOCKER", cmd, path);
      http.get({ ...options, path }, (response) => {
        dockerHandler(response, socketServer, cmd);
      });
    });
});

server.listen("/tmp/proxy.sock", () => {
  console.log("socket created");
});

const exitHandler = function () {
  try {
    fs.rmSync("/tmp/proxy.sock", { force: true });
  } catch (error) {
    console.log(error);
    console.log("can't remove proxy socket");
  }
};

process.on("SIGINT", () => {
  exitHandler();
  process.exit(0);
});
server.on("end", exitHandler).on("close", exitHandler);
