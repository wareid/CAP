const gulp = require('gulp');
var prettyHtml = require('gulp-pretty-html');

// pretty-print the xml files
gulp.task('pretty', (done) => {
  gulp.src('_site/**/*.html', {base: './'})
    .pipe(prettyHtml({
      preserve_newlines: false
    }))
    .pipe(gulp.dest('./'));
  done();
});
