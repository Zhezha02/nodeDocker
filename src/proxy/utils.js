const command = {
  ps: "/containers/json",
  images: "/images/json",
  volumes: "/volumes",
};

module.exports = function requestHaldler(cmd) {
  const commandParts = cmd.split(" ").map((arg) => arg.trim());

  if (commandParts[0] === "inspect" && commandParts[1]) {
    return { path: `/containers/${commandParts[1]}/json`, cmd: "inspect" };
  }
  return { cmd, path: command[commandParts[0]] };
};
