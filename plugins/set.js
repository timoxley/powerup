"use strict"

var _ = require('to-function')
var set = require('set')

module.exports = function(options) {
  options = options || {}


  var attr = options.attr || 'set'
  return this.use('[data-'+attr+']', function(el, data) {
    var path = el.attributes['data-'+attr].value
    data[attr] = set(this, path)
    return data
  })
}
