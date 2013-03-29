"use strict"

var _ = require('to-function')

module.exports = function(options) {
  options = options || {}
  options.eval = !!options.eval || true
  var attr = options.attr || 'get'

  return this.use('[data-'+attr+']', function(el, data) {
    var path = el.attributes['data-'+attr].value
    data[attr] = _(path)(this)
    if (options.eval && typeof data[attr] === 'function')
      data[attr] = data[attr].call(context)
    return data
  })
}
