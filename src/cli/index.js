const net = require("net");
const repl = require("repl");
const util = require("util");
const format = require('./utils')
// const { pipeline } = require("./formatStream");
// const FormatStream = require("./formatStream");

const proxySocket = net.createConnection("/tmp/proxy.sock");

// const formatStream = new FormatStream();
// process.stdin.on("data", (data) => {
//   proxySocket.write(data.toString().trim());
// });

// proxySocket.pipe(formatStream);

proxySocket.on("data", (info) => {
  const { data, cmd } = JSON.parse(info); // cmd - string, data - obj, data.data - Buffer
  format({data, cmd})
// console.table()
// console.log('>>>',cmd,  data);
  repl1.displayPrompt();
});

process.on("SIGINT", () => {
  process.exit(0);
});

const repl1 = repl.start({
  // prompt: "",
  eval: (data) => {
    proxySocket.write(data.toString());
  },
});
