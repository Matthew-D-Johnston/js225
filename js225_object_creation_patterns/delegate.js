"use strict";

function delegate(obj, method, ...args) {
  return function() {
    return obj[method](...args);
  }
}

const foo = {
  name: 'test',
  bar(greeting) {
    console.log(`${greeting} ${this.name}`);
  },
};

const baz = {
  qux: delegate(foo, 'bar', 'hello'),
}

baz.qux();

foo.bar = () => { console.log('changed'); };

baz.qux();
