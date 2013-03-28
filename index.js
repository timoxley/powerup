"use strict"

var _ = require('to-function')
var DDM = require('dom-data-map')
var set = require('set')

module.exports = function Domstantiate(context, el) {
  if (!(this instanceof Domstantiate)) return new Domstantiate(context, el)
  var ddm = DDM(context, el)

  function Refresh() {
    ddm('[data-get]', function(el, data) {
      var path = el.attributes['data-get'].value
      data.get = _(path)(context)
      if (typeof data.get === 'function')
      data.get = data.get.call(context)
      return data
    })

    ddm('[data-set]', function(el, data) {
      var path = el.attributes['data-set'].value
      data.set = set(this, path)
      return data
    })

    ddm('[data-exec]', function(el, data) {
      var path = el.attributes['data-exec'].value
      data.exec = _(path)(context)
      data.exec(el, data.get, data.set)
      return data
    })
    return Refresh
  }
  return Refresh()
}
