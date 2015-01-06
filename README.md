Getting-Started-With-Gulp-Part-2
================================

####This repository contains getting started guild with Gulp Part 2.

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

First task help us in **production** environment, Second task help us in **development** environment and Third task help us in **production** environment. Now next turn is for **development** environment, Lets right a task which will help us in **development** environment.

Generally we do some changes, and manually refresh/reload the **HTML** page. We will write a task for it, who will watch our files, and anything gets change into any file from them, it will automatically reload the **HTML** as well.

Add **[Live Reload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei/reviews?hl=en)** extension to your chrome browser. Then update your **gulpfile.js** with below content:

```JavaScript
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
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
        .pipe(concat('all.js'))
        .pipe(gulp.dest('build/js'))
        .pipe(livereload());  // Adding livereload task here. Which creates a livereload server.
});
// Watch Task
// Watches JS
gulp.task('watch', function () {
    livereload.listen(); // Calling lister on livereload task, which will start listening for livereload client.
    gulp.watch('js/*.js', ['scripts']);
});
gulp.task('default', ['scripts', 'watch']);
```

You will see we have added only 3 lines here:

1. ```livereload = require('gulp-livereload')```: With this line, we are requiring **gulp-livereload** module.
2. ```.pipe(livereload())```: With this line, we are running **livereload** task. Which creates a **livereload** server.
3. ```livereload.listen();```: Here we are starting listening for **livereload** client, by default it does not listen.

> NOTE: Here we are using **gulp-livereload** module for **live** **reload** purpose. So install **gulp-livereload**(```npm install --save gulp-livereload```) module if you already have not install.

Lets try **live-reload** task:

1. First of all install **[Live Reload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei/reviews?hl=en)** extension in your chrome browser, if not installed yet.
2. Clone code from ```git@github.com:AmitThakkar/Getting-Started-With-Gulp-Part-2.git``` repository or download code from this [link](https://github.com/AmitThakkar/Getting-Started-With-Gulp-Part-2).
3. Go to clone/download code directory and run ```npm isntall``` command, so it will install all require modules and then ```gulp``` command so it will generate **minify** and **concat** file, and will run **watch** and **livereload** task, and will start listening **livereload** client.
4. Now open **Gulp-Part-2.html** from any server(Do not open directly)(I am using **WebStorm** IDE and **WebStorm** runs **HTML** files from a server on http://localhost:63342/).
5. If you have install **Live Reload** extension in chrome then it will added to your top menu with other extensions. if your are seeing ![Off]()