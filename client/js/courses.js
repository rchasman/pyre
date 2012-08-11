Template.courses.schools = function() {
	return Schools.find({}, {sort: {name: 1}});
}

Template.courses.selected = function() {
	console.log(Session.get('course_id'));
	return Session.equals('course_id', this.name) ? 'selected' : '';
}

Template.courses.events = {
	'mousedown .course-list li': function() {
		Router.setCourse(this.name);
	},
	'click .course-list li': function(e) {
		e.preventDefault();
	}
}

Template.courses.url = function() {
	return encodeURIComponent(this.name);
}
