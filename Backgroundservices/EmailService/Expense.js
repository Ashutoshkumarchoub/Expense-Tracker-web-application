const path = require("path");
const dotenv = require("dotenv");

// Fix: Points cleanly to the .env file sitting in the active Backgroundservices root folder
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const sendMail = require("../helpers/sendMail"); 
const Expense = require("../models/Expense"); 
 


const expenseEmail = async () => {
  try {
    const expenses = await Expense.find();
    
    const totalExpense = expenses.reduce(
      (acc, expense) => acc + Number(expense.value || 0),
      0
    );

    console.log(`Current Total Calculated Expense: ${totalExpense}`); 

    if (totalExpense > 10000) {
      let messageOption = {
        from: process.env.EMAIL,
        to: process.env.ADMIN_EMAIL,
        subject: "Warning",
        text: `Your total expenses is ${totalExpense}. please review your expenses`,
      };

      await sendMail(messageOption);
      console.log("Warning email sent to Admin.");
    } else {
      console.log("Total expense is under the 10000 threshold. No email sent.");
    }
  } catch (error) {
    console.error("Error inside expenseEmail function:", error);
  }
};

module.exports = expenseEmail;
