$(document).ready(function() {
    var isUpvoteClicked = false;
    $('[id^="upvoteID:"]').on("click", function() {
        const postId = this.id.split(":")[1];
        if (isUpvoteClicked) {
            // data.updateOne( 
            //     {_id: postId},
            //     {inc: { votes: -1}}
            // )
            alert("-1 for: " + postId);
        } else {
            // data.updateOne(
            //     {_id: postId},
            //     {inc: { votes: 1}}
            // )
            alert("+1 for: " + postId);
        }
        isUpvoteClicked = !isUpvoteClicked;  
    });

    $('[id^="downvoteID:"]').on("click", function() {
        let isDownvoteClicked = false;
        const postId = this.id.split(":")[1];
        if (isDownvoteClicked) {
            // data.updateOne( 
            //     {_id: postId},
            //     {inc: { votes: 1}}
            // )
            alert("+1 for: " + postId);
        } else {
            // data.updateOne(
            //     {_id: postId},
            //     {inc: { votes: -1}}
            // )
            alert("-1 for: " + postId);
        }
        isDownvoteClicked = !isDownvoteClicked;  
    });
});