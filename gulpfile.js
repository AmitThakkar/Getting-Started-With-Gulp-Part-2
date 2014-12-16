/**
 * Created by Amit Thakkar on 10/12/14.
 */
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload');

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
        .pipe(concat('all.js'))
        .pipe(gulp.dest('build/js'))
        .pipe(livereload());
});

// Watch Task
// Watches JS
gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('js/*.js', ['scripts']);
});

gulp.task('default', ['scripts', 'watch']);