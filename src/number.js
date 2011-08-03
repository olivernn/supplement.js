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
 */
supplement.defineMethod(Number.prototype, 'seconds', function () { "use strict";
  return this * 1000
})
supplement.defineAlias(Number.prototype, 'second', 'seconds')

/**
 * ## Number.prototype.minutes
 */
supplement.defineMethod(Number.prototype, 'minutes', function () { "use strict";
  return this.seconds() * 60
})
supplement.defineAlias(Number.prototype, 'minute', 'minutes')

/**
 * ## Number.prototype.hours
 */
supplement.defineMethod(Number.prototype, 'hours', function () { "use strict";
  return this.minutes() * 60
})
supplement.defineAlias(Number.prototype, 'hour', 'hours')

/**
 * ## Number.prototype.pad
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
