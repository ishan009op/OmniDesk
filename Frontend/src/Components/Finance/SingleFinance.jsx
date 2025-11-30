import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SingleFinance = () => {
  const [finance, setFinance] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("omniToken");

  useEffect(() => {
    const fetchFinance = async () => {
      if (!token) return navigate("/login");

      try {
        const res = await axios.get(
          `http://localhost:3000/api/finance/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setFinance(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchFinance();
  }, [id, navigate, token]);

  if (!finance) return <h2>Loading...</h2>;

  return (
    <div style={{ border: "1px solid #444", padding: "20px", width: "350px" }}>
      <h2>{finance.title}</h2>
      <p><b>Amount:</b> ₹{finance.amount}</p>
      <p><b>Type:</b> {finance.type}</p>
      <p><b>Category:</b> {finance.category}</p>
      <p><b>Date:</b> {new Date(finance.createdAt).toLocaleDateString()}</p>

      <button onClick={() => navigate(`/finance/edit/${id}`)}>
        Edit
      </button>
    </div>
  );
};

export default SingleFinance;
