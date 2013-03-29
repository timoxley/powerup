"use strict"

var _ = require('to-function')
var DDM = require('dom-data-map')
var set = require('set')
var watch = require('simple-watch')
var exec = require('./plugins/exec')
var nextTick = require('next-tick')

module.exports = Domstantiate
function Domstantiate(context, el) {
  if (!(this instanceof Domstantiate)) return new Domstantiate(context, el)
  this.ddm = DDM(context, el)
  this.default = {}
  this.default.selector = "*"
}

Domstantiate.prototype.use = queueNextTick(function use(selector, fn) {
  if (typeof selector === 'function') return selector.call(this)
  selector = selector || this.default.selector
  this.ddm(selector, function(el, data) {
    return fn.call(this, el, data)
  })
})

function queueNextTick(fn) {
  return function() {
    var self = this
    var args = arguments
    nextTick(function() {
      fn.apply(self, args)
    })
  }
}
