"use strict"

var D = require('domstantiate')
var get = require('domstantiate/plugins/get')
var exec = require('domstantiate/plugins/exec')
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
    var d = D(app, el)

    d.use(get)
    d.use(exec)
  })
  it('is evaluated on next tick', function(done) {
    var app = {}
    var d = D(app,  el)

    d.use(get)
    d.use(exec)

    app.user = 'Tim'
    app.done = function thisFn(el, data) {
      console.log(arguments)
      assert(data.get === app.user)
      done()
    }
  })
})

