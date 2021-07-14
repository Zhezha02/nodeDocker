// const { Transform } = require("stream");
const util = require("util");

function formatBySchema(schema, info) {
  return info.map((container) =>
    Object.entries(schema).reduce(
      (result, [key, value]) => (
        (result[key] = schema[key].fn(container[value.field])), result
      ),
      {}
    )
  );
}

const psSchema = {
  "CONTAINER ID": { field: "Id", fn: (value) => value.slice(0, 12) },
  IMAGE: { field: "Image", fn: (value) => value },
  COMMAND: { field: "Command", fn: (value) => value },
  CREATED: { field: "Created", fn: (value) => `${value / 1000} second ago` },
  STATUS: { field: "State", fn: (value) => value },
  PORTS: { field: "Ports", fn: (value) => value.join(", ") },
  NAMES: { field: "Names", fn: (value) => value.join(", ") },
};

const imagesSchema = {
  REPOSITORY: {
    field: "RepoTags",
    fn: (value) => value.map((image) => image.split(":")[0]).join(", "),
  },
  TAG: {
    field: "RepoTags",
    fn: (value) => value.map((image) => image.split(":")[1]).join(", "),
  },
  "IMAGE ID": { field: "Id", fn: (value) => value.slice(0, 12) },
  CREATED: { field: "Created", fn: (value) => `${value / 1000} second ago` },
  SIZE: {
    field: "Size",
    fn: (value) => `${Math.round(value / (1024 * 1024))}MB`,
  },
};

const volumeSchema = {
  DRIVER: { field: "Driver", fn: (value) => value },
  "VOLUME NAME": { field: "Name", fn: (value) => value },
};

module.exports = function format({ data, cmd }) {
  const info = JSON.parse(data);

  switch (cmd.replace(/[^a-z]/g, "")) {
    case "ps":
      console.table(formatBySchema(psSchema, info));
      break;
    case "inspect":
      console.log(util.inspect(JSON.parse(data), { colors: true }));
      break;
    case "images":
      console.table(formatBySchema(imagesSchema, info));
      break;
    case "volumes":
      console.table(formatBySchema(volumeSchema, info.Volumes));
      break;
    default:
      console.table(
        Object.entries(info).reduce(
          (acc, [key, value]) => ((acc[key] = value), acc),
          {}
        )
      );
  }
};
