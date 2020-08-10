import CommandTaskRunner from "../services/CommandTastRunner";

test("directory creation command should create directory", () => {
  const text = `CREATE fruits`;

  const commandTaskRunner = new CommandTaskRunner();
  commandTaskRunner.run(text);

  expect(commandTaskRunner.directory.List()[0]).toBe("fruits");
});

test("directory creation command should create directory with correct spacing", () => {
  const text = `CREATE fruits\nCREATE fruits/apples`;

  const commandTaskRunner = new CommandTaskRunner();
  commandTaskRunner.run(text);

  expect(commandTaskRunner.directory.List()[0]).toBe("fruits");
  expect(commandTaskRunner.directory.List()[1]).toBe("  apples");
});

test("directory should not be created if parent directory does not exist", () => {
  const text = `CREATE car/apples`;

  const commandTaskRunner = new CommandTaskRunner();
  commandTaskRunner.run(text);

  console.log(commandTaskRunner.directory.List());

  expect(commandTaskRunner.directory.List().length).toBe(0);
});

test("dicectory deletetion should successfully delete", () => {
  const text = `CREATE car\nDELETE car`;

  const commandTaskRunner = new CommandTaskRunner();
  commandTaskRunner.run(text);

  console.log(commandTaskRunner.directory.List());

  expect(commandTaskRunner.directory.List().length).toBe(0);
});

test("dicectory deletion should fail when parent directory does not exist", () => {
  const text = `CREATE car\nDELETE shoes/car`;

  const commandTaskRunner = new CommandTaskRunner();
  commandTaskRunner.run(text);

  expect(commandTaskRunner.directory.List().length).toBe(1);
  expect(commandTaskRunner.directory.List()[0]).toBe("car");
});

test("move command should move directory to correct parent director", () => {
  const text = `CREATE fruits\nCREATE fruits/apples\nCREATE car\nMOVE fruits/apples car`;

  const commandTaskRunner = new CommandTaskRunner();
  commandTaskRunner.run(text);

  console.log(commandTaskRunner.directory.List());

  expect(commandTaskRunner.directory.List()[0]).toBe("car");
  expect(commandTaskRunner.directory.List()[1]).toBe("  apples");
  expect(commandTaskRunner.directory.List()[2]).toBe("fruits");
});
