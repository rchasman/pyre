Template.lists.lists = function () {
  return Lists.find({}, {sort: {name: 1}});
};

Template.lists.events = {
  'mousedown .list': function (evt) { // select list
    Router.setList(this._id);
  },
  'click .list': function (evt) {
    // prevent clicks on <a> from refreshing the page.
    evt.preventDefault();
  },
  'dblclick .list': function (evt) { // start editing list name
    Session.set('editing_listname', this._id);
    Meteor.flush(); // force DOM redraw, so we can focus the edit field
    focus_field_by_id("list-name-input");
  }
};

Template.lists.events[ okcancel_events('#list-name-input') ] =
  make_okcancel_handler({
    ok: function (value) {
      Lists.update(this._id, {$set: {name: value}});
      Session.set('editing_listname', null);
    },
    cancel: function () {
      Session.set('editing_listname', null);
    }
  });

// Attach events to keydown, keyup, and blur on "New list" input box.
Template.lists.events[ okcancel_events('#new-list') ] =
  make_okcancel_handler({
    ok: function (text, evt) {
      var id = Lists.insert({name: text});
      Router.setList(id);
      evt.target.value = "";
    }
  });

Template.lists.selected = function () {
  return Session.equals('list_id', this._id) ? 'selected' : '';
};

Template.lists.name_class = function () {
  return this.name ? '' : 'empty';
};

Template.lists.editing = function () {
  return Session.equals('editing_listname', this._id);
};
