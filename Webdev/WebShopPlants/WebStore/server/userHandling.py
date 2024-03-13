from main import User, bcrypt
from flask import jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, get_jwt_identity, JWTManager
from database import User, Cart, db


def login_login():  # Johan
    if request.method == 'POST':
        input_email = request.get_json().get('email')
        input_password = request.get_json().get('password')
        if (bool(User.query.filter_by(email=input_email).first())):
            user = User.query.filter_by(email=input_email).first()
            if (bcrypt.check_password_hash(user.passwordHash, input_password)):
                token = create_access_token(identity=user.id)
                return jsonify(token=token, user=User.serialize(user))
            else:
                return '1', 401
        else:
            return str(User.query.filter_by(email=input_email).first()), 401


def login_signup():  # Johan
    if request.method == 'POST':
        salt_rounds = 12
        data = request.get_json()
        user = User(name=data['name'],
                    email=data['email'],
                    passwordHash=bcrypt.generate_password_hash(data['password'], salt_rounds))

        input_email = request.get_json().get('email')
        if bool(User.query.filter_by(email=input_email).first()):
            return str(type(User.query.filter_by(email=input_email).first())), 409
        db.session.add(user)
        db.session.commit()
        if create_cart(user.id):
            token = create_access_token(identity=user.id)
            return jsonify(token=token, user=User.serialize(user))
        return 'could not create cart', 404
    return "no post call", 404


def create_cart(ID):  # Johan
    if request.method == 'POST':
        cart = Cart(numListings=0, userId=ID)
        db.session.add(cart)
        db.session.commit()
        return True  # could create cart
    return False


def delete_one_account():  # Johan
    if request.method == 'DELETE':
        # db.session.close_all()
        email = request.get_json().get('email')
        user = User.query.filter_by(email=email).first()

        if not bool(user):
            return '', 404
        local_object = db.session.merge(user)  # mergar alchemy sessions
        db.session.delete(local_object)
        # db.session.delete(user)
        db.session.commit()
        db.session.close()
        return '', 200


def editMyPage():  # Olof -- Viktigt att enbart skicka in den man ändrat.
    user_id = User.query.get(get_jwt_identity()).id
    if request.method == 'GET':
        return jsonify(User.serialize(User.query.get_or_404(user_id)))
    elif request.method == 'PUT':
        user = User.query.get_or_404(user_id)
        if request.get_json().get('name') != None:
            new_name = request.get_json().get('name')
            if User.query.filter_by(name=new_name).first() != None:
                return 'Name already exists', 409
            user.name = new_name
        if request.get_json().get('email') != None:
            new_email = request.get_json().get('email')
            if User.query.filter_by(email=new_email).first() != None:
                return 'Email already exists', 409
            user.email = new_email
        db.session.commit()
        return jsonify(user=User.serialize(user))
    elif request.method == 'DELETE':
        cart = Cart.query.filter_by(
            userId=User.query.get(get_jwt_identity()).id).first()
        db.session.delete(User.query.get_or_404(user_id))
        db.session.commit()
        return '', 200
