"use strict";

Object.prototype.ancestors = function() {
  const prototypeChain = [];
  let currentObj = this;

  while (Object.getPrototypeOf(currentObj) !== Object.prototype) {
    currentObj = Object.getPrototypeOf(currentObj);
    prototypeChain.push(currentObj.name);
  }

  prototypeChain.push('Object.prototype');
  return prototypeChain;
}

const foo = {name: 'foo'};
const bar = Object.create(foo);
bar.name = 'bar';
const baz = Object.create(bar);
baz.name = 'baz';
const qux = Object.create(baz);
qux.name = 'qux';

console.log(qux.ancestors());
console.log(baz.ancestors());
console.log(bar.ancestors());
console.log(foo.ancestors());
