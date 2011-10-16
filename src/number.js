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
 * ## Number.prototype.toDps
 * Round a number of fixed decimal places
 *
 * @params {Number} the number of decimal places
 * @returns {Number} the number to the specified number of decimal places using half rounding
 */
supplement.defineMethod(Number.prototype, 'toDps', function (n) {
  return parseFloat(this.toFixed(n));
});
