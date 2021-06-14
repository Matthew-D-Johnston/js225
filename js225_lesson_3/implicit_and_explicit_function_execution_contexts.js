"use strict";

function foo() {
  return 'this here is: ' + this;
}

console.log(foo());                // "this here is: undefined"

