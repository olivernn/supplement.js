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