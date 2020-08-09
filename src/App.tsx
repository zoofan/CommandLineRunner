import React, { FormEvent, useState } from "react";
import "./App.css";
import CommandParser from "./services/CommandParser";

function App() {
  const [input, setInput] = useState<string>();
  const onChangeHandler = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    try {
      const reader = new FileReader();
      reader.onload = async (event: ProgressEvent<FileReader>): Promise<void> => {
        const text: string = event.target ? event.target.result as string : '';
        if (text) {
          setInput(text);
          const parser = new CommandParser(text);
          parser.parse();
        }
      };
    
      await reader.readAsText((event.target as HTMLInputElement).files[0]);
    } catch (error) {
      console.log(`Error occured while reading file: ${error.message}`);
    }
  };

  return (
    <div className="App">
      <section className="m-halfbleed">
        <div className="m-halfbleed__element">
          <input
            type="file"
            name="filename"
            onChange={(event: FormEvent) => onChangeHandler(event)}
          />
          <p className="text-center">{input}</p>
        </div>
        <div className="m-halfbleed__element">
          <h2>
            This is an awesome example of a flexbox wrapper which contains two
            elements that are also flexbox wrappers to vertical align their own
            content.
          </h2>
          <p>See the code in the CSS tab</p>
        </div>
      </section>
    </div>
  );
}

export default App;
