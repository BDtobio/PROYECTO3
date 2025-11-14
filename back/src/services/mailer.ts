import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

interface MailOptions {
  to: string;
  subject: string;
  text: string;
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const enviarCorreo = async ({ to, subject, text }: MailOptions) => {
  try {
    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to,
      subject,
      text,
    });
    console.log("Correo enviado a", to);
  } catch (error) {
    console.error("Error enviando correo:", error);
  }
};
