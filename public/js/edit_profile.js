$(document).ready(function() {
    $("#submit-button").click((e) => {
        let new_username = $("input#username").val();
        let new_email = $("input#email").val();
        // let new_photo = $("input#photo").val();
    
        if (!new_username && !new_email) {
            alert("username or email cannot be empty!");
            return false;
        }
    });


});