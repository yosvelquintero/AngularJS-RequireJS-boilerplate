const gulp = require('gulp'),
  connect = require('gulp-connect');

gulp.task('serve', function () {
  connect.server({
    root: './',
    port: 3000,
  });
});

gulp.task('default', ['serve']);
