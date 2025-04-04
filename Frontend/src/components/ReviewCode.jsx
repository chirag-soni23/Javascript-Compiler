import React, { useState } from "react";
import useCodeStore from "../store/useCodeStore.js";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";

const ReviewCode = () => {
  const { aiReview, reviewCode, code } = useCodeStore();
  const [documentation, setDocumentation] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerateDocs = async () => {
    if (!code.trim()) {
      alert("Please write some code first.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/api/generate-documentation",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        }
      );

      const result = await response.json();
      setDocumentation(result.documentation);
    } catch (error) {
      console.error("Error generating documentation:", error);
      alert("Failed to generate documentation.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (documentation) {
      navigator.clipboard
        .writeText(documentation)
        .then(() => alert("Documentation copied to clipboard"))
        .catch((err) => alert("Failed to copy documentation: " + err));
    } else {
      alert("No documentation available to copy.");
    }
  };

  const handleDownload = () => {
    if (documentation) {
      const blob = new Blob([documentation], {
        type: "text/plain;charset=utf-8",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "documentation.txt";
      link.click();
    } else {
      alert("No documentation available to download.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        AI Code Review & Documentation
      </h2>

      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <button
          onClick={reviewCode}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Get Review
        </button>
        <button
          onClick={handleGenerateDocs}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
        >
          {loading ? "Generating Documentation..." : "Generate Documentation"}
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Home
        </button>
      </div>

      <div className="bg-gray-800 p-6 rounded overflow-auto max-h-[70vh] w-full md:w-4/5 lg:w-3/4 text-base md:text-lg border border-gray-700">
        <h3 className="text-2xl font-bold mb-4">Code Review:</h3>
        {aiReview ? (
          <ReactMarkdown>{aiReview}</ReactMarkdown>
        ) : (
          <p className="text-gray-400 text-center">
            No review available. Click "Get Review" to fetch AI feedback.
          </p>
        )}
      </div>

      <div className="bg-gray-800 p-6 mt-6 rounded overflow-auto max-h-[70vh] w-full md:w-4/5 lg:w-3/4 text-base md:text-lg border border-gray-700">
        <h3 className="text-2xl font-bold mb-4">Generated Documentation:</h3>
        {documentation ? (
          <ReactMarkdown>{documentation}</ReactMarkdown>
        ) : (
          <p className="text-gray-400 text-center">
            No documentation available. Click "Generate Documentation" to fetch
            it.
          </p>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-3 mt-6">
        <button
          onClick={handleCopy}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
        >
          Copy to Clipboard
        </button>
        <button
          onClick={handleDownload}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Download Documentation
        </button>
      </div>
    </div>
  );
};

export default ReviewCode;
