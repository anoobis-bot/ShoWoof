$(document).ready(function() {
  const imageContainer = $("#image-container");
  const textContainer = $("#text-container");
  const imageUrlInput = $("#image_url");
  const textContentInput = $("#text_content");

  // Initially, hide both image and text containers
  imageContainer.hide();
  textContainer.hide();

  // Add event listeners to radio buttons to show/hide respective containers
  $("#image").change(function() {
    if ($(this).is(":checked")) {
      imageContainer.show();
      textContainer.hide();
      textContentInput.val('');
    }
  });

  $("#text").change(function() {
    if ($(this).is(":checked")) {
      imageContainer.hide();
      textContainer.show();
      imageUrlInput.val('');
    }
  });


});