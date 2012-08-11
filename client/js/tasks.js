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
	console.log(schools);
	schools.forEach(function(school) {
		console.log(school);
		//courses.push(school.courses);
		_.each(school.courses, function(course) {courses.push(course)});
	});
	console.log(courses);
	return _.find(courses, function(course) {
		return course.name == course_id;
	});
}
