const gulp = require('gulp'),
    git = require('gulp-git'),
    filter = require('gulp-filter'),
    tag_version = require('gulp-tag-version'),
    bump = require('gulp-bump');

module.exports = function (importance, files) {
    if (typeof files == "undefined" || !files)
        files = 'package.json';
    return gulp.src(files)
        .pipe(bump({type: importance}))
        .pipe(gulp.dest('./'))
        .pipe(git.commit('bumps package version'))
        .pipe(filter('package.json'))
        .pipe(tag_version());
}