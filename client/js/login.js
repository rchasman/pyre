Meteor.subscribe("users");
Template.logged_in.events = {"click #login-submit":function() {
    username = $("#login-user").val();
    password = $("#login-pass").val();
    result = Users.findOne({username: username, password: password});
    if(result)
        Session.set("user_id", result._id)
}};
