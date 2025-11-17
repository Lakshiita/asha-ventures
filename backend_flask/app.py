from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from openpyxl import Workbook, load_workbook

app = Flask(__name__)
CORS(app)

# ------------------ CONFIGURATION ------------------
SENDER_EMAIL = "kongheyd@rknec.edu"        # Gmail sender
SENDER_PASSWORD = "wpay zkbb otrs ssar"    # Gmail App Password
RECEIVER_EMAIL = "kongheyd@rknec.edu"      # Where notifications go

# (Kept from your original file — not used by /contact but left intact)
EXCEL_FILE = "subscribed_emails.xlsx"
SHEET_NAME = "Sheet1"
COLUMN_NAME = "Subscribed_Emails"
# ---------------------------------------------------

def ensure_excel_exists():
    if not os.path.exists(EXCEL_FILE):
        wb = Workbook()
        ws = wb.active
        ws.title = SHEET_NAME
        ws.append([COLUMN_NAME])
        wb.save(EXCEL_FILE)

def is_duplicate_email(email):
    wb = load_workbook(EXCEL_FILE)
    ws = wb[SHEET_NAME]
    for row in ws.iter_rows(min_row=2, values_only=True):
        if row[0] and row[0].strip().lower() == email.strip().lower():
            wb.close()
            return True
    wb.close()
    return False

def add_email_to_excel(email):
    ensure_excel_exists()
    if not is_duplicate_email(email):
        wb = load_workbook(EXCEL_FILE)
        ws = wb[SHEET_NAME]
        ws.append([email])
        wb.save(EXCEL_FILE)
        wb.close()
        return True
    return False

# ---------------- CONTACT: Send email on button click ----------------
@app.route('/contact', methods=['POST'])
def contact():
    """
    Expects JSON: { "name": "...", "email": "...", "message": "..." }
    Sends an email immediately with the format:
    " Hello Asha ventures, {name} with Email id {email} has Contacted for {message}."
    """
    data = request.get_json(silent=True) or {}
    name = (data.get('name') or '').strip()
    email = (data.get('email') or '').strip()
    message = (data.get('message') or '').strip()

    if not name or not email or not message:
        return jsonify({'error': 'name, email and message are required'}), 400

    subject = "New Contact Message"
    # Exact content shape as requested (leading space preserved)
    body = f" Hello Asha ventures, {name} with Email id {email} has Contacted for {message}."

    msg = MIMEMultipart()
    msg['From'] = SENDER_EMAIL
    msg['To'] = RECEIVER_EMAIL
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    try:
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(SENDER_EMAIL, SENDER_PASSWORD)
            server.send_message(msg)
    except Exception as e:
        print("Error sending email:", e)
        return jsonify({'error': 'Failed to send email'}), 500

    return jsonify({'message': 'Message delivered via email successfully'}), 200

# ---------------- (Kept) Newsletter subscribe endpoint ----------------
@app.route('/subscribe', methods=['POST'])
def subscribe():
    data = request.get_json()
    user_email = data.get('email')

    if not user_email:
        return jsonify({'error': 'Email is required'}), 400

    ensure_excel_exists()

    subject = "New Newsletter Subscription"
    body = f"Hello Asha Ventures,\n\nThe {user_email} has subscribed to our newsletter."

    msg = MIMEMultipart()
    msg['From'] = SENDER_EMAIL
    msg['To'] = RECEIVER_EMAIL
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    try:
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(SENDER_EMAIL, SENDER_PASSWORD)
            server.send_message(msg)
    except Exception as e:
        print("Error sending email:", e)
        return jsonify({'error': 'Failed to send email'}), 500

    added = add_email_to_excel(user_email)
    if not added:
        return jsonify({'message': 'Email already exists in the subscriber list'}), 200

    return jsonify({'message': 'Email sent and added to Excel successfully'}), 200


if __name__ == '__main__':
    # Adjust host/port as you need
    app.run(host='0.0.0.0', port=5000, debug=True)
