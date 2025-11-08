const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  let transporter;

  // Check if we are using production email credentials from .env
  if (process.env.EMAIL_HOST && process.env.EMAIL_HOST !== 'smtp.mailtrap.io') {
    // --- Production/Real Email Config ---
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_PORT == 465, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

  } else {
    // --- Development Config (using Ethereal) ---
    // Generate test SMTP service account from ethereal.email
    let testAccount = await nodemailer.createTestAccount();

    console.log('--- ETHEREAL TEST ACCOUNT ---');
    console.log('User:', testAccount.user);
    console.log('Pass:', testAccount.pass);
    console.log('-----------------------------');

    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });
  }

  const message = {
    from: '"Admissions Team" <noreply@admissions.com>',
    to: options.to,
    subject: options.subject,
    text: options.text,
  };

  const info = await transporter.sendMail(message);

  console.log('Message sent: %s', info.messageId);

  // If we are in development, log the preview URL
  if (!process.env.EMAIL_HOST || process.env.EMAIL_HOST === 'smtp.mailtrap.io') {
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
};

module.exports = sendEmail;