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
