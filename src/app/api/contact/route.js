import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// The email account used to send the emails (e.g., daveholmes88@gmail.com)
const MY_EMAIL = process.env.GMAIL_USER;
// The App Password for the sender email (REQUIRED for Gmail)
const SENDER_PASS = process.env.GMAIL_PASS;

/**
 * Handles POST requests to send the contact form email.
 * @param {Request} request - The incoming request object.
 * @returns {Promise<NextResponse>} - The JSON response indicating success or failure.
 */
export async function POST(request) {
  // 1. Get form data from the request body
  let body;
  console.log(process.env)
  console.log(SENDER_PASS)
  try {
    body = await request.json();
  } catch (e) {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // 2. Configure the Nodemailer transporter using Gmail SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: MY_EMAIL,
      pass: SENDER_PASS,
    },
  });

  // 3. Define the mail content
  const mailOptions = {
    from: MY_EMAIL, // Must be your configured GMAIL_USER
    to: MY_EMAIL,       // The recipient is daveholmes88@gmail.com
    subject: `New Contact Form Submission from ${name}`,
    html: `
      <h2>New Contact Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap; border: 1px solid #ccc; padding: 10px; background-color: #f9f9f9;">${message}</p>
    `,
  };

  // 4. Send the email
  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
  } catch (error) {
    // Log the error for debugging on the server
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Check server logs.' },
      { status: 500 }
    );
  }
}