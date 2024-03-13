from flask import request, redirect, jsonify
import datetime
import time


def message():
    name = request.form.get('inputName')
    email = request.form.get('inputEmail')
    message = request.form.get('inputMessage')
    with open('receivedMessages.txt', 'a') as file:
        file.write("Received " + str(datetime.datetime.now()) + "\n"
                   "Name: " + name + "\n"
                   "Email: " + email + "\n"
                   "Message: " + message + "\n\n")
    return jsonify({'succes': True})


def saveMessage():
    if request.method == 'POST':
        if "submit" in request.form:
            return message()
