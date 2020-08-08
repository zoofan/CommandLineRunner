import CommandType from "../enums/CommandType";

class CommandLine {
  commandType: CommandType;
  path: string;
  name: string;

  constructor(commandType: CommandType, path?: string, name?: string) {
    this.commandType = commandType;
    this.path = path ? path : "";
    this.name = name ? name : "";
  }
}

export default CommandLine;
