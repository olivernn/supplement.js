// supplement.js JavaScript Extras, version: 0.1.1
// (c) 2011 Oliver Nightingale
//
//  Released under MIT license.
//
/**
 * Namespace
 * @private
 */
supplement = (function () {

  var clashCallbacks = []

  var callClashCallbacks = function (obj, methodName, fn) {
    clashCallbacks.forEach(function (cb) {
      cb(obj, methodName, fn)
    })
  }

  /**
   * ## supplement.onClash
   * A callback that will be called when supplement attempts to define a method that would cause a clash.
   * The callback function will be passed the object that was trying to be modified by supplement, the
   * property name that was trying to be set and the value that the property was being set to.
   *
   * Use this to decide whether a clash is fatal for your application and throw a big error if so.
   *
   * @params {Function} the callback function
   */
  var onClash = function (fn) {
    if (typeof fn !== "function") throw new TypeError ()
    clashCallbacks.push(fn)
  }

  /**
   * ## supplement.defineAlias
   * A utility function for providing an alias to an objects method.
   *
   * @see supplement.defineMethod
   */
  var defineAlias = function (obj, alias, original) {
    this.defineMethod(obj, alias, obj[original])
  }

  /**
   * ## supplement.defineMethod
   * A utility function for supplementing any object with new methods.  It wraps the ES5 Object.defineProperty
   * method and uses that wherever possible, falling back to plain property assignment in older browsers.
   *
   * The function will have `this` set to the object passed as the first parameter.
   *
   * @param {Object} the object on which to define the method
   * @param {String} the name of the new method
   * @param {Function} the function that makes up the body of the method for the object.
   *
   * ### Example
   *     supplement.defineMethod(Array, 'first', function () {
   *       return this[0]
   *     })
   */
  var defineMethod = function (obj, name, fn) {
    if (obj[name]) return callClashCallbacks(obj, name, fn)

    // if defineProperties is supported then a working version
    // of defineProperty will be available.  Work around for IE8's
    // broken implementation of defineProperty.
    if (typeof Object.defineProperties == 'function') {
      Object.defineProperty(obj, name, {
        value: fn,
        enumerable: false,
        configurable: false
      })
    } else {
      obj[name] = fn
    };
  }

  /**
   * Exposing methods
   * @private
   */
  return {
    defineAlias: defineAlias,
    defineMethod: defineMethod,
    onClash: onClash
  }
})()

/*!
 * Supplement - Array
 * Copyright (C) 2011 Oliver Nightingale
 * MIT Licensed
 */

/**
 * ## Array.wrap
 * Wraps the parameter in an array, ensures that the return value is always an array.  Useful when combined
 * with array enumerators to prevent accidently calling methods on null or undefined.
 *
 * When passed null or undefined an empty array is returned.  When passed an array that array is returned
 * unchanged, anything else is pushed as the first element to a new empty array and that array is returned.
 *
 * @param {Object} the thing to wrap in an array.
 * @returns {Array}
 *
 * ### Example
 *     Array.wrap("foo")      // returns ["foo"]
 *     Array.wrap([1,2,3])    // returns [1,2,3]
 *     Array.wrap(undefined)  // returns []
 */
supplement.defineMethod(Array, 'wrap',  function (obj) { "use strict";
   if (obj == null || obj == undefined) return []
   if (Array.isArray(obj)) return obj
   return [obj]
});

/**
 * ## Array.prototype.uniq
 * Returns a new array with all the dupicate elements removed.  Elements are checked for duplicity using ===
 *
 * @returns {Array} a new array with all the duplicates of the original array removed.
 *
 * ### Example
 *      [1,1,2,3,4,4].uniq()  // returns [1,2,3,4]
 */
supplement.defineMethod(Array.prototype, 'uniq',  function () { "use strict";
  return this.reduce(function (out, elem) {
    if (out.indexOf(elem) === -1) out.push(elem)
    return out
  }, [])
});

/**
 * ## Array.range
 * Returns a new array with elements between and including the start and end params.
 *
 * @param {Number} start - where to start the range from
 * @param {Number} end - where to end the range, inclusive.
 * @returns {Array} the newly created and populated array.
 * @throws {TypeError} if either the start or end params are omitted.
 *
 * ### Example
 *     Array.range(4,7)    // returns [4,5,6,7]
 */
supplement.defineMethod(Array, 'range',  function (start, end) { "use strict";
  if ((typeof start !== 'number') || (typeof end !== 'number')) throw new TypeError ('Array.range called with no range start or end')
  var a = []
  for (var i=start; i <= end; i++) {
   a.push(i)
  };
  return a
});

/**
 * ## Array.prototype.detect
 * Returns the first item from the array for which the function evaluates to true.  Stops iterating as soon
 * as the function evaluates to true.
 *
 * The passed function will be called for each element in the array, it will be passed the current element
 * to be evaluated, the index of this element in the array and finally the whole array itself.  The function
 * will be called with its context set to the optional context param.
 *
 * @param {Function} fn - a function to be executed for each element of the array
 * @param {Object} context - an optional param that will be used as the context of fn
 * @returns {Object} the first element of the array for which the function returns true
 *
 * ### Example
 *     [1,2,3,4,5].detect(function (num) {
 *       return (num == 3)
 *     })  // returns 3
 */
supplement.defineMethod(Array.prototype, 'detect',  function (fn, context) { "use strict";
  var length = this.length
  var out = null

  for (var i=0; i < length; i++) {
   if (fn.call(context, this[i], i, this)) {
     out = this[i]
     break
   };
  };
  return out
});

/**
 * ## Array.toArray
 * Converts an array like object, most likely the arguments object, into an Array.
 *
 * @param {Object} args an arguments object which will get turned into a real array.
 * @returns {Array} the args object as an array.
 * @throws {TypeError} when passed a string.
 *
 * ### Example
 *     function () {
 *       var args = Array.toArray(arguments)
 *     }
 */
supplement.defineMethod(Array, 'toArray',  function (args) { "use strict";
  if (typeof args === "string") throw new TypeError('Array.toArray called on non-arguments');
  return Array.prototype.slice.call(args, 0)
})

/**
 * ## Array.prototype.head
 * Returns the first element from an array.  If the array is empty undefined is returned.
 * The original array is left un-mutated.
 *
 * @returns {Anything} the first element from the array or undefined.
 *
 * ### Example
 *     var a = [1,2,3]
 *     a.head() // returns 1
 */
supplement.defineMethod(Array.prototype, 'head', function () { "use strict";
  return this[0]
})

/**
 * ## Array.prototype.tail
 * Returns everything except the head of the array.  If the array is empty an empty array
 * is returned.  The original array is left un-mutated.
 *
 * @returns {Array} everything but the head of the array.
 *
 * ### Example
 *     var a = [1,2,3]
 *     a.tail() // returns [2,3]
 */
supplement.defineMethod(Array.prototype, 'tail', function () { "use strict";
  return this.slice(1)
})

/**
 * ## Array.prototype.compact
 * Returns a copy of the array with all undefined or null values removed, other falsy values
 * are left alone.
 */
supplement.defineMethod(Array.prototype, 'compact', function () { "use strict";
  return this.filter(function (element) { return (element !== null && element !== undefined) })
})

/**
 * ## Array.prototype.group
 * Return an object where each key is the group name and the value is the elements form the
 * array that fit in that group.
 *
 * Grouping is done by the passed function, this grouping function is called for each element
 * in the array and passed 3 arguments; the current element of the array, the index of that item
 * in the array and the entire array.  The context of the grouping function can be changed by passing
 * a second argument to group.
 *
 * @params {Function} the grouping function
 * @params {Object} an optional context object for the grouping function
 * @throws {TypeError} when a non function is passed as the grouping function
 * @returns {Object} an object containing the array split into groups
 *
 * ## Example
 *     var drinks = ["absinthe", "beer", "cider"]
 *     drinks.group(function (drink) {
 *       return drink.charAt(0)
 *     }) // returns {"a": ["absinthe"], "b": ["beer"], "c": ["cider"]}
 */
supplement.defineMethod(Array.prototype, 'group', function (fn, context) { "use strict";
  if (typeof fn !== "function") throw new TypeError ()

  return this.reduce(function (grouped, elem, index, arr) {
    var key = fn.call(context, elem, index, arr)
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(elem)
    return grouped
  }, {})
})

/**
 * ## Array.prototype.reject
 * Returns a new array containing items from this array for which the function returns a truthy value.
 * The function passed 3 arguments, the current element from the array, the index of this item in
 * the array and the whole array.  The context of the function can be set by passing an optional second
 * parameter.
 *
 * @params {Function} The function which will do the rejecting
 * @params {Object} An optional context object for the rejecting function
 * @throws {TypeError} When called without a function
 * @returns {Array}
 */
supplement.defineMethod(Array.prototype, 'reject', function (fn, context) { "use strict";
  if (typeof fn !== "function") throw new TypeError ()

  return this.reduce(function (keepers, elem, index, arr) {
    if (!fn.call(context, elem, index, arr)) keepers.push(elem)
    return keepers
  }, [])
})

/**
 * ## Array.prototype.take
 * Returns the first n items from the array.  Doesn't modify the array.
 *
 * @param {Number} the number of items to take from the array
 */
supplement.defineMethod(Array.prototype, 'take', function (n) { "use strict";
  if (!n) throw new TypeError ()

  return this.slice(0, n)
})

/**
 * ## Array.prototype.drop
 * Drops the first n items from the array and returns the rest.  Doesn't modify the array.
 *
 * @param {Number} the number of items to drop from the front of the array
 */
supplement.defineMethod(Array.prototype, 'drop', function (n) { "use strict";
  if (!n) throw new TypeError ()

  return this.slice(n)
})

/**
 * ## Array.prototype.pluck
 * Returns array of values for passed property / method name on each member.
 *
 * If the element in the array has a property with a matching name it will be returned,
 * if the property is a function then it will be called, without any parameters, and the
 * result will be returned.  If no property matches then undefined will be returned.
 *
 * @param {propname} the name of a property or method to collect from each member
 * @throws {TypeError} when called without a property name
 * @returns {Array} an array containing the properties and/or result of method calls
 */
supplement.defineMethod(Array.prototype, 'pluck', function (n) { "use strict";
  if (!n || typeof n !== 'string') throw new TypeError ()

  return this.map(function (member) {
    var value
    if(member[n] !== undefined) {
      value = typeof member[n] == 'function' ? member[n]() : member[n];
    } else {
      value = undefined
    }
    return value
  })
})
/**
 * ## Function.prototype.singleUse
 * Returns a version of the function that can only be called once, after which the function will behave
 * as a no-op.
 *
 * @returns {Function} a function with the same behaviour that can only be called once.
 */
supplement.defineMethod(Function.prototype, 'singleUse', function () { "use strict";
  var fn = this
  var alreadyCalled = false

  return function () {
    if (alreadyCalled) return
    alreadyCalled = true
    var args = Array.prototype.slice.call(arguments, 0)
    return fn.apply(null, args)
  }
});

/**
 * ## Function.prototype.curry
 * Returns a copy of the function with one or more arguments already set.
 *
 * @params {Object} any number of arguments to prefil the original funciton with.
 * @returns {Function}
 *
 * ### Example
 *     var add = function (a, b) { return a + b }
 *     var addFive = add.curry(5)
 *     add(5, 10) === addFive(10)
 *
 */
supplement.defineMethod(Function.prototype, 'curry', function () { "use strict";
  var args = Array.prototype.slice.call(arguments, 0)
  var fn = this

  return function () {
    Array.prototype.slice.call(arguments, 0).forEach(function (arg) { args.push(arg) })
    return fn.apply(null, args)
  }
});

/**
 * ## Function.prototype.throttle
 * Returns a copy of the function with the same behaviour but which will only execute once every x amount
 * of miliseconds.  This can be useful when reducing the load on a funciton that could be triggered many
 * times, perhaps as a result of a keyup event.
 *
 * @params {Number} the rate limit in miliseconds for the minimum pause between executions of the function
 * @returns {Function} the throttled function.
 */
supplement.defineMethod(Function.prototype, 'throttle', function (rate) { "use strict";
  var fn = this
  var callTime, lastCallTime

  return function () {
    var args = Array.prototype.slice.call(arguments, 0)
    callTime = new Date ()
    lastCallTime = lastCallTime || 0
    if ((callTime - lastCallTime) < rate) return
    lastCallTime = callTime
    return fn.apply(null, args)
  }
});

/**
 * ## Function.prototype.debounce
 * Returns a copy of the funciton that will only execute after it has stopped being called for x miliseconds.
 * This can be useful for functions used as keyup handlers where the action should only happen once the user
 * has stopped typing.
 *
 * @params {Number} the time in miliseconds between calling the funciton and the function executing.
 *
 * ### Example
 *     var keyupHandler = function () {
 *       // awesome code goes here!
 *     }
 *     
 *     input.addEventListener('keyup', keyupHandler.debounce(100))
 *     // keyupHandler will only be called 100 miliseconds after
 *     // the keyup event stops being fired.
 *
 */
supplement.defineMethod(Function.prototype, 'debounce', function (time) { "use strict";
  var fn = this
  var timeout

  return function () {
    var args = Array.prototype.slice.call(arguments, 0)
    clearTimeout(timeout)
    timeout = setTimeout(function () {
      return fn.apply(null, args)
    }, time)
  }
});
/**
 * ## Number.prototype.times
 * Executes the supplied function x number of times, where x is the value of the number, the function
 * will be yielded the index of the iteration each time it is called.
 *
 * @param {Function} the function to be called each time.
 *
 * ### Example
 *     (5).times(function (i) { console.log(i) })
 *     // prints 0 1 2 3 4
 */
supplement.defineMethod(Number.prototype, 'times', function (fn) { "use strict";
  for (var i=0; i < this; i++) {
    fn(i)
  };
})

/**
 * ## Number.prototype.seconds
 * Returns the number of seconds converted to milliseconds.
 *
 * @see Number.prototype.second
 * @returns {Number}
 */
supplement.defineMethod(Number.prototype, 'seconds', function () { "use strict";
  return this * 1000
})
supplement.defineAlias(Number.prototype, 'second', 'seconds')

/**
 * ## Number.prototype.minutes
 * Returns the number of minutes converted to milliseconds
 *
 * @see Number.prototype.minute
 * @returns {Number}
 */
supplement.defineMethod(Number.prototype, 'minutes', function () { "use strict";
  return this.seconds() * 60
})
supplement.defineAlias(Number.prototype, 'minute', 'minutes')

/**
 * ## Number.prototype.hours
 * Returns the number of hours converted to milliseconds
 *
 * @see Number.prototype.hour
 * @returns {Number}
 */
supplement.defineMethod(Number.prototype, 'hours', function () { "use strict";
  return this.minutes() * 60
})
supplement.defineAlias(Number.prototype, 'hour', 'hours')

/**
 * ## Number.prototype.pad
 * Returns a string representation of the number with n zeroes padding the number.
 *
 * @params {Number} the number of zeroes to pad the number with
 * @returns {String}
 */
supplement.defineMethod(Number.prototype, 'pad', function (zeroes) { "use strict";
  if (typeof zeroes !== "number") throw new TypeError
  if (zeroes < 0) throw new RangeError

  var out = this + ""
  while (Math.floor(zeroes--)) {
    out = "0" + out
  }
  return out
})

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
