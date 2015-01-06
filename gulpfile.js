/**
 * Created by Amit Thakkar on 10/12/14.
 */
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'), // Requiring gulp-concat task.
    livereload = require('gulp-livereload'); // Requiring gulp-livereload task.

function errorLog(error) {
    console.error(error);
    this.emit('end');
}

// Scripts Task
// Uglify
gulp.task('scripts', function () {
    gulp.src('js/*.js')
        .pipe(uglify())
        .on('error', errorLog)
        .pipe(concat('all.js')) // Adding concat task here
        .pipe(gulp.dest('build/js'))
        .pipe(livereload()); // Adding livereload task here. Which creates a livereload server.
});

// Watch Task
// Watches JS
gulp.task('watch', function () {
    livereload.listen(); // Calling lister on livereload task, which will start listening for livereload client.
    gulp.watch('js/*.js', ['scripts']);
});

gulp.task('default', ['scripts', 'watch']);