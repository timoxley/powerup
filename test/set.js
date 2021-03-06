"use strict"

var Powerup = require('powerup')
var set = require('powerup/plugins/set')
var exec = require('powerup/plugins/exec')
var assert = require('timoxley-assert')

describe('set plugin', function() {
  var el
  beforeEach(function() {
    el = document.createElement('div')
    el.innerHTML = '<h1 data-set="user" data-exec="done"></h1>'
  })

  it("can set properties", function(done) {
    var app = {}
    var p = Powerup(app,  el)

    p.use(set)
    p.use(exec)

    app.user = 'Tim'
    app.done = function thisFn(el, data) {
      data.set('Tim Oxley')
      assert.equal(app.user, 'Tim Oxley')
      done()
    }
  })
})


