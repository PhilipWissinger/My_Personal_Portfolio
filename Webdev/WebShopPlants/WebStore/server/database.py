
#####   Silje och Lovisa    ######

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    passwordHash = db.Column(db.String, nullable=False)

    listing = db.relationship('Listing', backref=db.backref(
        'seller', uselist=False), lazy=True, foreign_keys='Listing.sellerId')
    order = db.relationship('Listing', backref=db.backref(
        'buyer', uselist=False), lazy=True, foreign_keys='Listing.buyerId')
    cart = db.relationship('Cart', backref='user',
                           lazy=True, cascade='delete')

    def __repr__(self):
        return '<User {}: {} {}'.format(self.id, self.name, self.email)

    def serialize(self):
        return dict(id=self.id, name=self.name, email=self.email)

    def delete(self):
        Listing.query.filter_by(cartId=self.cart.id).update(
            {Listing.cartId: None})
        if bool(Listing.query.filter_by(buyerId=self.id)):
            Listing.query.filter_by(buyerId=self.id).update(
                {Listing.cartId: None})
        if bool(Listing.query.filter_by(sellerId=self.id)):
            Listing.query.filter_by(sellerId=self.id).update(
                {Listing.cartId: None})
        db.session.delete(self)
        db.session.commit()


class Plant(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    waterIndex = db.Column(db.Integer, nullable=True)
    sunIndex = db.Column(db.Integer, nullable=True)
    difficultyIndex = db.Column(db.Integer, nullable=True)
    sizeLarge = db.Column(db.Boolean, nullable=False)
    succulent = db.Column(db.Boolean, nullable=False)

    listing = db.relationship('Listing', backref='plant', lazy=True)

    def __repr__(self):
        return '<Plant {}: {} {} {} {}'.format(self.id, self.name, self.waterIndex, self.sunIndex, self.difficultyIndex, self.sizeLarge, self.succulent)

    def serialize(self):
        return dict(id=self.id, name=self.name, waterIndex=self.waterIndex, sunIndex=self.sunIndex, difficultyIndex=self.difficultyIndex, size=self.sizeLarge, succulent=self.succulent)


class Listing(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    publicationDate = db.Column(db.Date, nullable=False)
    # publicationDate = db.Column(db.DateTime, nullable=False) //Ska det va så ist?
    description = db.Column(db.String, nullable=False)
    currentListing = db.Column(db.Boolean, nullable=False)
    purchaseDate = db.Column(db.DateTime, nullable=True)
    color = db.Column(db.String, nullable=True)
    cutting = db.Column(db.Boolean, nullable=False)
    imagePath = db.Column(db.String, nullable=True)

    # Foreign keys
    plantId = db.Column(db.Integer, db.ForeignKey('plant.id'), nullable=False)
    sellerId = db.Column(db.Integer, db.ForeignKey(
        'user.id'), nullable=False)
    buyerId = db.Column(db.Integer, db.ForeignKey(
        'user.id'), nullable=True)
    cartId = db.Column(db.Integer, db.ForeignKey('cart.id'),
                       nullable=True)

    def __repr__(self):
        return '<Listing {}: {} {} {} {} {} {} {}'.format(self.id, self.title, self.price, self.publicationDate, self.description, self.currentListing, self.purchaseDate, self.color, self.imagePath, self.plantId, self.sellerId, self.cartId, self.cutting)

    def serialize(self):
        plant = Plant.query.get(self.plantId).serialize()
        seller = User.query.get(self.sellerId).serialize()
        cart = Cart.query.get(self.cartId)
        if cart == None:
            cart = None
        else:
            cart = cart.serialize()
        buyer = User.query.get(self.buyerId)
        if buyer == None:
            buyer = None
        else:
            buyer = buyer.serialize()
        return dict(id=self.id, title=self.title, price=self.price, publicationDate=self.publicationDate, description=self.description,
                    currentListing=self.currentListing, purchaseDate=self.purchaseDate, color=self.color, cutting=self.cutting, imagePath=self.imagePath, plant=plant, cart=cart, seller=seller, buyer=buyer)

    # def serializeOld(self):
    #     plant = Plant.query.get(self.plantId).serialize()
    #     return dict(id=self.id, title=self.title, currentListing=self.currentListing, publicationDate=self.publicationDate, purchaseDate=self.purchaseDate, imagePath=self.imagePath)


class Cart(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    numListings = db.Column(db.Integer, default=0, nullable=False)

    listing = db.relationship('Listing', backref='cart', lazy=True)

    # Foreign keys
    userId = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return '<Cart {}: {} {}'.format(self.id, self.numListings, self.userId)

    def serialize(self):
        user = User.query.get(self.userId)
        user = user.serialize()
        return dict(id=self.id, numListings=self.numListings, user=user)
