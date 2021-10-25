const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const aws = require('@aws-sdk/client-ses');

const app = express();
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const ses = new aws.SES({
  region: 'us-east-1',
});

const ORIGIN = 'https://hamishw.com';
const MAX_EMAIL_LENGTH = 512;
const MAX_MESSAGE_LENGTH = 4096;

app.use(helmet());
app.use(express.json());
app.use(cors({ origin: ORIGIN }));

app.post('/message', async (req, res) => {
  try {
    const email = DOMPurify.sanitize(req.body.email);
    const message = DOMPurify.sanitize(req.body.message);

    // Reject unsupported origins
    if (req.headers.origin !== ORIGIN) {
      throw new Error(`Unsupported origin: ${req.headers.origin}`);
    }

    // Validate email request
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

    // Send email using AWS SES
    await ses.sendEmail({
      Source: 'Portfolio <mailbot@hamishw.com>',
      Destination: {
        ToAddresses: ['hello@hamishw.com'],
      },
      Message: {
        Subject: { Data: `New message from ${email}` },
        Body: {
          Text: { Data: `From: ${email}\n\n${message}` },
        },
      },
    });

    return res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Rejected', error);
    return res.status(500).json({ error: 'Message rejected' });
  }
});

module.exports.handler = serverless(app);
