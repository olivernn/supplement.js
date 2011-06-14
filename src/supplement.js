/**
 * Namespace
 * @private
 */
supplement = {
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
  defineMethod: function (obj, name, fn) {
    if (obj[name]) return

    if (typeof Object.defineProperty == 'function') {
      try {
        Object.defineProperty(obj, name, {
          value: fn,
          enumerable: false,
          configurable: false
        })
      } catch (e) { } // catch for IE8's broken defineProperty implementation
    }

    if (!obj[name]) {
      obj[name] = fn
    };
  }
}