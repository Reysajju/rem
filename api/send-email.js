// api/send-email.js
import emailjs from 'emailjs';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Destructure the request body to get user inputs
        const { firstName, lastName, email: userEmail, eventType, eventDetails } = req.body;

        // Set up the email server connection using EmailJS
        const server = emailjs.server.connect({
            user: 'remproduction786@gmail.com', // Your Email
            password: 'hdjlbkossgahmqlq', // Your Email App Password
            host: 'smtp.gmail.com', // Your SMTP host
            ssl: true
        });

        // Prepare the message object
        const message = {
            text: `First Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${userEmail}\nEvent Type: ${eventType}\nEvent Details: ${eventDetails}`,
            from: userEmail, // User's email from the form
            to: 'remproduction786@gmail.com', // Your email address where you receive notifications
            subject: 'New Contact Us Form Submission'
        };

        // Send the email
        server.send(message, function (err) {
            if (err) {
                console.error('Failed to send email:', err); // Log the error for debugging
                return res.status(500).json({ error: 'Failed to send email' });
            }
            return res.status(200).json({ success: 'Message sent successfully!' });
        });
    } else {
        // Handle unsupported request methods
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
