var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var watch = require('gulp-watch');

gulp.task('bower-files', function() {
	// mainBowerFiles().pipe(gulp.dest('dist/assets'));
	return gulp.src(mainBowerFiles(), {
		base: 'bower_components'
	}).pipe(gulp.dest('dist/assets'));
});
