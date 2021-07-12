const net = require("net");
const fs = require("fs");
const http = require("http");
const handler = require("./utils");
const dockerHandler = require("./docker-socket");

const options = {
  socketPath: "/var/run/docker.sock",
};

// const callback = (response, socketServer) => {
//   response
//     .on("data", (data) => {
//       console.log("!!!!!!", data.toString());
//       socketServer.write(data.toString());
//     })
//     .on("error", (data) => console.error(data));
// };

const server = net.createServer((socketServer) => {
  socketServer.on("data", (data) => {
    const cmd = handler(data.toString().trim());
    if (cmd === "help") {
    } else {
      http.get({ ...options, path: cmd }, (response) => {
        dockerHandler(response, socketServer);
      });
    }
  });
});

server.listen("/tmp/proxy.sock", () => {
  console.log("socket created");
});

const exitHandler = function () {
  try {
    fs.rmSync("/tmp/proxy.sock", { force: true });
  } catch (error) {
    console.log(err);
    console.log("can't remove proxy socket");
  }
};

process.on("SIGINT", () => {
  exitHandler();
  process.exit(0);
});
server.on("close", exitHandler);
