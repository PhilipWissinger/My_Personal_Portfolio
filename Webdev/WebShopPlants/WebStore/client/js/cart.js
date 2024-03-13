host = window.location.protocol + "//" + location.host;

function showCart(event) {
  event.preventDefault();
  $.ajax({
    url: host + "/cart",
    type: "GET",
    contentType: "application/json",
    headers: {
      Authorization:
        "Bearer " + JSON.parse(sessionStorage.getItem("auth")).token,
    },
    success: function (response) {
      console.log("success getting cart");
      console.log(response);
      $("#cartListings").empty();
      for (let i = 0; i < response.articles.length; i++) {
        showListingRows(response.articles[i]);
      }
      showSum(response.articles);
    },
  });
}

function cartCountIcon2() {
  token = JSON.parse(sessionStorage.getItem("auth"));
  if (token && token.token != null) {
    $.ajax({
      url: host + "/cart",
      type: "GET",
      contentType: "application/json",
      headers: {
        Authorization:
          "Bearer " + JSON.parse(sessionStorage.getItem("auth")).token,
      },
      success: function (response) {
        items = response.articles.length;
        if (items == 0) {
          $(".cart-badge").hide();
        } else {
          console.log(items);
          document.querySelector(".cart-badge").textContent = items;
        }
      },
    });
  }
}

function addToCart(listing_id) {
  token = JSON.parse(sessionStorage.getItem("auth"));
  if (token && token.token != null) {
    console.log(listing_id);
    $.ajax({
      url: host + "/cart/" + listing_id,
      type: "PUT",
      contentType: "application/json",
      headers: {
        Authorization:
          "Bearer " + JSON.parse(sessionStorage.getItem("auth")).token,
      },
      success: function (response) {
        console.log("success adding to cart");
        console.log(response);
        cartCountIcon2();
      },
      error: function () {
        alert("Item ligger redan i en kundkorg");
      },
    });
  } else {
    $.get("html/register.html", function (data) {
      $(".container-fluid").html(data);
    });
  }
}

function showSum(response) {
  sum = 0;
  for (let i = 0; i < response.length; i++) {
    sum += response[i].price;
  }
  $("#cartListings").append(
    '</table> <div class="d-flex justify-content-end"><h5>Total: <span class="price text logo-color">' +
      sum +
      " SEK</span></h5></div>"
  );
}

function removeFromCart(listing_id) {
  $.ajax({
    url: host + "/cart/" + listing_id,
    type: "DELETE",
    contentType: "application/json",
    headers: {
      Authorization:
        "Bearer " + JSON.parse(sessionStorage.getItem("auth")).token,
    },
    success: function (response) {
      console.log("success deleting from cart");
      console.log(response);
      $("#cartListings").empty();
      for (let i = 0; i < response.articles.length; i++) {
        showListingRows(response.articles[i]);
      }
      showSum(response.articles);
      cartCountIcon2();
    },
  });
}

function showListingRows(listing) {
  tr = document.createElement("tr");
  td1 = document.createElement("td");
  td1.className = "w-25";

  img = document.createElement("img");
  img.src = listing.imagePath;
  img.className = "img-fluid img-thumbnail";
  td1.appendChild(img);
  tr.appendChild(td1);

  td2 = document.createElement("td");
  td2.textContent = listing.plant.name;
  tr.appendChild(td2);

  td3 = document.createElement("td");
  td3.textContent = listing.price + " SEK";
  tr.appendChild(td3);

  td4 = document.createElement("td");
  deleteButton = document.createElement("button");
  deleteButton.textContent = "Ta bort";
  deleteButton.classList.add("delete-button");
  deleteButton.onclick = function () {
    removeFromCart(listing.id);
  };

  td4.appendChild(deleteButton);
  tr.appendChild(td4);

  $("#cartListings").append(tr);
}
