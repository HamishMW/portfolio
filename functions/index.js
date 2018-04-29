'use strict';

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

exports.sendMail = functions.database.ref('/messages/{messageID}').onCreate((snapshot) => {
  const { email, message } = snapshot.val();
  return sendMail(email, message);
});

function sendMail(email, message) {
  const mailOptions = {
    from: `Portfolio <${gmailEmail}>`,
    to: 'hello@hamishw.com',
    subject: `New message from ${email}`,
    text: `From: ${email}\n\n${message}`,
  };

  return mailTransport.sendMail(mailOptions);
}
