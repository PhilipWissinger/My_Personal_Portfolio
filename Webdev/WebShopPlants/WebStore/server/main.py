#!/usr/bin/env python3
import os
from flask import Flask, jsonify, redirect
from flask_sqlalchemy import SQLAlchemy
from payment import create_checkout
from flask_jwt_extended import jwt_required, create_access_token, JWTManager
from flask_bcrypt import Bcrypt
import listingHandling
from database import db, Listing, User, Plant, Cart
from werkzeug.utils import secure_filename
from werkzeug.exceptions import RequestEntityTooLarge
import userHandling
import contact
from datetime import timedelta

app = Flask(__name__, static_folder='../client', static_url_path='/')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = "hardAttGuessa97531"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

db.init_app(app)

bcrypt = Bcrypt(app)
jwt = JWTManager(app)
website = "http://localhost:5001/"


@app.route("/")
def home():
    return app.send_static_file("html/client.html")


@app.route("/upload", methods=["POST"])
@jwt_required()
def upload():
    return listingHandling.createListing()


# (lovisa)
# GET-funktion som tar emot data om vilka filter som är aktiverade och returnerar
# de listings som uppfyller de filtrena (skicka True om filtret är aktiverat, annars False)
@app.route("/filter", methods=['POST'])
def mainFilter():
    return listingHandling.filter()


@app.route('/create-checkout-session/<int:user_id>', methods=['POST'])
def make_payment(user_id):
    return create_checkout(user_id)


@app.route('/success/<int:user_id>')
def sucessfull_payment(user_id):
    listingHandling.add_buyer_to_listing(user_id)
    return redirect(website)


@app.route('/cancel')
def cancel_payment():
    return redirect(website)


# lovisa
@app.route('/category', methods=['POST'])
def mainGetCategory():
    return listingHandling.getCategory()


@app.route('/login', methods=['POST'])
def userlogin():
    return userHandling.login_login()


@app.route('/sign-up', methods=['POST'])
def signup():
    return userHandling.login_signup()


@app.route('/login', methods=['DELETE'])
def delete_account():
    return userHandling.delete_one_account()


@app.route('/cart', methods=['GET'])  # Olof
@jwt_required()
def maingetCartListings():
    return listingHandling.getCartListings()


@app.route('/cart/<int:listing_id>', methods=['GET', 'DELETE', 'PUT'])  # Olof
@jwt_required()
def mainGetCartListing(listing_id):
    return listingHandling.getCartListing(listing_id)


@app.route('/mypage/edit', methods=['GET', 'DELETE', 'PUT'])  # Olof
@jwt_required()
def mainEditMyPage():
    return userHandling.editMyPage()


@app.route('/listing', methods=['GET'])  # Silje
def mainGetCurrentListings():
    return listingHandling.getCurrentListings()


@app.route('/my-items', methods=['GET'])  # Silje
@jwt_required()
def mainGetMyItems():
    return listingHandling.getMyItems()


@app.route('/listing', methods=['POST'])  # Silje
# @jwt_required()
def mainCreateListing():
    print("called listing")
    return listingHandling.createListing()


# Silje
@app.route('/listing/<int:listingId>', methods=['GET', 'PUT', 'DELETE'])
@jwt_required()
def mainEditListing(listingId):
    return listingHandling.editListing(listingId)


@app.route('/plants')
def getplants():
    all_plants = Plant.query.all()
    plant_data = [{'id': plant.id, 'name': plant.name} for plant in all_plants]
    return jsonify(plant_data)


@app.route("/contact-us", methods=['POST'])
def mainSaveMessage():
    return contact.message()


if __name__ == "__main__":
    app.run(port=5001, debug=True)  # På MacOS, byt till 5001 eller dylikt
