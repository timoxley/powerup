"use strict"
var _ = require('to-function')

module.exports = function() {
  return this.use('[data-init]', function(el, data) {
    var path = el.attributes['data-init'].value
    data.init = _(path)(this).bind(this)
    data.init(el, data)
    return data
  })
}
