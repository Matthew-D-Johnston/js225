"use strict";

function delegate(obj, methodName, ...args) {
  return function() {
    obj[methodName](...args);
  };
}

const foo = {
  name: 'test',
  bar(greeting) {
    console.log(`${greeting} ${this.name}`);
  },
};

const baz = {
  qux: delegate(foo, 'bar', 'hello'),
};

baz.qux();

foo.bar = () => { console.log('changed');};

baz.qux();
