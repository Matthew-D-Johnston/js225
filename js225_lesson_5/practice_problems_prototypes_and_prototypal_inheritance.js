"use strict";

// Problem 1

// function getDefiningObject(object, propKey) {
//   if (object[propKey]) {
//     if (object.hasOwnProperty(propKey)) {
//       return object;
//     } else {
//       let parent = Object.getPrototypeOf(object);
//       return getDefiningObject(parent, propKey);
//     }
//   }

//   return null;
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
// console.log(getDefiningObject(qux, 'e'));


// Problem 2

// function shallowCopy(object) {
//   let objectPrototype = Object.getPrototypeOf(object);
//   let copy = Object.create(objectPrototype);

//   Object.keys(object).forEach(key => { copy[key] = object[key] });

//   return copy;
// }

// let foo = {
//   a: 1,
//   b: 2,
// };

// let bar = Object.create(foo);
// bar.c = 3;
// bar.say = function() {
//   console.log('c is ' + this.c);
// };

// let baz = shallowCopy(bar);
// console.log(baz.a === 1);
// baz.say();
// console.log(baz.hasOwnProperty('a') === false);
// console.log(baz.hasOwnProperty('b') === false);


// Problem 3

function extend(destination) {
  for (let index = 0; index < arguments.length; index += 1) {
    Object.keys(arguments[index]).forEach(key => {
      destination[key] = arguments[index][key];
    });
  }

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
}

let funcs = {
  sayHello() {
    console.log('Hello, ' + this.name);
  },

  sayGoodBye() {
    console.log('Goodbye, ' + this.name);
  },
};

let object = extend({}, foo, joe, funcs);

console.log(object);

console.log(object.b.x);
object.sayHello();
