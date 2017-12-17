'use strict';

// "this" is determined by the calling context. When there isn't a calling context, "this" is the window unless 'use strict' => "this" becomes undefined

console.log(this); // window

// -------------------------------------------------------

this.name = 'Jonas';

console.log(this.name);     // 'Jonas'
console.log(window.name);   // 'Jonas'
console.log(name);          // 'Jonas'

// -------------------------------------------------------

function checkThis() {
  console.log(this);
}

checkThis(); // window

// -------------------------------------------------------

var jonas = {
  checkThis: function() {
    console.log(this);
  }
}

jonas.checkThis(); // Object {};

// -------------------------------------------------------

var jonas = {
  checkThis: function() {
    console.log(this);
  }
}

var check = jonas.checkThis;
check(); // window

