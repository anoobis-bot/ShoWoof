$(document).ready(function() {
    const imageContainer = $("#image-container");
    const textContainer = $("#text-container");
    const imageUrlInput = $("#image_url");
    const textContentInput = $("#text_content");
    const imageRadio = $("#image");
    const textRadio = $("#text");
  
    // Initially, hide both image and text containers
    imageContainer.hide();
    textContainer.hide();
  
    // Check if the input fields have values and choose the appropriate radio button
    if (imageUrlInput.val()) {
      imageRadio.prop("checked", true);
      imageContainer.show();
      textContainer.hide();
    } else if (textContentInput.val()) {
      textRadio.prop("checked", true);
      imageContainer.hide();
      textContainer.show();
    }
  
    // Add event listeners to radio buttons to show/hide respective containers
    imageRadio.change(function() {
      if ($(this).is(":checked")) {
        imageContainer.show();
        textContainer.hide();
        textContentInput.val('');
      }
    });
  
    textRadio.change(function() {
      if ($(this).is(":checked")) {
        imageContainer.hide();
        textContainer.show();
        imageUrlInput.val('');
      }
    });
  });