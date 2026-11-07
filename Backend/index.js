
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const expenseRoute = require("./routes/expense");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(",")
    : true
}));

app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Expense Tracker API is running"
  });
});

// Routes
app.use("/expenses", expenseRoute);

// Database connection and server startup
const startServer = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION);

    console.log("MongoDB connected successfully");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
