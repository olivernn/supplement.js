/**
 * ## Function.prototype.singleUse
 */
(function () {
  if (Function.prototype.singleUse) return

  Function.prototype.singleUse = function () {
    var fn = this
    var alreadyCalled = false

    return function () {
      if (alreadyCalled) return
      alreadyCalled = true
      var args = Array.prototype.slice.call(arguments, 0)
      return fn.apply(null, args)
    }
  }
})();

/**
 * ## Function.prototype.curry
 */
(function () {
  if (Function.prototype.curry) return

  Function.prototype.curry = function () {
    var args = Array.prototype.slice.call(arguments, 0)
    var fn = this

    return function () {
      Array.prototype.slice.call(arguments, 0).forEach(function (arg) { args.push(arg) })
      return fn.apply(null, args)
    }
  }
})();

/**
 * ## Function.prototype.throttle
 */
(function () {
  if (Function.prototype.throttle) return

  Function.prototype.throttle = function (rate) {
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
  }
})();


/**
 * ## Function.prototype.debounce
 */
(function () {
  if (Function.prototype.debounce) return

  Function.prototype.debounce = function (time) {
    var fn = this
    var timeout

    return function () {
      var args = Array.prototype.slice.call(arguments, 0)
      clearTimeout(timeout)
      timeout = setTimeout(function () {
        return fn.apply(null, args)
      }, time)
    }
  }
})();