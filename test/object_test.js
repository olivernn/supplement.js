module("Object")

test("values returns the values of an object", function () {
  var obj = {a: 1, b: 2}
  same(Object.values(obj), [1,2], "should be an array of the objects values")
})

test("values should throw a type error if a non object is passed", function () {
  // TODO: how to test this!!
  // same(Object.values("foo"), TypeError, "should throw a type error")
})