"use strict"
var _ = require('to-function')

module.exports = function() {
  return this.use('[data-exec]', function(el, data) {
    var path = el.attributes['data-exec'].value

    data.exec = _(path)(this).bind(this)
    data.exec(el, data)
    return data
  })
}
