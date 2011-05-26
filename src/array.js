/**
 * ## Array.wrap
 */
(function () {
  if (Array.wrap) return

  Array.wrap = function (obj) {
    if (obj == null || obj == undefined) return []
    if (Array.isArray(obj)) return obj
    return [obj]
  }
})();

/**
 * ## Array.prototype.uniq
 */
(function () {
  if (Array.prototype.uniq) return

  Array.prototype.uniq = function () {
    var length = this.length
    var out = []
    for (var i=0; i < length; i++) {
      if (out.indexOf(this[i]) === -1) out.push(this[i])
    };
    return out
  }
})();

/**
 * ## Array.range
 */
(function () {
  if (Array.range) return
  Array.range = function (start, end) {
    var a = []
    for (var i=start; i <= end; i++) {
      a.push(i)
    };
    return a
  }
})();

/**
 * ## Array.prototype.detect
 */
(function () {
  if (Array.prototype.detect) return

  Array.prototype.detect = function (lambda, context) {
    var length = this.length
    var out = null

    for (var i=0; i < length; i++) {
      if (lambda.call(context, this[i], i, this)) {
        out = this[i]
        break
      };
    };
    return out
  }
})();