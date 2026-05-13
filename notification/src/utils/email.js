import nodemailer from "nodemailer";
import config from "../configs/config.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Error connecting to email server:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

const sendEmail = async (to, subject, text, html) => {
  try {
    console.log(`Attempting to send email to: ${to} with subject: ${subject}`);
    const info = await transporter.sendMail({
      from: config.EMAIL_USER,
      to,
      subject,
      text,
      html,
    });
    console.log("Email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error in sendEmail utility:", error);
    throw error;
  }
};

export default sendEmail;
