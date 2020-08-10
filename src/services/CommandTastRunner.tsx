import CommandParser from "./CommandParser";
import CommandLine from "./models/CommandLine";
import Directory from "./models/Directory";
import CommandType from "./enums/CommandType";

class CommandTaskRunner {
  commandParser: CommandParser = new CommandParser();
  directory: Directory = new Directory();

  run(text: string): Array<string> {
    const commandLines: Array<CommandLine> = this.commandParser.parse(text);

    const response: Array<string> = new Array<string>();
    commandLines.forEach((command: CommandLine) => {
      switch (command.commandType) {
        case CommandType.CREATE: {
          response.push(
            `${CommandType[command.commandType]} ${
              command.path ? command.path.join("/") : ""
            }`
          );
          try {
            this.directory.create(command.path);
          } catch (error) {
            response.push(error.message);
          }

          break;
        }
        case CommandType.MOVE: {
          this.directory.Move(command.path, command.newLocation);
          response.push(
            `${CommandType[command.commandType]} ${command.path.join(
              "/"
            )} ${command.newLocation.join("")}`
          );
          break;
        }
        case CommandType.DELETE: {
          response.push(
            `${CommandType[command.commandType]} ${command.path.join("/")}`
          );
          try {
            this.directory.Delete(command.path);
          } catch (error) {
            response.push(error.message);
          }

          break;
        }
        case CommandType.LIST: {
          response.push("LIST");
          response.push(...this.directory.List());
          break;
        }
      }
    });
    return response;
  }
}

export default CommandTaskRunner;
