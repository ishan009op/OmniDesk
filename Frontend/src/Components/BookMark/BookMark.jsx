import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BookMark = () => {
  const token = localStorage.getItem("omniToken");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to ensure URL has protocol
  const formatUrl = (url) => {
    if (!url) return '#';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `https://${url}`;
  };

  useEffect(() => {
   

    const getData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://omnidesk-backend.onrender.com/api/bookmark", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data.bookmarks || res.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load bookmarks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [token, navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bookmark?")) return;
    
    try {
      await axios.delete(`https://omnidesk-backend.onrender.com/api/bookmark/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(data.filter(item => item._id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete bookmark");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-[#64748B] text-lg">Loading bookmarks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#2C3E50]">My Bookmarks</h1>
          <p className="text-[#64748B] mt-1">
            {data.length} {data.length === 1 ? 'bookmark' : 'bookmarks'} saved
          </p>
        </div>
        <button
          onClick={() => navigate("/addbookmark")}
          className="bg-[#F59E0B] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#D97706] transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Bookmark
        </button>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔖</div>
          <h2 className="text-2xl font-semibold text-[#2C3E50] mb-2">
            No bookmarks yet
          </h2>
          <p className="text-[#64748B] mb-6">
            Start saving your favorite links and resources
          </p>
          <button
            onClick={() => navigate("/addbookmark")}
            className="bg-[#3B82F6] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2563EB] transition-colors"
          >
            Create Your First Bookmark
          </button>
        </div>
      ) : (
        /* Bookmarks Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-[#E2E8F0] rounded-lg p-6 hover:shadow-lg transition-shadow relative"
            >
              {/* Favorite Star */}
              {item.favorite && (
                <div className="absolute top-4 right-4">
                  <span className="text-2xl">⭐</span>
                </div>
              )}

              {/* Category Badge */}
              <div className="mb-3">
                <span className="inline-block bg-[#3B82F6] bg-opacity-10 text-[#3B82F6] text-sm font-medium px-3 py-1 rounded-full">
                  {item.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-[#2C3E50] mb-2 pr-8">
                {item.title}
              </h3>

              {/* URL - FIXED */}
              <a 
                href={formatUrl(item.url)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3B82F6] hover:text-[#2563EB] text-sm break-all hover:underline block mb-4"
              >
                {item.url.length > 50 ? item.url.substring(0, 50) + '...' : item.url}
              </a>

              {/* Description */}
              {item.description && (
                <p className="text-[#64748B] text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 mt-4 pt-4 border-t border-[#E2E8F0]">
                <button
                  onClick={() => navigate(`/singlebookmark/${item._id}`)}
                  className="flex-1 bg-[#2C3E50] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1e293b] transition-colors"
                >
                  View
                </button>
                <button
                  onClick={() => navigate(`/editbookmark/${item._id}`)}
                  className="flex-1 bg-[#3B82F6] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#2563EB] transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="px-4 py-2 rounded-lg text-sm font-medium border-2 border-red-500 text-red-500 hover:bg-red-50 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookMark;