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

const IS_PROD = process.env.ENV === 'production';
const ORIGIN = IS_PROD ? 'https://hamishw.com' : '*';
const MAX_EMAIL_LENGTH = 512;
const MAX_MESSAGE_LENGTH = 4096;
const LIMIT = IS_PROD ? 1024 : 64;

app.use(helmet());
app.use(express.json({ limit: LIMIT }));
app.use(cors({ origin: ORIGIN }));

app.post('/functions/sendMessage', async (req, res) => {
  try {
    const { email, message } = req.body;

    if (!email || !/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address' });
    } else if (!message) {
      return res.status(400).json({ error: 'Please enter a message' });
    } else if (email.length > MAX_EMAIL_LENGTH) {
      return res.status(400).json({
        error: `Please enter an email fewer than ${MAX_EMAIL_LENGTH} characters`,
      });
    } else if (message.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({
        error: `Please enter a message fewer than ${MAX_MESSAGE_LENGTH} characters`,
      });
    }

    const mailOptions = {
      from: `Portfolio <${gmailEmail}>`,
      to: 'hello@hamishw.com',
      subject: `New message from ${email}`,
      text: `From: ${email}\n\n${message}`,
    };

    await mailTransport.sendMail(mailOptions);

    return res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Message rejected' });
  }
});

module.exports.handler = serverless(app);
