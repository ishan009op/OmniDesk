import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditNotes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("omniToken");

  const [form, setForm] = useState({
    title: "",
    desc: "",
    tags: "",
  });

  useEffect(() => {
    const fetchNote = async () => {
      const res = await axios.get(`https://omnidesk-backend.onrender.com/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({
        title: res.data.title,
        desc: res.data.desc,
        tags: res.data.tags.join(", "),
      });
    };
    fetchNote();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.patch(
      `https://omnidesk-backend.onrender.com/api/notes/${id}`,
      {
        title: form.title,
        desc: form.desc,
        tags: form.tags.split(",").map((t) => t.trim()),
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(res.data);
    alert("Note updated!");
    navigate(`/singlenote/${id}`);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-50 to-white p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-100"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          ✏️ Edit Note
        </h2>

        <label className="block mb-2 text-gray-700 font-medium">Title</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Enter title"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />

        <label className="block mb-2 text-gray-700 font-medium">
          Description
        </label>
        <textarea
          value={form.desc}
          onChange={(e) => setForm({ ...form, desc: e.target.value })}
          placeholder="Write your note here..."
          rows={5}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />

        <label className="block mb-2 text-gray-700 font-medium">Tags</label>
        <input
          type="text"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
          placeholder="e.g. work, ideas, coding"
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate(`/singlenote/${id}`)}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Update Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditNotes;
