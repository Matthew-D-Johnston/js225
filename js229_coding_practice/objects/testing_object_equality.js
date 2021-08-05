"use strict";

function objectsEqual(obj1, obj2) {
  let properties1 = Object.keys(obj1);
  let properties2 = Object.keys(obj2);

  if (properties1.length !== properties2.length) {
    return false;
  }

  for (let i = 0; i < properties1.length; i += 1) {
    if (!properties2.includes(properties1[i])) {
      return false;
    }
  }

  for (let i = 0; i < properties1.length; i += 1) {
    if (obj1[properties1[i]] !== obj2[properties1[i]]) {
      return false;
    }
  }

  return true;
}

console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));
console.log(objectsEqual({}, {}));
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));
console.log(objectsEqual({a: 'foo', b: 'bar'}, {b: 'bar', a: 'foo'}));
