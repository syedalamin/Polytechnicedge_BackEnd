import nodemailer from "nodemailer";
import { appConfig } from "../config/appConfig";

// export const transporter = nodemailer.createTransport({
//   host: appConfig.email.host,
//   port: appConfig.email.port,
//   secure: appConfig.email.secure,
//   auth: {
//     user: appConfig.email.auth.user,
//     pass: appConfig.email.auth.pass,
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// } as nodemailer.TransportOptions);
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "syedalamin2580@gmail.com",
    pass: "gjdc mwco bhty olxj",
  },
} as nodemailer.TransportOptions);

export const sendEmail = async (
  to: string,
  subject: string,
  html: string,
): Promise<void> => {
  try {
     await transporter.sendMail({
      from: "syedalamin2580@gmail.com", // sender address
      to: to,
      subject: subject,
      text: "Hello world?",
      html: html,
    });
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
};
