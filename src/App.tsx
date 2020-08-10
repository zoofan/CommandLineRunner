import React, { FormEvent, useState, useEffect } from "react";
import "./App.css";
import CommandTaskRunner from "./services/CommandTastRunner";
import text from "./data/data";

function App() {
  const [input, setInput] = useState<string>(text);
  const [outPut, setOutPut] = useState<Array<string>>([]);

  useEffect(() => {
    if (input) {
      const commandTaskRunner = new CommandTaskRunner();
      let results: Array<string> = commandTaskRunner.run(input);
      setOutPut(results);
    }
  }, []);

  const onChangeHandler = async (event: FormEvent): Promise<void> => {
    try {
      const reader = new FileReader();
      reader.onload = async (
        event: ProgressEvent<FileReader>
      ): Promise<void> => {
        const text: string = event.target
          ? (event.target.result as string)
          : "";
        if (text) {
          setInput(text);
          const commandTaskRunner = new CommandTaskRunner();
          let results: Array<string> = commandTaskRunner.run(text);
          setOutPut(results);
        }
      };

      await reader.readAsText((event.target as HTMLInputElement).files[0]);
    } catch (error) {
      console.log(`Error occured while reading file: ${error.message}`);
    }
  };

  return (
    <div className="App">
      <section className="pageSplit">
        <div className="pageSplit__element">
          <h3>INPUT</h3>
          <input
            type="file"
            name="filename"
            onChange={(event: FormEvent) => onChangeHandler(event)}
          />
          <p className="inputText">{input}</p>
        </div>
        <div className="pageSplit__element">
          <h3>OUTPUT</h3>
          {outPut.map((line) => {
            return <span>{line}</span>;
          })}
        </div>
      </section>
    </div>
  );
}

export default App;
