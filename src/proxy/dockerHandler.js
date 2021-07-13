const helpInstruction = require("./help.json");

module.exports = function dockerHandler(response, socketServer, cmd) {
  response
    .on("data", (data) => {
      // console.log(
      //   "FROM DOCKER",
      //   JSON.stringify({ data: data.toString(), cmd })
      // );
      if (data.toString().includes('"message":"page not found"')) {
        console.log(">>>", JSON.stringify(helpInstruction));
        socketServer.write(
          JSON.stringify({
            data: JSON.stringify(helpInstruction),
            cmd: "help",
          })
        );
      } else {
        socketServer.write(JSON.stringify({ data: data.toString(), cmd }));
      }
    })
    .on("error", (err) => console.error(err.message));
};
