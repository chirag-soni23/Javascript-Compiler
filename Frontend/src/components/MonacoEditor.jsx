import React, { useEffect } from "react";
import Editor from "@monaco-editor/react";
import useCodeStore from "../store/useCodeStore";

const MonacoEditor = () => {
  const { 
    code, setCode, output, runCode, clearOutput, 
    theme, setTheme, fontSize, increaseFontSize, decreaseFontSize, fetchTheme 
  } = useCodeStore();

  useEffect(() => {
    fetchTheme(); 
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-6">JavaScript Compiler</h1>
      
      <div className="flex items-center space-x-4 mb-4">
        <label className="text-sm font-semibold">Theme:</label>
        <select 
          className="p-2 bg-gray-800 rounded" 
          value={theme} 
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="vs-dark">Dark</option>
          <option value="light">Light</option>
          <option value="hc-black">High Contrast</option>
        </select>

        <label className="text-sm font-semibold">Font Size:</label>
        <div className="flex space-x-2">
          <button 
            onClick={increaseFontSize} 
            className="bg-gray-700 px-3 py-1 rounded"
          >+</button>
          <button 
            onClick={decreaseFontSize} 
            className="bg-gray-700 px-3 py-1 rounded"
          >-</button>
        </div>
        <span className="text-sm">({fontSize}px)</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-gray-700 rounded overflow-hidden">
          <Editor
            height="400px"
            defaultLanguage="javascript"
            value={code}
            theme={theme}
            onChange={(value) => setCode(value || "")}
            options={{ fontSize, wordWrap: "on" }}
          />
        </div>

        <div className="border border-gray-700 bg-gray-800 rounded p-4 h-[400px] overflow-auto">
          <pre className="text-green-400">{output || "// Output will appear here..."}</pre>
        </div>
      </div>

      <div className="flex space-x-2 mt-4">
        <button 
          onClick={runCode} 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded w-full"
        >
          Run
        </button>
        <button 
          onClick={clearOutput} 
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded w-full"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default MonacoEditor;
