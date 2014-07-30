# gulp-[nar](https://github.com/h2non/nar) [![Build Status](https://travis-ci.org/h2non/gulp-nar.svg?branch=master)][travis] [![Dependency Status](https://gemnasium.com/h2non/gulp-nar.png)][gemnasium] [![NPM version](https://badge.fury.io/js/gulp-nar.png)][npm]

> Create and extract [nar](https://github.com/h2non/nar) archives from [Gulp](http://gulpjs.com)

## Installation

Install `nar` as global package
```bash
$ npm install -g nar
```

Install the task
```bash
$ npm install gulp-nar --save-dev
```

## Usage

```js
var gulp = require('gulp')
var nar = require('gulp-nar')

gulp.task('create', function () {
  gulp.src('package.json')
    .pipe(nar.create('releases/'))
})

gulp.task('create-executable', function () {
  gulp.src('package.json')
    .pipe(nar.createExecutable('releases/'))
})

gulp.task('extract', function () {
  gulp.src('app.nar')
    .pipe(nar.extract('app/'))
})
```

See [gulpfile.js][example] for more examples

## API

### nar.create(path, options)

Creates an archive according to the `package.json` [configuration](https://github.com/h2non/nar#configuration)

- **path** `string` Destination directory for the nar archive. Default to current directory
- **options** `object` Archive creation [options](https://github.com/h2non/nar#narcreateoptions)

### nar.createExecutable(path, options)

Creates an [executable binary-like](https://github.com/h2non/nar#executables) archive

- **path** `string` Destination directory for the nar archive. Default to current directory
- **options** `object` Executable creation [options](https://github.com/h2non/nar#narcreateexecoptions)

### nar.extract(path, options)

Extract archive content into a directory

- **path** `string` Destination directory for the extracted files. Default to current directory
- **options** `object` Archive extract [options](https://github.com/h2non/nar#narextractoptions)

## License

[MIT](http://opensource.org/licenses/MIT) © Tomas Aparicio

[travis]: https://travis-ci.org/h2non/gulp-nar
[gemnasium]: https://gemnasium.com/h2non/gulp-nar
[npm]: http://npmjs.org/package/gulp-nar
[example]: https://github.com/h2non/gulp-nar/blob/master/gulpfile.js
