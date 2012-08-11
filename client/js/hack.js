// Client-side JavaScript, bundled and sent to client

// Define Minimongo collections to match server/publish.js.
Lists = new Meteor.Collection("lists");
Todos = new Meteor.Collection("todos");

Schools = new Meteor.Collection('schools');
Users = new Meteor.Collection('users');

// ID of currently selected list
Session.set('list_id', null);
Session.set('course_id', null);

// When adding tag to a todo, ID of the todo
Session.set('editing_addtag', null);

// When editing a list name, ID of the list
Session.set('editing_listname', null);

// When editing todo text, ID of the todo
Session.set('editing_itemname', null);


// Subscribe to 'lists' collection on startup.
// Select a list once data has arrived.
Meteor.subscribe('lists', function () {
/*
	if (Session.get('user_id')) {
		if (!Session.get('list_id')) {
			var list = Lists.findOne({}, {sort: {name: 1}});
			if (list)
				Router.setList(list._id);
		}
	}
*/
});

Meteor.subscribe('schools', function() {
	if (Session.get('user_id')) {
		if (!Session.get('course_id')) {
			var school = Schools.findOne({}, {sort: {name: 1}});
			if (school)
				Router.setCourse(encodeURIComponent(school.courses[0].name));
		}
	}
});

// Always be subscribed to the todos for the selected list.
Meteor.autosubscribe(function () {
  var list_id = Session.get('list_id');
  if (list_id)
    Meteor.subscribe('todos', list_id);
});

/*
Meteor.autosubscribe(function () {
	var course_id = Session.get('course_id');
	if (course_id)
		Meteor.subscribe('todos', course_id);
});
*/


////////// Helpers for in-place editing //////////

// Returns an event_map key for attaching "ok/cancel" events to
// a text input (given by selector)
var okcancel_events = function (selector) {
  return 'keyup '+selector+', keydown '+selector+', focusout '+selector;
};

// Creates an event handler for interpreting "escape", "return", and "blur"
// on a text field and calling "ok" or "cancel" callbacks.
var make_okcancel_handler = function (options) {
  var ok = options.ok || function () {};
  var cancel = options.cancel || function () {};

  return function (evt) {
    if (evt.type === "keydown" && evt.which === 27) {
      // escape = cancel
      cancel.call(this, evt);

    } else if (evt.type === "keyup" && evt.which === 13 ||
               evt.type === "focusout") {
      // blur/return/enter = ok/submit if non-empty
      var value = String(evt.target.value || "");
      if (value)
        ok.call(this, value, evt);
      else
        cancel.call(this, evt);
    }
  };
};

// Finds a text input in the DOM by id and focuses it.
var focus_field_by_id = function (id) {
  var input = document.getElementById(id);
  if (input) {
    input.focus();
    input.select();
  }
};


////////// Tracking selected list in URL //////////

var TodosRouter = Backbone.Router.extend({
  routes: {
    "": "main",
	"list/:list_id": "main_list",
	"course/:course_id": "main"
  },
  main_list: function (list_id) {
    Session.set("list_id", list_id);
  },
  main: function (course_id) {
    Session.set("course_id", decodeURIComponent(course_id));
  },
  setList: function (list_id) {
    this.navigate('/list/'+list_id, true);
  },
	setCourse: function (course_id) {
		this.navigate('/course/'+course_id, true);	
	}
});

Router = new TodosRouter;

Meteor.startup(function () {
  Backbone.history.start({pushState: true});
});
