const gulp = require('gulp'),
    npmPublish = require('gulp-npm-publish');

gulp.task('npm:publish', function () {
    return npmPublish();
});