// api/send-email.js
import emailjs from 'emailjs'; // Make sure this package is installed

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { firstName, lastName, email, eventType, eventDetails } = req.body;

        // Validate input data
        if (!firstName || !lastName || !email || !eventType || !eventDetails) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const server = emailjs.server.connect({
            user: 'remproduction786@gmail.com', // Your Email
            password: 'hdjlbkossgahmqlq', // Your Password
            host: 'smtp.gmail.com', // Your SMTP host
            ssl: true
        });

        const message = {
            text: `First Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\nEvent Type: ${eventType}\nEvent Details: ${eventDetails}`,
            from: email, // Use the user's email
            to: 'remproduction786@gmail.com', // Your email to receive the message
            subject: 'New Contact Us Form Submission'
        };

        server.send(message, function (err, message) {
            if (err) {
                console.error('Failed to send email:', err); // Log the error
                return res.status(500).json({ error: 'Failed to send email' });
            }
            return res.status(200).json({ success: 'Message sent successfully!' });
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
