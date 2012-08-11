Template.nav.is_logged_in = function() {
    return Session.get("user_id") != null;
};

Template.nav.events = {"click #logout":function() {
    Session.set("user_id", null);
}};
