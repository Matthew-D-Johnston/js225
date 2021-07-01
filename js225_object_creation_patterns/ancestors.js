"use strict";

Object.prototype.ancestors = function() {
  let prototypes = [];
  let prototypeObj = Object.getPrototypeOf(this);

  while (Object.getPrototypeOf(prototypeObj)) {
    prototypes.push(prototypeObj.name);
    prototypeObj = Object.getPrototypeOf(prototypeObj);
  }

  prototypes.push('Object.prototype');

  return prototypes;
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
