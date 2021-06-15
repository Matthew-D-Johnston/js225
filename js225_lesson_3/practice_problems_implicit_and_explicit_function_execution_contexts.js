// "use strict";

// function foo() {
//   return this;
// }

// let context = foo();
// console.log(context);

// let obj = {
//   foo() {
//     return this;
//   },
// };

// let context = obj.foo();

// console.log(obj.foo());
// console.log(context);


// let a = 10;
// let b = 10;
// let c = {
//   a: -10,
//   b: -10,
// };

// function add() {
//   return this.a + b;
// }

// c.add = add;

// console.log(add());
// console.log(c.add());


let fruitsObj = {
  list: ['Apple', 'Banana', 'Grapefruit', 'Pineapple', 'Orange'],
  title: 'A Collection of Fruit',
};

function outputList(args) {
  console.log(this.title + ':');
  
  let args = [].slice.call(arguments);
  
  args.forEach(function(elem) {
    console.log(elem);
  });
}

// Solution 1:
outputList.call(fruitsObj, ...fruitsObj.list);

// Solution 2:
outputList.apply(fruitsObj, fruitsObj.list);
