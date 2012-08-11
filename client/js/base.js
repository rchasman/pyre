Template.base.is_logged_in = function() {
    return true;
    return Session.get("user_id") != null;
};
