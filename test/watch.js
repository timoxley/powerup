"use strict"

var D = require('domstantiate')
var watch = require('domstantiate/plugins/watch')
var exec = require('domstantiate/plugins/exec')
var assert = require('timoxley-assert')

describe('watch plugin', function() {
  var el
  beforeEach(function() {
    el = document.createElement('div')
    el.innerHTML = '<h1 data-watch="user" data-exec="done"></h1>'
  })

  it("triggers exec when property changes", function(done) {
    var app = {}
    var d = D(app,  el)

    d.use(watch)
    d.use(exec)

    app.user = 'Tim'
    var called = 0
    app.done = function(el, data) {
      // skip first call
      if (!called) {
        called++
        app.user = 'Tim Oxley'
        return
      }
      assert.equal(app.user, 'Tim Oxley')
      setTimeout(function() {
        if (called > 1) throw new Error('Called multiple times')
        done()
      }, 1)
    }
  })
})



