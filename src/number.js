supplement.defineMethod(Number.prototype, 'times', function (lambda) {
  for (var i=0; i < this; i++) {
    lambda(i)
  };
})