'use strict';

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

const app = express();
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

admin.initializeApp();
app.use(cors({ origin: 'https://hamishw.com' }));
app.use(express.json());

app.post('/sendMessage', async (req, res) => {
  try {
    const { email, message } = req.body;
    await admin.database().ref('/messages').push({ email, message });
    res.status(200).end();
  } catch (error) {
    res.status(500).json({ error: 'Message rejected' });
  }
});

exports.sendMail = functions.database.ref('/messages/{messageID}').onCreate(snapshot => {
  const { email, message } = snapshot.val();

  // Automatically remove test messages
  if (email === 'test@test.test') {
    snapshot.ref.set(null);
  }

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

exports.app = functions.https.onRequest(app);
