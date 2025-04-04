import React from "react";
import useCodeStore from "../store/useCodeStore.js";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";

const ReviewCode = () => {
  const { aiReview, reviewCode } = useCodeStore();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">AI Code Review</h2>

      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <button
          onClick={reviewCode}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Get Review
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Home
        </button>
      </div>

      <div className="bg-gray-800 p-6 rounded overflow-auto max-h-[70vh] w-full md:w-4/5 lg:w-3/4 text-base md:text-lg border border-gray-700">
        {aiReview ? (
          <ReactMarkdown>{aiReview}</ReactMarkdown>
        ) : (
          <p className="text-gray-400 text-center">No review available. Click "Get Review" to fetch AI feedback.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewCode;
