import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const CreateDoc = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");
  const [resourceLinks, setResourceLinks] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Detect dark mode automatically
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload = {
        title,
        problem,
        solution,
        resourceLinks: resourceLinks
          .split(/\n|,/)
          .map((s) => s.trim())
          .filter(Boolean),
        tags: tags
          .split(/\n|,/)
          .map((s) => s.trim())
          .filter(Boolean),
      };
      await axiosInstance.post("/posts", payload);
      navigate("/docs");
    } catch (err) {
      setError(err?.message || "Failed to create document");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDarkMode
          ? "bg-gradient-to-br from-black via-gray-900 to-black text-white"
          : "bg-gradient-to-br from-gray-100 via-white to-gray-200 text-gray-900"
      }`}
    >
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">New Documentation</h1>
        {error && <div className="text-red-400 mb-3">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="e.g., Deploying MERN to AWS EC2 with PM2"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode
                  ? "border-gray-700 bg-gray-900 text-white"
                  : "border-gray-300 bg-white text-gray-900"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Problem</label>
            <textarea
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              required
              rows={5}
              placeholder="Describe the issue you faced..."
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode
                  ? "border-gray-700 bg-gray-900 text-white"
                  : "border-gray-300 bg-white text-gray-900"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Solution</label>
            <textarea
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              required
              rows={6}
              placeholder="Explain your fix, steps, and insights..."
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode
                  ? "border-gray-700 bg-gray-900 text-white"
                  : "border-gray-300 bg-white text-gray-900"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Resource Links</label>
            <textarea
              value={resourceLinks}
              onChange={(e) => setResourceLinks(e.target.value)}
              rows={3}
              placeholder="Add links (one per line or comma-separated)"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode
                  ? "border-gray-700 bg-gray-900 text-white"
                  : "border-gray-300 bg-white text-gray-900"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tags</label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g., React, Node.js, AWS"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode
                  ? "border-gray-700 bg-gray-900 text-white"
                  : "border-gray-300 bg-white text-gray-900"
              }`}
            />
            <p className="text-xs mt-1 text-gray-400 dark:text-gray-600">
              Comma or newline separated
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Publishing..." : "Publish"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/docs")}
              className={`px-4 py-2 rounded-md border hover:bg-gray-100 dark:hover:bg-gray-800 transition ${
                isDarkMode
                  ? "border-gray-700 text-gray-200"
                  : "border-gray-300 text-gray-700"
              }`}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDoc;
