import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditFinance = () => {
  const { id } = useParams();
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

  useEffect(() => {
    if (!token) return navigate("/login");

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://omnidesk-backend.onrender.com/api/finance/${id}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        const data = res.data.finance || res.data;
        setTitle(data.title);
        setAmount(data.amount);
        setType(data.type);
        setCategory(data.category);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id, token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `https://omnidesk-backend.onrender.com/api/finance/${id}`,
        { title, amount, type, category },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/finance"); // redirect after update
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4 max-w-md mx-auto">

      <h2 className="text-xl font-bold">Edit Finance</h2>

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
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Update Finance
      </button>

    </form>
  );
};

export default EditFinance;
