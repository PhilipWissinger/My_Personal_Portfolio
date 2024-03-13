from database import db, User, Listing, Plant, Cart
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

with app.app_context():
    db.drop_all()
    db.create_all()

    ## Users ##
    db.session.add(
        User(name="Test", email="test@mail.com", passwordHash="test"))
    db.session.add(
        User(name="Användare", email="anvandare@mail.com", passwordHash="anvandare"))

    db.session.add(User(name="Silje", email="mail@mail.se",
                   passwordHash="$2b$12$O4vVurVMp9J0Fr.Z9tJ8Fea9DCckwdqRRyokmcgiSAy6IckffPUd2"))  # lösenord silje

    # Cart ## Bör skapas automatiskt när en user skapas sen
    db.session.add(Cart(userId=1))
    db.session.add(Cart(userId=2))
    db.session.add(Cart(userId=3))

    ## Plants ##
    db.session.add(Plant(name="elefantöra", waterIndex=2,
                   sunIndex=2, difficultyIndex=1, sizeLarge=False, succulent=False))
    db.session.add(Plant(name="ros", waterIndex=3,
                   sunIndex=3, difficultyIndex=3, sizeLarge=False, succulent=False))
    db.session.add(Plant(name="taklök", waterIndex=1,
                   sunIndex=2, difficultyIndex=1, sizeLarge=False, succulent=True))
    db.session.add(Plant(name="kaktus", waterIndex=1,
                   sunIndex=2, difficultyIndex=1, sizeLarge=False, succulent=True))
    db.session.add(Plant(name="orchide", waterIndex=2,
                   sunIndex=2, difficultyIndex=2, sizeLarge=False, succulent=False))
    db.session.add(Plant(name="palettblad", waterIndex=2,
                   sunIndex=3, difficultyIndex=1, sizeLarge=False, succulent=False))
    db.session.add(Plant(name="palm", waterIndex=3,
                   sunIndex=2, difficultyIndex=3, sizeLarge=True, succulent=False))
    db.session.add(Plant(name="pelargon", waterIndex=2,
                   sunIndex=3, difficultyIndex=2, sizeLarge=False, succulent=False))
    db.session.add(Plant(name="calathea", waterIndex=2,
                   sunIndex=2, difficultyIndex=3, sizeLarge=False, succulent=False))
    db.session.add(Plant(name="monstera", waterIndex=3,
                   sunIndex=2, difficultyIndex=2, sizeLarge=True, succulent=False))
    db.session.add(Plant(name="fikon", waterIndex=3,
                   sunIndex=2, difficultyIndex=1, sizeLarge=True, succulent=False))
    db.session.add(Plant(name="citrusträd", waterIndex=2,
                   sunIndex=3, difficultyIndex=3, sizeLarge=True, succulent=False))
    db.session.add(Plant(name="Plastblomma", waterIndex=1, sunIndex=1,
                   difficultyIndex=1, sizeLarge=False, succulent=False))
    db.session.add(Plant(name="svärmorstunga", waterIndex=1,
                         sunIndex=2, difficultyIndex=1, sizeLarge=True, succulent=False))
    db.session.add(Plant(name="chiliplanta", waterIndex=3,
                         sunIndex=3, difficultyIndex=2, sizeLarge=False, succulent=False))

    ## Listings ##
    db.session.add(Listing(title="Elefantöra stickling säljes", price=50,
                           publicationDate=datetime.datetime.now().date(), description="Denna fina stickling av typen elefantöra letar nytt hem. Den är några veckor gammal och har fått fina rötter.", currentListing=True, cutting=True, plantId=1, sellerId=1, imagePath="uploads/plant6.jpg"))
    db.session.add(Listing(title="Fin monstera", price=100,
                           publicationDate=datetime.datetime.now().date(), description="Säljer min fina monstera på grund av flytt. Innerkruka finns och följer med, observera att ytterkrukan på bilden ej följer med.", currentListing=True, cutting=False, plantId=10, sellerId=3, color="grön", imagePath="uploads/monstera.jpg"))
    db.session.add(Listing(title="Säljer soligt citrusträd", price=200,
                           publicationDate=datetime.datetime.now().date(), description="Säljer ett litet citrusträd, ca 50cm högt.", currentListing=True, cutting=False, plantId=12, sellerId=3, imagePath="uploads/citrus_tree.jpg"))
    db.session.add(Listing(title="Stickling bytes", price=0,
                           publicationDate=datetime.datetime.now().date(), description="Jag vill byta min palettbladsstickling mot annan lättskött stickling.", currentListing=True, cutting=True, plantId=6, sellerId=3, color="grön", imagePath="uploads/stickling.jpg"))
    db.session.add(Listing(title="Kaktus bortskänkes", price=0,
                           publicationDate=datetime.datetime.now().date(), description="Fin kaktus, ca 10cm hög. Gratis för den som kommer och hämtar annars tillkommer frakt.", currentListing=True, cutting=False, plantId=4, sellerId=3, imagePath="uploads/cactus2.jpg"))
    db.session.add(Listing(title="Pelargon stickling", price=70,
                           publicationDate=datetime.datetime.now().date(), description="Säljer en stickling från min pelargon, den är lätt att sköta och doftar gott.", currentListing=True, cutting=True, plantId=8, sellerId=3, color="röd", imagePath="uploads/pelargon.jpg"))
    db.session.add(Listing(title="Vit orchide", price=105,
                           publicationDate=datetime.datetime.now().date(), description="En mycket frisk och fin orchide", currentListing=True, cutting=False, plantId=5, sellerId=1, color="vit", imagePath="uploads/white_orchid.jpg"))
    db.session.add(Listing(title="Taklök stickling", price=65,
                           publicationDate=datetime.datetime.now().date(), description="Har fått en stickling från min fina taklök som jag vill bli av med", currentListing=True, cutting=True, plantId=3, sellerId=1, imagePath="uploads/taklok.jpg"))
    db.session.add(Listing(title="Badrumspalm", price=250,
                           publicationDate=datetime.datetime.now().date(), description="Den här fina palmen ger ditt rum en tropisk känsla. Den trivs bäst i lite varmare och fuktigare klimat, vilket gör den optimal för badrummet.", currentListing=True, cutting=False, plantId=7, sellerId=1, color="grön", imagePath="uploads/palm.jpg"))
    db.session.add(Listing(title="Vacker ros", price=45,
                           publicationDate=datetime.datetime.now().date(), description="Säljer en rös ros, den är lätt att sköta och doftar gott.", currentListing=True, cutting=False, plantId=2, sellerId=1, color="röd", imagePath="uploads/red_rose.jpg"))
    db.session.add(Listing(title="Säljer min orchide", price=50,
                           publicationDate=datetime.datetime.now().date(), description="En jättefin orchide, 1 år gammal", currentListing=True, cutting=False, plantId=5, sellerId=1, color="lila", imagePath="uploads/purple_orchide.jpg"))
    db.session.add(Listing(title="Palmväxt", price=100,
                           publicationDate=datetime.datetime.now().date(), description="Säljer min palmväxt, ca 2 år gammal, 1 meter hög", currentListing=True, cutting=False, plantId=10, sellerId=2, color="grön", imagePath="uploads/palm_tree.jpg"))
    db.session.add(Listing(title="Calathea", price=200,
                           publicationDate=datetime.datetime.now().date(), description="En vanlig Calathea, välskött.", currentListing=True, cutting=False, plantId=9, sellerId=1, imagePath="uploads/calathea.jpg"))
    db.session.add(Listing(title="Monstera-Stickling", price=0,
                           publicationDate=datetime.datetime.now().date(), description="Säljer sticklingar från den här vackra monsteran", currentListing=True, cutting=True, plantId=6, sellerId=2, color="grön", imagePath="uploads/monstera_cutting.jpg"))
    db.session.add(Listing(title="Kaktus bortskänkes", price=0,
                           publicationDate=datetime.datetime.now().date(), description="Säljer en kaktus", currentListing=True, cutting=False, plantId=4, sellerId=2, imagePath="uploads/cactus.jpg"))
    db.session.add(Listing(title="Pelargon", price=70,
                           publicationDate=datetime.datetime.now().date(), description="Säljer min pelargon, den är lätt att sköta och doftar gott.",  currentListing=True, cutting=False, plantId=8, sellerId=1, color="röd", imagePath="uploads/pelargon.jpg"))
    db.session.add(Listing(title="Snygg blomma i plast säljes", price=20, publicationDate=datetime.datetime.now(
    ), description="Säljer denna plastblomma pga att min mor anser att jag bör skaffa mig en riktig växt. Ser väldigt verklig ut", currentListing=True, cutting=False, plantId=13, sellerId=2, color="grön", imagePath="uploads/plastblomma.jpg"))
    db.session.add(Listing(title="Stilig kaktus i kaffekopp", price=150, publicationDate=datetime.datetime.now(
    ), description="Denna lilla och ståtliga kaktus är en riktig blickfångare och ger en touch av öken till vilket rum den än placeras i. Den kommer i en kaffekopp men akta er från att försöka dricka den", currentListing=True, cutting=False, plantId=4, sellerId=2, color="grön", imagePath="uploads/finkaktus.jpg"))
    db.session.add(Listing(title="Svärmorstunga", price=100,
                           publicationDate=datetime.datetime.now().date(), description="Har för många svärmorstungor så vill gärna bli av med denna. Ung och fin.",  currentListing=True, cutting=False, plantId=13, sellerId=1, color="grön", imagePath="uploads/snakeplant.jpg"))
    db.session.add(Listing(title="Chiliplanta", price=40,
                           publicationDate=datetime.datetime.now().date(), description="Oldar chili hemma och säljer gärna en av planorna. Bra för att göra egen sweet chili hemma exempelvis. Mycket stark chili!",  currentListing=True, cutting=False, plantId=14, sellerId=3, color="röd", imagePath="uploads/chiliplanta.jpg"))
    db.session.add(Listing(title="Röd ros stickling", price=30,
                           publicationDate=datetime.datetime.now().date(), description="Har denna vackra ros som man gärna får komma och ta en stickling från.",  currentListing=True, cutting=True, plantId=2, sellerId=1, color="röd", imagePath="uploads/rosor.jpg"))

    ## Commit ##
    db.session.commit()
