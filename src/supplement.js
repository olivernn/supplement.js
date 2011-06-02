supplement = {

  canDefineProperty: (!!Object.defineProperty),

  defineMethod: function (obj, name, fn) {
    if (obj[name]) return

    if (this.canDefineProperty) {
      Object.defineProperty(obj, name, {
        value: fn,
        enumerable: false,
        configurable: false
      })
    } else {
      obj[name] = fn
    };
  }
}