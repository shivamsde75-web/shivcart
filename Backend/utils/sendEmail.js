const nodemailer = require("nodemailer");
const { Resend } = require("resend");
const dns = require("node:dns");

dns.setDefaultResultOrder("ipv4first");

const sendEmail = async (to, subject, text) => {
  try {
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { data, error } = await resend.emails.send({
        from: process.env.RESEND_FROM || process.env.EMAIL_USER,
        to,
        subject,
        text,
      });

      if (error) {
        throw new Error(error.message || "Email API request failed");
      }

      return { success: true, id: data?.id };
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Failed to send email",
    };
  }
};

module.exports = sendEmail;
