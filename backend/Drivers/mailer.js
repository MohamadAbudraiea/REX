const nodemailer = require("nodemailer");

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "blinktechnical2025@gmail.com",
    pass: "rprfjcfggfjzzhlm",
  },
});

async function sendEmail(to, subject, html) {
  try {
    const info = await transporter.sendMail({
      to,
      subject,
      html,
    });
    console.log("Email sent to:", `${to}`);
  } catch (error) {
    console.log(error.message);
  }
}

exports.sendEmail = sendEmail;
