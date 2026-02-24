import React, { useEffect, useState } from "react";
import axios from "axios";
import ExpenseForm from "./components/ExpenseForm";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedMonth, setSelectedMonth] = useState("All");

  // Fetch expenses
  const fetchExpenses = async () => {
    const res = await axios.get("YOUR_API_URL");
    setExpenses(Array.isArray(res.data) ? res.data : []);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Year + Month Filter
  const filteredExpenses = expenses.filter((exp) => {
    const expDate = new Date(exp.date);

    const yearMatch =
      selectedYear === "All" ||
      expDate.getFullYear().toString() === selectedYear;

    const monthMatch =
      selectedMonth === "All" ||
      expDate.getMonth().toString() === selectedMonth;

    return yearMatch && monthMatch;
  });

  // Total based on filter
  const totalExpense = filteredExpenses.reduce(
    (total, exp) => total + Number(exp.amount),
    0,
  );

  return (
    <div className="App">
      <Navbar />

      {/* Year Dropdown */}
      <select onChange={(e) => setSelectedYear(e.target.value)}>
        <option value="All">All Years</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
        <option value="2026">2026</option>
      </select>

      {/* Month Dropdown */}
      <select onChange={(e) => setSelectedMonth(e.target.value)}>
        <option value="All">All Months</option>
        <option value="0">January</option>
        <option value="1">February</option>
        <option value="2">March</option>
        <option value="3">April</option>
        <option value="4">May</option>
        <option value="5">June</option>
        <option value="6">July</option>
        <option value="7">August</option>
        <option value="8">September</option>
        <option value="9">October</option>
        <option value="10">November</option>
        <option value="11">December</option>
      </select>

      <h3>Total Expense: ₹{totalExpense}</h3>

      {/* Form */}
      <ExpenseForm fetchExpenses={fetchExpenses} />

      {/* Expense List */}
      <ul>
        {filteredExpenses.map((exp) => (
          <li key={exp._id}>
            {exp.title} - ₹{exp.amount} ({exp.category}) -{" "}
            {new Date(exp.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
