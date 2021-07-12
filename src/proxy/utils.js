// help // выводит список доступных команд
// ps [-a] // список контейнеров
// inspect NAME|ID // получить информацию о контейнере
// images // список образов
// volumes // список разделов

const command = {
  help: "help",
  ps: "/containers/json",
  images: "/images/json",
  volumes: "/volumes",
};

module.exports = function requestHaldler(cmd) {
  const commandParts = cmd.split(" ");
  const preparedCmd = commandParts[0];

  if (preparedCmd === "inspect" && commandParts[1]) {
    return `/containers/${commandParts[1]}/json`;
  }

  switch (preparedCmd) {
    case preparedCmd:
      return command[preparedCmd];

    default:
      return command.help;
  }
};
