const net = require("net");
const repl = require("repl");
const format = require("./utils");

const proxySocket = net.createConnection("/tmp/proxy.sock");

proxySocket.on("data", (info) => {
  const { data, cmd } = JSON.parse(info); // cmd - string, data - obj, data.data - Buffer
  format({ data, cmd });
  repl1.displayPrompt();
});

process.on("SIGINT", () => {
  process.exit(0);
});

const repl1 = repl.start({
  eval: (data) => {
    proxySocket.write(data.toString());
  },
});
