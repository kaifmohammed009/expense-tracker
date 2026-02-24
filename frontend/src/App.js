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
      {[
        ...new Set(expenses.map((exp) => new Date(exp.date).getFullYear())),
      ].map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
      {[...new Set(expenses.map((exp) => new Date(exp.date).getMonth()))].map(
        (month) => (
          <option key={month} value={month}>
            {month + 1}
          </option>
        ),
      )}

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
