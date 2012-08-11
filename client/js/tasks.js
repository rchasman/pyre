Template.tasks.any_course_selected = function() {
	return !Session.equals('course_id', null);
}

Template.tasks.course = function() {
	var course_id = Session.get('course_id');
	if (!course_id) return {};
	course_id = decodeURIComponent(course_id);
	console.log(course_id);
	
	var schools = Schools.find();
	var courses = [];
	$.each(schools.docs, function(i, school) {
		console.log(school);
		courses = _.union(school.courses, courses);
	});
	console.log(courses);
	return _.find(courses, function(course) {
		return course.name == course_id;
	});
}
