'use strict'
// Scope => Lifetime of a variable

// Global scope
var name = 'Jonas';
window.name = 'Jonas';

// Function / Local scope
function foo() {
  var name = 'Jonas';
}

console.log(name); // ReferenceError: name is not defined

// No BLOCK LEVEL SCOPE
for (var i = 0; i < 10; i++) {
  doSomething(i);
}

console.log(i); // prints out 10

