host = window.location.protocol + "//" + location.host;

//Johan, Klara & Selma
function registerAccount(event) {
  event.preventDefault();

  const name = $("#nameReg").val();
  const email = $("#emailReg").val();
  const password = $("#passwordReg").val();

  $.ajax({
    url: host + "/sign-up",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({ name, email, password }),
    success: function (data) {
      autoLogin(data);
    },
    error: function (error) {
      console.log(error.status);
      if (error.status == 409) {
        alert("Den här mailaddressen används redan");
      }
    },
  });
}

//Johan, Klara & Selma
function autoLogin(loginResponse) {
  console.log("autologin");
  sessionStorage.setItem("auth", JSON.stringify(loginResponse));
  toggleNavbarButtons();
  viewHome();
}

//Johan, Klara & Selma
function loginJS(event) {
  event.preventDefault();
  const email = $("#emailID").val();
  const password = $("#passwordID").val();

  $.ajax({
    url: host + "/login",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({ email, password }),
    success: function (loginResponse) {
      autoLogin(loginResponse);
    },
    error: function (error) {
      console.error(error);
      alert("Lösenordet eller mailaddreseen var felaktig");
    },
  });
}

function deleteAccount(event) {
  event.preventDefault();

  const auth = JSON.parse(sessionStorage.getItem("auth"));
  email = auth.user.email;

  $.ajax({
    url: host + "/login",
    type: "DELETE",
    contentType: "application/json",
    data: JSON.stringify({ email }),
    success: function (data) {
      logoutJS();
      viewHome();
    },
    error: function (error) {
      console.error(error);
    },
  });
}

function printOldListings(oldListings) {
  let listingsHtml = "";
  for (let i = 0; i < oldListings.length; i++) {
    listingsHtml += "<li>" + oldListings[i] + "</li>";
    alert("listing added to list");
  }
  $("#old-listings").html(listingsHtml);
}
