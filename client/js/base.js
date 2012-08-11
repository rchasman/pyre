Template.base.is_logged_in = function() {
    return Session.get("user_id") != null;
};

Template.logged_in.is_logged_in = function() {
    return Session.get("user_id") != null;
};
