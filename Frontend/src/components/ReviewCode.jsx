import React from "react";
import useCodeStore from "../store/useCodeStore.js";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";

const ReviewCode = () => {
  const { aiReview, reviewCode } = useCodeStore(); // aiReview use karo
  const navigate = useNavigate();

  return (
    <div className="mt-6 p-4 bg-gray-800 text-white rounded border border-gray-700">
      <h2 className="text-xl font-bold mb-2">AI Code Review</h2>
      <div className="flex items-center gap-2">
        <button
          onClick={reviewCode} // AI Review fetch karega
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Get Review
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Home
        </button>
      </div>
      <div className="bg-gray-900 p-4 rounded overflow-auto max-h-60">
        {aiReview ? ( // aiReview ko show karo
          <ReactMarkdown>{aiReview}</ReactMarkdown>
        ) : (
          "No review available. Click 'Get Review' to fetch AI feedback."
        )}
      </div>
    </div>
  );
};

export default ReviewCode;
