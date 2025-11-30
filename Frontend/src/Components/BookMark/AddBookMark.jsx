import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBookMark = () => {
  const [Category, setCategory] = useState("personal"); // default category
  const [Title, SetTitle] = useState("");
  const [Url, SetUrl] = useState("");
  const [Favorite, SetFavorite] = useState(false);
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
    if (!token) return navigate("/register");

    try {
      const res = await axios.post(
        "http://localhost:3000/api/bookmark",
        {
          title: Title,
          url: Url,
          category: Category,
          favorite: Favorite,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res.data);
      // Optional: clear form after submit
      SetTitle("");
      SetUrl("");
      setCategory("personal");
      SetFavorite(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={Title}
        onChange={(e) => SetTitle(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <input
        type="text"
        placeholder="URL"
        value={Url}
        onChange={(e) => SetUrl(e.target.value)}
        className="border p-2 rounded w-full"
      />

      <select
        value={Category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 rounded w-full"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={Favorite}
          onChange={(e) => SetFavorite(e.target.checked)}
          className="border p-2 rounded"
        />
        <span>Favorite</span>
      </label>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Bookmark
      </button>
    </form>
  );
};

export default AddBookMark;
