$(document).ready(function() {
    const replyButtons = $('[id^="replyComment:"]');
    const replyForms = $('[id^="replyForm-"]');
    replyForms.hide();

    const editCommentButtons = $('[id^="editComment:"]');
    const vis = $('[id^="visibility-"]');
    vis.hide();

    let activeButtonType = 'none'; // Track the active button type ('none', 'reply', or 'edit')

    function deactivateButtons() {
        if (activeButtonType === 'reply') {
            replyForms.hide();
            replyButtons.data('isClicked', false);
        } else if (activeButtonType === 'edit') {
            vis.hide();
            editCommentButtons.data('isClicked', false);
        }
        activeButtonType = 'none';
    }

    replyButtons.click(function() {
        const button = $(this);
        const postId = button.data('postid');
        const replyForm = $(`#replyForm-${postId}`);
        const isClicked = button.data('isClicked');

        if (isClicked && activeButtonType === 'reply') {
            // Clicked on the same active reply button, hide the form
            replyForm.hide();
            button.data('isClicked', false);
            activeButtonType = 'none';
        } else {
            // Clicked on a different reply button or no active button, deactivate previous buttons and show the form
            deactivateButtons();
            replyForm.show();
            button.data('isClicked', true);
            activeButtonType = 'reply';
        }
    });

    editCommentButtons.click(function() {
        const button = $(this);
        const postId = button.data('postid');
        const visibility = $(`#visibility-${postId}`);
        const isClicked = button.data('isClicked');

        if (isClicked && activeButtonType === 'edit') {
            // Clicked on the same active edit button, hide the visibility element
            visibility.hide();
            button.data('isClicked', false);
            // We do not update the activeButtonType to 'none' when hiding the visibility element
        } else {
            // Clicked on a different edit button or no active button, deactivate previous buttons and show the visibility element
            deactivateButtons();
            visibility.show();
            button.data('isClicked', true);
            activeButtonType = 'edit'; // Update the activeButtonType to 'edit' when showing the visibility element
        }
    });
});