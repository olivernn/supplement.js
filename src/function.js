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