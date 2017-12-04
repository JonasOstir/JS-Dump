'use strict';

console.log(name); // undefined
var name = 'Jonas';

// ||
// ||
// \/

var name;
console.log(name);
name = 'Jonas';

// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------

function foo() {
  console.log(name); // undefined
  var name = 'Jonas';
}

// ||
// ||
// \/

foo(); // undefined (console.log(name): 29); From within the function

// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------

function foo() {
  var name;
  console.log(name);
  name = 'Jonas'
}

// ||
// ||
// \/

function foo() { // Function gets hoisted to the top of the file.
  var name;
  console.log(name);
  name = 'Jonas'
}

foo();

// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------

foo(); // TypeError: foo is not a function

var foo = function() {
  var name;
  console.log(name);
  name = 'Jonas'
}

// ||
// ||
// \/

var foo;
foo(); // foo isn't defined yet and no function

foo = function() {
  var name;
  console.log(name);
  name = 'Jonas'
}

foo();
