function viewContact() {
  $.get("html/contact.html", function (data) {
    $(".container-fluid").html(data);
  });
  $(".nav-item").removeClass("active-page"); //Klara: Förra sidan man var inne på avaktiveras
  $("#contact").addClass("active-page"); //Klara: Hemknappen i navbar markeras med CSS
  // document.getElementById("footer").style.display = "block";
}

function showMessage(event) {
  console.log("show message");
  var formData = new FormData();
  formData.append("inputName", $("#inputName").val());
  formData.append("inputEmail", $("#inputEmail").val());
  formData.append("inputMessage", $("#inputMessage").val());

  $.ajax({
    url: host + "/contact-us",
    type: "POST",
    dataType: "json",
    processData: false,
    contentType: false,
    data: formData,
    success: function () {
      alert("Tack för ditt meddelande!");
      viewContact();
    },
    error: function () {
      alert("Error: Ditt meddelande skickades ej!");
    },
  });
}
