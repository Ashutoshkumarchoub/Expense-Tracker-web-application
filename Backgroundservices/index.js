
const path = require("path");
const dotenv = require("dotenv");

// Load environment variables first
dotenv.config({
  path: path.resolve(__dirname, ".env"),
});

const cron = require("node-cron");
const mongoose = require("mongoose");
const expenseEmail = require("./EmailService/Expense");

let isRunning = false;
let cronTask;

const startBackgroundService = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION);

    console.log("MongoDB connected successfully");
    console.log("Background worker started.");

    cronTask = cron.schedule("* * * * *", async () => {
      // Prevent overlapping executions
      if (isRunning) {
        console.log("Previous email check is still running. Skipping.");
        return;
      }

      isRunning = true;

      try {
        console.log("Running scheduled email check...");

        await expenseEmail();

        console.log("Email check completed successfully.");
      } catch (error) {
        console.error("Email service error:", error.message);
      } finally {
        isRunning = false;
      }
    });
  } catch (error) {
    console.error("Background service startup failed:", error.message);
    process.exit(1);
  }
};

// Gracefully stop the worker
const shutdown = async () => {
  console.log("Stopping background worker...");

  if (cronTask) {
    cronTask.stop();
  }

  try {
    await mongoose.disconnect();
    console.log("MongoDB disconnected.");
    process.exit(0);
  } catch (error) {
    console.error("Shutdown error:", error.message);
    process.exit(1);
  }
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

startBackgroundService();
