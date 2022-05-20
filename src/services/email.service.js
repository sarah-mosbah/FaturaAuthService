import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER_EMAIL,
      pass:  process.env.USER_PASSWORD
    }
  });
  

export async function sendEmail(email, verification) {
    try {
        const mailOptions = {
            from:  process.env.USER_EMAIL,
            to: email,
            subject: 'Verification Code',
            text: `you're verification code is: ${verification}` 
        }; 
        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw error;
    }
} 