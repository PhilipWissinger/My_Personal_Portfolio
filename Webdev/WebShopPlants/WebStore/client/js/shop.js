host = window.location.protocol + "//" + location.host;
//Torsten filter

// showListings();

function planthighlight(id) {
  $("#" + id).css("border-color", "#a3b18a");
  $("#" + id).css("background-color", "lightgray");
}

function plantunhighlight(id) {
  $("#" + id).css("border-color", "lightgray");
  $("#" + id).css("background-color", "white");
}

//Torsten price slider

var rangeInput = document.querySelectorAll(".range-input input");
var priceInput = document.querySelectorAll(".pricebox-input input"); //Change the pricing inside the slider
var range = document.querySelector(".slider .slider-progress"); //Change the estetic of the slider
var overlapp = 100;

priceInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    min = parseInt(priceInput[0].value);
    max = parseInt(priceInput[1].value);

    if (max - min >= overlapp && max <= rangeInput[1].max) {
      if (e.target.className === "input-min") {
        rangeInput[0].value = min;
        range.style.left = (max / rangeInput[0].max) * 100 + "%"; //update the CSS function
      } else {
        rangeInput[1].value = max;
        range.style.right = 100 - (max / rangeInput[1].max) * 100 + "%"; //update the CSS function
      }
    }
    console.log(min);
    console.log(max);
  });
});

var pricemax = 1000;
var pricemin = 0;

rangeInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    var lower = parseInt(rangeInput[0].value);
    var upper = parseInt(rangeInput[1].value);

    pricemax = upper;
    pricemin = lower;

    if (upper - lower < overlapp) {
      if (e.target.className === "range-min") {
        rangeInput[0].value = upper - overlapp;
      } else {
        rangeInput[1].value = lower + overlapp;
      }
    } else {
      priceInput[0].value = lower;
      priceInput[1].value = upper;
      range.style.left = (lower / rangeInput[0].max) * 100 + "%";
      range.style.right = 100 - (upper / rangeInput[1].max) * 100 + "%";
    }
    update();
  });
});


var isHighlighted = [false, false, false, false, false, false, false, false, false];

function isHighlightedhandle(int, id) {
  if (!isHighlighted[int]) {
    planthighlight(id);
    isHighlighted[int] = true;
  } else if (isHighlighted[int]) {
    plantunhighlight(id);
    isHighlighted[int] = false;
  }
}

function toggle(id) {
  if (id == "diff-container1") {
    isHighlightedhandle(0, id);
  } else if (id == "diff-container2") {
    isHighlightedhandle(1, id);
  } else if (id == "diff-container3") {
    isHighlightedhandle(2, id);
  } else if (id == "sun-container1") {
    isHighlightedhandle(3, id);
  } else if (id == "sun-container2") {
    isHighlightedhandle(4, id);
  } else if (id == "sun-container3") {
    isHighlightedhandle(5, id);
  } else if (id == "water-container1") {
    isHighlightedhandle(6, id);
  } else if (id == "water-container2") {
    isHighlightedhandle(7, id);
  } else if (id == "water-container3") {
    isHighlightedhandle(8, id);
  }
  update();
}

function update() {
  $.ajax({
    url: host + "/filter",
    type: "POST",
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify({
      difficultyFilterLow: isHighlighted[0],
      difficultyFilterMedium: isHighlighted[1],
      difficultyFilterHigh: isHighlighted[2],
      sunFilterLow: isHighlighted[3],
      sunFilterMedium: isHighlighted[4],
      sunFilterHigh: isHighlighted[5],
      waterFilterLow: isHighlighted[6],
      waterFilterMedium: isHighlighted[7],
      waterFilterHigh: isHighlighted[8],
      lowerPrice: pricemin,
      upperPrice: pricemax,
    }),

    success: function (response) {
      console.log(pricemin);
      console.log(pricemax);
      console.log(response);
      $(".column").remove();
      // $(".coloumn").siblings(".card").remove();

      // $(".coloumn").siblings(".card").remove();

      for (let i = 0; i < response.listings.length; i++) {
        createCard(response.listings[i], i);
      }


      $(".card").on("click", function () {
        listingId = $(this).data("id");
        console.log("listing id: " + listingId);

        for (let i = 0; i < response.listings.length; i++) {
          if (listingId == response.listings[i].id) {
            clickedListing = response.listings[i];
            break;
          }
        }
        $.get("html/listing.html", function (data) {
          $(".container-fluid").html(data);
          showListingId(clickedListing, "shop");
          // showListingId(clickedListing); VILEKN AV DENNA OCH DEN OVAN SKA MAN ANVÄNDA?
        });
      });
    },
  });
}

// Lovisa

// Ajax anrop som hämtar alla lisitngs och visar dom som kort
function showListings(category_) {
  if (category_ == "none") {
    $.ajax({
      url: host + "/listing",
      type: "GET",
      success: function (response) {
        for (let i = 0; i < response.listings.length; i++) {
          createCard(response.listings[i], i);
        }
        $(".card").on("click", function (e) {
          e.preventDefault();

          listingId = $(this).data("id");
          console.log("listing id: " + listingId);
          console.log(response.listings);

          for (let i = 0; i < response.listings.length; i++) {
            // console.log("iteration: " + i);
            if (listingId == response.listings[i].id) {
              clickedListing = response.listings[i];
              break;
            }
          }
          $.get("html/listing.html", function (data) {
            $(".container-fluid").html(data);
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
            console.log("scroll");
            showListingId(clickedListing, "shop");
            // showListingId(clickedListing); VILKEN AV DENNA RAD OCH DEN OVAN SKA MAN ANVÄNDA?
          });
          // $(".nav-item").removeClass("active-page");
          // $(this).addClass("active-page");

          // this.parentElement.parentElement.remove();
        });
      },
    });
  } else {
    $.ajax({
      url: host + "/category",
      type: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({
        category: category_,
      }),
      success: function (response) {
        for (let i = 0; i < response.listings.length; i++) {
          createCard(response.listings[i], i);
        }
        $(".card").on("click", function (e) {
          e.preventDefault();

          listingId = $(this).data("id");
          console.log("listing id: " + listingId);
          console.log(response.listings);

          for (let i = 0; i < response.listings.length; i++) {
            if (listingId == response.listings[i].id) {
              clickedListing = response.listings[i];
              break;
            }
          }
          $.get("html/listing.html", function (data) {
            $(".container-fluid").html(data);

            showListingId(clickedListing, "shop");
            // showListingId(clickedListing); VILKEN AV DENNA OCH DEN OVAN SKA MAN ANVÄNDA?
          });
        });
      },
    });
  }
}

// skapar ett listing-kort och lägger till på shop-sidan
function createCard(listing, i) {
  column = document.createElement("div");
  column.className = "col-sm-6 col-md-3 col-lg-2 column";
  card = document.createElement("div");
  card.className = "card shadow";
  card.setAttribute("data-id", listing.id);
  imageContainer = document.createElement("div");
  imageContainer.className = "container imageContainer";
  backgroungImage = document.createElement("img");
  backgroungImage.className = "card-img-top bgImage";
  backgroungImage.src = "shopImages/background.png";
  image = document.createElement("img");
  image.className = "card-img-top topImage";
  if (listing.imagePath != null) {
    image.src = listing.imagePath;
  } else {
    image.src = "shopImages/default.png";
  }

  imageOverlay = document.createElement("div");
  imageOverlay.className = "card-img-overlay";

  waterIconBg = document.createElement("div");
  waterIconBg.className = "iconTag waterIcon";
  waterIcon = document.createElement("img");
  waterIcon.className = "icon";
  waterIcon.src = "filterIcons/water" + listing.plant.waterIndex + ".png";
  waterIconDesc = document.createElement("div");
  waterIconDesc.className = "iconDescription waterDescription";
  waterDescText = document.createElement("p");
  waterDescText.className = "iconDescriptionText";
  waterDescText.innerText = "Vattenmängd";

  sunIconBg = document.createElement("div");
  sunIconBg.className = "iconTag sunIcon";
  sunIcon = document.createElement("img");
  sunIcon.className = "icon";
  sunIcon.src = "filterIcons/sun" + listing.plant.sunIndex + ".png";
  sunIconDesc = document.createElement("div");
  sunIconDesc.className = "iconDescription sunDescription";
  sunDescText = document.createElement("p");
  sunDescText.className = "iconDescriptionText";
  sunDescText.innerText = "Solmängd";

  diffIconBg = document.createElement("div");
  diffIconBg.className = "iconTag difficultyIcon";
  diffIcon = document.createElement("img");
  diffIcon.className = "icon";
  diffIcon.src = "filterIcons/diff" + listing.plant.difficultyIndex + ".png";
  diffIconDesc = document.createElement("div");
  diffIconDesc.className = "iconDescription diffDescription";
  diffDescText = document.createElement("p");
  diffDescText.className = "iconDescriptionText";
  diffDescText.innerText = "Svårighetsgrad";

  cardBody = document.createElement("div");
  cardBody.className = "card-body";
  title = document.createElement("h5");
  title.className = "card-title";
  title.innerText = listing.title;
  price = document.createElement("p");
  price.className = "card-text";
  price.innerText = listing.price + " kr";

  waterIconDesc.appendChild(waterDescText);
  sunIconDesc.appendChild(sunDescText);
  diffIconDesc.appendChild(diffDescText);
  waterIconBg.appendChild(waterIcon);
  waterIconBg.appendChild(waterIconDesc);
  sunIconBg.appendChild(sunIcon);
  sunIconBg.appendChild(sunIconDesc);
  diffIconBg.appendChild(diffIcon);
  diffIconBg.appendChild(diffIconDesc);
  imageOverlay.appendChild(waterIconBg);
  imageOverlay.appendChild(sunIconBg);
  imageOverlay.appendChild(diffIconBg);
  cardBody.appendChild(title);
  cardBody.appendChild(price);
  imageContainer.appendChild(image);
  imageContainer.appendChild(backgroungImage);

  imageContainer.appendChild(imageOverlay);
  card.appendChild(imageContainer);
  card.appendChild(cardBody);
  column.appendChild(card);

  // if (i % 5 == 0) {
  //   row = document.createElement("div");
  //   row.className = "w-100";
  //   $("#shopRow").append(row);
  // }
  $("#shopRow").append(column);
}
