##### JS225 - Object Oriented JavaScript > Object Creation Patterns

---

## Delegate

Write a `delegate` function that can be used to delegate the behavior of a method or function to another object's method. `delegate` takes a minimum of two arguments: (1) the object and (2) name of the method on the object. The remaining arguments, if any, are passed — as arguments — to the objects' method that it delegates to.  

Note that this is not the same as using `bind`. `bind` returns a new function, whereas `delegate` maintains the reference.  

Here's a sample run;

```javascript
const foo = {
  name: 'test',
  bar(greeting) {
    console.log(`${greeting} ${this.name}`);
  },
};

const baz = {
  qux: delegate(foo, 'bar', 'hello'),
};

baz.qux();		// logs 'hello test';

foo.bar = () => { console.log('changed'); };

baz.qux();					// logs 'changed'
```

---

### Problem

##### Description:

Write a function that will delegate the behavior of another method or function to another object's method. The function will take two arguments: the object and the name of the method on the object. Any remaining arguments will be passed as arguments to the objects' method that it delegates to.  

##### Input/Output:

* Input: the function will take an object, the name of a method on that object, and any additional arguments needed for that method.
* Output: whatever output the method passed in is supposed to return.

##### Definitions and Rules:

* the object: any JS object.
* the method: a method that is owned by the object passed in.
* remaining arguments: could be anything but they should be arguments that are required by the method that is passed as an argument.

##### Mental Model:

Define a function. That function will take an object as its first argument. It will take a method on that object as the second argument. It may take other arguments that will be used as arguments passed to the method that is passed into the function we are defining. Within the definition, we want to call the method on the object and pass in the given arguments, if any. We want to return a function.

---

### Examples / Test Cases

```javascript
const foo = {
  name: 'test',
  bar(greeting) {
    console.log(`${greeting} ${this.name}`);
  },
};

const baz = {
  qux: delegate(foo, 'bar', 'hello'),
};

baz.qux();   // logs 'hello test';

foo.bar = () => { console.log('changed'); };

baz.qux();          // logs 'changed'
```

---

### Data Structure

**Input:**

* an object
* a method on the object
* any other additional arguments that are passed to the method

**Output**:

* a function that resembles the method passed in.

---

### Algorithm

* 



---

### Code

```javascript
function delegate(obj, method, ...args) {
  return function() {
    return obj[method](...args);
  }
}
```

---

### LS Solution

```javascript
function delegate(context, methodName, ...args) {
  return () => context[methodName].apply(context, args);
}
```

The main challenge of this exercise is maintaining the reference to the function and its context. Our solution handles this by using the concept of closures so that we can return, and consequently assign to a method, a function that maintains a reference to the `context` object. Using the context and the method name, the solution then uses `Function.prototype.apply` to execute the method on the context object.