Template.signup.events = {"click #submit":function() {
    if ($("#password").val() != $("#confirm").val()) {
        $("#password").closest("fieldset").addClass("control-group error");
    } else {
        Users.insert({
            first: $("#firstname").val(),
            last: $("#lastname").val(),
            email: $("#email").val(),
            password: $("#password").val()});
    }
}};
