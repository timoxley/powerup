"use strict"

var _ = require('to-function')
var DDM = require('dom-data-map')

module.exports = function View(context) {
  if (!(this instanceof View)) return new View(context)

  var ddm = DDM(context)
  ddm('[data-scope]', function(el, data) {
    var path = el.attributes['data-scope'].value
    var scopeData = _(path)(this)
    data.scope = typeof scopeData === 'function'
    ? scopeData.call(this)
    : scopeData
    return data
  })

  ddm('[data-fn]', function(el, data) {
    var path = el.attributes['data-fn'].value
    data.fn = _(path)(this)
    data.fn(el, data.scope)
    return data
  })
}
