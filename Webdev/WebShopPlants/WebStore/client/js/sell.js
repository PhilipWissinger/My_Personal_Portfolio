fileInput = document.querySelector('#image-upload');
previewImage = document.querySelector('#my-icon');

fileInput.addEventListener('change', function() {
    console.log('FFilen har ändrats');
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', function() {
        console.log('Filen har laddats');
        previewImage.src = reader.result;
    });
    reader.readAsDataURL(file);
});

fetch('/plants')
.then(response => response.json())
.then(plant_names => {
  const datalist = document.getElementById('plant');
  plant_names.forEach(plant => {
    const option = document.createElement('option');
    option.value = plant.name;
    option.setAttribute('data-plant-id', plant.id);
    datalist.appendChild(option);
  });
});


function publishListing() {
    var isChecked = document.getElementById('cutting-check').checked; 
    var plantName = $('#plant-input').val();
    var plantId = $('option[value="' + plantName + '"]').attr('data-plant-id');
    $("#plantId").val(plantId);
    

    
    var formData = new FormData();

    formData.append('image-upload', $('#image-upload')[0].files[0]);
    formData.append('plantId', plantId);
    formData.append('title', $("#plantTitle").val());
    formData.append('price', $("#plantPrice").val());
    formData.append('color', $("#plantColor").val());
    formData.append('cutting', isChecked);
    formData.append('description', $("#plantDescription").val());
  
    $.ajax({
      url: host + "/upload",
      type: "POST",
      dataType: "json",
      processData: false,
      contentType: false,
      data: formData,
      headers: {
        Authorization:
          "Bearer " + JSON.parse(sessionStorage.getItem("auth")).token,
      },  
      success: function (response) {
        if (response.success) {
            alert("Din annons har skapats!");
            viewHome();
        } else {
            alert("Error: " + response.error);
        }
    },
    error: function () {
        alert("Error creating listing!");
    }
});
}
  

  

  
