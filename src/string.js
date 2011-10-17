/**
 * ## String.prototype.startsWith
 * Indicates whether a string starts with the specified string
 *
 * @params {string} The candidate string
 * @returns {Boolean} true IFF this string starts with the given string, false otherwise
 */
supplement.defineMethod(String.prototype, 'startsWith', function(string) {
  return new RegExp('^'+string).test(this);
});

/**
 * ## String.prototype.endsWith
 * Indicates whether a string ends with the specified string
 *
 * @params {string} The candidate string
 * @returns {Boolean} true IFF this string ends with the given string, false otherwise
 */
supplement.defineMethod(String.prototype, 'endsWith', function(string) {
  return this.substr(string.length) === string;
});

/**
 * ## String.prototype.contains
 * Indicates whether a string contains the specified substring
 *
 * @params {string} The candidate substring
 * @returns {Boolean} true IFF this string contains the given string, false otherwise
 */
supplement.defineMethod(String.prototype, 'contains', function(substring) {
  return new RegExp(substring).test(this);
});

/**
 * ## String.prototype.toFloat
 * Converts the number to a float
 *
 * @returns {Number} A Float parsed from the string
 */
supplement.defineMethod(String.prototype, 'toFloat', function () {
  if (!this.match(/^\d+(\.\d+)?$/)) return NaN;
  return parseFloat(this);
});

/**
 * ## String.prototype.toInteger
 * Converts the number to an integer
 *
 * @returns {Number} An Integer parsed from the string
 */
supplement.defineMethod(String.prototype, 'toInteger', function () {
  if (!this.match(/^\d+$/)) return NaN;
  return parseInt(this);
});


