// const { Transform } = require("stream");
// const util = require("util");
// CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES

const psObj = {
  "CONTAINER ID": { field: "Id", fn: (value) => value.slice(0, 12) },
  IMAGE: { field: "Image", fn: (value) => value },
  COMMAND: { field: "Command", fn: (value) => value },
  CREATED: { field: "Created", fn: (value) => `${value / 1000} second ago` },
  STATUS: { field: "State", fn: (value) => value },
  PORTS: { field: "State", fn: (value) => value.join(", ") },
  NAMES: { field: "Names", fn: (value) => value.join(", ") },
};

module.exports = function format({ data, cmd }) {
  const info = JSON.parse(data);
  console.log("INFO", info);
  switch (cmd) {
    // case "help":
    //   break;
    case "ps":
      data.map;
      console.table(info.map((container) => Object.entries(psObj).reduce((result, [])=>{}, {})));
      break;
    case "inspect":
      break;
    case "images":
      break;
    case "volumes":
      break;
    default:
  }
};
