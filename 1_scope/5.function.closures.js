'use strict';

// Function closures are created when a function returns another function. The returned function keeps a referece that it needs to execute

var foo = [];

for (var i = 0; i < 10; i++) {
  foo[i] = function() {
    return i;
  };
}

console.log(foo[0]());    // 10
console.log(foo[2]());    // 10
console.log(foo[5]());    // 10

// ||
// ||
// \/

var foo = [];

for (var i = 0; i < 10; i++) {
  (function() {
    foo[i] = i;
  })(i);
}

console.log(foo[0]);
console.log(foo[2]);
console.log(foo[5]);

// ---------------------------------------------
// ---------------------------------------------
// ---------------------------------------------

var foo = [];

for (var i = 0; i < 10; i++) {
  (function(y) {
    foo[y] = function() { return y; };
  })(i);
}

console.log(foo[0]());
console.log(foo[2]());
console.log(foo[5]());


