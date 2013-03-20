"use strict"

var _ = require('to-function')
var DDM = require('dom-data-map')

module.exports = function Domstantiate(context) {
  if (!(this instanceof Domstantiate)) return new Domstantiate(context)

  var ddm = this.ddm = DDM(context)
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
