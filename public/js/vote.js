$(document).ready(function() {
    var isUpvoteClicked = false;
    $('[id^="upvoteID:"]').on("click", function() {
        const postId = this.id.split(":")[1];
        // alert("+1 for: " + postId);

        $.ajax({
            data: {postID: postId},
            method: "POST",
            url: "/api/upvote",
            success: function(data, textStatus, jqXHR) {
                $(`#statusID${postId}`).text(data.numVotes);
            },
            error: function() {
                console.log("failed");
            }
        });
    });

    $('[id^="downvoteID:"]').on("click", function() {
        let isDownvoteClicked = false;
        const postId = this.id.split(":")[1];
        // alert("-1 for: " + postId);

        $.ajax({
            data: {postID: postId},
            method: "POST",
            url: "/api/downvote",
            success: function(data, textStatus, jqXHR) {
                $(`#statusID${postId}`).text(data.numVotes);
            },
            error: function() {
                console.log("failed");
            }
        });
    });
});