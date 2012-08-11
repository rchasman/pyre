Template.task_item.done_class = function () {
  return this.done ? 'done' : '';
};

Template.task_item.done_checkbox = function () {
  return this.done ? 'checked="checked"' : '';
};

Template.task_item.editing = function () {
  return Session.equals('editing_itemname', this._id);
};

Template.task_item.adding_tag = function () {
  return Session.equals('editing_addtag', this._id);
};

Template.task_item.events = {
  'click .check': function () {
    Todos.update(this._id, {$set: {done: !this.done}});
  },

  'click .destroy': function () {
    Todos.remove(this._id);
  },

  'dblclick .display .todo-text': function (evt) {
    Session.set('editing_itemname', this._id);
    Meteor.flush(); // update DOM before focus
    focus_field_by_id("todo-input");
  },

  'click .remove': function (evt) {
    var tag = this.tag;
    var id = this.todo_id;

    evt.target.parentNode.style.opacity = 0;
    // wait for CSS animation to finish
    Meteor.setTimeout(function () {
      Todos.update({_id: id}, {$pull: {tags: tag}});
    }, 300);
  }

};

Template.task_item.events[ okcancel_events('#todo-input') ] =
  make_okcancel_handler({
    ok: function (value) {
      Todos.update(this._id, {$set: {text: value}});
      Session.set('editing_itemname', null);
    },
    cancel: function () {
      Session.set('editing_itemname', null);
    }
  });

Template.task_item.events[ okcancel_events('#edittag-input') ] =
  make_okcancel_handler({
    ok: function (value) {
      Todos.update(this._id, {$addToSet: {tags: value}});
      Session.set('editing_addtag', null);
    },
    cancel: function () {
      Session.set('editing_addtag', null);
    }
  });
