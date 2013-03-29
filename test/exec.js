"use strict"

var D = require('domstantiate')
var exec = require('domstantiate/plugins/exec')
var assert = require('timoxley-assert')

describe('exec plugin', function() {
  var el
  beforeEach(function() {
    el = document.createElement('div')
    el.innerHTML = '<h1 data-exec="done"></h1>'
  })

  it('executes functions', function(done) {
    var d = D({done: function() {
      setTimeout(function() {
        done()
      }, 0)
    }}, el)

    d.use(exec)
  })

  it('calls with el, data', function(done) {
    var d = D({done: function thisFn(el, data) {
      setTimeout(function() {
        assert(el)
        assert(el instanceof Element)
        assert(data)
        assert(typeof data === "object")
        assert(typeof data.exec === "function")
        done()
      }, 0)
    }}, el)

    d.use(exec)
  })
})
