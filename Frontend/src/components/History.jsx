import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useCodeStore from "../store/useCodeStore";

const History = () => {
  const [savedCodes, setSavedCodes] = useState([]);
  const navigate = useNavigate();
  const { deleteCode } = useCodeStore();

  useEffect(() => {
    const fetchSavedCodes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/saved-codes");
        setSavedCodes(response.data);
      } catch (error) {
        console.error("Error fetching saved codes:", error);
      }
    };

    fetchSavedCodes();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this code?");
    if (!confirmDelete) return;

    try {
      await deleteCode(id);
      setSavedCodes((prevCodes) => prevCodes.filter((code) => code._id !== id));
    } catch (error) {
      console.error("Failed to delete code:", error);
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
            <li key={code._id} className="bg-gray-800 p-4 rounded border border-gray-700">
              <pre className="whitespace-pre-wrap">{code.code}</pre>
              <p className="text-gray-400 text-sm">Saved on: {new Date(code.createdAt).toLocaleString()}</p>

              <button
                onClick={() => handleDelete(code._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded mt-2"
              >
                Delete Code
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
