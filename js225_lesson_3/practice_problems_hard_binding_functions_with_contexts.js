"use strict";

let obj = {
  a: 'Amazebulous!',
};
let otherObj = {
  a: "That's not a real word!",
}

function foo() {
  console.log(this.a);
}

let bar = foo.bind(obj);

console.log(bar.call(otherObj));
