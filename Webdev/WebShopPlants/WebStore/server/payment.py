
import json
import os
import stripe
from flask import Flask
from flask import Flask, redirect
from database import Cart, Listing
#from main import app

# secret API key.

stripe.api_key = 'sk_test_51MsOHQCBgz531Eh0ItxnB2v6LJchTLrCwVQmhNas5fIwFeJBX6vozLe0zk7ktNc9QWwGtUWNjWEkvkrFFvehiAaQ00wFzdyThB'


def create_line_item(item):

    if (item.price < 3):
        price = 3
    else:
        price = item.price

    line_items = {
        'price_data': {
            'currency': 'sek',
            'product_data': {
                'name': item.title,
            },
            'unit_amount': price * 100,
        },
        'quantity': 1,
    }
    return line_items


def get_items_from_cart(listings):
    line_items = []
    for listing in listings:
        line_items.append(create_line_item(listing))
    return line_items


def create_checkout(user_id):
    cart = Cart.query.filter_by(userId=user_id).first()
    listings = Listing.query.filter_by(cartId=cart.id)

    session = stripe.checkout.Session.create(line_items=get_items_from_cart(listings),
                                             mode='payment',
                                             success_url='http://localhost:5001/success/' +
                                             str(user_id),
                                             cancel_url='http://localhost:5001/cancel',
                                             )

    return redirect(session.url, code=303)


if __name__ == '__main__':
    raise RuntimeError
