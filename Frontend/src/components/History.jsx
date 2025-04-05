import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useCodeStore from "../store/useCodeStore";
import MonacoEditor from "@monaco-editor/react";

const History = () => {
  const [savedCodes, setSavedCodes] = useState([]);
  const [editingCode, setEditingCode] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [codeTitles, setCodeTitles] = useState({});
  const navigate = useNavigate();
  const { deleteCode, updateCode } = useCodeStore();

  useEffect(() => {
    const fetchSavedCodes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/codes/saved-codes"
        );
        setSavedCodes(response.data);

        const titles = {};
        for (let code of response.data) {
          try {
            const titleResponse = await axios.post(
              "http://localhost:5000/api/review/generate-title",
              { code: code.code }
            );
            titles[code._id] = titleResponse.data.title;
          } catch (error) {
            console.error("Error generating title:", error);
            titles[code._id] = "Untitled Code"; 
          }
        }
        setCodeTitles(titles);
      } catch (error) {
        console.error("Error fetching saved codes:", error);
      }
    };

    fetchSavedCodes();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this code?")) return;

    try {
      await deleteCode(id);
      setSavedCodes((prev) => prev.filter((code) => code._id !== id));
      setCodeTitles((prev) => {
        const newTitles = { ...prev };
        delete newTitles[id];
        return newTitles;
      });
    } catch (error) {
      console.error("Failed to delete code:", error);
    }
  };

  const handleEdit = (code) => {
    setEditingCode(code);
    setEditedContent(code.code);
  };

  const handleSaveEdit = async () => {
    if (!editingCode) return;

    try {
      await updateCode(editingCode._id, editedContent, editingCode.review);
      setSavedCodes((prev) =>
        prev.map((code) =>
          code._id === editingCode._id ? { ...code, code: editedContent } : code
        )
      );
      setEditingCode(null);

      const titleResponse = await axios.post(
        "http://localhost:5000/api/review/generate-title",
        { code: editedContent }
      );
      setCodeTitles((prev) => ({
        ...prev,
        [editingCode._id]: titleResponse.data.title,
      }));
    } catch (error) {
      console.error("Failed to update code:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Saved Code History</h2>
      <button
        onClick={() => navigate("/")}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-4"
      >
        Home
      </button>

      {savedCodes.length === 0 ? (
        <p>No saved code found.</p>
      ) : (
        <ul className="space-y-4">
          {savedCodes.map((code) => (
  <li
    key={code._id}
    className="bg-gray-800 p-4 rounded border border-gray-700"
  >
   
    <h3 className="text-xl font-bold text-blue-400 mb-2">
      {codeTitles[code._id] ? codeTitles[code._id] : "Title loading..."}
    </h3>
    <pre className="whitespace-pre-wrap">{code.code}</pre>
    <p className="text-gray-400 text-sm">
      Saved on: {new Date(code.createdAt).toLocaleString()}
    </p>

    <div className="mt-2 flex gap-2">
      <button
        onClick={() => handleEdit(code)}
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
      >
        Edit Code
      </button>
      <button
        onClick={() => handleDelete(code._id)}
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
      >
        Delete Code
      </button>
    </div>
  </li>
))}

        </ul>
      )}

      {/* Monaco Editor Modal */}
      {editingCode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-gray-900 p-6 rounded-lg w-full max-w-4xl">
            <h2 className="text-xl font-bold mb-2">Edit Code</h2>
            <MonacoEditor
              height="400px"
              language="javascript"
              theme="vs-dark"
              value={editedContent}
              onChange={(newValue) => setEditedContent(newValue)}
              options={{ fontSize: 14, minimap: { enabled: false } }}
            />
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleSaveEdit}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditingCode(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
