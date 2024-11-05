from flask import Flask, render_template, request, redirect, url_for, flash
from flask_mail import Mail, Message
import os

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Change this to a random secret key

# Configure Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # Replace with your mail server
app.config['MAIL_PORT'] = 587  # Common SMTP port
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'remproduction786@gmail.com'  # Your email
app.config['MAIL_PASSWORD'] = 'hdjlbkossgahmqlq'  # Your email password
app.config['MAIL_DEFAULT_SENDER'] = 'remproduction786@gmail.com'  # Default sender email

mail = Mail(app)

@app.route('/')
def home():
    return render_template('contact_form.html')

@app.route('/send', methods=['POST'])
def send_email():
    first_name = request.form['firstName']
    last_name = request.form['lastName']
    email = request.form['email']
    event_type = request.form['eventType']
    event_details = request.form['eventDetails']

    msg = Message('New Contact Form Submission', recipients=['sajjadr742@gmail.com', email])  # Admin email
    msg.body = f'''
    New contact form submission:

    First Name: {first_name}
    Last Name: {last_name}
    Email: {email}
    Event Type: {event_type}
    Event Details: {event_details}
    '''
    
    try:
        mail.send(msg)
        flash('Message sent successfully!', 'success')
    except Exception as e:
        flash('Message could not be sent. Please try again later.', 'error')
        print(e)  # Print error to console for debugging

    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)
