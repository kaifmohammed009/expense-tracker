import React from "react";
import axios from "axios";

function ExpenseList({ expenses, fetchExpenses }) {
  const deleteExpense = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/expenses/${id}`);
      fetchExpenses();
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  return (
    <div>
      <h3>Expense List</h3>
      <ul>
        {expenses.map((exp) => (
          <li key={exp._id}>
            {exp.title} - ₹{exp.amount} - {exp.category} - {exp.date}
            <button
              onClick={() => deleteExpense(exp._id)}
              style={{ marginLeft: "10px", color: "red" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;
