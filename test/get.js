"use strict"

var Powerup = require('powerup')
var get = require('powerup/plugins/get')
var exec = require('powerup/plugins/exec')
var assert = require('timoxley-assert')

describe('get plugin', function() {
  var el
  beforeEach(function() {
    el = document.createElement('div')
    el.innerHTML = '<h1 data-get="user" data-exec="done"></h1>'
  })

  it('calls with el, data', function(done) {
    var app = {
      user: 'Tim',
      done: function thisFn(el, data) {
        assert(data.get === app.user)
        done()
      }
    }
    var p = Powerup(app, el)

    p.use(get)
    p.use(exec)
  })
})

