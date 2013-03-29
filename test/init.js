"use strict"

var D = require('domstantiate')
var get = require('domstantiate/plugins/get')
var init = require('domstantiate/plugins/init')
var assert = require('timoxley-assert')

describe('init plugin', function() {
  var el
  beforeEach(function() {
    el = document.createElement('div')
    el.innerHTML = '<h1 data-get="user" data-init="done"></h1>'
  })

  it('runs once on element initialisation', function(done) {
    var app = {}
    var d = D(app,  el)

    d.use(get)
    d.use(init)

    app.done = function thisFn(el, data) {
      console.log(arguments)
      assert(data.get === app.user)
      done()
    }
  })
})


