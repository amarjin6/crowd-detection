import os
import smtplib
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
from decouple import config


def send():
    sender = config('LOGIN')
    password = config('PASSWORD')

    ImgFileName = 'greeting.png'
    with open(ImgFileName, 'rb') as f:
        img_data = f.read()

    msg = MIMEMultipart()
    msg['Subject'] = 'VegasML Team: Getting started!'
    msg['From'] = sender
    msg['To'] = 'example@gmail.com'

    with open('mail.txt', 'r') as ff:
        ss = ff.readlines()

    message = ''
    for s in ss:
        message += s

    text = MIMEText(message)
    msg.attach(text)
    image = MIMEImage(img_data, name=os.path.basename(ImgFileName))
    msg.attach(image)

    s = smtplib.SMTP('smtp.gmail.com', 587)
    s.ehlo()
    s.starttls()
    s.ehlo()
    s.login(sender, password)
    s.sendmail(sender, msg['To'], msg.as_string())
    s.quit()


if __name__ == '__main__':
    send()
