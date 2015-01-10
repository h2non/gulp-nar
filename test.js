'use strict';

var fs = require('fs')
var path = require('path')
var assert = require('assert')
var File = require('gulp-util').File
var nar = require('./index')
var version = require('./package.json').version

var archivePath = path.join(__dirname, '.tmp', 'gulp-nar-' + version + '.nar')

describe('create', function () {
  var stream

  before(function () {
    stream = nar.create('.tmp')
  })

  it('should create a new archive', function (done) {
    stream.on('data', function (file) {
      assert.equal(file.path, archivePath)
      done()
    })

    stream.write(new File({
      cwd: __dirname,
      base: __dirname,
      path: path.join(__dirname, 'package.json'),
      contents: new Buffer('fake data')
    }))

    stream.end()
  })

  it('should exists the archive', function () {
    assert.equal(fs.existsSync(archivePath), true)
  })
})

describe('create executable', function () {
  var stream
  var executablePath = path.join(__dirname, '.tmp', 'gulp-nar-' + version + '-' + process.platform + '-' + process.arch + '.nar')

  before(function () {
    stream = nar.createExecutable('.tmp')
  })

  it('should create a new archive', function (done) {
    stream.on('data', function (file) {
      assert.equal(file.path, executablePath)
      done()
    })

    stream.write(new File({
      cwd: __dirname,
      base: __dirname,
      path: path.join(__dirname, 'package.json'),
      contents: new Buffer('fake data')
    }))

    stream.end()
  })

  it('should exists the archive', function () {
    assert.equal(fs.existsSync(executablePath), true)
  })
})

describe('extract', function () {
  var stream
  var dest = path.join(__dirname, '.tmp', 'extract')

  before(function () {
    stream = nar.extract(dest)
  })

  it('should extract the archive', function (done) {
    stream.on('data', function (file) {
      assert.equal(file.path, archivePath)
      done()
    })

    stream.write(new File({
      cwd: __dirname,
      base: __dirname,
      path: archivePath,
      contents: new Buffer('fake data')
    }))

    stream.end()
  })

  it('should exists the output directory', function () {
    assert.equal(fs.existsSync(dest), true)
  })

  it('should exists package.json', function () {
    assert.equal(fs.existsSync(path.join(dest, 'package.json')), true)
  })

  it('should exists .nar.json', function () {
    assert.equal(fs.existsSync(path.join(dest, '.nar.json')), true)
  })

  it('should exists index.js', function () {
    assert.equal(fs.existsSync(path.join(dest, 'index.js')), true)
  })

  it('should exists the node_modules directory', function () {
    assert.equal(fs.existsSync(path.join(dest, 'node_modules')), true)
  })

  it('should exists nar package dependency', function () {
    assert.equal(fs.existsSync(path.join(dest, 'node_modules', 'nar', 'package.json')), true)
  })

  it('should exists mkdirp package dependency', function () {
    assert.equal(fs.existsSync(path.join(dest, 'node_modules', 'mkdirp', 'package.json')), true)
  })
})
