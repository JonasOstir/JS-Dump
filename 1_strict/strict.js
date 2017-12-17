/*
 * strict executional context: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
 * First, strict mode eliminates some JavaScript silent errors by changing them to throw errors.
 * Second, strict mode fixes mistakes that make it difficult for JavaScript engines to perform optimizations: strict mode code can sometimes be made to run faster than identical code that's not strict mode.
 * Third, strict mode prohibits some syntax likely to be defined in future versions of ECMAScript.
 */

/*
 * 1. converting mistakes into errors
 *  First, strict mode makes it impossible to accidentally create global variables.
 *  Second, strict mode makes assignments which would otherwise silently fail to throw an exception
 *  Third, strict mode makes attempts to delete undeletable properties throw (where before the attempt would simply have no effect):
 *  Fourth, strict mode prior to Gecko 34 requires that all properties named in an object literal be unique.
 *  Fifth, strict mode requires that function parameter names be unique.
 *  Sixth, strict mode in ECMAScript 5 forbids octal syntax.
 *  Seventh, strict mode in ECMAScript 2015 forbids setting properties on primitive values.
 */
'use strict';

// Assuming a global variable mistypedVariable exists
mistypeVariable = 17; // this line throws a ReferenceError due to the 
// misspelling of variable
// -------------------------------------------------------------------------------------
// Assignment to a non-writable global
var undefined = 5; // throws a TypeError
var Infinity = 5; // throws a TypeError

// Assignment to a non-writable property
var obj1 = {};
Object.defineProperty(obj1, 'x', { value: 42, writable: false });
obj1.x = 9; // throws a TypeError

// Assignment to a getter-only property
var obj2 = { get x() { return 17; } };
obj2.x = 5; // throws a TypeError

// Assignment to a new property on a non-extensible object
var fixed = {};
Object.preventExtensions(fixed);
fixed.newProp = 'ohai'; // throws a TypeError

// -------------------------------------------------------------------------------------

delete Object.prototype; // throws a TypeError

// -------------------------------------------------------------------------------------

var o = { p: 1, p: 2 }; // !!! syntax error

function sum(a, a, c) { // !!! syntax error
  'use strict';
  return a + b + c; // wrong if this code ran
}

// -------------------------------------------------------------------------------------

var sum = 015 + // !!! syntax error
197 +
142;

var sumWithOctal = 0o10 + 8;
console.log(sumWithOctal); // 16

// -------------------------------------------------------------------------------------

(function() {
  'use strict';

  false.true = '';         // TypeError
  (14).sailing = 'home';     // TypeError
  'with'.you = 'far away'; // TypeError

})();

/*
 * 2. Simplifying variable uses
 * Strict mode simplifies how variable names map to particular variable definitions in the code.
 *  First, strict mode prohibits with.
 *  Second, eval of strict mode code does not introduce new variables into the surrounding scope.
 *  Third, strict mode forbids deleting plain names. 
 */

'use strict';
var x = 17;
with (obj) { // !!! syntax error
  // If this weren't strict mode, would this be var x, or
  // would it instead be obj.x?  It's impossible in general
  // to say without running the code, so the name can't be
  // optimized.
  x;
}

// -------------------------------------------------------------------------------------

var x = 17;
var evalX = eval("'use strict'; var x = 42; x;");
console.assert(x === 17);
console.assert(evalX === 42);

// -------------------------------------------------------------------------------------

var x;
delete x; // !!! syntax error

eval('var y; delete y;'); // !!! syntax error

/*
 * 3. Making eval and arguments simpler
 * Strict mode makes arguments and eval less bizarrely magical.
 * First, the names eval and arguments can't be bound or assigned in language syntax.
 * Second, strict mode code doesn't alias properties of arguments objects created within it. 
 * Third, arguments.callee is no longer supported.
 */

'use strict';
// All these attempts to do so are syntax errors:
eval = 17;
arguments++;
++eval;
var obj = { set p(arguments) { } };
var eval;
try { } catch (arguments) { }
function x(eval) { }
function arguments() { }
var y = function eval() { };
var f = new Function('arguments', "'use strict'; return 17;");

// -------------------------------------------------------------------------------------

function f(a) {
  'use strict';
  a = 42;
  return [a, arguments[0]];
}
var pair = f(17);
console.assert(pair[0] === 42);
console.assert(pair[1] === 17);

// -------------------------------------------------------------------------------------

var f = function() { return arguments.callee; };
f(); // throws a TypeError

/*
 * 4. "Securing" Javascript
 * Strict mode makes it easier to write "secure" JavaScript.
 *  First, the value passed as this to a function in strict mode is not forced into being an object (a.k.a. "boxed").
 *  Second, in strict mode it's no longer possible to "walk" the JavaScript stack via commonly-implemented extensions to ECMAScript.
 *  Third, arguments for strict mode functions no longer provide access to the corresponding function call's variables.
 */

'use strict';
// That means, among other things, that in browsers it's no longer possible to reference the window object through this inside a strict mode function.
function fun() { return this;  }
console.assert(fun() === undefined);
console.assert(fun.call(2) === 2);
console.assert(fun.apply(null) === null);
console.assert(fun.call(undefined) === undefined);
console.assert(fun.bind(true)() === true);

// -------------------------------------------------------------------------------------

function restricted() {
  'use strict';
  restricted.caller;    // throws a TypeError
  restricted.arguments; // throws a TypeError

}
function privilegedInvoker() {
  return restricted();

}
privilegedInvoker();

// -------------------------------------------------------------------------------------

function fun(a, b) {
  'use strict';
  var v = 12;
  return arguments.caller; // throws a TypeError

}
fun(1, 2); // doesn't expose v (or a or b)

/*
 * 5. Paving the way for future ECMAScript versions
 * First, in strict mode a short list of identifiers become reserved keywords. These words are implements, interface, let, package, private, protected, public, static, and yield.
 * Second, strict mode prohibits function statements not at the top level of a script or function. 
 */

function package(protected) { // !!!
  'use strict';
  var implements; // !!!

  interface: // !!!
    while (true) {
      break interface; // !!!
    }

  function private() {  } // !!!
}
function fun(static) { 'use strict';  } // !!!

// -------------------------------------------------------------------------------------

if (true) {
  function f() {  } // !!! syntax error
  f();
}

for (var i = 0; i < 5; i++) {
  function f2() {  } // !!! syntax error
  f2();
}

function baz() { // kosher
  function eit() {  } // also kosher
}
