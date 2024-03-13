function payButton() {
  id = JSON.parse(sessionStorage.getItem("auth")).user.id;

  // $("#checkout").removeChild($("#checkout").lastChild);
  if (document.getElementById("checkout").innerHTML === "") {
    $("#checkout").append(
      "<form action='/create-checkout-session/" +
        id +
        "'" +
        "method='POST'>" +
        "<button type='submit' class='btn btn-outline-success logo-color'>Till kassan</button>" +
        "</form>"
    );
  }
}
