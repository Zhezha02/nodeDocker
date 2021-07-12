module.exports = function dockerConnection(response, socketServer) {
  response
    .on("data", (data) => {
      console.log("!!!!!!", data.toString());
      socketServer.write(data.toString());
    })
    .on("error", (data) => console.error(data));
};
