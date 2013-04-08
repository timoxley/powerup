"use strict"

var _ = require('to-function')

module.exports = function(options) {
  options = options || {}
  return this.use('[data-scope]', function(el, data) {
    var path = el.attributes['data-scope'].value
    data.context = _(path)(this)
    return data
  })
}
