$(document).ready(function() {
    const editCommentButtons = $('[id^="editComment:"]');
    const vis = $('[id^="visibility-"]');
    vis.hide();
    
    editCommentButtons.each(function() {
        const button = $(this);
        const postId = button.data('postid');
        const visibility = $(`#visibility-${postId}`);

        button.click(function() {
            const isClicked = button.data('isClicked');
            if (isClicked) {
                visibility.hide();
            } else {
                visibility.show();
            }

            button.data('isClicked', !isClicked);
        });
    });
});
