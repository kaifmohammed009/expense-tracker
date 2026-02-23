const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
connectDB();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
const expenseRoutes = require("./routes/expenseRoutes");
app.use("/api/expenses", expenseRoutes);
const PORT = process.env.PORT || 5000;
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
