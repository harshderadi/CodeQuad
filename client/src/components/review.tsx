import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import "./review.css";

function Review() {
  const [code, setCode] = useState(`// Write your code here...`);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://byteguardian.onrender.com/ai/get-review",
        { code }
      );
      setReview(response.data);
    } catch (error) {
      setReview("❌ Error: Failed to fetch review.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white p-6">
      {/* Heading Section */}
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-blue-400">
        🚀 AI Code Review System
      </h1>
      <p className="text-gray-400 text-center mb-8">
        Paste your code below and let AI analyze it for improvements!
      </p>

      {/* Main Container */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-6">
        {/* Code Editor Section */}
        <div className="flex-1 bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-2 text-gray-200">Code Editor</h2>
          <div className="border border-gray-700 rounded-lg p-2 overflow-auto" style={{ maxHeight: "300px" }}>
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={12}
              style={{
                fontFamily: '"Fira Code", monospace',
                fontSize: 14,
                minHeight: "250px",
                maxHeight: "300px",
                backgroundColor: "#1E293B",
                color: "#CBD5E1",
                borderRadius: "8px",
                outline: "none",
                overflowY: "auto",
              }}
            />
          </div>
          <button
            onClick={reviewCode}
            className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 transition-all duration-300 rounded-md font-semibold shadow-md flex items-center justify-center w-full"
          >
            {loading ? (
              <span className="animate-pulse">Reviewing...</span>
            ) : (
              "Review Code"
            )}
          </button>
        </div>

        {/* Review Section */}
        <div className="flex-1 bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-2 text-gray-200">AI Review</h2>
          <div className="border border-gray-700 rounded-lg p-4 overflow-auto" style={{ maxHeight: "300px" }}>
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <Markdown className="prose prose-invert max-w-full" rehypePlugins={[rehypeHighlight]}>
                {review || "⚡ Code review results will appear here."}
              </Markdown>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
