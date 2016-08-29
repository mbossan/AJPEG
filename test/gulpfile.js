const gulp = require('gulp'),
    ajpeg = require('../index.js');

gulp.task('default', function () {
    return gulp.src("src/*.png")
        .pipe(ajpeg(60))
        .pipe(gulp.dest('dist/'));
});