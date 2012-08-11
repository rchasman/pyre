Template.signup.events = {"click #submit":function() {

    first = $("#firstname").val();
    last = $("#lastname").val();
    email = $("#email").val();
    password = $("#password").val();
    confirm = $("#confirm").val();
    i = 0;

    if (password != confirm) {
        $("#password").closest("fieldset").addClass("control-group error");
        $("#confirm").closest("fieldset").addClass("control-group error");
        i++;
    } else {
        $("#password").closest("fieldset").removeClass("control-group error");
        $("#confirm").closest("fieldset").removeClass("control-group error");
        i = 0;
    }
    if (first.length < 3) {
        $("#firstname").closest("fieldset").addClass("control-group error");
        i++;
    } else {
        $("#firstname").closest("fieldset").removeClass("control-group error");
        i = 0;
    }
    if (last.length < 3) {
        $("#lastname").closest("fieldset").addClass("control-group error");
        i++;
    } else {
        $("#lastname").closest("fieldset").removeClass("control-group error");
        i = 0;
    }
    if (email.length < 5) {
        $("#email").closest("fieldset").addClass("control-group error");
        i++;
    } else {
        $("#email").closest("fieldset").removeClass("control-group error");
        i = 0;
    }
    if (password.length < 7) {
        $("#password").closest("fieldset").addClass("control-group error");
        i++;
    } else {
        $("#password").closest("fieldset").removeClass("control-group error");
        i = 0;
    }
    if (confirm.length < 7) {
        $("#confirm").closest("fieldset").addClass("control-group error");
        i++;
    } else {
        $("#confirm").closest("fieldset").removeClass("control-group error");
        i = 0;
    }

    if (i == 0) {
        var id = Users.insert({
            first: $("#firstname").val(),
            last: $("#lastname").val(),
            email: $("#email").val(),
            password: $("#password").val()});
        Session.set("user_id", id);
        console.log(id);
        $('#signup').modal('hide')
        //$("#").html("<div class='alert alert-success'>Thanks" + first + " " + last + "! <br/> You are well on your way to a more organized life!</div>");
    }
}};
