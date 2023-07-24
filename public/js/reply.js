$(document).ready(function() {
    const replyButtons = $('[id^="replyComment:"]');
    const replyForms = $('[id^="replyForm-"]');
    replyForms.hide();
  
    replyButtons.each(function() {
      const button = $(this);
      const postId = button.data('postid');
      const replyForm = $(`#replyForm-${postId}`);
  
      button.click(function() {
        const isClicked = button.data('isClicked');
        if (isClicked) {
          replyForm.hide();
        } else {
          replyForm.show();
        }
  
        button.data('isClicked', !isClicked);
      });
    });
  });