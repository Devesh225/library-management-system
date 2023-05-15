import { createTransport } from "nodemailer";

// export const sendEmail = async(to, subject, text) => {

//     const transporter = createTransport({
//         host: process.env.SMTP_HOST,
//         port: process.env.SMTP_PORT,
//         auth: {
//           user: process.env.SMTP_USER,
//           pass: process.env.SMTP_PASS
//         }
//       });

//     await transporter.sendMail({
//         to, subject, text
//     });
// }

export const sendEmail = async (to, subject, text) => {
    let service = process.env.SMTP_SERVICE;
    let user = process.env.SMTP_USER;
    let pass = process.env.SMTP_PASS;
    const transporter = createTransport({
        service: service,
        auth: {
            user: user,
            pass: pass,
        },
    });

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to,
        subject,
        text,
    };

    await transporter.sendMail(mailOptions);
};
