/**
 * Object.values
 */
(function () {
  if (Object.values) return

  Object.values = function (obj) {
    if (obj !== Object(obj)) throw new TypeError('Object.values called on non-object');
    return Object.keys(obj).map(function (key) { return obj[key] })
  }
})()