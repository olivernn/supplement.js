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

test("range throw TypeError if start or end are missing", function () {
  raises(function () {
    Array.range(1)
  }, TypeError, "Need both start and end params")

  raises(function () {
    Array.range()
  }, TypeError, "Need both start and end params")
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
    args = arguments
    argsArr = Array.toArray(arguments)
  }

  fn(1,2,3)

  equal(args.length, argsArr.length, "array should have the same length as the arguments")
  equal(args[0], argsArr[0], "array elements should be the same as the arguments")
  ok(Array.isArray(argsArr))
})

// this doesn't work in IE throw the error if non array?
test("toArray converts a string to an array of characters", function () {
  raises(function () {
    Array.toArray("foo")
  }, TypeError, "raises type error if passed a string")
})

test("head returns the first element from an array", function () {
  var arr = [1,2,3]

  equal(arr.head(), 1, "should return the first element of an array")
  same(arr, [1,2,3], "should leave the original array untouched")
})

test("tail returns everything but the head of the array", function () {
  var arr = [1,2,3]

  same(arr.tail(), [2,3], "should return everything but the head of the array")
  same(arr, [1,2,3], "should leave the original array untouched")
})

test("tail returns an empty array if there is no tail", function () {
  var arr = [1]

  same(arr.tail(), [], "should return an empty array")
})

test("compact returns a copy of the array with all null values removed", function () {
  var arr = [1, null, undefined, "", "bar", {foo: "bar"}, [1,2,3], false]

  same(arr.compact(), [1, "", "bar", {foo: "bar"}, [1,2,3], false], "should remove all falsy values from the array")
  same(arr, [1, null, undefined, "", "bar", {foo: "bar"}, [1,2,3], false], "should leave the original array intact")
})

test("group returns an object with groups as arrays under a property", function () {
  var arr = ["apple", "beer", "cat", "aardvaak", "cyclops", "balls"]

  var grouped = arr.group(function (elem) {
    return elem.charAt(0).toUpperCase()
  })

  equal(Object.keys(grouped).length, 3, "should return an object with a property for each group")
  same(grouped["A"], ["apple", "aardvaak"], "each group should be an array with the correct elements in it")
  same(grouped["B"], ["beer", "balls"], "each group should be an array with the correct elements in it")
  same(grouped["C"], ["cat", "cyclops"], "each group should be an array with the correct elements in it")
})

test("group raises a TypeError if no grouping function is passed", function () {
  var arr = ["apple", "beer", "cat", "aardvaak", "cyclops", "balls"]
  raises(function () {
    arr.group()
  }, TypeError, "raises a type error if no group function is passed")

  raises(function () {
    arr.group("not a function")
  }, TypeError, "raises a type error if a non function is passed as a grouping function")
})

test("group yields array elem, index and the whole array to the passed function", function () {
  var arr = ["a"]
  var idx, a, elem

  arr.group(function (el, id, ar) {
    elem = el, idx = id, a = ar
    return "a"
  })

  equal(idx, 0, "should yield the index to the passed function")
  equal(elem, "a", "should yield the element to the passed function")
  same(a, arr, "should yield the whole array to the passed function")
})

test("group takes an optional context parameter for the grouping function", function () {
  var arr = ["a"]
  var ctx = { foo: "bar" }
  var context

  arr.group(function () {
    context = this
  }, ctx)

  same(context, ctx, "should set the context of the passed function")
})

test("reject returns a new array with all elements where the passed function returned true removed", function () {
  var arr = [1,2,3,4,5]

  var res = arr.reject(function (elem) {
    return elem > 3
  })

  same(res, [1,2,3], "should reject any element for which the function returns true")
  same(arr, [1,2,3,4,5], "should leave the original array alone")
})

test("reject raises a TypeError if no rejecting function is passed", function () {
  var arr = ["apple", "beer", "cat", "aardvaak", "cyclops", "balls"]

  raises(function () {
    arr.reject()
  }, TypeError, "raises a type error if no reject function is passed")
})

test("reject yields array elem, index and the whole array to the passed function", function () {
  var arr = ["a"]
  var idx, a, elem

  arr.reject(function (el, id, ar) {
    elem = el, idx = id, a = ar
    return "a"
  })

  equal(idx, 0, "should yield the index to the passed function")
  equal(elem, "a", "should yield the element to the passed function")
  same(a, arr, "should yield the whole array to the passed function")
})

test("reject takes an optional context parameter for the rejecting function", function () {
  var arr = ["a"]
  var ctx = { foo: "bar" }
  var context

  arr.reject(function () {
    context = this
  }, ctx)

  same(context, ctx, "should set the context of the passed function")
})

test("take returns a new array with the first n elements from the array", function () {
  var arr = [1,2,3,4]

  var taken = arr.take(2)

  equal(taken.length, 2, "should return an array of length specified by the parameter")
  same(taken, [1,2], "should return a new array with the first n elements of the old array")
  same(arr, [1,2,3,4], "should leave the original array alone")
})

test("take throws a TypeError if no argument is passed", function () {
  raises(function () {
    ([1,2,3,4]).take()
  }, TypeError, "should raise a type error when no argument is passed")
})

test("drop returns a copy of the array with the first n elements removed", function () {
  var arr = [1,2,3,4]

  var afterDrop = arr.drop(2)

  equal(afterDrop.length, 2, "should return an array of length specified by the parameter")
  same(afterDrop, [3,4], "should return a new array with the first n elements of the old array removed")
  same(arr, [1,2,3,4], "should leave the original array alone")
})