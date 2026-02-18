import React, { useState } from "react";
import axios from "axios";
function ExpenseForm({ fetchExpenses }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    await axios.post(
      "http://expense-backend-3-vbox.onrender.com/api/expenses",
      {
        title,
        amount,
        category,
        date,
      },
    );
    setTitle("");
    setAmount("");
    setCategory("");
    setDate("");
    fetchExpenses();
  };
  return (
    <form onSubmit={submitHandler}>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button>Add Expense</button>
    </form>
  );
}
export default ExpenseForm;
