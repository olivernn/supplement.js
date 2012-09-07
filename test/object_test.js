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

test("typeOf returns the correct type of the passed object", function () {
  var obj = {},
      arr = [],
      str = "",
      num = 0,
      bool = true,
      fn = function () {},
      regex = /foo/,
      date = new Date ()

  equal(Object.typeOf(obj), "object", "obj is an object")
  equal(Object.typeOf(arr), "array", "arr is an array")
  equal(Object.typeOf(str), "string", "str is a string")
  equal(Object.typeOf(num), "number", "num is a number")
  equal(Object.typeOf(bool), "boolean", "bool is a boolean")
  equal(Object.typeOf(fn), "function", "fn is a function")
  equal(Object.typeOf(regex), "regexp", "regex is a regexp")
  equal(Object.typeOf(date), "date", "date is a date")
})

var types = [{}, [], "", 0, true, function () {}, /foo/, new Date ()]

var forEachTypeExcept = function (exception, fn) {
  types.filter(function (type) {
    return Object.typeOf(type) !== exception
  }).forEach(fn)
}

var returnsFalseForEachTypeExcept = function (exception) {
  var methodName = 'is' + exception.replace(/^(\w)/, function (match) {
    return match.toUpperCase()
  })

  forEachTypeExcept(exception, function (type) {
    ok(!Object[methodName](type))
  })
}

test("isArray returns true if the object is an array", function () {
  ok(Object.isArray([]))
  returnsFalseForEachTypeExcept('array')
})

test("isFunction returns true if the object is a function", function () {
  ok(Object.isFunction(function () {}))
  returnsFalseForEachTypeExcept('function')
})

test("isString returns true if the object is a string", function () {
  ok(Object.isString("asd"))
  forEachTypeExcept("string", function (type) {
    ok(!Object.isString(type))
  })
})

test("isNumber returns true if the object is a number", function () {
  ok(Object.isNumber(1))
  returnsFalseForEachTypeExcept("number")
})

test("isBoolean returns true if the object is a boolean", function () {
  ok(Object.isBoolean(false))
  returnsFalseForEachTypeExcept("boolean")
})

test("isRegexp returns true if the object is a regex", function () {
  ok(Object.isRegexp(/foo/))
  returnsFalseForEachTypeExcept("regexp")
})

test("isDate returns true if the object is a date", function () {
  ok(Object.isDate(new Date ()))
  returnsFalseForEachTypeExcept("date")
})

test("extend extends an object", function () {
  var a = {}
  ok(Object.extend(a, {hello: 'there'}))
  same(a, {hello: 'there'})
})

test("extend overrides existing properties", function () {
  var a = {hello: 'guys'}
  ok(Object.extend(a, {hello: 'there'}))
  same(a, {hello: 'there'})
})

test("extend returns the extended object", function () {
  var a = {}
  var b = Object.extend(a, {hello: 'there'})
  equal(b, a)
})

test("extend allows extending with multiple objects", function () {
  var a = {}
  Object.extend(a, {hello: 'there'}, {wassup: 'dog'})
  same(a, {hello: 'there', wassup: 'dog'})
})

test("extend does not copy over properties from the prototype", function () {
  var a = {}
  var ctor = function(){}
  ctor.prototype.slimey = 'slug'
  var b = new ctor()
  Object.extend(a, b)
  same(a, {})
})
