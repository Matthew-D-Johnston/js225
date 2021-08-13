"use strict";

// function getDefiningObject(object, propKey) {
//   if (object === null) {
//     return null;
//   } else if (object.hasOwnProperty(propKey)) {
//     return object;
//   } else {
//     return getDefiningObject(Object.getPrototypeOf(object), propKey);
//   }
// }

// let foo = {
//   a: 1,
//   b: 2,
// };

// let bar = Object.create(foo);
// let baz = Object.create(bar);
// let qux = Object.create(baz);

// bar.c = 3;

// console.log(getDefiningObject(qux, 'c') === bar);
// console.log(getDefiningObject(bar, 'a') === foo);
// console.log(getDefiningObject(foo, 'b') === foo);
// console.log(getDefiningObject(qux, 'e'));

// function shallowCopy(object) {
//   let newObject = Object.create(Object.getPrototypeOf(object));
//   let properties = Object.getOwnPropertyNames(object);

//   properties.forEach(prop => {
//     newObject[prop] = object[prop];
//   });

//   return newObject;
// }

// let foo = {
//   a: 1,
//   b: 2,
// }

// let bar = Object.create(foo);
// bar.c = 3;
// bar.say = function() {
//   console.log('c is ' + this.c);
// };

// let baz = shallowCopy(bar);
// console.log(baz.a);
// baz.say();
// console.log(baz.hasOwnProperty('a'));
// console.log(baz.hasOwnProperty('b'));

function extend(destination, ...args) {
  args.forEach(obj => {
    let properties = Object.getOwnPropertyNames(obj);
    properties.forEach(prop => {
      destination[prop] = obj[prop];
    });
  });

  return destination;
}

let foo = {
  a: 0,
  b: {
    x: 1,
    y: 2,
  },
};

let joe = {
  name: 'Joe'
};

let funcs = {
  sayHello() {
    console.log('Hello, ' + this.name);
  },

  sayGoodBye() {
    console.log('Goodbye, ' + this.name);
  },
};

let object = extend({}, foo, joe, funcs);

console.log(object.b.x);
object.sayHello();
console.log(object);
