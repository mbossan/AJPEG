const gulp = require('gulp'),
    version = require('./gulp.version'),

    sourcemaps = require("gulp-sourcemaps"),
    concat = require("gulp-concat"),
    uglify = require('gulp-uglify'),
    browserify = require("browserify"),
    babelify = require("babelify"),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer');


gulp.task("default", function () {
    return browserify({
        entries: "decoder/js/Main.js",
        debug: true
    })
        .transform(babelify.configure({
            comments: false,
            presets: ["es2015"]
        }))
        .bundle()
        .pipe(source('ajpeg.js'))
        .pipe(buffer())

        .pipe(gulp.dest("decoder/dist"))

        .pipe(concat('ajpeg.min.js'))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('./decoder/dist'))

        .on("error", function (err) {
            console.log("Error: " + err.message);
        });
});


gulp.task('patch', function () {
    return version('patch');
});
gulp.task('feature', function () {
    return version('minor');
});
gulp.task('release', function () {
    return version('major');
});