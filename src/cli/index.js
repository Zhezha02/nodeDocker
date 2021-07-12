const net = require("net");
const repl = require("repl");

const socketListener = net.createConnection("/tmp/proxy.sock");
// // socketListener.write("Test info");

// process.stdin.on("data", (data) => {
//   console.log("***", data);
//   socketListener.write(data);
// });

// socketListener.on("data", (data) => {
//   console.log("CLI RESULT>>", data.toString());
// });

// socketListener.on("error", (err) => {
//   console.log(err.message);
// });

const cli = repl.start({
  // input: process.stdin,
  // output: socketListener,
  prompt: "docker cli>>> ",
});
cli.defineCommand("help", { help: "Get information about command" });
cli.defineCommand("ps", { help: "List containers" });
cli.defineCommand("inspect", {
  help: "Return low-level information on Docker objects",
}); //!!!
cli.defineCommand("images", { help: "List images" });
cli.defineCommand("volumes", { help: "List volumes" });

console.log("CLI>>>", cli);
