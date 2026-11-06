const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

function createTransporter(config) {
  const transporter = nodemailer.createTransport(config);
  return transporter;
}

let configurations = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD, // Make sure this is an App Password!
  },
};

const sendMail = async (messageOption) => {
  try {
    const transporter = createTransporter(configurations);
    await transporter.verify();
    
    // Removing the callback function makes nodemailer return a Promise
    const info = await transporter.sendMail(messageOption);
    console.log("Email sent successfully:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email via Nodemailer:", error);
    throw error; // Pass the error up so you can see it in terminal logs
  }
};

module.exports = sendMail;
