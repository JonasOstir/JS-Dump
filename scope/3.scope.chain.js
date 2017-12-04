'use strict';

// Scope chain refers to nested functions. Inner functions look for undefined variables to outer functions. It looks up the scope chain, until it reaches the global/window scope.
// The scope chain is defined in the way that the program is written in the file. It is defined Lexically ( in the order that the code is written )

function foo() {
  console.log(name); // name is not defined in the outer scope of foo();
}

function bar() {
  var name = 'Jonas';
  foo();
}

bar(); // ReferenceError: name is not defined.

// ||
// ||
// \/

function bar() {
  var name = 'Jonas';

  function foo() {
    console.log(name); // name is not defined in the outer scope of foo();
  }

  foo();
}

bar(); // 'Jonas
