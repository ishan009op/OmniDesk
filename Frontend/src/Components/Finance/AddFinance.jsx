import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddFinance = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("omniToken");

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("personal");

  const categories = [
    'personal','work','study','entertainment','food',
    'design','development','finance','social','learning',
    'news','others'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return navigate("/login");

    try {
      await axios.post(
        "https://omnidesk-backend.onrender.com/api/finance",
        { title, amount, type, category },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/finance"); // redirect after success
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4 max-w-md mx-auto">

      <h2 className="text-xl font-bold">Add Finance</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded w-full"
        required
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 rounded w-full"
        required
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border p-2 rounded w-full"
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 rounded w-full"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Entry
      </button>

    </form>
  );
};

export default AddFinance;
