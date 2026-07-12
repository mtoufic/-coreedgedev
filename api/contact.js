module.exports = async function handler(req, res) {
if (req.method !== 'POST') {
res.status(405).json({ error: 'Method not allowed' });
return;
}

const { name, email, phone, message } = req.body || {};

if (!name || !email || !message) {
res.status(400).json({ error: 'Missing required fields' });
return;
}

const apiKey = process.env.RESEND_API_KEY;
const toEmail = process.env.CONTACT_TO_EMAIL || 'info@coreedgedev.com';

if (!apiKey) {
res.status(500).json({ error: 'Email service not configured yet' });
return;
}

try {
const response = await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
  'Authorization': 'Bearer ' + apiKey,
  'Content-Type': 'application/json'
  },
  body: JSON.stringify({
  from: 'Core Edge Website <onboarding@resend.dev>',
  to: [toEmail],
  reply_to: email,
  subject: 'New website inquiry from ' + name,
  text: 'Name: ' + name + '\nEmail: ' + email + '\nPhone: ' + (phone || 'N/A') + '\n\nMessage:\n' + message
  })
  });

if (!response.ok) {
const errText = await response.text();
res.status(502).json({ error: 'Failed to send email', detail: errText });
return;
}

res.status(200).json({ success: true });
} catch (err) {
res.status(500).json({ error: 'Server error', detail: String(err) });
}
}
