Getting-Started-With-Gulp-Part-2
================================

###This repository contains getting started guild with Gulp Part 2.

In my last [blog](http://codechutney.in/blog/nodejs/getting-started-with-gulp/) we build small demo with **Gulp** as below:

```JavaScript
var gulp = require('gulp'),
    uglify = require('gulp-uglify');
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
        .pipe(gulp.dest('build/js'));
});
// Watch Task
// Watches JS
gulp.task('watch', function () {
    gulp.watch('js/*.js', ['scripts']);
});
gulp.task('default', ['scripts', 'watch']);
```

Now in this blog, we will concat all minified ```.js``` files into one file with named ```all.js```. And anything changes happen into any ```.js``` file, then we will do live reloading on the Browser.

First lets concat all ```.js``` files, for concat all the ```.js``` files, there is a task is already written, that is ```gulp-concat```. We have to install this with ```npm install --save gulp-concat```. After installing the ```gulp-concat```, we have simple require like early we have done for ```gulp-uglify```. Then call concat task after minifing/uglifing all the ```.js``` file and before storing to destination directive as below:

```JavaScript
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'); // Requiring gulp-concat task.
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
        .pipe(concat('all.js')) // Adding concat task here.
        .pipe(gulp.dest('build/js'));
});
// Watch Task
// Watches JS
gulp.task('watch', function () {
    gulp.watch('js/*.js', ['scripts']);
});
gulp.task('default', ['scripts', 'watch']);
```

Lets first delete ```build``` directory from your project directory. So we can insure that there is no build directory.

![RemoveBuildDirectory.png](https://raw.githubusercontent.com/AmitThakkar/Getting-Started-With-Gulp-Part-2/master/RemoveBuildDirectory.png)

Now run ```gulp``` command again. After running the ```gulp``` command, we will see, there is ```build/js``` directories have created and it having only one ```.js``` file with name **all.js**, which we provided **concat** task (```.pipe(concat('all.js'))```). All the ```.js``` files have first **uglified** then **concat** to a single file with named **all.js**. That's why we have only one **all.js** file into ```build/js``` directory.

Till now, we have learn
1. How to minify the ```.js``` files? (In first [blog](http://codechutney.in/blog/nodejs/getting-started-with-gulp/))
2. How to re-run tasks whenever specific files get change? (In first [blog](http://codechutney.in/blog/nodejs/getting-started-with-gulp/))
3. How to concat them into one ```.js``` file.

1st task help us in **production** environment, 2nd task help us in **development** environment and 3rd task help us in **production** environment. Now next turn is for **development** environment, Lets right a task which will help us in **development** environment.

Generally we do some changes, and manually refresh/reload the **HTML** page. We will write a task for it, who will watch our files, and anything gets change into any file from them, it will automatically reload the **HTML**.

Add **[Live Reload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei/reviews?hl=en)** extensions to your chrome browser. Then update your **gulpfile.js** with below content:

```JavaScript
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
```

You will see we have added only 3 lines here:
1. ```livereload = require('gulp-livereload')```:
2. ```.pipe(livereload())```
3. ```livereload.listen();```

Now we are using **gulp-livereload** module for **live** **reload** purpose. So install **gulp-livereload**(```npm install --save gulp-livereload```) module if you already have not install.