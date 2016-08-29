const gulp = require('gulp'),
    version = require('./gulp.version');

gulp.task('patch', function () {
    return version('patch');
});
gulp.task('feature', function () {
    return version('minor');
});
gulp.task('release', function () {
    return version('major');
});