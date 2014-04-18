# gulp-nar [![Build Status](https://travis-ci.org/h2non/gulp-nar.svg?branch=master)][travis] [![Dependency Status](https://gemnasium.com/h2non/gulp-nar.png)][gemnasium] [![NPM version](https://badge.fury.io/js/gulp-nar.png)][npm]

> Create [nar](https://github.com/h2non/nar) archives from [Gulp](http://gulpjs.com)

## Install

```bash
$ npm install --save-dev gulp-nar
```

## Usage

```js
var gulp = require('gulp');
var nar = require('gulp-nar');

gulp.task('nar', function () {
	gulp.src('package.json')
		.pipe(nar('releases/'));
});
```

See [gulpfile.js][example] for more example

## API

### nar(path, options)
`path` Destination directory for the nar archive. Default to current directory
`options` archive creation [options](https://github.com/h2non/nar#narcreateoptions)

### nar.extract(path, options)
`path` Destination directory for the output tar archive  
`options` archive creation [options](https://github.com/h2non/nar#narcreateoptions)


## License

[MIT](http://opensource.org/licenses/MIT) © Tomas Aparicio

[travis]: https://travis-ci.org/h2non/gulp-nar
[gemnasium]: https://gemnasium.com/h2non/gulp-nar
[npm]: http://npmjs.org/package/gulp-nar
[example]: https://github.com/h2non/gulp-nar/blob/master/gulpfile.js
