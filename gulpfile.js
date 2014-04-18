var gulp = require('gulp')
var nar = require('./index')
var version = require('./package.json').version

gulp.task('create', function () {
  return gulp.src('package.json')
    .pipe(nar('.tmp'))
})

gulp.task('createAndCopy', function () {
  return gulp.src('package.json')
    .pipe(nar('.tmp'))
    .pipe(gulp.dest('.tmp/archives'))
})

gulp.task('createAndExtract', function () {
  return gulp.src('package.json')
      .pipe(nar('.tmp/extract'))
      .on('end', function () {
        gulp.src('.tmp/extract/gulp-nar-' + version + '.nar')
          .pipe(nar.extract('.tmp/extract/gulp-nar'))
      })
})

gulp.task('extract', function () {
  return gulp.src('fixtures/fixture.nar')
    .pipe(nar.extract('.tmp/extract/fixture'))
})

gulp.task('default', ['create', 'createAndCopy', 'createAndExtract', 'extract']);
