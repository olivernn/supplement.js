/**
 * Object.values
 */
supplement.defineMethod(Object, 'values', function (obj) {
  if (obj !== Object(obj)) throw new TypeError('Object.values called on non-object');
  return Object.keys(obj).map(function (key) { return obj[key] })
});

/**
 * Object.values
 */
supplement.defineMethod(Object, 'provide', function (obj) {
  if (obj !== Object(obj)) throw new TypeError('Object.provide called on non-object');
  var properties = Array.prototype.slice.call(arguments, 1)
  var node = obj
  properties.forEach(function (prop) {
    if (!node[prop]) {
      node[prop] = {}
    } else if (node[prop] !== Object(node[prop])) {
      throw new TypeError('Object.provide can only add properties to a plain object')
    }
    node = node[prop]
  })
  return node
});