
const nodemailer = require("nodemailer");

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
};

const sendMail = async (messageOption) => {
  if (!process.env.EMAIL || !process.env.PASSWORD) {
    throw new Error("EMAIL or PASSWORD is missing in environment variables.");
  }

  if (!process.env.ADMIN_EMAIL) {
    throw new Error("ADMIN_EMAIL is missing in environment variables.");
  }

  const transporter = createTransporter();

  try {
    await transporter.verify();

    const info = await transporter.sendMail(messageOption);

    console.log("Email sent successfully:", info.response);

    return info;
  } finally {
    transporter.close();
  }
};

module.exports = sendMail;
