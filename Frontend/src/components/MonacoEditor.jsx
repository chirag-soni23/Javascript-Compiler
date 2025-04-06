import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import useCodeStore from "../store/useCodeStore";
import {
  Maximize2,
  Minimize2,
  Play,
  Save,
  FileText,
  Trash2,
  Eraser,
} from "lucide-react";

const MonacoEditor = () => {
  const navigate = useNavigate();
  const {
    code,
    setCode,
    output,
    runCode,
    clearOutput,
    theme,
    setTheme,
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    fetchTheme,
    saveCode,
  } = useCodeStore();

  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const savedCode = localStorage.getItem("userCode");
    if (savedCode) {
      setCode(savedCode);
    }
    fetchTheme();
  }, []);

  useEffect(() => {
    setIsSaveDisabled(!code.trim());
  }, [code]);

  const handleSaveCode = async () => {
    const confirmSave = window.confirm("Are you sure you want to save the code?");
    if (confirmSave) {
      await saveCode();
    }
  };

  const handleCodeChange = (value) => {
    const newCode = value || "";
    setCode(newCode);
    localStorage.setItem("userCode", newCode);
  };

  const clearCode = () => {
    setCode("");
    localStorage.removeItem("userCode");
  };

  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-6 relative">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-4 md:mb-6">
        JavaScript Compiler
      </h1>

      {!isFullScreen && (
        <div className="flex flex-wrap items-center gap-3 justify-center mb-4">
          <Link
            to={"/history"}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
          >
            Save History
          </Link>

          <div className="flex flex-col md:flex-row items-center gap-2">
            <label className="text-sm font-semibold">Theme:</label>
            <select
              className="p-2 bg-gray-800 rounded text-white"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="vs-dark">Dark</option>
              <option value="light">Light</option>
              <option value="hc-black">High Contrast</option>
            </select>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-2">
            <label className="text-sm font-semibold">Font Size:</label>
            <div className="flex space-x-2">
              <button
                onClick={increaseFontSize}
                className="bg-gray-700 px-3 py-1 rounded"
              >
                +
              </button>
              <button
                onClick={decreaseFontSize}
                className="bg-gray-700 px-3 py-1 rounded"
              >
                -
              </button>
            </div>
            <span className="text-sm">({fontSize}px)</span>
          </div>
        </div>
      )}

      <div className={`${isFullScreen ? "" : "grid grid-cols-1 md:grid-cols-2 gap-4"}`}>
        <div className="relative w-full">
          {isFullScreen ? (
            <div className="absolute top-2 right-2 z-10 flex flex-col gap-3 items-end">
              <button
                onClick={toggleFullScreen}
                className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded shadow"
                title="Collapse Editor"
              >
                <Minimize2 size={18} />
              </button>
              <button
                onClick={runCode}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded shadow"
                title="Run Code"
              >
                <Play size={18} />
              </button>
              <button
                onClick={handleSaveCode}
                className="bg-green-600 hover:bg-green-700 text-white p-2 rounded shadow"
                title="Save Code"
                disabled={isSaveDisabled}
              >
                <Save size={18} />
              </button>
              <button
                onClick={() => navigate("/review")}
                className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded shadow"
                title="Review Code"
              >
                <FileText size={18} />
              </button>
              <button
                onClick={clearCode}
                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded shadow"
                title="Clear Code"
              >
                <Trash2 size={18} />
              </button>
              <button
                onClick={clearOutput}
                className="bg-orange-600 hover:bg-orange-700 text-white p-2 rounded shadow"
                title="Clear Output"
              >
                <Eraser size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={toggleFullScreen}
              className="absolute top-2 right-2 z-10 bg-gray-800 hover:bg-gray-700 text-white p-2 rounded shadow"
              title="Expand Editor"
            >
              <Maximize2 size={18} />
            </button>
          )}

          <ResizableBox
            width={"100%"}
            height={isFullScreen ? 500 : 300}
            axis="y"
            minConstraints={[100, 200]}
            maxConstraints={[1000, 700]}
            className="border border-gray-700 rounded overflow-hidden"
          >
            <Editor
              height="100%"
              defaultLanguage="javascript"
              value={code}
              theme={theme}
              onChange={handleCodeChange}
              options={{ fontSize, wordWrap: "on" }}
            />
          </ResizableBox>
        </div>

        {!isFullScreen && (
          <ResizableBox
            width={"100%"}
            height={300}
            axis="y"
            minConstraints={[100, 200]}
            maxConstraints={[1000, 500]}
            className="border border-gray-700 bg-gray-800 rounded p-4 overflow-auto"
          >
            <pre className="text-green-400">
              {output || "// Output will appear here..."}
            </pre>
          </ResizableBox>
        )}
      </div>

      {isFullScreen && (
        <div className="mt-4 border border-gray-700 bg-gray-800 rounded p-4 overflow-auto max-h-[300px]">
          <pre className="text-green-400">
            {output || "// Output will appear here..."}
          </pre>
        </div>
      )}

      {!isFullScreen && (
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          <button
            onClick={runCode}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Run
          </button>

          <button
            onClick={clearCode}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Clear Code
          </button>

          <button
            onClick={clearOutput}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
          >
            Clear Output
          </button>

          <button
            onClick={() => navigate("/review")}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
          >
            Review Code
          </button>

          <button
            onClick={handleSaveCode}
            className={`font-bold py-2 px-4 rounded ${
              isSaveDisabled
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
            disabled={isSaveDisabled}
          >
            Save Code
          </button>
        </div>
      )}
    </div>
  );
};

export default MonacoEditor;
