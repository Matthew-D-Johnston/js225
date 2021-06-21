"use strict";

function objectsEqual(obj1, obj2) {
  let obj1Keys = Object.keys(obj1);
  let obj2Keys = Object.keys(obj2);

  if (obj1Keys.length !== obj2Keys.length) {
    return false;
  }

  for (let index = 0; index < obj1Keys.length; index += 1) {
    let key = obj1Keys[index];

    if (Array.isArray(obj1[key]) && Array.isArray(obj2[key])) {
      return arraysEqual(obj1[key], obj2[key]);
    } else if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      return objectsEqual(obj1[key], obj2[key]);
    } else if (!obj2Keys.includes(key)) {
      return false
    } else if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}

function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let index = 0; index < arr1.length; index += 1) {
    if (arr1[index] !== arr2[index]) {
      return false;
    }
  }

  return true;
}

console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));
console.log(objectsEqual({}, {}));
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));
console.log(objectsEqual({a: [1, 2], b: 'hello'}, {a: [1, 2], b: 'hello'}));
console.log(objectsEqual({a: {c: 4}, b: 'hello'}, {a: {c: 3}, b: 'hello'}));



