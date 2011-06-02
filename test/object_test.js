module("Object")

test("values returns the values of an object", function () {
  var obj = {a: 1, b: 2}
  same(Object.values(obj), [1,2], "should be an array of the objects values")
})

test("values throws a type error if a non object is passed", function () {
  raises(function () {
    Object.values("non object")
  }, TypeError, "expect a type error")
})

test("provide adds properties to the passed object", function () {
  var obj = {}

  Object.provide(obj, 'foo')

  same(obj.foo, {}, "should create an empty object at foo")
})

test("provide adds nested properties to the passed object", function () {
  var obj = {}

  Object.provide(obj, 'foo', 'bar')

  same(obj.foo.bar, {}, "should create an object at foo with an empty object at foo.bar")
})

test("provide won't override any existing properties", function () {
  var obj = {
    'foo': {
      'baz': 'egg'
    }
  }

  Object.provide(obj, 'foo', 'bar')

  same(obj.foo.bar, {}, "should create an object at foo with an empty object at foo.bar")
  equal(obj.foo.baz, 'egg', "shouldn't override any existing properties")
})

test("provide throws a type error if one of the properties is not an object", function () {
  var obj = {
    'foo': 'bar'
  }

  raises(function () {
    Object.provide(obj, 'foo', 'bar')
  }, TypeError, "should raise an error if the property is not an object")
})

test("provide throws a type error if called on a non object", function () {
  raises(function () {
    Object.provide('foo', 'bar')
  }, TypeError, "can only be called on an object")
})

test("provide returns the last object at the end of the chain", function () {
  var obj = {}
  var foo = Object.provide(obj, 'foo')
  foo.bar = "baz"

  same(obj, {foo: {bar: 'baz'}}, "should return the last object in the chain")
})

test("provide works with an arbitrary deep nesting", function () {
  var obj = {}
  Object.provide(obj, 'foo', 'bar', 'baz', 'zab', 'rab', 'oof')

  same(obj, {
    'foo': {
      'bar': {
        'baz': {
          'zab': {
            'rab': {
              'oof': {}
            }
          }
        }
      }
    }
  })
})