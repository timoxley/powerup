"use strict"

var Powerup = require('powerup')
var exec = require('powerup/plugins/exec')
var assert = require('timoxley-assert')

describe('exec plugin', function() {
  var el
  beforeEach(function() {
    el = document.createElement('div')
    el.innerHTML = '<h1 data-exec="done"></h1>'
  })

  it('executes functions', function(done) {
    var p = Powerup({done: function() {
      setTimeout(function() {
        done()
      }, 0)
    }}, el)

    p.use(exec)
  })

  it('calls with el, data', function(done) {
    var p = Powerup({done: function thisFn(el, data) {
      setTimeout(function() {
        assert(el)
        assert(el instanceof Element)
        assert(data)
        assert(typeof data === "object")
        assert(typeof data.exec === "function")
        done()
      }, 0)
    }}, el)

    p.use(exec)
  })
})
