import React from "react";
import axios from "axios";
function ExpenseList({ expenses, fetchExpenses }) {
  const deleteExpense = async (id) => {
    await axios.delete(
      `http://expense-backend-3-vbox.onrender.com/api/expenses/${id}`,
    );
    fetchExpenses();
  };
  return (
    <ul>
      {expenses.map((exp) => (
        <li key={exp._id}>
          {exp.title} - ₹{exp.amount} ({exp.category})
          <button onClick={() => deleteExpense(exp._id)}>X</button>
        </li>
      ))}
    </ul>
  );
}
export default ExpenseList;
