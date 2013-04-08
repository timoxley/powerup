"use strict"

var Powerup = require('powerup')
var get = require('powerup/plugins/get')
var exec = require('powerup/plugins/exec')
var assert = require('timoxley-assert')

describe('plugins', function(){
  var el
  beforeEach(function() {
    el = document.createElement('div')
    el.innerHTML = '<h1 data-get="user" data-exec="done"></h1>'
  })

  it('plugins are evaluated on next tick', function(done) {
    var app = {}
    var p = Powerup(app, el)

    p.use(get)
    p.use(exec)

    app.user = 'Tim'
    app.done = function thisFn(el, data) {
      assert(data.get === app.user)
      done()
    }
  })
})
