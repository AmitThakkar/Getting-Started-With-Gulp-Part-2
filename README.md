#Getting Started with GulpJS Part-2

####This repository contains Getting started guild with GulpJS Part 2.

In my last [blog](http://codechutney.in/blog/nodejs/getting-started-with-gulp/) we had built a small demo with **Gulp** as given below:

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

Now in this blog, we will concatenate all minified ```.js``` files into one file with name ```all.js```. And if any changes happen into ```.js``` file, then we will do live reloading on the Browser.

First lets concatenate all ```.js``` files, for concatenating all the ```.js``` files, there is a task already written, that is ```gulp-concat```. We have to install this with ```npm install --save gulp-concat```. After installing the ```gulp-concat```, we have to simply use 'require' like earlier we had done for ```gulp-uglify```. Then call concat task after minifing/uglifing all the ```.js``` files, before storing to the destination directive as below:

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

Let's first delete ```build``` directory from our project directory, so that we can ensure that there is no ```build``` directory.

![RemoveBuildDirectory.png](https://raw.githubusercontent.com/AmitThakkar/Getting-Started-With-Gulp-Part-2/master/RemoveBuildDirectory.png)

Now run ```gulp``` command again. After running the ```gulp``` command, we will see that```build/js``` directory has been created and it is having only one ```.js``` file with name **all.js**, where we provided **concat** task (```.pipe(concat('all.js'))```). All the ```.js``` files have been first **uglified** then **concatenated** to a single file with named **all.js**. That's why we have only one **all.js** file into ```build/js``` directory.

Till now, we have learn

1. How to minify the ```.js``` files? (In first [blog](http://codechutney.in/blog/nodejs/getting-started-with-gulp/))
2. How to re-run tasks whenever specific files get change? (In first [blog](http://codechutney.in/blog/nodejs/getting-started-with-gulp/))
3. How to concat them into one ```.js``` file.

First task help us in **production** environment, Second task help us in **development** environment and Third task help us in **production** environment. Now next turn is for **development** environment, Lets right a task which will help us in **development** environment.

Generally we do some changes, and manually refresh/reload the **HTML** page. We will write a task for it, which will watch our files, and if anything gets changed in any file, it will automatically reload the **HTML** as well.

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
        .pipe(livereload());  // Live reloading the client, here we have chrome browser.
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
3. Go to clone/download code directory and run ```npm install``` command, so it will install all required modules and then ```gulp``` command so it will generate **minify** and **concat** files, and will run **watch** and **livereload** task, and will start listening for **livereload** client.
4. Now open **Gulp-Part-2.html** from any server(do not open directly).I am using **WebStorm** IDE and **WebStorm** runs **HTML** files in a server which runs on http://localhost:63342/.
5. If you have **Live Reload** extension in chrome then it will be added to your top menu with other extensions. If you are seeing ![Off](https://raw.githubusercontent.com/AmitThakkar/Getting-Started-With-Gulp-Part-2/master/images/Not%20Running.png) icon that means your **livereload** client is not running and if you are seeing ![On](https://raw.githubusercontent.com/AmitThakkar/Getting-Started-With-Gulp-Part-2/master/images/Running.png) icon that means your **livereload** client is running. If **liverelaod** client is not running then click on that icon it will start **livereload** client.
6. Now do some changes in any ```.js``` file form **js** directory, and save that file, you will see **gulp** run all the task again and that **HTML** has reloaded again.

Now do your development, and forget to refresh the page, our **Gulp** task will take care of this. :-)

Follow Me
---
[Github](https://github.com/AmitThakkar)

[Twitter](https://twitter.com/amit_thakkar01)

[LinkedIn](https://in.linkedin.com/in/amitthakkar01)

[More Blogs By Me](http://amitthakkar.github.io/)