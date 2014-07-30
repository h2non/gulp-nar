'use strict';

var fs = require('fs')
var path = require('path')
var gutil = require('gulp-util')
var through = require('through2')
var assign = require('object-assign')
var mk = require('mkdirp').sync
var resolve = require('requireg').resolve

var NAME = 'gulp-nar'

exports = module.exports = narTask('create')
exports.createExecutable = narTask('createExec')
exports.extract = narTask('extract')
exports.create = exports

function narTask(action) {
  return function task(output, options) {
    var fileStream, archivePath

    var nar = resolve('nar')
    if (!nar) { narError() }
    nar = require(nar)

    return through.obj(onWrite, onEnd)

    function onWrite(file, enc, done) {
      if (file.isNull()) { return done() }
      if (!fileStream) { fileStream = file }

      try {
        doTask()
      } catch (err) {
        throw new gutil.PluginError(NAME, err);
      }

      function doTask() {
        if (!fs.existsSync(output)) {
          mk(output)
        }

        nar[action](assign({ dest: output, path: file.path }, (options || {})))
          .on('error', function (err) {
            throw err
          })
          .on('end', function (dest) {
            archivePath = dest
            done()
          })
      }
    }

    function onEnd(done) {
      var outputPath

      if (!fileStream) {
        return done()
      }

      if (archivePath) {
        if (typeof archivePath === 'object') {
          outputPath = archivePath.path
        } else {
          outputPath = path.join(fileStream.base, archivePath)
        }
      } else {
        outputPath = fileStream.base
      }

      this.push(new gutil.File({
        cwd: fileStream.cwd,
        base: fileStream.base,
        path: outputPath,
        contents: fs.createReadStream(outputPath)
      }))

      done()
    }

  }
}

function narError() {
  throw new Error([
    '', 'Fatal error:', 'nar is not installed as global package',
    '', 'You must install it. Run:',
    'npm install -g nar', ''
  ].join('\n'))
}
