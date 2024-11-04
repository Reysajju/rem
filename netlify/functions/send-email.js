const nodemailer = require("nodemailer");

exports.handler = async (event) => {
    const { firstName, lastName, email, eventType, eventDetails } = JSON.parse(event.body);

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: email,
        to: "remproduction786@gmail.com",
        subject: `New Message from ${firstName} ${lastName} regarding ${eventType}`,
        text: `Message Details:\n\nEvent Type: ${eventType}\nEvent Details: ${eventDetails}\n\nFrom: ${firstName} ${lastName} (${email})`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Message sent successfully!" }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Failed to send message." }),
        };
    }
};
