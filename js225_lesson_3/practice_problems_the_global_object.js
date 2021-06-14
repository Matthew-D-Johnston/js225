"use strict";

// a = 10;

// console.log(global.a === a);


function func() {
  b = 1;
}

func();

console.log(global.b);