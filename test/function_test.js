module("Function")

test("singleUse returns a function that can only be called once", function () {
  var counter = 0
  var fn = function () {
    counter++
  }

  var fnSingleUse = fn.singleUse()

  fnSingleUse(), fnSingleUse(), fnSingleUse()

  equal(1, counter, "fn should only be executed once")
})

test("singleUse wrapped function passes the correct arguments", function () {
  var fn = function (a, b) {
    return a + b
  }

  var fnSingleUse = fn.singleUse()

  equal(3, fnSingleUse(1, 2), "should pass along the arguments to the wrapped function")
})

test("curry returns a function with some params already set", function () {
  var add = function (a, b) {
    return a + b
  }

  var add5 = add.curry(5)
  equal(6, add5(1), "should preset the first add argument to 5")
})

test("curry can preset many arguments", function () {
  var add = function (a, b, c, d) {
    return a + b + c + d
  }

  var add2 = add.curry(1, 1)

  equal(4, add2(1, 1), "should curry many arguments")
})

test("throttle make sure a function is only called at minimum intervals", function () {
  var counter = 0
  var fn = function () {
    counter++
  }

  var throttledFn = fn.throttle(50)

  for (var i=0; i < 3; i++) {
    throttledFn()
  };

  stop()
  setTimeout(function () { 
    throttledFn()
    start()
    equal(2, counter, "should throttle the function so that it is only called every 100ms")
  }, 100)
})

test("debounce returns a function that is only executed after it has stopped being called for x ms", function () {
  var counter = 0
  var fn = function () {
    counter++
  }

  var debouncedFn = fn.debounce(50)

  for (var i=0; i < 20; i++) {
    debouncedFn()
  };

  stop()
  setTimeout(function () {
    start()
    equal(1, counter, "should only execute the function after it has stopped being called for 100ms")
  }, 75)
})