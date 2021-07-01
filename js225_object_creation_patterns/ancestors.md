##### JS225 - Object Oriented JavaScript > Object Creation Patterns

---

## Ancestors

Implement an `ancestors` method that returns the prototype chain (ancestors) of a calling object as an array of object names. Here's an example output:  

```javascript
// name property added to make objects easier to identify
const foo = {name: 'foo'};
const bar = Object.create(foo);
bar.name = 'bar';
const baz = Object.create(bar);
baz.name = 'baz';
const qux = Object.create(baz);
qux.name = 'qux';

qux.ancestors();  // returns ['baz', 'bar', 'foo', 'Object.prototype']
baz.ancestors();  // returns ['bar', 'foo', 'Object.prototype']
bar.ancestors();  // returns ['foo', 'Object.prototype']
foo.ancestors();  // returns ['Object.prototype']
```

---

### Problem

##### Description:

Given an object, find all the objects in its prototype chain (i.e. its ancestors) and return those objects within an array.  

##### Input/Output:

* an object (we call our method on the object)
* an array whose elements are all the objects in the calling object's prototype chain.  

##### Definitions and Rules:

* Ancestors: all of the objects that are within a given object's prototype chain.
* Prototype chain: the chain of objects from which the object in question inherits.
* Object names: string representations of the objects' variable names.

##### Mental Model:

Define a method that is capable of being called on objects. When it is called it will return all of the object names that are part of the calling object's prototype chain. It must take the calling object and find its prototype object, push the name of that prototype object to an array, and then find the prototype object of that prototype object. This must be done until we reach the final prototype, which should be the object referenced by `Object.prototype`. We will know that we have come to the end of the prototype chain when trying to retrieve the next prototype object we receive a`null` return value.  

---

### Examples / Test Cases:

```javascript
// name property added to make objects easier to identify
const foo = {name: 'foo'};
const bar = Object.create(foo);
bar.name = 'bar';
const baz = Object.create(bar);
baz.name = 'baz';
const qux = Object.create(baz);
qux.name = 'qux';

qux.ancestors();  // returns ['baz', 'bar', 'foo', 'Object.prototype']
baz.ancestors();  // returns ['bar', 'foo', 'Object.prototype']
bar.ancestors();  // returns ['foo', 'Object.prototype']
foo.ancestors();  // returns ['Object.prototype']
```

---

### Data Structure

**Input:**

- The calling object is an object.

**Output:**

* An array whose elements are names of all the objects in the calling object's prototype chain.

**Intermediate:**

* Strings (i.e. the object names, which are the variable names).

---

### Algorithm

* The method that we call will have to be defined on the object at the top of the hierarchy of the prototype chain, which is `Object.prototype`.
* For the calling object we need to first find it's prototype object. We want to store prototype object's name in an array. As long as that prototype object is not `null`, we will continue going up the prototype chain.
* All objects will have `Object.prototype` as their final prototype object so we can simply push it to the array at the end.

---

### Code

```javascript
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
```

---

### LS Solution

```javascript
Object.prototype.ancestors = function ancestors() {
  const ancestor = Object.getPrototypeOf(this);
  
  if (Object.prototype.hasOwnProperty.call(ancestor, 'name')) {
    return [ancestor.name].concat(ancestor.ancestors());
  }
  
  return ['Object.prototype'];
}
```

###### Dicussion

The problem lends itself well to a recursive solution. The resulting array is incrementally built by recursively calling on the `Object.prototype.ancestors` method. The base case is when `ancestor` does not have a `name` property anymore because it means that `ancestor` is `Object.prototype` already. When this is the case, there are no more prototype objects to add. The key for this solution is recognizing that the value of `this` is the calling object and that we have to add the `ancestors` method on `Object.prototype` so that all objects have access to it.  

Be mindful when adding methods to built-in Objects (e.g, `String.prototype`, `Object.prototype`. It may lead to confusing code and can have unintended consequences.



