/*!
 * Supplement - Array
 * Copyright (C) 2011 Oliver Nightingale
 * MIT Licensed
 */

/**
 * ## Array.wrap
 * Wraps the parameter in an array, ensures that the return value is always an array.  Usefuly when combined
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
 *     Array.range(4,2)    // returns [4,5,6,7]
 */
supplement.defineMethod(Array, 'range',  function (start, end) { "use strict";
  if (!start || !end) throw new TypeError ('Array.range called with no range start or end')
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
 *    function () {
 *      var args = Array.toArray(arguments)
 *    }
 */
supplement.defineMethod(Array, 'toArray',  function (args) { "use strict";
  if (typeof args === "string") throw new TypeError('Array.toArray called on non-arguments');
  return Array.prototype.slice.call(args, 0)
})
