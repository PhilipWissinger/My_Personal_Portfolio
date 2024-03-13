host = window.location.protocol + "//" + location.host;

function showMyPage() {
  $.ajax({
    url: host + "/mypage/edit",
    type: "GET",
    headers: {
      Authorization:
        "Bearer " + JSON.parse(sessionStorage.getItem("auth")).token,
    },
    success: function (response) {
      console.log(response);
      document.getElementById("first-last-name").innerText = response.name;
      document.getElementById("e-mail").innerText = response.email;
    },
  });
}

$(document).on("click", "#edit-name-button", function (e) {
  e.preventDefault();
  $("#edit-name-modal").modal("show");
});

$(document).on("click", "#edit-email-button", function (e) {
  e.preventDefault();
  $("#edit-email-modal").modal("show");
});

$("#save-name-button").on("click", function (e) {
  $("#edit-name-modal").modal("hide");
});

$("#save-email-button").on("click", function (e) {
  $("#edit-email-modal").modal("hide");
});

function changeName(e) {
  e.preventDefault();
  newName = $("#newName").val();
  document.getElementById("first-last-name").innerText = newName;

  $.ajax({
    url: host + "/mypage/edit",
    type: "PUT",
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify({ name: newName }),
    headers: {
      Authorization:
        "Bearer " + JSON.parse(sessionStorage.getItem("auth")).token,
    },

    success: function (response) {},
    error: function (error) {
      alert("Namnbyte misslyckades");
    },
  });
}

function changeEmail(e) {
  e.preventDefault();
  newEmail = $("#newEmail").val();
  document.getElementById("e-mail").innerText = newEmail;

  $.ajax({
    url: host + "/mypage/edit",
    type: "PUT",
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify({ email: newEmail }),
    headers: {
      Authorization:
        "Bearer " + JSON.parse(sessionStorage.getItem("auth")).token,
    },

    success: function (response) {},
    error: function (error) {
      alert("Emailbyte misslyckades");
    },
  });
}

//Silje
function getMyItems() {
  $.ajax({
    url: host + "/my-items",
    type: "GET",
    headers: {
      Authorization:
        "Bearer " + JSON.parse(sessionStorage.getItem("auth")).token,
    },
    success: function (response) {
      console.log(response.myCurrentListings);
      for (let i = 0; i < response.myCurrentListings.length; i++) {
        console.log("nuvarande");
        createMyCard(response.myCurrentListings[i], "listing");
      }
      for (let i = 0; i < response.myOldListings.length; i++) {
        console.log("gamla");
        createMyCard(response.myOldListings[i], "listing");
      }
      for (let i = 0; i < response.oldOrders.length; i++) {
        console.log("gamla");
        createMyCard(response.oldOrders[i], "order");
      }
      $(".card").on("click", function (e) {
        e.preventDefault();

        listingId = $(this).data("id");
        console.log("listing id: " + listingId);

        for (
          let i = 0;
          i <
          response.myOldListings.length +
            response.myCurrentListings.length +
            response.oldOrders.length;
          i++
        ) {
          if (listingId == response.myOldListings[i].id) {
            clickedListing = response.myOldListings[i];
            break;
          } else if (listingId == response.myCurrentListings[i].id) {
            clickedListing = response.myCurrentListings[i];
            break;
          } else if (listingId == response.oldOrders[i].id) {
            clickedListing = response.oldOrders[i];
            break;
          }
        }

        $.get("html/listing.html", function (data) {
          $(".container-fluid").html(data);

          showListingId(clickedListing, "myPage");
        });
      });
    },
  });
}

function createMyCard(listing, type) {
  console.log("createMyCard");
  column = document.createElement("div");
  column.className = "col-sm-6 col-md-4 col-lg-2 column";
  card = document.createElement("div");
  card.className = "card shadow my-card-margin";
  card.setAttribute("data-id", listing.id);
  console.log("setting data id: ", listing.id);
  imageContainer = document.createElement("div");
  imageContainer.className = "container imageContainer";
  image = document.createElement("img");
  image.className = "card-img-top";
  image.src = listing.imagePath;

  cardBody = document.createElement("div");
  cardBody.className = "card-body";
  title = document.createElement("h5");
  title.className = "card-title";
  title.innerText = listing.title;
  date = document.createElement("p");
  date.className = "card-text";

  if (listing.currentListing) {
    date.innerText =
      "Publiceringsdatum: " + listing.publicationDate.substring(4, 16);
  } else {
    date.innerText =
      "Köp genomfördes: " + listing.purchaseDate.substring(4, 16);
  }

  cardBody.appendChild(title);
  cardBody.appendChild(date);
  imageContainer.appendChild(image);
  card.appendChild(imageContainer);
  card.appendChild(cardBody);
  column.appendChild(card);

  if (type == "order") {
    $("#orderhistory-inner").append(column);
  } else if (type == "listing") {
    $("#my-listings-inner").append(column);
  }
}
