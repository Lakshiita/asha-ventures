# backend_flask/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)
CORS(app)

SENDER_EMAIL = "kongheyd@rknec.edu"     # Replace with your Gmail address
SENDER_PASSWORD = "wpay zkbb otrs ssar"     # Replace with your Gmail App Password
RECEIVER_EMAIL = "kongheyd@rknec.edu"     # Email to receive notifications

@app.route('/subscribe', methods=['POST'])
def subscribe():
    data = request.get_json()
    user_email = data.get('email')

    if not user_email:
        return jsonify({'error': 'Email is required'}), 400

    # Email Content
    subject = "New Newsletter Subscription"
    body = f"Hello Asha Ventures,\n\nThe {user_email} of the user has subscribed to our newsletter."

    # Build MIME Email
    msg = MIMEMultipart()
    msg['From'] = SENDER_EMAIL
    msg['To'] = RECEIVER_EMAIL
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    try:
        # Send email using Gmail SMTP
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(SENDER_EMAIL, SENDER_PASSWORD)
            server.send_message(msg)

        return jsonify({'message': 'Email sent successfully!'}), 200

    except Exception as e:
        print("Error sending email:", e)
        return jsonify({'error': 'Failed to send email'}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
