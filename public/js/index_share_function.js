$(document).ready(function() {
    // Add click event listener to the "Share" buttons using jQuery
    $('[id^="copyLink:"]').on("click", function() {
        // Get the post ID from the clicked "Share" button's ID
        const postId = this.id.split(":")[1];

        // Create the post URL using the post ID
        const postURL = "http://localhost:3000/posts/" + postId;

        // Create a temporary input element to copy the URL
        const tempInput = $("<input>");
        tempInput.val(postURL);

        // Append the input element to the document to be able to copy its value
        $("body").append(tempInput);

        // Select the URL inside the input element
        tempInput.select();

        // Copy the URL to the clipboard
        document.execCommand("copy");

        // Remove the temporary input element
        tempInput.remove();

        // Show some feedback (optional)
        alert("Link copied to clipboard!");
    });
});