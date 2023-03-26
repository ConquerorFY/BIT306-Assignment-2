import nodemailer from "nodemailer";

const srcEmail = "<email>";    // your email
const srcPassword = "<email-password>"; // your password
const mailService = "hotmail"; // your email service (eg. hotmail) (gmail cannot use)

export const sendMail = (targetEmail, mailSubject, mailText) => {
    const transporter = nodemailer.createTransport({
        service: mailService,
        auth: {
            user: srcEmail,
            pass: srcPassword
        }
    });

    const mailOptions = {
        from: srcEmail,
        to: targetEmail,
        subject: mailSubject,
        text: mailText
    }

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log("Error: ", err);
        } else {
            console.log("Email sent: " + info.response);
        }
    })
}