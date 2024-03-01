import random
import math
from django.core.mail import send_mail
import os
from dotenv import load_dotenv
load_dotenv()

# generate random username for signups
def generateRandomName(name):
    new_name = "".join(name.split(" "))
    for i in range(4):
        new_name += str(math.floor(random.random() * 11))
    return new_name

# generate verification code
def generateVC():
    pass

# send emails upon signup
def sendEmail(email, name, vc):
    try:
        subject = 'Verification Code from Rate My Job'
        message = f"Hi {name}! Thank you for creating your Rate my Job account! Your verification code is {vc}."
        from_email = os.getenv("HOST_EMAIL")
        recipient_list = [email]
        send_mail(subject, message, from_email, recipient_list)

        return True
    except:
        return False