import CommandType from "../enums/CommandType";

class CommandLine {
  commandType: CommandType;
  path: Array<string>;
  newLocation: Array<string>;

  constructor(commandType: CommandType, path?: string, newLocation?: string) {
    this.commandType = commandType;
    this.path = path ? path.split("/") : null;
    this.newLocation = newLocation ? newLocation.split("/") : null;
  }
}

export default CommandLine;
