const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // 1. Send notification to the Site Owner
    const msgToOwner = {
      to: 'kenscalilab@gmail.com', // Replace with your verified sender or target email
      from: 'kenscalilab@gmail.com', // MUST be a verified sender in SendGrid
      subject: `🔥 New Lead: ${name} (Aesthetic Blueprint)`,
      text: `You have a new lead!\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nThis lead has consented to be contacted for 1-on-1 coaching.`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #1e40af;">🔥 New Blueprint Lead</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <hr>
          <p style="font-size: 0.8rem; color: #666;">This lead has consented to receive coaching offers and the blueprint guide.</p>
        </div>
      `,
    };

    // 2. (Optional) Send automated welcome email to the Lead
    const msgToLead = {
      to: email,
      from: 'kenscalilab@gmail.com',
      subject: 'Your Aesthetic Strength Blueprint is here!',
      text: `Hi ${name},\n\nThank you for downloading the Aesthetic Strength Blueprint. You can download it directly here: https://${req.headers.host}/blueprint.pdf\n\nI will be in touch shortly to see how I can help you reach your goals.\n\nBest,\nKen`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2 style="color: #1e40af;">Your Blueprint is Ready!</h2>
          <p>Hi ${name},</p>
          <p>Thank you for taking the first step towards elite performance. You can download your guide using the button below:</p>
          <a href="https://${req.headers.host}/blueprint.pdf" style="display: inline-block; padding: 10px 20px; background: #1e40af; color: white; text-decoration: none; border-radius: 5px;">Download PDF</a>
          <p>Keep training hard,</p>
          <strong>Ken - Aesthetic Strength Coaching</strong>
        </div>
      `,
    };

    await Promise.all([
      sgMail.send(msgToOwner),
      sgMail.send(msgToLead)
    ]);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('SendGrid Error:', error);
    if (error.response) {
      console.error(error.response.body);
    }
    return res.status(500).json({ error: 'Failed to process lead' });
  }
}
