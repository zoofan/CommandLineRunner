import CommandLine from "./models/Command";
import CommandType from "./enums/CommandType";

class CommandParser {
  text: string;

  constructor(text: string) {
    this.text = text;
  }

  parse(): Array<CommandLine> {
    const lines = this.text.trimEnd().split(/\r?\n/);

    const commandlines: Array<CommandLine> = [];
    lines.forEach((line: string) => {
      const words = line.split(" ");
      // if (words.length === 0) continue;
      const commantType: CommandType = CommandType[words[0]];
      const path: string = words.length > 1 ? words[1] : "";
      const name: string = words.length > 2 ? words[2] : "";
      const command = new CommandLine(commantType, path, name);
      commandlines.push(command);
    });
    console.log(commandlines);
    return commandlines;
  }
}

export default CommandParser;
