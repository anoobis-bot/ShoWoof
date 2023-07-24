$(document).ready(function() {
    $('[id^="upvoteID:"]').on("click", function() {
        const postId = this.id.split(":")[1];
        // alert("+1 for: " + postId);

        $.ajax({
            // For MCO3, add cookies
            data: {postID: postId},
            method: "POST",
            url: "/api/upvote",
            success: function(data, textStatus, jqXHR) {
                $(`#statusID${postId}`).text(data.numVotes);
                if (data.userAction === "ENGAGE") {
                    $(document.getElementById(`upvoteID:${postId}`)).addClass("upvote").removeClass("upvote-not");
                    $(document.getElementById(`downvoteID:${postId}`)).addClass("downvote-not").removeClass("downvote");
                } 
                else if (data.userAction === "DISENGAGE") {
                    $(document.getElementById(`upvoteID:${postId}`)).addClass("upvote-not").removeClass("upvote");
                }
            },
            error: function() {
                console.log("failed");
            }
        });
    });

    $('[id^="downvoteID:"]').on("click", function() {
        const postId = this.id.split(":")[1];
        // alert("-1 for: " + postId);

        $.ajax({
            data: {postID: postId},
            method: "POST",
            url: "/api/downvote",
            success: function(data, textStatus, jqXHR) {
                $(`#statusID${postId}`).text(data.numVotes);
                if (data.userAction === "ENGAGE") {
                    $(document.getElementById(`downvoteID:${postId}`)).addClass("downvote").removeClass("downvote-not");
                    $(document.getElementById(`upvoteID:${postId}`)).addClass("upvote-not").removeClass("upvote");
                } 
                else if (data.userAction === "DISENGAGE") {
                    $(document.getElementById(`downvoteID:${postId}`)).addClass("downvote-not").removeClass("downvote");
                }
            },
            error: function() {
                console.log("failed");
            }
        });
    });
});