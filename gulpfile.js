var gulp = require('gulp')
var log = gulp.log
var nar = require('./index')
var version = require('./package.json').version

gulp.task('default', function (cb) {

  // create from package.json
	gulp.src('package.json')
		.pipe(nar('.tmp'))

	// create and copy to another location
	gulp.src('package.json')
    .pipe(nar('.tmp'))
    .pipe(gulp.dest('.tmp/archives'))

  // create and extract
  gulp.src('package.json')
    .pipe(nar('.tmp'))
    .on('end', function () {
      gulp.src('.tmp/gulp-nar-' + version + '.nar')
        .pipe(nar.extract('.tmp/extract/gulp-nar'))
    })

  // extract
  gulp.src('fixture/fixture.nar')
    .pipe(nar.extract('.tmp/extract/fixture'))

})
