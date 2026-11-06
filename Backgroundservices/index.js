const express = require("express");
const cron = require("node-cron");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const expenseEmail = require("./EmailService/Expense");

dotenv.config();

// 1. Connect to MongoDB Atlas
mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log("DB connection is successfull");
    
    // 2. ONLY START THE CRON JOB AFTER THE DB IS CONNECTED
    run();
  })
  .catch((err) => {
    console.log("DB Connection Failed:", err);
  });

const run = () => {
  console.log("Cron job initialized and scheduled.");
  
  // FIX: Changed from every second ("* * * * * *") to once every minute ("* * * * *")
  cron.schedule("* * * * *", () => {
    console.log("⏰ Running scheduled email check...");
    expenseEmail();
  });
};

app.listen(process.env.PORT, () => {
  console.log(`Background services is running on port ${process.env.PORT}`);
});
