'use strict';

var fs = require('fs')
var path = require('path')
var gutil = require('gulp-util')
var through = require('through2')
var assign = require('object-assign')
var nar = require('nar')
var mk = require('mkdirp').sync

var NAME = 'gulp-nar'

exports = module.exports = narTask('create')
exports.create = module.exports
exports.extract = narTask('extract')

function narTask(action) {
  return function task(output, options) {
    var fileStream, archivePath

    return through.obj(function (file, enc, cb) {
      if (file.isNull()) { return cb() }
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
            cb()
          })
      }

    }, function (cb) {
      var outputPath

      if (!fileStream) {
        return cb()
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

      cb()
    })
  }
}
