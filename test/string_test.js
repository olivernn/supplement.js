module('String')

test('startsWith returns true for when the string does start with the candidate string', function () {
  ok("helloWorld".startsWith("hello"))
})

test('startsWith returns false for when the string does not start with the candidate string', function () {
  ok(!"helloWorld".startsWith("world"))
})

test('endsWith returns true for when the string does end with the candidate string', function () {
  ok("helloWorld".endsWith("World"))
})

test('endsWith returns false for when the string does not end with the candidate string', function () {
  ok(!"helloWorld".endsWith("hello"))
})

test('contains returns true when the string does contain the candidate substring', function () {
  ok("helloWorld".contains("oWo"))
})

test('contains returns false for when the string does not contain the candidate substring', function () {
  ok(!"helloWorld".contains("gluten"))
})

test('toFloat parses a valid float', function () {
  equal("1.234".toFloat(), 1.234)
})

test('toFloat returns NaN if the string does not represent a valid float', function () {
  ok(!"one".toFloat()); // can't test equality to NaN
})

test('toInteger parses a valid integer', function () {
  equal("1234".toInteger(), 1234)
})

test('toInteger returns NaN if the string does not represent a valid integer', function () {
  ok(!"one".toInteger()); // can't test equality to NaN
})
