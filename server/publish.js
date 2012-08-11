// Lists -- {name: String}
Lists = new Meteor.Collection("lists");

// Publish complete set of lists to all clients.
Meteor.publish('lists', function () {
  return Lists.find();
});


// Todos -- {text: String,
//           done: Boolean,
//           tags: [String, ...],
//           list_id: String,
//           timestamp: Number}
Todos = new Meteor.Collection("todos");

// Publish all items for requested list_id.
Meteor.publish('todos', function (list_id) {
  return Todos.find({list_id: list_id});
});

Schools = new Meteor.Collection("schools");
Meteor.publish('schools', function () {
  return Schools.find();
});

Users = new Meteor.Collection("users");
Meteor.publish('users', function () {
  return Users.find();
});
