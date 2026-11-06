const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  value: { type: Number, required: true }, 
  date: { type: Date, default: Date.now }
});

// This forces this instance of mongoose to point to your "expenses" collection in Atlas
module.exports = mongoose.model("Expense", ExpenseSchema, "expenses");
