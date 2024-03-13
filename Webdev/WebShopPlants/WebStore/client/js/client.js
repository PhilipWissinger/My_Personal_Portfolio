host = window.location.protocol + "//" + location.host;

window.addEventListener("popstate", function (event) {
  // navigate to the previous state
  window.location.href = document.referrer;
});

$(document).ready(function () {
  // alert("reload");
  viewHome();
  toggleNavbarButtons();

  $("#home").click(function (e) {
    e.preventDefault();
    $(".container-fluid").html($("#view-home").html());
    $(".nav-item").removeClass("active-page"); //Klara: Förra sidan man var inne på avaktiveras
    $(this).addClass("active-page"); //Klara: Hemknappen i navbar markeras med CSS
    // history.pushState({}, null, "/hem"); // add this line to change the URL to /shop

    // document.getElementById("footer").style.display = "block";
  });

  $("#shop").click(function (e) {
    e.preventDefault();
    $(".nav-item").removeClass("active-page");
    $(this).addClass("active-page");
    $.get("html/shop.html", function (data) {
      $(".container-fluid").html(data);
      // history.pushState({}, null, "/köp"); // add this line to change the URL to /shop
      showListings("none");
    });
    // document.getElementById("footer").style.display = "block";
  });

  $("#sell").click(function (e) {
    e.preventDefault();
    token = JSON.parse(sessionStorage.getItem("auth"));
    if (token && token.token != null) {
      $.get("html/sell.html", function (data) {
        $(".container-fluid").html(data);
        $("#publishListing, #cancel").off();
        $("#publishListing").click(function (e) {
          e.preventDefault();
          publishListing();
        });
        $("#cancel").click(function (e) {
          e.preventDefault();
          viewHome();
        });
      });
      $(".nav-item").removeClass("active-page");
      $(this).addClass("active-page");
      // document.getElementById("footer").style.display = "block";
    } else {
      $.get("html/register.html", function (data) {
        $(".container-fluid").html(data);
      });
      $(".nav-item").removeClass("active-page");
      $(this).addClass("active-page");
    }
  });

  $("#aboutus").click(function (e) {
    e.preventDefault();
    $.get("html/aboutus.html", function (data) {
      $(".container-fluid").html(data);
    });
    $(".nav-item").removeClass("active-page");
    $(this).addClass("active-page");
    // document.getElementById("footer").style.display = "block";
  });

  $("#contact").click(function (e) {
    e.preventDefault();
    $.get("html/contact.html", function (data) {
      $(".container-fluid").html(data);
      $("#submit").click(function (e) {
        e.preventDefault();
        console.log("klicka submit");
        showMessage();
      });
    });
    $(".nav-item").removeClass("active-page");
    $(this).addClass("active-page");
    // document.getElementById("footer").style.display = "block";
  });

  $("#login").click(function (e) {
    e.preventDefault();
    $.get("html/login.html", function (data) {
      $(".container-fluid").html(data);
    });
    $(".nav-item").removeClass("active-page");
    $(this).addClass("active-page");
    // document.getElementById("footer").style.display = "none";
  });

  //---Klara: Register-sidan visas antingen via navbar eller via "Inte medlem ännu? Registrera" i Login---
  $(document).on("click", "#register", function (e) {
    e.preventDefault();
    viewRegister();
  });

  $(document).on("click", "a.register-link", function (e) {
    e.preventDefault();
    if ($(this).attr("onclick") === "viewRegister()") {
      viewRegister();
    } else if ($(this).attr("onclick") === "viewLogin()") {
      viewLogin();
    }
  });

  function viewRegister() {
    $.get("html/register.html", function (data) {
      $(".container-fluid").html(data);
    });
    $(".nav-item").removeClass("active-page");
    $("#register").addClass("active-page");
    // document.getElementById("footer").style.display = "none";
  }

  //---Klara: Login-sidan visas antingen via navbar eller Registrera-sidan ----------
  function viewLogin() {
    $.get("html/login.html", function (data) {
      $(".container-fluid").html(data);
    });
    $(".nav-item").removeClass("active-page");
    $("#login").addClass("active-page");
    // document.getElementById("footer").style.display = "none";
  }
  //------------------------------------------------

  $("#logout").click(function (e) {
    logoutJS();

    viewHome();
    $(".nav-item").removeClass("active-page");
    $("#home").addClass("active-page");
  });

  $("#cart").click(function (e) {
    e.preventDefault();
    $("#cartModal").modal("show");
    showCart(e);
    payButton();
  });

  $("#mypage").click(function (e) {
    e.preventDefault();
    $.get("html/mypage.html", function (data) {
      $(".container-fluid").html(data);
      showMyPage();
      getMyItems();
    });
    $(".nav-item").removeClass("active-page");
    $(this).addClass("active-page");
    // document.getElementById("footer").style.display = "none";
  });

  //Selma: Gör att man kommer till rätt sida när man trycker på "Go to shop" respektive "Create Listing" på home-page.
  $(document).on("click", "#shopbutton-homepage", function (e) {
    e.preventDefault();
    $.get("html/shop.html", function (data) {
      $(".container-fluid").html(data);
      showListings("none");
    });
    $(".nav-item").removeClass("active-page");
    $("#shop").addClass("active-page");
    // document.getElementById("footer").style.display = "block";
  });

  $(document).on("click", "#sellbutton-homepage", function (e) {
    e.preventDefault();
    token = JSON.parse(sessionStorage.getItem("auth"));
    if (token && token.token != null) {
      $.get("html/sell.html", function (data) {
        $(".container-fluid").html(data);
        $("#publishListing, #cancel").off();
        $("#publishListing").click(function (e) {
          e.preventDefault();
          publishListing();
        });
        $("#cancel").click(function (e) {
          e.preventDefault();
          viewHome();
          $("#publishListing, #cancel").off();
          $("#publishListing").click(function (e) {
            e.preventDefault();
            publishListing();
          });
          $("#cancel").click(function (e) {
            e.preventDefault();
            viewHome();
          });
          $(".nav-item").removeClass("active-page");
          $("#sell").addClass("active-page");
          // document.getElementById("footer").style.display = "block";
        });
      });
    } else {
      $.get("html/register.html", function (data) {
        $(".container-fluid").html(data);
      });
    }
  });

  //Torsten
  $("#cookies").click(function (e) {
    e.preventDefault();
    $.get("html/cookies.html", function (data) {
      $(".container-fluid").html(data);
    });
    $(".nav-item").removeClass("active-page");
    $(".nav-item").removeClass("active-page");
    // document.getElementById("footer").style.display = "block";
  });

  //Torsten
  $("#terms-of-use").click(function (e) {
    e.preventDefault();
    $.get("html/termsofuse.html", function (data) {
      $(".container-fluid").html(data);
    });
    $(".nav-item").removeClass("active-page");
    // document.getElementById("footer").style.display = "block";
  });

  //Selma: Gör att man kommer till rätt sida när man trycker på respektive kategori på home-page.
  $(document).on("click", "#category-largeplants-homepage", function (e) {
    e.preventDefault();
    $.get("html/shop.html", function (data) {
      $(".container-fluid").html(data);
      showListings("bigPlants");
    });
    $(".nav-item").removeClass("active-page");
    $("#shop").addClass("active-page"); //Här måste uppdateras
    // document.getElementById("footer").style.display = "block";
  });

  $(document).on("click", "#category-smallplants-homepage", function (e) {
    e.preventDefault();
    $.get("html/shop.html", function (data) {
      $(".container-fluid").html(data);
      showListings("smallPlants");
    });
    $(".nav-item").removeClass("active-page");
    $("#shop").addClass("active-page"); //Här måste uppdateras
    // document.getElementById("footer").style.display = "block";
  });

  $(document).on("click", "#category-succulents-homepage", function (e) {
    e.preventDefault();
    $.get("html/shop.html", function (data) {
      $(".container-fluid").html(data);
      showListings("succulents");
    });
    $(".nav-item").removeClass("active-page");
    $("#shop").addClass("active-page"); //Här måste uppdateras
    // document.getElementById("footer").style.display = "block";
  });

  $(document).on("click", "#category-cuttings-homepage", function (e) {
    e.preventDefault();
    $.get("html/shop.html", function (data) {
      $(".container-fluid").html(data);
      showListings("cuttings");
    });
    $(".nav-item").removeClass("active-page");
    $("#shop").addClass("active-page"); //Här måste uppdateras
    // document.getElementById("footer").style.display = "block";
  });
});

function viewHome() {
  $(".container-fluid").html($("#view-home").html());
  $(".nav-item").removeClass("active-page"); //Klara: Förra sidan man var inne på avaktiveras
  $("#home").addClass("active-page"); //Klara: Hemknappen i navbar markeras med CSS
  cartCountIcon2();
}

function logoutJS() {
  //Johan och Klara
  sessionStorage.removeItem("auth");
  toggleNavbarButtons();
}

function toggleNavbarButtons() {
  //Johan och Klara
  let isloggedIn = sessionStorage.getItem("auth") != null;

  $("#register").toggleClass("d-none", isloggedIn);
  $("#login").toggleClass("d-none", isloggedIn);
  $("#mypage").toggleClass("d-none", !isloggedIn);
  $("#logout").toggleClass("d-none", !isloggedIn);
}
