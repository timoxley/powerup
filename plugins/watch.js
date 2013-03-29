var watch = require('simple-watch')

module.exports = function() {
  return this.use('[data-watch]', function(el, data) {
    var path = el.attributes['data-watch'].value
    data.watch = watch(this, path, function(current, previous) {
      if (data.exec) data.exec(el, data, current, previous)
    })
    return data
  })
}
