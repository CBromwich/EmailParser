from email_parse import FetchEmail
import imaplib

mail = FetchEmail("imap.gmail.com", "cody.bromwich@gmail.com", "bromwich1")

emails = mail.fetch_unread_messages()

"""
for i in emails:
    mail.save_attachment(i)
    
mail.close_connection()
"""

print emails
