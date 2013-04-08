"use strict"

var Powerup = require('powerup')
var get = require('powerup/plugins/get')
var init = require('powerup/plugins/init')
var assert = require('timoxley-assert')

describe('init plugin', function() {
  var el
  beforeEach(function() {
    el = document.createElement('div')
    el.innerHTML = '<h1 data-get="user" data-init="done"></h1>'
  })

  it('runs once on element initialisation', function(done) {
    var app = {}
    var p = Powerup(app,  el)

    p.use(get)
    p.use(init)

    app.done = function thisFn(el, data) {
      assert(data.get === app.user)
      done()
    }
  })
})


