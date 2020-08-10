import CommandLine from "./models/CommandLine";
import CommandType from "./enums/CommandType";

class CommandParser {
  parse(text: string): Array<CommandLine> {
    const lines = text.trimEnd().split(/\r?\n/);

    const commandlines: Array<CommandLine> = [];
    lines.forEach((line: string) => {
      const words = line.split(" ");
      const commantType: CommandType = CommandType[words[0]];
      const path: string = words.length > 1 ? words[1] : "";
      const name: string = words.length > 2 ? words[2] : "";
      const command = new CommandLine(commantType, path, name);
      commandlines.push(command);
    });
    return commandlines;
  }
}

export default CommandParser;
