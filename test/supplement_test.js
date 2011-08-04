module("supplement")

test("calling onClash handlers", function () {
  var callbackCalled = false,
      object = null,
      propName = null,
      propVal = null

  var foo = {
    bar: 'baz'
  }

  supplement.onClash(function (obj, meth, val) {
    callbackCalled = true
    object = obj
    propName = meth
    propVal = val
  })

  supplement.defineMethod(foo, 'bar', 'clash')

  ok(callbackCalled, "should call the onClash callback when defining a method would cause a clash")
  same(object, foo, "should pass the object supplement was trying to modify")
  equal(propName, 'bar', "should pass the propertyName that was trying to be defined")
  same(propVal, 'clash', "should pass the property value that was trying to be set")
})

test("passing onClash handler a non function should blow up", function () {
  raises(function () {
    supplement.onClash('foo')
  }, TypeError, "should raise a type error when passing the onClashCallback a non function")
})