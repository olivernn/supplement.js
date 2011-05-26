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