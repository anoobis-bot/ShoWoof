$(document).ready(function() {
    $("#submit-button").click((e) => {
        let new_username = $("input#username_change").val();
        let new_email = $("input#email").val();
        let new_password = $("input#password_change").val();
        // let new_photo = $("input#photo").val();
    
        if (!new_username && !new_email && !new_password) {
            alert("At least one field must be answered");
            return false;
        }

        if (new_email) {
            if (!validateEmail(new_email)) {
                alert("email must be valid");
                return false;
            }
        }

    });

    function validateEmail(email) {
        return email.toLowerCase().match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
    }


});