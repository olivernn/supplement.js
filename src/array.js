/**
 * ## Array.wrap
 */
supplement.defineMethod(Array, 'wrap',  function (obj) {
   if (obj == null || obj == undefined) return []
   if (Array.isArray(obj)) return obj
   return [obj]
});

/**
 * ## Array.prototype.uniq
 */
supplement.defineMethod(Array.prototype, 'uniq',  function () {
  var length = this.length
  var out = []
  for (var i=0; i < length; i++) {
   if (out.indexOf(this[i]) === -1) out.push(this[i])
  };
  return out
});

/**
 * ## Array.range
 */
supplement.defineMethod(Array, 'range',  function (start, end) {
  var a = []
  for (var i=start; i <= end; i++) {
   a.push(i)
  };
  return a
});

/**
 * ## Array.prototype.detect
 */
supplement.defineMethod(Array.prototype, 'detect',  function (lambda, context) {
  var length = this.length
  var out = null

  for (var i=0; i < length; i++) {
   if (lambda.call(context, this[i], i, this)) {
     out = this[i]
     break
   };
  };
  return out
});

/**
 * ## Array.toArray
 */
supplement.defineMethod(Array, 'toArray',  function (args) {
  return Array.prototype.slice.call(args, 0)
})
