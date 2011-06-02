supplement = {
  defineMethod: function (obj, name, fn) {
    if (obj[name]) return

    if (typeof Object.defineProperty == 'function') {
      try {
        Object.defineProperty(obj, name, {
          value: fn,
          enumerable: false,
          configurable: false
        })
      } catch (e) { /* catch for IE8's broken defineProperty implementation */ }
    }

    if (!obj[name]) {
      obj[name] = fn
    };
  }
}