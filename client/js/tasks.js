Template.tasks.any_course_selected = function() {
    if (Session.get('user_id') != null){
        return Session.get('course_id') != null;
    }
}

Template.tasks.course = function() {
	var course_id = Session.get('course_id');
	if (!course_id) return {};
	course_id = decodeURIComponent(course_id);
	console.log(course_id);

	var courses = [];
	var schools = Schools.find();
	schools.forEach(function(school) {
		_.each(school.courses, function(course) {courses.push(course)});
	});
	return _.find(courses, function(course) {
		return course.name == course_id;
	});
}

Template.tasks.events = {};

Template.tasks.events[ okcancel_events('#new-task') ] =
  make_okcancel_handler({
    ok: function (text, evt) {
	/*
      var tag = Session.get('tag_filter');
      Todos.insert({
        text: text,
        list_id: Session.get('list_id'),
        done: false,
        timestamp: (new Date()).getTime(),
        tags: tag ? [tag] : []
      });
      evt.target.value = '';
	*/
	//alert('FUCK YOU');
	var course = Template.tasks.course();
	var tasks = Template.tasks.course().tasks;
	var new_task = {
		content: text
	}
	Schools.update({'courses.name': course.name}, {$push: {tasks: new_task}});
	console.log(tasks);
    }
  });

