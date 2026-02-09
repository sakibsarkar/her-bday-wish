import nodemailer from "nodemailer";
export const runtime = "nodejs";
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, // SSL port
  secure: true, // must be true for port 465
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.MAIL_PASSWORD, // Gmail App Password
  },
  // logger: true,
  // debug: true,
  tls: { rejectUnauthorized: false }, // optional, helps with serverless cert issues
});

export const sendMail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  try {
    const info = await transporter.sendMail({
      from: `"Samia HBD" <${process.env.EMAIL_ID}>`,
      to,
      subject,
      html,
    });

    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Email error:", error);
    throw error;
  }
};
