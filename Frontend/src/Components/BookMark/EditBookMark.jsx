import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditBookMark = () => {
  const [Category, setCategory] = useState("");
  const [Title, SetTitle] = useState("");
  const [Url, SetUrl] = useState("");
  const [Favorite, SetFavorite] = useState(false);

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
        const res = await axios.get(`http://localhost:3000/api/bookmark/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data;

        SetTitle(data.title);
        SetUrl(data.url);
        setCategory(data.category);
        SetFavorite(data.favorite);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookmark();
  }, [id, navigate, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return navigate("/register");

    const res = await axios.put(
      `http://localhost:3000/api/bookmark/${id}`,
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
    // navigate("/bookmark");
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

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={Favorite}
          onChange={(e) => SetFavorite(e.target.checked)}
        />
        Favorite
      </label>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Update Bookmark
      </button>
    </form>
  );
};

export default EditBookMark;
