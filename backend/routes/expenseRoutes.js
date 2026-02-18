const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense"); // model path correct-ah irukkanum

// 📥 Get all expenses
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch expenses" });
  }
});

// ➕ Add new expense
router.post("/", async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;

    const newExpense = new Expense({
      title,
      amount,
      category,
      date,
    });

    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(500).json({ message: "Failed to add expense" });
  }
});

// ❌ Delete expense
router.delete("/:id", async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete expense" });
  }
});

module.exports = router;
