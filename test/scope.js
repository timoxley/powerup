"use strict"

var Powerup = require('powerup')
var scope = require('powerup/plugins/scope')
var exec = require('powerup/plugins/exec')
var assert = require('timoxley-assert')

describe('scope plugin', function(){
  var el
  beforeEach(function() {
    console.count('before')
    el = document.createElement('div')
    el.innerHTML = '<div data-scope="project"><div data-exec="done"></div></div>'
  })

  it('data is scoped', function(done) {
    var app = {
      project: {
        name: 'Powerup'
      }
    }

    app.project.done = function thisFn(el) {
      assert(this.name === 'Powerup')
      done()
    }
    var p = Powerup(app, el)

    p.use(scope)
    p.use(exec)
  })
})

