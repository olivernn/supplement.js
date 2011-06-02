module("Array")

test("wrap returns an empty array when passed null or undefined", function () {
  equal(Array.wrap(null).length, 0, "should be an empty array")
  equal(Array.wrap(undefined).length, 0, "should be an empty array")
})

test("wrap returns the same array unchanged if it is passed an array", function () {
  var arr = [1,2,3]
  same(Array.wrap(arr), arr, "should be the same array as was passed in")
})

test("wrap returns its argument wrapped in an array if passed anything but an array or null/undefined", function () {
  var obj = {a: 1}
  var str = "foo"
  var num = 42

  same(Array.wrap(obj), [obj], "should be obj wrapped in an array")
  same(Array.wrap(str), [str], "should be str wrapped in an array")
  same(Array.wrap(num), [num], "should be num wrapped in an array")
})

test("range returns an array with all numbers between the start and end", function () {
  same(Array.range(1, 5), [1,2,3,4,5], "should return an array with start and end as specified")
})

test("uniq returns an array with all duplicates removed", function () {
  var arr = [1,1,1,2,2,3]

  same(arr.uniq(), [1,2,3], "should remove all duplicates")
})

test("uniq does nothing if there are no duplicates in the array", function () {
  var arr = [1,2,3]
  same(arr.uniq(), arr, "should remain the same")
})

test("uniq does nothing on an empty array", function () {
  var arr = []
  same(arr.uniq(), arr, "should remain the same")
})

test("detect returns the first element that the function returns true for", function () {
  var arr = [1,2,3,4]
  var out = arr.detect(function (n) { return (n == 2)})

  equal(out, 2, "should return the matched element")
})

test("detect stops iterating as soon as it finds a match", function () {
  var arr = [1,2,3,4]
  var counter = 0
  var out = arr.detect(function (n) { counter++; return (n == 2) })
  equal(counter, 2, "should stop iterating as soon as a match is found")
})

test("detect passes the element, the current index and the whole array to the function", function () {
  var a = ["foo"],
      b, element, index

  a.detect(function (e, i, array) {
    b = array
    element = e
    index = i
  })

  equal(element, "foo", "should yield the element of the array as the first argument")
  equal(index, 0, "should yield the index of the item in the array as the second argument")
  same(b, a, "should yeild the array being iterated as the third argument")
})


test("detect can set the context of the callback function", function () {
  var a = ["foo"],
      context = {},
      self

  a.detect(function () {
    self = this
  }, context)

  same(self, context, "should be able to set the context of the function")
})

test("toArray converts an array like object to an array", function () {
  var args, argsArr
  var fn = function () {
    console.log(arguments)
    args = arguments
    argsArr = Array.toArray(arguments)
  }

  fn(1,2,3)

  equal(args.length, argsArr.length, "array should have the same length as the arguments")
  equal(args[0], argsArr[0], "array elements should be the same as the arguments")
  ok(Array.isArray(argsArr))
})

test("toArray converts a string to an array of characters", function () {
  var arr = Array.toArray("foo")

  ok(Array.isArray(arr), "should return an instance of an array")
  equal(3, arr.length, "should have an element for each character")
  equal("f", arr[0])
})