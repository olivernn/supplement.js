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
 * ## String.prototype.strip
 * Removes any leading or trailing white space
 *
 * @returns {String} A new string without any leading or trailing whitespace
 */
supplement.defineMethod(String.prototype, 'strip', function () {
  return this.replace(/^\s+|\s+$/g, '');
});

/**
 * ## String.prototype.quote
 * encloses the string with the specified string, or " if no enclosing string is given
 *
 * @returns {String} A new string enclosed by the specified string
 */
supplement.defineMethod(String.prototype, 'quote', function (enclosingString) {
  var enclosingString =  enclosingString || '"'
  return enclosingString + this + enclosingString;
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


