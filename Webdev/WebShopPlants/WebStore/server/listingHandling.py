from flask import Flask, request
import datetime
import os
from database import db, Listing, User, Plant, Cart
from flask_jwt_extended import JWTManager
from flask_jwt_extended import get_jwt_identity
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from flask import jsonify
from werkzeug.utils import secure_filename
import base64


# - OLOF - ## Returnerar en lista på Usern's listings som den har i sin cart
# @app.route('/cart', methods=['GET'])
def getCartListings():
    if request.method == 'GET':
        cart = Cart.query.filter_by(
            userId=User.query.get(get_jwt_identity()).id).first()
        if not cart:
            return jsonify(articles=[])
        listings = Listing.query.filter_by(
            cartId=cart.id)
        listing_list = [Listing.serialize(i) for i in listings]
        return jsonify(articles=listing_list)


# - OLOF - ## Returnerar Usern's listings som den har i sin cart
# @app.route('/cart/<int:listing_id>', methods=['GET', 'DELETE', 'PUT'])
def getCartListing(listing_id):
    cart = Cart.query.filter_by(
        userId=User.query.get(get_jwt_identity()).id).first()

    if request.method == 'GET':
        if not cart:
            return jsonify(articles=[])
        listings = Listing.query.filter_by(
            cartId=cart.id)
        listing_list = [Listing.serialize(i)
                        for i in listings if i.id == listing_id]
        return jsonify(articles=listing_list), 200

    elif request.method == 'DELETE':
        listing = Listing.query.get(listing_id)
        if listing.cartId == cart.id:
            listing.cartId = 0
            cart.numListings -= 1
            db.session.commit()
            listings = Listing.query.filter_by(
                cartId=cart.id)
            listing_list = [Listing.serialize(i) for i in listings]
            return jsonify(articles=listing_list)
        else:
            return '', 404

    elif request.method == 'PUT':
        listing = Listing.query.get(listing_id)
        if listing.cartId == 0 or listing.cartId == None:
            listing.cartId = cart.id
            cart.numListings += 1
            db.session.commit()
            return jsonify(cart.numListings), 200
        else:
            return '', 404


# (lovisa)
def filter():
    if request.method == "POST":
        # water filter
        if request.get_json().get('waterFilterLow') == True:
            waterFilteredLow = Plant.query.filter(
                Plant.waterIndex == 1)
        else:
            waterFilteredLow = Plant.query.filter_by(id=None)
        if request.get_json().get('waterFilterMedium') == True:
            waterFilteredMedium = Plant.query.filter(
                Plant.waterIndex == 2)
        else:
            waterFilteredMedium = Plant.query.filter_by(id=None)
        if request.get_json().get('waterFilterHigh') == True:
            waterFilteredHigh = Plant.query.filter(
                Plant.waterIndex == 3)
        else:
            waterFilteredHigh = Plant.query.filter_by(id=None)

        if request.get_json().get('waterFilterLow') == False and request.get_json().get('waterFilterMedium') == False and request.get_json().get('waterFilterHigh') == False:
            waterFiltered = Plant.query
        else:
            waterFiltered = waterFilteredLow.union(
                waterFilteredMedium).union(waterFilteredHigh)

        # sun filter
        if request.get_json().get('sunFilterLow') == True:
            sunFilteredLow = Plant.query.filter(
                Plant.sunIndex == 1)
        else:
            sunFilteredLow = Plant.query.filter_by(id=None)
        if request.get_json().get('sunFilterMedium') == True:
            sunFilteredMedium = Plant.query.filter(
                Plant.sunIndex == 2)
        else:
            sunFilteredMedium = Plant.query.filter_by(id=None)
        if request.get_json().get('sunFilterHigh') == True:
            sunFilteredHigh = Plant.query.filter(
                Plant.sunIndex == 3)
        else:
            sunFilteredHigh = Plant.query.filter_by(id=None)

        if request.get_json().get('sunFilterLow') == False and request.get_json().get('sunFilterMedium') == False and request.get_json().get('sunFilterHigh') == False:
            sunFiltered = Plant.query
        else:
            sunFiltered = sunFilteredLow.union(
                sunFilteredMedium).union(sunFilteredHigh)

        # difficulty filter
        if request.get_json().get('difficultyFilterLow') == True:
            difficultyFilteredLow = Plant.query.filter(
                Plant.difficultyIndex == 1)
        else:
            difficultyFilteredLow = Plant.query.filter_by(id=None)
        if request.get_json().get('difficultyFilterMedium') == True:
            difficultyFilteredMedium = Plant.query.filter(
                Plant.difficultyIndex == 2)
        else:
            difficultyFilteredMedium = Plant.query.filter_by(id=None)
        if request.get_json().get('difficultyFilterHigh') == True:
            difficultyFilteredHigh = Plant.query.filter(
                Plant.difficultyIndex == 3)
        else:
            difficultyFilteredHigh = Plant.query.filter_by(id=None)

        if request.get_json().get('difficultyFilterLow') == False and request.get_json().get('difficultyFilterMedium') == False and request.get_json().get('difficultyFilterHigh') == False:
            difficultyFiltered = Plant.query
        else:
            difficultyFiltered = difficultyFilteredLow.union(
                difficultyFilteredMedium).union(difficultyFilteredHigh)

        allFiltered = waterFiltered.intersect(
            sunFiltered).intersect(difficultyFiltered)

        allFilteredSubquery = allFiltered.with_entities(Plant.id).subquery()

        lowerBound = request.get_json().get('lowerPrice')
        upperBound = request.get_json().get('upperPrice')

        if lowerBound == None or lowerBound == False:
            lowerBound = 0
        if upperBound == None or upperBound == False:
            upperBound = db.session.query(func.max(Listing.price)).scalar()

        listing = Listing.query.filter(
            Listing.plantId.in_(allFilteredSubquery), (Listing.price >= lowerBound), (Listing.price <= upperBound)).all()

        returnList = [Listing.serialize(l) for l in listing]

        return jsonify(listings=returnList)


# lovisa
def getCategory():
    if request.method == 'POST':
        if request.get_json().get('category') == "bigPlants":
            filter = Plant.query.filter(Plant.sizeLarge == True)
            filter = filter.with_entities(Plant.id).subquery()
            listing = Listing.query.filter(Listing.plantId.in_(filter)).all()
        elif request.get_json().get('category') == "smallPlants":
            filter = Plant.query.filter(Plant.sizeLarge == False)
            filter = filter.with_entities(Plant.id).subquery()
            listing = Listing.query.filter(Listing.plantId.in_(filter)).all()
        elif request.get_json().get('category') == "succulents":
            filter = Plant.query.filter(Plant.succulent == True)
            filter = filter.with_entities(Plant.id).subquery()
            listing = Listing.query.filter(Listing.plantId.in_(filter)).all()
        elif request.get_json().get('category') == "cuttings":
            listing = Listing.query.filter(Listing.cutting == True).all()

        returnList = [Listing.serialize(l) for l in listing]

        return jsonify(listings=returnList)


def getCurrentListings():  # Silje, returnerar alla current listings
    if request.method == 'GET':
        listings = Listing.query.filter_by(currentListing=True)
        listing_list = [Listing.serialize(listing) for listing in listings]
        return jsonify(listings=listing_list)


def getMyItems():  # Silje, returnerar gamla ordrar och listings
    if request.method == 'GET':
        user = User.query.get(get_jwt_identity())
        oldlistings = Listing.query.filter_by(
            currentListing=False, sellerId=user.id)
        oldlisting_list = [Listing.serialize(l) for l in oldlistings]
        myCurrentListings = Listing.query.filter_by(
            currentListing=True, sellerId=user.id)
        myCurrentListing_list = [
            Listing.serialize(l) for l in myCurrentListings]
        oldOrders = Listing.query.filter_by(
            currentListing=False, buyerId=user.id)
        oldOrder_list = [Listing.serialize(l) for l in oldOrders]
        return jsonify(myOldListings=oldlisting_list, myCurrentListings=myCurrentListing_list, oldOrders=oldOrder_list)


def createListing():
    user = User.query.get(get_jwt_identity())
    UPLOAD_DIRECTORY = '../client/uploads/'
    ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.JPEG', '.png']
    MAX_CONTENT_LENGTH = 16*1024*1024  # (16MB)

    try:
        file = request.files['image-upload']

        if file.content_length > MAX_CONTENT_LENGTH:
            return jsonify({'error': 'Image too large'})

        if not os.path.exists(UPLOAD_DIRECTORY):
            os.makedirs(UPLOAD_DIRECTORY)

        extension = os.path.splitext(file.filename)[1]
        print(extension)
        if extension not in ALLOWED_EXTENSIONS:
            return jsonify({'error': 'Not an allowed input file - it has to be an image of type .jpg, .jpeg, or .png'})

        filename = file.filename
        file.save(os.path.join(UPLOAD_DIRECTORY, secure_filename(filename)))
        imagePath = os.path.join('uploads/', secure_filename(filename))
    except:
        imagePath = None
        print("ingen bild laddades upp")

    listing = Listing(
        title=request.form.get('title'),
        price=request.form.get('price'),
        publicationDate=datetime.datetime.now().date(),
        description=request.form.get('description'),
        currentListing=True,
        color=request.form.get('color'),
        cutting=bool(request.form.get('cutting')),
        imagePath=imagePath,
        sellerId=user.id,
        plantId=request.form.get('plantId')
    )
    db.session.add(listing)
    db.session.commit()

    return jsonify({'success': True})


def editListing(listingId):  # Silje, hämta, ändra eller deleta en specifik listing
    if request.method == 'GET':
        return jsonify(Listing.serialize(Listing.query.get_or_404(listingId)))

    elif request.method == 'DELETE':
        db.session.delete(Listing.query.get_or_404(listingId))
        db.session.commit()
        return 'listing deleted', 200

    elif request.method == 'PUT':
        if (bool(Listing.query.filter_by(id=listingId).first())):
            listing = db.session.get(Listing, listingId)
            if (request.get_json().get('title') != None):
                listing.title = request.get_json().get('title')
            if (request.get_json().get('price') != None):
                listing.price = request.get_json().get('price')
            if (request.get_json().get('description') != None):
                listing.description = request.get_json().get('description')
            if (request.get_json().get('currentListing') != None):
                listing.currentListing = request.get_json().get('currentListing')
            if (request.get_json().get('color') != None):
                listing.color = request.get_json().get('color')
            if (request.get_json().get('sellerId') != None):
                listing.sellerId = request.get_json().get('sellerId')
            if (request.get_json().get('buyerId') != None):
                listing.buyerId = request.get_json().get('buyerId')
            db.session.commit()

        return jsonify(Listing.serialize(Listing.query.get_or_404(listingId)))


def add_buyer_to_listing(user_id):
    cart = Cart.query.filter_by(userId=user_id).first()
    listings = Listing.query.filter_by(cartId=cart.id)

    for listing in listings:
        listing.buyerId = user_id
        listing.purchaseDate = datetime.datetime.now().date()
        listing.currentListing = False
        listing.cartId = None
        db.session.commit()
