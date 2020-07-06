const serverless = require('serverless-http');
const nodemailer = require('nodemailer');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const gmailEmail = process.env.nodeMailerEmail;
const gmailPassword = process.env.nodeMailerPassword;

const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

app.use(helmet());
app.use(express.json());
// app.use(cors({ origin: 'https://hamishw.com' }));
app.use(cors({ origin: '*' }));

app.post('/functions/sendMessage', async (req, res) => {
  try {
    const { email, message } = req.body;

    const mailOptions = {
      from: `Portfolio <${gmailEmail}>`,
      to: 'hello@hamishw.com',
      subject: `New message from ${email}`,
      text: `From: ${email}\n\n${message}`,
    };

    await mailTransport.sendMail(mailOptions);

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Message rejected' });
  }
});

module.exports.handler = serverless(app);
