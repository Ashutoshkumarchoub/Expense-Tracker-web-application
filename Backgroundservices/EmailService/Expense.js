
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const sendMail = require("../helpers/sendMail");
const Expense = require("../models/Expense");
const AlertState = require("../models/AlertState");

const THRESHOLD = 10000;

const expenseEmail = async () => {
  try {
    // Calculate total expenses
    const expenses = await Expense.find();

    const totalExpense = expenses.reduce(
      (acc, expense) => acc + Number(expense.value || 0),
      0
    );

    console.log(`Current Total Expense: ${totalExpense}`);

    // Get or create persistent alert state
    let alertState = await AlertState.findOne({
      alertType: "expense_threshold",
    });

    if (!alertState) {
      alertState = await AlertState.create({
        alertType: "expense_threshold",
        isAboveThreshold: false,
      });
    }

    // Case 1: Expenses are above the threshold
    if (totalExpense > THRESHOLD) {
      if (!alertState.isAboveThreshold) {
        const messageOption = {
          from: process.env.EMAIL,
          to: process.env.ADMIN_EMAIL,
          subject: "Expense Threshold Warning",
          text: `Your total expenses are ₹${totalExpense}, which exceeds the ₹${THRESHOLD} threshold. Please review your expenses.`,
        };

        // Send email before marking the alert as triggered
        await sendMail(messageOption);

        alertState.isAboveThreshold = true;
        await alertState.save();

        console.log("Warning email sent to Admin.");
      } else {
        console.log(
          "Threshold already crossed. No duplicate warning email sent."
        );
      }
    }

    // Case 2: Expenses return to or below the threshold
    else {
      if (alertState.isAboveThreshold) {
        alertState.isAboveThreshold = false;
        await alertState.save();

        console.log(
          "Expenses are back within the threshold. Alert has been reset."
        );
      } else {
        console.log("Expenses are within the threshold. No email sent.");
      }
    }
  } catch (error) {
    console.error("Error inside expenseEmail:", error.message);
    throw error;
  }
};

module.exports = expenseEmail;
