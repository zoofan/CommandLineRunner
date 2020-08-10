import CommandParser from "../services/CommandParser";
import CommandType from "../services/enums/CommandType";

const commandParser = new CommandParser();
test("CREATE command parsed correctly", () => {
  const command = "CREATE fruits";

  let results = commandParser.parse(command);

  expect(results.length).toBe(1);
  expect(results[0].commandType).toBe(CommandType.CREATE);
  expect(results[0].path[0]).toBe("fruits");
});

test("CREATE command with path longer than one parsed correctly", () => {
  const command = "CREATE car/honda";

  let results = commandParser.parse(command);

  expect(results.length).toBe(1);
  expect(results[0].commandType).toBe(CommandType.CREATE);
  expect(results[0].path.length).toBe(2);
  expect(results[0].path[0]).toBe("car");
  expect(results[0].path[1]).toBe("honda");
});

test("CREATE command with no path parsed correctly", () => {
  const command = "CREATE";

  let results = commandParser.parse(command);

  expect(results.length).toBe(1);
  expect(results[0].commandType).toBe(CommandType.CREATE);
  expect(results[0].path).toBe(null);
});

test("DELETE command parsed correctly", () => {
  const command = "DELETE fruits";

  let results = commandParser.parse(command);

  expect(results.length).toBe(1);
  expect(results[0].commandType).toBe(CommandType.DELETE);
  expect(results[0].path[0]).toBe("fruits");
});

test("Move command parsed correctly", () => {
  const command = "MOVE grains/squash vegetables";

  let results = commandParser.parse(command);

  expect(results.length).toBe(1);
  expect(results[0].commandType).toBe(CommandType.MOVE);
  expect(results[0].path[0]).toBe("grains");
  expect(results[0].path[1]).toBe("squash");
  expect(results[0].newLocation[0]).toBe("vegetables");
});

test("Invalid command parsed correctly", () => {
  const command = "MMMM grains/squash vegetables";

  let results = commandParser.parse(command);

  expect(results.length).toBe(1);
  expect(results[0].commandType).toBe(undefined);
});
