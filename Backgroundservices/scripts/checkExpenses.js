
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Expense = require("../models/Expense");
const AlertState = require("../models/AlertState");
const sendMail = require("../helpers/sendMail");

const path = require("path");

dotenv.config({
  path: path.join(__dirname, "../.env"),
});

const THRESHOLD = 10000;

async function checkExpenses() {
  try {
    if (!process.env.DB_CONNECTION) {
      throw new Error("DB_CONNECTION is missing");
    }

    await mongoose.connect(process.env.DB_CONNECTION);
    console.log("MongoDB connected successfully");

    const expenses = await Expense.find();

    const totalExpense = expenses.reduce(
      (total, expense) => total + Number(expense.value || 0),
      0
    );

    console.log(`Current total expense: ₹${totalExpense}`);

    // Get or create the alert state
    let alertState = await AlertState.findOne({
      alertType: "expense_threshold",
    });

    if (!alertState) {
      alertState = await AlertState.create({
        alertType: "expense_threshold",
        isAboveThreshold: false,
      });
    }

    const isCurrentlyAbove = totalExpense > THRESHOLD;

    // Send an email only when expenses cross the threshold
    if (isCurrentlyAbove && !alertState.isAboveThreshold) {
      await sendMail({
        from: process.env.EMAIL,
        to: process.env.ADMIN_EMAIL,
        subject: "Expense Threshold Alert",
        text: `Your total expenses have crossed ₹${THRESHOLD}. Current total: ₹${totalExpense}. Please review your expenses.`,
      });

      console.log("Threshold crossing detected. Alert email sent.");
    } else {
      console.log(
        isCurrentlyAbove
          ? "Expenses remain above threshold. No repeated alert."
          : "Expenses are at or below threshold."
      );
    }

    // Update state after a successful email or a normal check
    alertState.isAboveThreshold = isCurrentlyAbove;
    await alertState.save();

  } catch (error) {
    console.error("Expense check failed:", error.message);
    process.exitCode = 1;

  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log("MongoDB disconnected");
    }
  }
}

checkExpenses();
