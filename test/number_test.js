module("Number")

test("times runs the passed function x amount of times", function () {
  var counter = 0;

  (2).times(function () { counter++ })

  equal(counter, 2, "counter should have been incremented twice")
})

test("times yields the index to the function", function () {
  var idx = null;

  (1).times(function (i) { idx = i })

  equal(idx, 0, "should yield the index to the function")
})

test("seconds returns the number of seconds expressed in miliseconds", function () {
  equal((1).seconds(), 1000, "should multiply the number by 1000")
})

test("second returns the number of seconds expressed in miliseconds", function () {
  equal((1).second(), 1000, "should multiply the number by 1000")
})

test("minutes returns the number of minutes expressed in miliseconds", function () {
  equal((1).minutes(), 60000, "should multiply the number by 60,000")
})

test("minute returns the number of minutes expressed in miliseconds", function () {
  equal((1).minute(), 60000, "should multiply the number by 60,000")
})

test("hours returns the number of hours expressed in miliseconds", function () {
  equal((1).hours(), 3600000, "should multiply the number by 60,000")
})

test("hour returns the number of hours expressed in miliseconds", function () {
  equal((1).hour(), 3600000, "should multiply the number by 60,000")
})

test("pad returns a string with the passed number of zeroes padding the number", function () {
  var num = 1

  equal(num.pad(1), "01", "should add 1 zero to the number")
  equal(num.pad(5), "000001", "should add 5 zeros to the number")
})

test("pad throws a type error if a non number is passed to the function", function () {
  raises(function () {
    (1).pad()
  }, TypeError, "should raise a type error if a non number is passed to the pad function")
})

test("pad throws a range error if a negative number is passed to the function", function () {
  raises(function () {
    (1).pad(-1)
  }, RangeError, "should raise a range error if a non number is passed to the pad function")
})

test('toDps returns the number rounded using half rounding', function () {
  equal((1.23455).toDps(4), 1.2346)
  equal((1.23).toDps(1), 1.2)
})