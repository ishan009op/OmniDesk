import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Finance = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // all, income, expense
  const token = localStorage.getItem("omniToken");
  const navigate = useNavigate();

  useEffect(() => {
   

    const fetchFinance = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:3000/api/finance", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setData(res.data.finance || res.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load finance records. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFinance();
  }, [token, navigate]);

  // Delete handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    
    try {
      await axios.delete(`http://localhost:3000/api/finance/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      setData(data.filter(item => item._id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete record");
    }
  };

  // Calculate totals
  const totals = data.reduce(
    (acc, item) => {
      if (item.type === "income") {
        acc.income += item.amount;
      } else {
        acc.expense += item.amount;
      }
      return acc;
    },
    { income: 0, expense: 0 }
  );
  const balance = totals.income - totals.expense;

  // Filter data
  const filteredData = filter === "all" 
    ? data 
    : data.filter(item => item.type === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-[#64748B] text-lg">Loading finance records...</div>
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
          <h1 className="text-3xl font-bold text-[#2C3E50]">Finance Tracker</h1>
          <p className="text-[#64748B] mt-1">
            Manage your income and expenses
          </p>
        </div>
        <button
          onClick={() => navigate("/addfinance")}
          className="bg-[#F59E0B] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#D97706] transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Transaction
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Income */}
        <div className="bg-white border border-[#E2E8F0] rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#64748B] text-sm font-medium mb-1">Total Income</p>
              <p className="text-2xl font-bold text-green-600">
                ₹{totals.income.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Expenses */}
        <div className="bg-white border border-[#E2E8F0] rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#64748B] text-sm font-medium mb-1">Total Expenses</p>
              <p className="text-2xl font-bold text-red-600">
                ₹{totals.expense.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
            </div>
          </div>
        </div>

        {/* Balance */}
        <div className="bg-white border border-[#E2E8F0] rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#64748B] text-sm font-medium mb-1">Balance</p>
              <p className={`text-2xl font-bold ${balance >= 0 ? 'text-[#3B82F6]' : 'text-red-600'}`}>
                ₹{balance.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-[#3B82F6] bg-opacity-10 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === "all"
              ? "bg-[#2C3E50] text-white"
              : "bg-white text-[#64748B] border border-[#E2E8F0] hover:bg-[#F8FAFC]"
          }`}
        >
          All Transactions
        </button>
        <button
          onClick={() => setFilter("income")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === "income"
              ? "bg-green-600 text-white"
              : "bg-white text-[#64748B] border border-[#E2E8F0] hover:bg-[#F8FAFC]"
          }`}
        >
          Income
        </button>
        <button
          onClick={() => setFilter("expense")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === "expense"
              ? "bg-red-600 text-white"
              : "bg-white text-[#64748B] border border-[#E2E8F0] hover:bg-[#F8FAFC]"
          }`}
        >
          Expenses
        </button>
      </div>

      {/* Empty State */}
      {filteredData.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">💰</div>
          <h2 className="text-2xl font-semibold text-[#2C3E50] mb-2">
            {filter === "all" ? "No transactions yet" : `No ${filter} records found`}
          </h2>
          <p className="text-[#64748B] mb-6">
            Start tracking your finances by adding your first transaction
          </p>
          <button
            onClick={() => navigate("/addfinance")}
            className="bg-[#3B82F6] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2563EB] transition-colors"
          >
            Add Your First Transaction
          </button>
        </div>
      ) : (
        /* Transactions List */
        <div className="space-y-3">
          {filteredData.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-[#E2E8F0] rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                {/* Left side - Transaction info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      item.type === "income" ? "bg-green-100" : "bg-red-100"
                    }`}>
                      {item.type === "income" ? (
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m0 0l-4-4m4 4l4-4" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20V4m0 0l4 4m-4-4l-4 4" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#2C3E50]">{item.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="inline-block bg-[#3B82F6] bg-opacity-10 text-[#3B82F6] text-xs font-medium px-2 py-1 rounded">
                          {item.category}
                        </span>
                        <span className="text-xs text-[#94A3B8]">
                          {new Date(item.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  {item.description && (
                    <p className="text-[#64748B] text-sm ml-13">{item.description}</p>
                  )}
                </div>

                {/* Right side - Amount & Actions */}
                <div className="text-right ml-4">
                  <p className={`text-2xl font-bold mb-3 ${
                    item.type === "income" ? "text-green-600" : "text-red-600"
                  }`}>
                    {item.type === "income" ? "+" : "-"}₹{item.amount.toLocaleString()}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/singlefinance/${item._id}`)}
                      className="bg-[#2C3E50] text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-[#1e293b] transition-colors"
                    >
                      View
                    </button>
                    <button
                      onClick={() => navigate(`/editfinance/${item._id}`)}
                      className="bg-[#3B82F6] text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-[#2563EB] transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="px-3 py-1.5 rounded text-sm font-medium border-2 border-red-500 text-red-500 hover:bg-red-50 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Finance;