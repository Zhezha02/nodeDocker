const helpInstruction = require("./help.json");

module.exports = function dockerHandler(response, socketServer, cmd) {
  response
    .on("data", (data) => {
      if (data.toString().includes('"message":"page not found"')) {
        socketServer.write(
          JSON.stringify({
            data: JSON.stringify(helpInstruction),
            cmd,
          })
        );
      } else {
        socketServer.write(JSON.stringify({ data: data.toString(), cmd }));
      }
    })
    .on("error", (err) => console.error(err.message));
};
