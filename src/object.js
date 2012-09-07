/**
 * ## Object.values
 * Returns all the enumeralbe values of an object.  Will not return any values from higher up the prototype
 * chain.
 *
 * @param {Object} the object whose values you want
 * @returns {Array} an array of this objects values
 * @throws {TypeError} when passed a non plain object
 *
 * ### Example
 *     Object.values({foo: "bar"})
 *     // returns ["foo"]
 */
supplement.defineMethod(Object, 'values', function (obj) { "use strict";
  if (obj !== Object(obj)) throw new TypeError('Object.values called on non-object');
  return Object.keys(obj).map(function (key) { return obj[key] })
});

/**
 * ## Object.provide
 * Returns a property of an object which is nested arbitrarily deep within another object.  If at any point
 * along the chain of properties it finds a property that doesn't exist it populates that property with a 
 * blank object and continues.
 *
 * @param {Object} the object for which you wish to navigate through
 * @params {String} any number of properties which will be nested within each other in the object
 * @returns {Object} the object at the end of the nested properties
 *
 * ### Example
 *     var a = {}
 *     Object.provide(a, 'foo', 'bar', 'baz)
 *     // returns {} which is equal to a.foo.bar.baz
 */
supplement.defineMethod(Object, 'provide', function (obj) { "use strict";
  if (obj !== Object(obj)) throw new TypeError('Object.provide was passed a non-object');
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

/**
 * ## Object.typeOf
 * A more robust version of the native typeof command.  This function will reliably return the correct type
 * of the passed object.  It is able to distinguish between arrays, arguments and plain objects for example.
 *
 * @params {Object} any kind of object for which you want to know its type.
 * @returns {String} the string type of the object.
 *
 * ### Example
 *     Object.typeOf([]) // returns 'array'
 *     Object.typeOf({}) // returns 'object'
 *     Object.typeOF(1)  // returns 'number'
 */
supplement.defineMethod(Object, 'typeOf', function (obj) { "use strict";
  return Object.prototype.toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()
});

/**
 * ## Object.isArray
 * ## Object.isFunction
 * ## Object.isString
 * ## Object.isNumber
 * ## Object.isBoolean
 * ## Object.isArguments
 * ## Object.isRegexp
 * ## Object.isDate
 * Convinience wrappers around `Object.typeOf`.  For checking arrays it is better to use the native
 * `Array.isArray` method.
 *
 * @see Array.isArray
 * @param {Object} the object to test
 * @returns {Boolean} true only if the object is of the correct type
 */
(["Array", "Function", "String", "Number", "Boolean", "Regexp", "Date"]).forEach(function (type) {
  supplement.defineMethod(Object, 'is' + type, function (obj) { "use strict";
    return Object.typeOf(obj) == type.toLowerCase()
  })
})

/**
 * ## Object.extend
 * Extends an object with the given properties (given one or more objects)
 *
 * @param {Object} the destination object to copy properties onto
 * @params {Object} any number of objects to copy properties from
 * @returns {Object} the extended destination object
 *
 * ### Example
 *     var a = {}
 *     Object.extend(a, {one: 1}, {two: 2, three: 3})   // returns a
 *     a  // is now {one: 1, two: 2, three: 3}
 */
supplement.defineMethod(Object, 'extend', function (destination) { "use strict";
  if (destination !== Object(destination)) throw new TypeError('Object.extend was passed a non-object');
  var sources = Array.prototype.slice.call(arguments, 1)
  sources.forEach(function (source) {
    for (var property in source) {
      if (source.hasOwnProperty(property)) {
        destination[property] = source[property]
      }
    }
  })
  return destination
});
