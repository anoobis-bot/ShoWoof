$(document).ready(function() {
    // Add click event listener to the "Share" anchor using jQuery
    $("#copyLink").on("click", function() {
        // Get the current URL
        const currentUrl = window.location.href;

        // Create a temporary input element to copy the URL
        const tempInput = $("<input>");
        tempInput.val(currentUrl);

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