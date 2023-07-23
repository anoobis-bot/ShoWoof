$(document).ready(function() {
  const imageContainer = $("#image-container");
  const textContainer = $("#text-container");

  // Initially, hide both image and text containers
  imageContainer.hide();
  textContainer.hide();

  // Add event listeners to radio buttons to show/hide respective containers
  $("#image").change(function() {
    if ($(this).is(":checked")) {
      imageContainer.show();
      textContainer.hide();
    }
  });

  $("#text").change(function() {
    if ($(this).is(":checked")) {
      imageContainer.hide();
      textContainer.show();
    }
  });

  // Event listener for the form submission
  // $("#newPostForm").on("submit", function(event) {
  //   event.preventDefault(); // Prevent the default form submission

  //   // Get the form data
  //   const formData = {
  //     title: $("#caption").val(),
  //   };

  //   // Check the content-type selection and include relevant fields
  //   if ($("#image").is(":checked")) {
  //     formData.imageUrl = $("#image-url").val();
  //   } else if ($("#text").is(":checked")) {
  //     formData.textContent = $("#text-content").val();
  //   }
  // });
});