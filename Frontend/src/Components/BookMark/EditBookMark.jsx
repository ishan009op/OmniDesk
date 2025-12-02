import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditBookMark = () => {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("omniToken");
  const navigate = useNavigate();
  const { id } = useParams();

  const categories = [
    "personal",
    "work",
    "study",
    "entertainment",
    "design",
    "development",
    "finance",
    "social",
    "learning",
    "news",
    "others",
  ];

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchBookmark = async () => {
      try {
        setFetchLoading(true);
        const res = await axios.get(`http://localhost:3000/api/bookmark/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data;
        setTitle(data.title || "");
        setUrl(data.url || "");
        setCategory(data.category || "personal");
        setDescription(data.description || "");
        setFavorite(data.favorite || false);
      } catch (error) {
        console.error(error);
        setError("Failed to load bookmark. Please try again.");
      } finally {
        setFetchLoading(false);
      }
    };

    fetchBookmark();
  }, [id, navigate, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!token) return navigate("/register");

    // Validation
    if (!title.trim()) {
      setError("Please enter a title");
      return;
    }

    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    // Basic URL validation
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!urlPattern.test(url)) {
      setError("Please enter a valid URL");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `http://localhost:3000/api/bookmark/${id}`,
        {
          title: title.trim(),
          url: url.trim(),
          category,
          description: description.trim(),
          favorite,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Bookmark updated:", res.data);
      navigate("/bookmarks");
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.message || 
        "Failed to update bookmark. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Loading state while fetching bookmark
  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-[#64748B] text-lg">Loading bookmark...</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => navigate("/bookmark")}
            className="text-[#64748B] hover:text-[#2C3E50] transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-3xl font-bold text-[#2C3E50]">Edit Bookmark</h1>
        </div>
        <p className="text-[#64748B] ml-9">
          Update your bookmark details
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Title Field */}
          <div>
            <label 
              htmlFor="title" 
              className="block text-sm font-medium text-[#2C3E50] mb-2"
            >
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter bookmark title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-colors"
              disabled={loading}
            />
          </div>

          {/* URL Field */}
          <div>
            <label 
              htmlFor="url" 
              className="block text-sm font-medium text-[#2C3E50] mb-2"
            >
              URL <span className="text-red-500">*</span>
            </label>
            <input
              id="url"
              type="text"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-colors"
              disabled={loading}
            />
            <p className="text-xs text-[#94A3B8] mt-1">
              Enter the full URL including http:// or https://
            </p>
          </div>

          {/* Description Field */}
          <div>
            <label 
              htmlFor="description" 
              className="block text-sm font-medium text-[#2C3E50] mb-2"
            >
              Description <span className="text-[#94A3B8] text-xs">(Optional)</span>
            </label>
            <textarea
              id="description"
              placeholder="Add a brief description about this bookmark..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-colors resize-none"
              disabled={loading}
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label 
              htmlFor="category" 
              className="block text-sm font-medium text-[#2C3E50] mb-2"
            >
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-colors bg-white"
              disabled={loading}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Favorite Checkbox */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="favorite"
                type="checkbox"
                checked={favorite}
                onChange={(e) => setFavorite(e.target.checked)}
                className="w-5 h-5 text-[#F59E0B] border-[#E2E8F0] rounded focus:ring-[#F59E0B] focus:ring-2"
                disabled={loading}
              />
            </div>
            <div className="ml-3">
              <label htmlFor="favorite" className="text-sm font-medium text-[#2C3E50]">
                Mark as Favorite
              </label>
              <p className="text-xs text-[#94A3B8]">
                Favorite bookmarks will be highlighted with a star
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-[#E2E8F0]">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#3B82F6] text-white py-3 rounded-lg font-semibold hover:bg-[#2563EB] transition-colors disabled:bg-[#94A3B8] disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Update Bookmark
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate("/bookmarks")}
              disabled={loading}
              className="px-6 py-3 border-2 border-[#E2E8F0] text-[#64748B] rounded-lg font-semibold hover:bg-[#F8FAFC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Delete Section */}
      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-red-900 mb-1">
              Danger Zone
            </h4>
            <p className="text-sm text-red-700 mb-3">
              Once you delete this bookmark, it cannot be recovered.
            </p>
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this bookmark?")) {
                  axios.delete(`http://localhost:3000/api/bookmark/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                  })
                  .then(() => navigate("/bookmarks"))
                  .catch(err => console.error(err));
                }
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
            >
              Delete Bookmark
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBookMark;