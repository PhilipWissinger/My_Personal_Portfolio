var from = "";

$("#backBtn").on("click", function (e) {
  console.log(from);
  e.preventDefault();
  if (from == "shop") {
    $.get("html/shop.html", function (data) {
      $(".container-fluid").html(data);
      showListings("none");
    });
  } else if (from == "myPage") {
    $.get("html/mypage.html", function (data) {
      $(".container-fluid").html(data);
      getMyItems();
    });
    $(".nav-item").removeClass("active-page");
    $(this).addClass("active-page");
    // document.getElementById("footer").style.display = "none";
  }

  // this.parentElement.parentElement.remove();
});

function showListingId(listing, from_) {
  from = from_;

  console.log("showing listing with id: " + listing.id);
  document.getElementById("listingImage").src = listing.imagePath;
  document.getElementById("listingTitle").innerText = listing.title;
  document.getElementById("publishDate").innerText =
    "Publicerad: " + listing.publicationDate.substring(4, 16);
  document.getElementById("description").innerText = listing.description;
  color = listing.color;
  if (color == null) {
    color = "n/a";
  }
  document.getElementById("listingColor").innerText = "Färg: " + color;
  document.getElementById("plantName").innerText =
    listing.plant.name.charAt(0).toUpperCase() + listing.plant.name.slice(1);

  document.getElementById("waterIcon").src =
    "../filterIcons/water" + listing.plant.waterIndex + ".png";
  if (listing.plant.waterIndex == 1) {
    waterIconText = "Kräver liten mängd vatten";
  } else if (listing.plant.waterIndex == 2) {
    waterIconText = "Kräver medel mängd vatten";
  } else {
    waterIconText = "Kräver stor mängd vatten";
  }
  document.getElementById("waterIconText").innerText = waterIconText;

  document.getElementById("sunIcon").src =
    "../filterIcons/sun" + listing.plant.sunIndex + ".png";
  if (listing.plant.sunIndex == 1) {
    sunIconText = "Kräver lite solljus";
  } else if (listing.plant.sunIndex == 2) {
    sunIconText = "Kräver medel solljus";
  } else {
    sunIconText = "Kräver mycket solljus";
  }
  document.getElementById("sunIconText").innerText = sunIconText;

  document.getElementById("diffIcon").src =
    "../filterIcons/diff" + listing.plant.difficultyIndex + ".png";
  if (listing.plant.difficultyIndex == 1) {
    diffIconText = "Låg svårighetsgrad";
  } else if (listing.plant.difficultyIndex == 2) {
    diffIconText = "Medel svårighetsgrad";
  } else {
    diffIconText = "Hög svårighetsgrad";
  }
  document.getElementById("diffIconText").innerText = diffIconText;

  document.getElementById("price").innerText = listing.price + " kr";
  document.getElementById("buyBtn").onclick = function () {
    addToCart(listing.id);
  };
}

$("#listingTitle").on("click", function (e) {
  e.preventDefault();
  console.log("title clicked");
  document.getElementById("listingTitle").innerText = "testing";
});
