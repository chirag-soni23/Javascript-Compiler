import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const MonacoEditor = () => {
  const [code, setCode] = useState("console.log('Hello, World!');");
  const [output, setOutput] = useState("");
  const [theme, setTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(14);

  const runCode = () => {
    try {
      const log = [];
      const consoleLog = (msg) => log.push(msg);
      new Function("console", code)({ log: consoleLog });
      setOutput(log.join("\n"));
    } catch (err) {
      setOutput("Error: " + err.message);
    }
  };

  const clearOutput = () => {
    setOutput("");
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-4">JAVASCRIPT COMPILER</h1>
      <div className="flex flex-row items-start p-4 space-x-4">
        <div className="w-1/2">
          <div className="mb-2 flex items-center space-x-4">
            <label className="text-sm font-semibold">Select Theme:</label>
            <select 
              className="p-1 border border-gray-300 rounded" 
              value={theme} 
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="vs-dark">Dark</option>
              <option value="light">Light</option>
              <option value="hc-black">High Contrast</option>
            </select>
            <div className="flex space-x-2">
              <button 
                onClick={() => setFontSize((prev) => Math.min(prev + 2, 30))} 
                className="bg-gray-700 text-white px-2 py-1 rounded"
              >
                +
              </button>
              <button 
                onClick={() => setFontSize((prev) => Math.max(prev - 2, 10))} 
                className="bg-gray-700 text-white px-2 py-1 rounded"
              >
                -
              </button>
            </div>
          </div>
          <Editor
            height="400px"
            defaultLanguage="javascript"
            value={code}
            theme={theme}
            onChange={(value) => setCode(value)}
            options={{ fontSize,wordWrap:"on" }}
            className="border border-gray-300 rounded"
          />
          <div className="flex space-x-2 mt-4">
            <button 
              onClick={runCode} 
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
            >
              Run
            </button>
            <button 
              onClick={clearOutput} 
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full"
            >
              Clear
            </button>
          </div>
        </div>
        <div className="w-1/2 p-4 bg-gray-900 text-white rounded h-[400px] overflow-auto border border-gray-700 mt-10">
          <pre>{output}</pre>
        </div>
      </div>
    </div>
  );
};

export default MonacoEditor;