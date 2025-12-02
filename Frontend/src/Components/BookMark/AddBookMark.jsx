import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBookMark = () => {
  const [category, setCategory] = useState("personal");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("omniToken");
  const navigate = useNavigate();

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
      const res = await axios.post(
        "http://localhost:3000/api/bookmark",
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
      
      console.log("Bookmark created:", res.data);
      
      // Navigate back to bookmarks page
      navigate("/bookmarks");
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.message || 
        "Failed to create bookmark. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => navigate("/bookmarks")}
            className="text-[#64748B] hover:text-[#2C3E50] transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-3xl font-bold text-[#2C3E50]">Add Bookmark</h1>
        </div>
        <p className="text-[#64748B] ml-9">
          Save your favorite links and resources
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
                  Saving...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save Bookmark
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

      {/* Help Text */}
      <div className="mt-6 p-4 bg-[#3B82F6] bg-opacity-5 border border-[#3B82F6] border-opacity-20 rounded-lg">
        <div className="flex gap-3">
          <svg className="w-5 h-5 text-[#3B82F6] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="text-sm font-semibold text-[#2C3E50] mb-1">
              Pro Tip
            </h4>
            <p className="text-sm text-[#64748B]">
              Organize your bookmarks using categories. You can always change the category later when editing the bookmark.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBookMark;