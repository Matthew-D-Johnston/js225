##### JS225 Object Oriented JavaScript

---

## Lesson 3: Function Contexts and Objects

### 1. Introduction ([here](https://launchschool.com/lessons/c9200ad2/assignments/0f07a0aa))

**first-class functions:** functions a developer can...

* add to objects
* execute in the context of those objects
* remove from their objects
* pass to other functions
* run in entirely different contexts

First-class Functions initially have no context; they receive one when the program executes them.  

Since JavaScript is both an object-oriented language and a language with first-class functions, it must meet the requirements of both. In particular, it must let the developer control the execution context.

---

### 2. Prerequisites ([here](https://launchschool.com/lessons/c9200ad2/assignments/a29e48d9))

##### strict mode:

- Strict eliminates some **silent errors** that occur in sloppy mode by changing them so that they throw errors instead. Silent errors occur when a program does something that is unintended, but continues to run as though nothing is wrong. This can lead to incorrect results or errors much later in execution that are subsequently difficult to track down.
- Strict prevents some code that can inhibit JavaScript's ability to optimize a program so that it runs faster.
- Strict mode prohibits using names and syntax that may conflict with future versions of JavaScript.

These changes offer several benefits to JavaScript developers:

- They prevent or mitigate bugs.
- They help make debugging easier.
- They help your code run faster.
- They help you avoid conflicts with future changes to the language.

Strict mode is easy to turn on either at the global level of a program or at the individual function level. To enable it, add this weird bit of code to the beginning of the program file or function definition:

```javascript
"use strict";
```

---

### 3. The Global Object ([head](https://launchschool.com/lessons/c9200ad2/assignments/c8e3c9a4))

##### global object:

* JavaScript creates the global object when it starts running;
* it serves as the implicit execution context;
* in the browser, it is the `window` object

---

### 4. Practice Problems: The Global Object ([here](https://launchschool.com/lessons/c9200ad2/assignments/3e1452d9))

Be sure to use Chrome Snippets for this assignment. You can use other browser tools or Node, but we will assume that you're using Chrome. If you do use Node or another browser, you may see different results and even experience errors. We introduce Chrome Snippets in [this assignment](https://launchschool.com/lessons/c9200ad2/assignments/c8e3c9a4).

1. With strict mode not enabled, what object serves as the implicit execution context? What happens when strict mode is enabled?

   ###### My Solution

   Without strict mode, the global object serves as the implicit execution context. With strict mode, the implicit execution context is set to `undefined`.

   ###### LS Solution

   ```
   window
   ```

   In strict mode, the global object is not accessible as the implicit execution context.

2. What does the code below log?

   ```javascript
   a = 10;
   
   console.log(window.a === a);
   ```

   ###### My Solution

   ```
   true
   ```

   ###### LS Solution

   ```
   true
   ```

   Initializing an undeclared variable, as we do on line 1 in the code above, automatically creates that variable as a property on `window` since the global object is the implicit context for evaluating expressions.  

3. In strict mode, what does the code in the previous question log?

   ###### My Solution

   It results in a `ReferenceError`.

   ###### LS Solution

   Nothing is logged as line 1 raises a `ReferenceError`.  

   In strict mode, using variables that have not been previously declared is not allowed. Since `a` was not previously declared, the assignment on line 1 raises an error.  

4. What does the code below do?

   ```javascript
   function func() {
     let b = 1;
   }
   
   function();
   
   console.log(b);
   ```

   ###### My Solution

   This should raise a `ReferenceError` since `b` is only declared and defined within the function scope, but we are trying to call it from the global scope.

   ###### LS Solution

   It raises an error:

   ```
   Uncaught ReferenceError: b is not defined
   ```

   This code throws a `ReferenceError`, because the variable _declaration_ on line 2 (which is executed when `func` is invoked on line 5) occurs in function scope. Thus, it isn't a property on the global object and isn't accessible outside the function.

5. What does the code below do?

   ```javascript
   function func() {
     b = 1;
   }
   
   func();
   
   console.log(b);
   ```

   ###### My Solution

   It logs the value assigned to `b` to the console:

   ```
   1
   ```

   ###### LS Solution

   ```
   1
   ```

   Unlike in the previous problem, we don't _declare_ `b`; rather, we simply initialize it. As a result, `b` is created as a property on the global object, despite the fact that it's initialized in function scope.  

6. What does the code below log?

   ```javascript
   "use strict";
   
   function func() {
     b = 1;
   }
   
   func();
   
   console.log(b);
   ```

   ###### My Solution

   It raises a `ReferenceError` since we are now using `strict mode`  and JavaScript does not automatically assign undeclared variable initializations to the global object.  

   ###### LS Solution

   Line 4 raises a `ReferenceError`. In strict mode, we don't have access to the global object as the implicit execution context. Thus, all variables have to be first declared before being used.

---

### 5. Implicit and Explicit Function Execution Contexts ([here](https://launchschool.com/lessons/c9200ad2/assignments/4cc36fd6))

##### execution context

- name of an object;
- every time a JS function is invoked, it has access to an object called the _execution context_ of that function;
- the execution context is accessible through the keyword `this`;

Two Types:

* Implicit: this is an execution context that JavaScript "implicitly" sets.
* Explicit: this is an execution context that you "explicitly" set.

The mechanics of how `this` binding works in JavaScript is an important but somewhat difficult concept. Some of this difficulty can arise from the tendency to apply lexical scoping rules to `this` binding. It's important to remember that the rules for `this` binding are entirely different than the rules for determining the scope of a variable. While variable scope is determined at the time of writing the code, `this` gets bound based on how a function is invoked.

#### Implicit Function Execution Context  

The implicit function execution context (also called implicit binding for functions) is the context for a function that you invoke without supplying an explicit context. JavaScript binds such functions to the global object.  

```javascript
function foo() {
  return 'this here is: ' + this;
}

foo();                // "this here is: [object Window]"
```

That makes sense. Back in the "Global Object" topic we learned that running `foo()` is like running `window.foo()`; the function's execution context is the global object, `window`.  

Examine the following code:  

```javascript
let object = {
  foo() {
    return 'this here is: ' + this;
  },
};

object.foo();              // "this here is: [object Object]"

let bar = object.foo;
bar();                     // "this here is: [object Window]"
```

This example shows that binding a function to a context object occurs **when you execute the function, not when you define it**. On line 9, we set `bar` to point to `object`'s `foo` method. When we call `bar`, JavaScript implicitly binds the method to the global object instead of `object`.  

It's important to note that, in strict mode, `this` in the global scope is `undefined`.  

```javascript
"use strict";

function foo() {
  return 'this here is: ' + this;
}

foo();                // "this here is: undefined"
```

#### Impicit Method Execution Context

The implicit *method* execution context is the execution context for any method (i.e., function referenced as an object property) invoked without an explicit context provided. JavaScript implicitly binds methods invoked in this manner to the calling object:

```javascript
let foo = {
  bar() {
    return this;
  },
};

foo.bar() === foo;
```

It's important to reiterate here that implicit execution context is bound upon invocation, not definition. Consider the example below:

```javascript
let foo = {
  bar() {
    return this;
  },
};

let baz = foo.bar;

baz() === foo;		// false
baz() === window; // true
```

Although `bar` begins its life as an object property, when it is invoked as a function (as it is after being assigned to `baz`) its context is bound to the global object.  

A possible source of confusion here is the use of the term "implicit." The confusion arises because of the way we invoke the function; in that, it has an "explicit" receiver or calling object. In this sense, it is not far-fetched to describe the type of execution context of a method invocation as "explicit." Contrast this to a function invocation, wherein the calling object (`window` when running JS code in the browser) is "implicit."  

That said, whether the calling object is implicit (function invocation) or explicit (method invocation), the execution context is implicitly set for us by JavaScript, and in both cases it sets it to the calling object.  

We'll get to appreciate better the distinction between an execution context that is set implicitly versus explicitly in the next section when we talk about the two methods we can use to set the execution context explicitly.  

#### Explicit Function Execution Context

JavaScript lets us use the `call` and `apply` methods to change a function's execution context at execution time. That is, we can explicitly bind a function's execution context to an object when we execute the function.  

```javascript
a = 1;

let object = {
  a: 'hello',
  b: 'world',
};

function foo() {
  return this.a;
}

foo();									// 1 (context is global object)
foo.call(object);				// "hello" (context is object)
```

On line 13, we explicitly bind the execution context of `foo` to `object`. Thus, `this` on line 9 references `object` instead of the global object.  

```javascript
let strings = {
  a: 'hello',
  b: 'world',
  foo() {
    return this.a + this.b;
  },
};

let numbers = {
  a: 1,
  b: 2,
};

strings.foo.call(numbers); // 3
```

Here, we run `foo` from `strings` in the `numbers` context. We're "borrowing" a method from an object to use with another object; we're not copying it.  

The `call` method can also pass arguments to the function. List the arguments one by one after the context object:

```javascript
someObject.someMethod.call(context, arg1, arg2, arg3, ...)
```

The `call` method can also pass arguments to the function. List the arguments one by one after the context object:  

```javascript
someObject.someMethod.call(context, arg1, arg2, arg3, ...)
```

```javascript
let iPad = {
  name: 'iPad',
  price: 40000,
};
let kindle = {
  name: 'kindle',
  price: 30000,
};

function printLine(lineNumber, punctuation) {
  console.log(lineNumber + ': ' + this.name + ', ' + this.price / 100 + ' dollars' + punctuation);
}

printLine.call(iPad, 1, ';');        // => 1: iPad, 400 dollars;
printLine.call(kindle, 2, '.');      // => 2: kindle, 300 dollars.
```

The `apply` method is identical to `call`, except that it uses an array to pass arguments.  

```javascript
someObject.someMethod.apply(context, [arg1, arg2, arg3, ...])
```

```javascript
printLine.apply(iPad, [1, '.'])  // 1: iPad, 400 dollars.
```

Use this mnemonic to help remember what each method does:

- **C**all: **C**ount the **C**ommas (you have to count the number of arguments to match the called function)
- **A**pply: **A**rguments as **A**rray

---

### 6. Practice Problems: Implicit and Explicit Function Execution Contexts ([here](https://launchschool.com/lessons/c9200ad2/assignments/84fbe7cb))

Be sure to use Chrome Snippets for this assignment. You can use other browser tools or Node, but we will assume that you're using Chrome. If you do use Node or another browser, you may see different results and even experience errors. We introduce Chrome Snippets in [this assignment](https://launchschool.com/lessons/c9200ad2/assignments/c8e3c9a4).

1. What will the code below output?

   ```javascript
   function foo() {
     return this;
   }
   
   let context = foo();
   console.log(context);
   ```

   ###### My Solution

   ```
   Window {0: global, 1: global, window: Window, self: Window, document: document, name: "", location: Location, …}
   ```

   ###### LS Solution

   The code logs the browser's global object, `Window`. That looks something like this in the Chrome Console:

   ```
   Window { /* a bunch of key/value pairs */ }
   ```

   The return value of the `foo` function is the value of the global object (`global`). We assign context to that variable, then display it to show the value of `global`.

2. What will the code in the previous question output in strict mode?

   ###### My Solution

   ```
   undefined
   ```

   ###### LS Solution

   ```
   undefined
   ```

   The return value of `foo` is the global `this`, which is undefined in strict mode.

3. What will the code below output? Explain the difference, if any, between this output and that of problem 1.

   ```javascript
   let obj = {
     foo() {
       return this;
     },
   };
   
   let context = obj.foo();
   
   console.log(context);
   ```

   ###### My Solution

   ```
   [object Object]
   ```

   The difference here is that the execution context when we invoke the `foo()` method is `obj`; that means that `this` refers to `obj` as opposed to the global object in the above problem 1.

   ###### LS Solution

   ```
   {foo: f}
   ```

   Unlike problem 1, this code outputs the object `obj`. This happens since `foo` is invoked as a *method*. Thus, its execution context refers to the object used to call the function.

4. What will the code below output?

   ```javascript
   var message = 'Hello from the global scope!';
   
   function deliverMessage() {
     console.log(this.message);
   }
   
   deliverMessage();
   
   let bar = {
     message: 'Hello from the function scope!',
   }
   
   bar.deliverMessage = deliverMessage;
   
   bar.deliverMessage();
   ```

   ###### My Solution

   ```
   Hello from the global scope!
   Hello from the function scope!
   ```

   ###### LS Solution

   ```
   Hello from the global scope!
   Hello from the function scope!
   ```

   The first log operation is generated by the *function* call, `deliverMessage()` on line 7. Since this is a function invocation, the implicit function execution context is the global object, `Window`. That means that JavaScript looks in `Window` for the variable `message`.  

   The second log operation is generated by the *method* call `bar.deliverMessage()` on line 15. Since the implicit function execution context for a method invocation is the calling object, `this` resolves to `bar`, and `this.message` resolves to `bar`'s property `message`.

5. What will the code below output? What would happen if we replaced `var` on line 1 with `let`? Can you explain why the output changes?

   ```javascript
   var a = 10;
   let b = 10;
   let c = {
     a: -10,
     b: -10,
   };
   
   function add() {
     return this.a + b;
   }
   
   c.add = add;
   
   console.log(add());
   console.log(c.add());
   ```

   ###### My Solution

   ```
   20
   0
   ```

   If we change `var` on line 1 to `let` we get an error: `Uncaught SyntaxError: Identifier 'a' has already been declared`. 

   ###### LS Solution

   **With `var` on line 1**

   ```
   20
   0
   ```

   **With `let` on line 1**

   ```
   NaN
   0
   ```

   As in question 3, the key detail here is that the first invocation of `add` is as a function, while the second invocation is as a method. In the function invocation, on line 14, `this` resolves to the global object, and the property `a` to the value `10`. In the method invocation, however, `this` resolves to the object `c`, and the property `a` to the value `-10`. In both cases a simple reference to `b`.  

   When we replaced `var` with `let`, the output of the function call is `NaN`, not `20`. This happens because global `var` variables create properties on the global object, but `let` and `const` create variables that don't belong to any object.

6. The problems above all feature *implicit* function execution context. What methods have we learned so far that let us explicitly specify what a function's execution context should be?  

   ###### My Solution

   We have learned the `call` and `apply` functions that allow us to explicitly satisfy a function's execution context.

   ###### LS Solution

   The `Function` methods `call` and `apply` let us explicitly set the function execution context.

7. In the code below, use `call` to invoke `add` as a method on `bar`, but with `foo` as the execution context. What will this return?

   ```javascript
   let foo = {
     a: 1,
     b: 2,
   };
   
   let bar = {
     a: 'abc',
     b: 'def',
     add() {
       return this.a + this.b;
     },
   };
   ```

   ###### My Solution

   ```javascript
   bar.add.call(foo);
   // => 3
   ```

   ###### LS Solution

   ```javascript
   bar.add.call(foo); // 3
   ```

   Since we are invoking `call` on `bar.add` and supplying the object `foo` as explicit context, `foo`'s properties `a` and `b`, rather than `bar`'s, will be referenced during execution, returning a value of `3`.

8. Given the code and desired output shown below, should you use `call` or `apply` to supply explicit context and the arguments to `outputList`? That is, which method makes the most sense to use? Implement a solution using your preferred method such that the desired output is logged, and explain your choice.

   ```javascript
   let fruitsObj = {
     list: ['Apple', 'Banana', 'Grapefruit', 'Pineapple', 'Orange'],
     title: 'A Collection of Fruit',
   };
   
   function outputList() {
     console.log(this.title + ':');
     
     let args = [].slice.call(arguments);
     
     args.forEach(function(elem) {
       console.log(elem);
     });
   }
   
   // invoke outputList here
   ```

   Desired output:

   ```
   A Collection of Fruit:
   Apple
   Banana
   Grapefruit
   Pineapple
   Orange
   ```

   ###### My Solution

   I came up with two solutions:  

   **First Solution:**

   ```javascript
   outputList.call(fruitsObj, ...fruitsObj.list);
   ```

   This solution uses the `call` method and sets the execution context to `fruitsObj`, but since `call` takes comma separated arguments we need to use spread syntax to transform the array of fruits associated with `fruitsObj.list` into comma separated arguments.  

   **Second Solution:**

   ```
   outputList.apply(fruitsObj, fruitsObj.list);
   ```

   This solution uses the `apply` method and also sets the execution context to `fruitsObj`. However, since `apply` takes additional arguments in the form of an array, we don't need to use spread syntax on our `fruitsObj.list` array; we can simply supply the array as is and the `apply` method will disaggregate the array so that each element is a separate argument.

   ###### LS Solution

   ```javascript
   outputList.apply(fruitsObj, fruitsObj.list);
   ```

   `apply` takes an array of arguments to be passed to the invoked function, rather than `call`'s comma-separated arguments. Since the data we are concerned with (`fruitsObj.list`) is held in Array format, it makes more sense to use `apply`.  

   A more modern solution for this problem uses `call` and the new "spread syntax" touched on in our [Syntactic Sugar gist](https://launchschool.com/gists/2edcf7d7):

   ```javascript
   outputList.call(fruitsObj, ...fruitsObj.list);
   ```

9. For an extra challenge, consider this line of code from the previous problem:

   ```javascript
   let args = [].slice.call(arguments);
   ```

   Inside of JavaScript functions, `arguments` is an object that holds all of the arguments passed to the function. Bearing in mind that the function author wants to iterate over the arguments later in the method using an `Array` method, why do you think he or she is invoking `call`?  

   ###### My Solution

   The reason the function author uses `[].slice.call(arguments)` is so that s/he can later iterate over the list of arguments using `forEach`. `arguments` may seem like a normal array but it is a special kind of array and does not allow use of the `forEach` method on it. Thus, the function author has to create a copy of the `arguments` array and to do that, s/he calls the `slice` method on an empty array and sets the execution context to the `arguments` array. This creates a more normal array object with all of the elements from the `arguments` array.

   ###### LS Solution

   It isn't possible to call `forEach` on `arguments` since it is only `Array`-like and not an array. However, since it is `Array`-like (having indices from `0` to `length - 1`) we can use it as the context to a `slice` method call on an empty array. The return value assigned to `args` is an array holding all of the arguments passed to the `outputList` function since we are executing `slice` with no arguments passed to it (recall: the first value passed to `call` is a the execution context).  

   Modern JavaScript doesn't use the built-in `arguments` object. Instead, it uses the new rest syntax that we discuss in our [Syntactic Sugar gist](https://launchschool.com/gists/2edcf7d7):

   ```javascript
   let fruitsObj = {
     list: ['Apple', 'Banana', 'Grapefruit', 'Pineapple', 'Orange'],
     title: 'A Collection of Fruit',
   };
   
   function outputList(...args) {
     console.log(this.title + ':');
   
     args.forEach(function(elem) {
       console.log(elem);
     });
   }
   
   // invoke outputList here
   ```

---

### 7. Hard Binding Functions with Contexts ([here](https://launchschool.com/lessons/c9200ad2/assignments/bb359c53))

In an earlier assignment, we learned how to use `call` and `apply` to change a function's execution context. JavaScript also has a `bind` method that lets us bind a function to a context object permanently:  

```javascript
let object = {
  a: 'hello',
  b: 'world',
  foo() {
    return this.a + ' ' + this.b;
  },
};

let bar = object.foo;
bar();                                // "undefined undefined"

let baz = object.foo.bind(object);
baz();                                // "hello world"

let object2 = {
  a: 'hi',
  b: 'there',
};

baz.call(object2);  // "hello world" - `this` is still `object`
```

Unlike `call` or `apply`, `bind` doesn't execute a function. Instead, it creates and returns a new Function, and permanently binds it to a given object. Since the binding is permanent, we can pass the function around without concern that its context will change; it won't.  

JavaScript implements `bind` something like this:

```javascript
Function.prototype.bind = function (...args) {
  let fn = this;
  let context = args.shift();

  return function () {
    return fn.apply(context, args);
  };
};
```

While you've learned enough to understand most of that code, it's not really important to wrap your head around it. What's important to recognize is that `bind`'s context is the original function, and it returns a new function that calls the original function with the context supplied to bind as its first argument. This code also shows why the binding makes permanent changes -- no matter what you do to the returned function, you can't change the value of `context`.  

---

### 8. Example: Changing Function Context ([here](https://launchschool.com/lessons/c9200ad2/assignments/b2b3d375))

---

### 9. Practice Problems: Hard Binding Functions with Contexts ([here](https://launchschool.com/lessons/c9200ad2/assignments/5f5647a7))

1. What function can we use to permanently bind a function to a particular execution context?

   ###### My Solution

   We can use the `bind` function.

   ###### LS Solution

   We can use the `Function` method `bind` to permanently bind a function to an execution context.

2. What will the code below log to console?

   ```javascript
   let obj = {
     message: 'JavaScript',
   };
   
   function foo() {
     console.log(this.message);
   }
   
   foo.bind(obj);
   ```

   ###### My Solution

   ```
   JavaScript
   ```

   ###### LS Solution

   Nothing. Unlike call and apply, bind doesn't invoke the receiver function. Rather, it returns a new function that is permanently bound to the context argument.

3. What will the code below output?

   ```javascript
   let obj = {
     a: 2,
     b: 3,
   };
   
   function foo() {
     return this.a + this.b;
   }
   
   let bar = foo.bind(obj);
   
   console.log(bar());
   ```

   ###### My Solution

   ```
   5
   ```

   ###### LS Solution

   ```
   5
   ```

   `foo` is explicitly bound to `obj` on line 10, and as a result references that object's properties `a` and `b` when it is invoked.

4. What will the code below log to the console?

   ```javascript
   let positiveMentality = {
     message: 'JavaScript makes sense!',
   };
   
   let negativeMentality = {
     message: 'JavaScript makes no sense!',
   };
   
   function foo() {
     console.log(this.message);
   }
   
   let bar = foo.bind(positiveMentality);
   
   negativeMentality.logMessage = bar;
   negativeMentality.logMessage();
   ```

   ###### My Solution

   ```
   JavaScript makes sense!
   ```

   ###### LS Solution

   ```
   JavaScript makes sense!
   ```

   Since `bar` is bound to `positiveMentality` as the return value of the `bind` invocation on line 13, `positiveMentality`'s property `message` is logged by the function call on the last line, despite the fact that the function is invoked as a method on the `negativeMentality` object.

5. What will the code below output?

   ```javascript
   let obj = {
     a: 'Amazebulous!',
   };
   let otherObj = {
     a: "That's not a real word!",
   }
   
   function foo() {
     console.log(this.a);
   }
   
   let bar = foo.bind(obj);
   
   bar.call(otherObj);
   ```

   ###### My Solution

   Not totally confident here, but I'm guessing if `bind` _permanently_ binds the function to a particular execution context, then we should still get...

   ```
   Amazebulous!
   ```

   ###### LS Solution

   ```
   Amazebulous!
   ```

   Once a function has been bound to an execution context with `bind`, its context can't be changed, even explicitly. In keeping with this, the last line of our code outputs `Amazebulous!`, because the function `bar` has been bound to `obj`. Thus, inside of `bar`, `this` points to `obj` when `bar` is invoked on the last line, rather than `otherObj`, despite the fact that the function is being invoked by `call` with `otherObj` as the explicit context argument.

---

### 10. Dealing with Context Loss (1) ([here](https://launchschool.com/lessons/c9200ad2/assignments/013f9f02))

#### Method Losing Context when Taken Out of Object

If you remove a method from its containing object and execute it, it loses its context:

```javascript
let john = {
  firstName: 'John',
  lastName: 'Doe',
  greetings() {
    console.log('hello, ' + this.firstName + ' ' + this.lastName);
  },
};

let foo = john.greetings;
foo();

// => hello, undefined undefined
```

---

### 11. Dealing with Context Loss (2) ([here](https://launchschool.com/lessons/c9200ad2/assignments/022f50f4))

#### Internal Function Losing Method Context

Examine this code:

```javascript
let obj = {
  a: 'hello',
  b: 'world',
  foo() {
    function bar() {
      console.log(this.a + ' ' + this.b);
    }

    bar();
  },
};

obj.foo();        // => undefined undefined
```

Your instincts may tell you that this code will log `"hello world"` to the console. Your instincts are wrong here. Even though `foo` executes within the `obj` context, the call to `bar` on line 9 does not provide an explicit context, which means that JavaScript binds the global object to the function. As a result, `this` on line 6 is the global object, not `obj`.  

This trap is insidious and well-known. Most developers consider it to be a mistake in the language design. If we provide the context to call `foo`, then the context *should* propagate to its internal functions. It doesn't, though, and it's hard to imagine how binding the function to the global object is ever useful.  

Let's look at some solutions to this problem:  

###### Solution 1: Preserve Context with a Local Variable in the Lexical Scope

One common approach is the `let self = this` or `let that = this` fix. You save `this` in a variable named `self` or `that` before calling the function, then reference the variable in the function.  

```javascript
let obj = {
  a: 'hello',
  b: 'world',
  foo() {
    let self = this;

    function bar() {
      console.log(self.a + ' ' + self.b);
    }

    bar();
  }
};

obj.foo();
>hello world
```

Here we assign `this` to a local variable `self` on line 5. Based on its lexical scope, `bar` has access to `self`, so it can freely use `self` instead of `this` to access the proper context object.  

###### Solution 2: Pass the Context to Internal Functions

You can also pass the context object to the function with `call` or `apply`, as seen here on line 9:

```javascript
let obj = {
  a: 'hello',
  b: 'world',
  foo() {
    function bar() {
      console.log(this.a + ' ' + this.b);
    }

    bar.call(this);
  }
};

obj.foo();
>hello world
```

###### Solution 3: Bind the Context with a Function Expression

You can use `bind` when you define the function to provide a permanent context to `bar`. Note that you must call `bind` with a function expression, not a function declaration; using `bind` with a function declaration results in an error.  

```javascript
let obj = {
  a: 'hello',
  b: 'world',
  foo() {
    let bar = function() {
      console.log(this.a + ' ' + this.b);
    }.bind(this);

    // some lines of code

    bar();

    // more lines of code

    bar();

    // ...
  }
};

obj.foo();
>hello world
>hello world
```

One advantage of using `bind` is that you can do it once and then call it as often as you want without explicitly providing a context.  

###### Solution 4: Using an Arrow Function

We can define `bar` using an arrow function since the value of `this` when using an arrow function is based on lexical scoping rules.  

```javascript
let obj = {
  a: 'hello',
  b: 'world',
  foo() {
    let bar = () => console.log(this.a + ' ' + this.b);
    bar();
  }
};

obj.foo();
>hello world
```

---

### 12. Dealing with Context Loss (3) ([here](https://launchschool.com/lessons/c9200ad2/assignments/f68a9f7f))

#### Function as Argument Losing Surrounding Context

Examine this code:

```javascript
function repeatThreeTimes(func) {
  func();
  func();
  func();
}

let john = {
  firstName: 'John',
  lastName: 'Doe',
  greetings() {
    repeatThreeTimes(function() {
      console.log('hello, ' + this.firstName + ' ' + this.lastName);
    });
  },
};

john.greetings();

// => hello, undefined undefined
// => hello, undefined undefined
// => hello, undefined undefined
```

In this example, we call `repeatThreeTimes` with a function argument that contains `this`. `repeatThreeTimes` calls its argument three times, but each time it does so without an explicit context. As we've learned, this means the context is the global object. Thus, `this` inside the function is the global object, not `john`.  

If you think that this problem happens infrequently, consider this code:

```javascript
let obj = {
  a: 'hello',
  b: 'world',
  foo() {
    [1, 2, 3].forEach(function(number) {
      console.log(String(number) + ' ' + this.a + ' ' + this.b);
    });
  },
};

obj.foo();

// => 1 undefined undefined
// => 2 undefined undefined
// => 3 undefined undefined
```

It looks simple enough; the code loops over an array and logs some information to the console. The problem, though, is that `forEach` executes the anonymous function passed to it, so it gets executed with the global object as context. Once again, `this` has the wrong value, and the function doesn't do what we want.  

This problem is easy to fix. You can use the same solutions we used to solve the problem in the previous assignment.  

###### Solution 1: Use a local variable in the lexical scope to store this

```javascript
let obj = {
  a: 'hello',
  b: 'world',
  foo() {
    let self = this;
    [1, 2, 3].forEach(function(number) {
      console.log(String(number) + ' ' + self.a + ' ' + self.b);
    });
  },
};

obj.foo();

// => 1 hello world
// => 2 hello world
// => 3 hello world
```

###### Solution 2: Bind the argument function with the surrounding context

```javascript
let obj = {
  a: 'hello',
  b: 'world',
  foo() {
    [1, 2, 3].forEach(function(number) {
      console.log(String(number) + ' ' + this.a + ' ' + this.b);
    }.bind(this));
  },
};

obj.foo();

// => 1 hello world
// => 2 hello world
// => 3 hello world
```

###### Solution 3: Use the optional thisArg argument

Some methods that take function arguments allow an optional argument that defines the context to use when executing the function. `Array.prototype.forEach`, for instance, has an optional `thisArg` argument for the context. This argument makes it easy to work around this context loss problem.  

```javascript
let obj = {
  a: 'hello',
  b: 'world',
  foo() {
    [1, 2, 3].forEach(function(number) {
      console.log(String(number) + ' ' + this.a + ' ' + this.b);
    }, this);
  },
};

obj.foo();

// => 1 hello world
// => 2 hello world
// => 3 hello world
```

`Array.prototype.map`, `Array.prototype.every`, and `Array.prototype.some` also takes an optional `thisArg` argument.  

###### Solution 4: Use arrow function for the callback

Arrow functions do not have a `this` binding. Instead of `this` being dependent on the location of the function invocation, JavaScript resolves it by looking at the enclosing scopes.  

```javascript
let obj = {
  a: 'hello',
  b: 'world',
  foo() {
    [1, 2, 3].forEach((number) => {
      console.log(String(number) + ' ' + this.a + ' ' + this.b);
    });
  },
};

obj.foo();

// => 1 hello world
// => 2 hello world
// => 3 hello world
```

`this` resolves to `obj` which is the immediately enclosing scope.

---

### 13. Practice Problems: Dealing with Context Loss ([here](https://launchschool.com/lessons/c9200ad2/assignments/92892280))

1. Our desired output for the code below is: `Christopher Turk is a Surgeon.` What will the code output, and what explains the difference, if any, between the actual and desired outputs?

   ```javascript
   let turk = {
     firstName: 'Christopher',
     lastName: 'Turk',
     occupation: 'Surgeon',
     getDescription() {
       return this.firstName + ' ' + this.lastName + ' is a ' + this.occupation + '.';
     }
   };
   
   function logReturnVal(func) {
     let returnVal = func();
     console.log(returnVal);
   }
   
   logReturnVal(turk.getDescription);
   ```

   ###### My Solution

   My guess:

   ```
   undefined undefined is a undefined.
   ```

   After running the code without strict mode:

   ```
   undefined undefined is a undefined.
   ```

   If run with strict mode on, then we get the following:

   ```
   TypeError: Cannot read property 'firstName' of undefined
   ```

   We receive a `TypeError` in strict mode, indicating that the `firstName` property cannot be read of `undefined`. In non-strict mode, we get an output but not what we expect. In both cases, we realize that `this` is returning a value of `undefined` rather than an object. This is because when the `getDescription` function is passed to the `logReturnVal`, it loses its original execution context of `turk`. It now is associated with whatever the global object is.

   ###### LS Solution

   ```
   undefined undefined is a undefined.
   ```

   When we extracted `getDescription` from `turk` and passed it into `logReturnVal` as an argument, we removed the method from its context. As a result, upon execution as `func`, `this` will point to the global object, rather than `turk`. Since `Window` doesn't have properties defined for `firstName`, `lastName`, or `occupation`, we get the output we do.

2. Alter `logReturnVal` such that it takes an additional `context` argument, and use one of the methods we've learned in this lesson to invoke `func` inside of `logReturnVal` with `context` as its function execution context. Alter the invocation of `logReturnVal` and supply `turk` as the context argument.

   ###### My Solution

   ```javascript
   // ... rest of code omitted for brevity
   
   function logReturnVal(func, context) {
     let returnVal = func.call(context);
     console.log(returnVal);
   }
   
   logReturnVal(turk.getDescription, turk);
   ```

   ###### LS Solution

   ```javascript
   function logReturnVal(func, context) {
     let returnVal = func.call(context);
     console.log(returnVal);
   }
   
   logReturnVal(turk.getDescription, turk);
   ```

   Using `call` to invoke `func` and passing in the argument `context`, we are able to supply the function with execution context. On the invocation on the last line of our code we do just this, supplying `turk` as the context and producing our desired output.  

   Note that, in this case, the use of `apply` is equally suitable as a solution. 

3. Suppose that we want to extract `getDescription` from `turk`, but always have it execute with `turk` as context. Use one of the methods we've learned in the last lesson to assign such a permanently bound function to a new variable, `getTurkDescription`.

   ###### My Solution

   ```javascript
   let getTurkDescription = turk.getDescription.bind(turk);
   ```

   ###### LS Solution

   ```javascript
   let getTurkDescription = turk.getDescription.bind(turk);
   ```

4. Consider the code below, and our desired output:

   ```javascript
   let TESgames = {
     titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
     seriesTitle: 'The Elder Scrolls',
     listGames() {
       this.titles.forEach(function(title) {
         console.log(this.seriesTitle + ' ' + title);
       });
     }
   };
   
   TESgames.listGames();
   ```

   Desired output:

   ```
   The Elder Scrolls Arena
   The Elder Scrolls Daggerfall
   The Elder Scrolls Morrowind
   The Elder Scrolls Oblivion
   The Elder Scrolls Skyrim
   ```

   ###### My Solution

   No, this code will not log our desired output. The reason is that when we pass the function expresion to the `forEach` method we lose the execution context of `TESgames`. Therefore, `this` within the function expression points to the global object rather than `TESgames`.

   ###### LS Solution

   This code doesn't log our desired output, but instead logs this:

   ```
   undefined Arena
   undefined Daggerfall
   undefined Morrowind
   undefined Oblivion
   undefined Skyrim
   ```

   This happens because functions as arguments lose the surrounding context. In this case, the function expression invoked on each iteration of `forEach` inside of `listGames` loses `TESgames` as context. As a result, `this` on line 6 references the global object, and resolves to `undefined` rather than `"The Elder Scrolls"`.

5. Use an arrow function so that the code logs our desired output.

   ###### My Solution

   ```javascript
   let TESgames = {
     titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
     seriesTitle: 'The Elder Scrolls',
     listGames() {
       this.titles.forEach((title) => {
         console.log(this.seriesTitle + ' ' + title);
       });
     }
   };
   
   TESgames.listGames();
   ```

   ###### LS Solution

   ```javascript
   let TESgames = {
     titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
     seriesTitle: 'The Elder Scrolls',
     listGames() {
       this.titles.forEach((title) => {
         console.log(this.seriesTitle + ' ' + title);
       });
     }
   };
   ```

6. Use the `let self = this` fix to alter `TESgames.listGames` such that it logs our desired output to the console.

   ###### My Solution

   ```javascript
   let TESgames = {
     titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
     seriesTitle: 'The Elder Scrolls',
     listGames() {
       let self = this;
       this.titles.forEach(function(title) {
         console.log(self.seriesTitle + ' ' + title);
       });
     }
   };
   ```

   ###### LS Solution

   ```javascript
   let TESgames = {
     titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
     seriesTitle: 'The Elder Scrolls',
     listGames() {
       let self = this;
       this.titles.forEach(function(title) {
         console.log(self.seriesTitle + ' ' + title);
       });
     }
   };
   ```

7. If we don't want to rely on `let self = this`, `forEach` provides us with an alternative means of supplying execution context to the inner function. Use this means to achieve our desired output.

   ###### My Solution

   ```javascript
   let TESgames = {
     titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
     seriesTitle: 'The Elder Scrolls',
     listGames() {
       this.titles.forEach(function(title) {
         console.log(this.seriesTitle + ' ' + title);
       }, this);
     }
   };
   ```

   ###### LS Solution

   ```javascript
   let TESgames = {
     titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
     seriesTitle: 'The Elder Scrolls',
     listGames() {
       this.titles.forEach(function(title) {
         console.log(this.seriesTitle + ' ' + title);
       }, this);
     }
   };
   ```

   `forEach` (and many other list-processing methods) have an optional `thisArg` parameter that, if supplied an argument, sets that argument as execution context for the inner function. In the solution above, we pass `this` as the context argument, ensuring that the value of `this` in the inner function refers to `TESgames`.

8. Consider the code below:

   ```javascript
   let foo = {
     a: 0,
     incrementA() {
       function increment() {
         this.a += 1;
       }
       
       increment();
     }
   };
   
   foo.incrementA();
   foo.incrementA();
   foo.incrementA();
   ```

   What will the value of `foo.a` be after this code has executed?

   ###### My Solution

   ```
   0
   ```

   ###### LS Solution

   ```
   foo.a // 0
   ```

   Since inner functions lose the outer object as context, `this.a` on line 5 references a global `a`, rather than `foo`'s property `a`. As a result, `foo.a` is unaltered by the method invocations, and its value remains `0`.

9. Use one of the methods we learned in this lesson to invoke `increment` with explicit context such that `foo.a` is incremented with each invocation of `incrementA`.

   ###### My Solution

   ```javascript
   let foo = {
     a: 0,
     incrementA() {
       function increment() {
         this.a += 1;
       }
       
       increment.call(this);
     }
   };
   ```

   ###### LS Solution

   ```javascript
   let foo = {
     a: 0,
     incrementA() {
       function increment() {
         this.a += 1;
       }
   
       increment.apply(this);
     }
   };
   ```

   We can use `apply` (or, for that matter, `call`) to invoke `increment` on line 8 with explicit context. We pass in `this` as the context argument, since inside of method space (but outside of inner function space) `this` references the containing object.

10. We decide that we want each invocation of `foo.incrementA` to increment `foo.a` by `3`, rather than `1`, and alter our code accordingly:

    ```javascript
    let foo = {
      a: 0,
      incrementA() {
        function increment() {
          this.a += 1;
        }
        
        increment.apply(this);
        increment.apply(this);
        increment.apply(this);
      }
    };
    ```

    Calling `apply` three times seems repetitive, though. Use `bind` to permanently set `foo` as `increment`'s execution context.

    ###### My Solution

    ```javascript
    let foo = {
      a: 0,
      incrementA() {
        let increment = function() {
          this.a += 1;
        }.bind(this);
        
        increment(this);
        increment(this);
        increment(this);
      }
    };
    ```

    ###### LS Solution

    ```javascript
    let foo = {
      a: 0,
      incrementA() {
        let increment = function() {
          this.a += 1;
        }.bind(this);
    
        increment();
        increment();
        increment();
      }
    }
    ```

    We get to use `Function.prototype.bind` by changing the syntax for defining the `increment` function from a function declaration to a function expression. We then supply `this` as context, because `this` points to the object holding the method.

---

### 14. Summary: The this Keyword in JavaScript ([here](https://launchschool.com/lessons/c9200ad2/assignments/76bc0829))

#### Gentle explanation of 'this' keyword in JavaScript ([here](https://web.archive.org/web/20180209163541/https://dmitripavlutin.com/gentle-explanation-of-this-in-javascript/))

##### 1. the mystery of `this`

JavaScript has 4 function invocation types:

1. function invocation: `alert('Hello world!')`
2. method invocation: `console.log('Hello World!')`
3. constructor invocation: `new RegEx('\\d')`
4. indirect invocation: `alert.call(undefined, 'Hello World!')`

Each invocation type defines the execution context in its own way.  

Some terms to familiarize oneself with:

* **Invocation** of a function is executing the code that makes the body of a function, or simply calling the function. For example, `parseInt` function invocation is `parseInt('15')`.
* **Context** of an invocation is the value of `this` within function body. For example, the invocation of `map.set('key', 'value')` has the context `map`.
* **Scope** of a function is the set of variables, objects, functions accessible within a function body.

##### 2. Function invocation

**Function invocation** is peformed when an expression that evaluates to a function object is followed by an open parenthesis (, a comma separated list of arguments expressions and a close parenthesis). For example, `parseInt('18')`.  

*Function invocation* expression cannot be a [property accessor](https://web.archive.org/web/20180209163541/https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Property_accessors) `obj.myFunc()`, which creates a *method invocation*. For example `[1,5].join(',')` is **not** a function invocation, but a method call. This distinction is important to remember.  

##### 2.1 `this` in function invocation

_`this` is the **global object** in a function invocation_  

The global object is determined by the execution environment. In a browser, it is the `window` object.  

##### 2.2 `this` in function invocation, strict mode

_`this` is `undefined` in a function invocation in strict mode_

In strict mode, the execution context is **not** the global object anymore.

##### 2.3 Pitfall: `this` in an inner function

A common trap with the function invocation is thinking that `this` is the same in an inner function as in the outer function.  

##### 3. Method invocation

A **method** is a function stored in a property of an object. For example:

```javascript
var myObject = {
  // helloFunction is a method
  helloFunction: function() {
    return 'Hello World!';
  }
};
var message = myObject.helloFunction();
```

**Method invocation** is performed when an expression in the form of a property accessor that evaluates to a function object is followed by an open parenthesis `(`, a comma separated list of arguments expressions, and a close parenthesis `)`.  

Recalling the previous example, `myObject.helloFunction()` is a method invocation of `helloFunction` on the object `myObject`. Other method calls include: `[1, 2].join(',')` or `/\s/.test('beautiful world')`.  

It is important to distinguish **function invocation** from **method invocation**, because they are different types. The main difference is that method invocation requires a property accessor form to call the function (`obj.myFunc()` or `obj['myFunc']()`), while function invocation does not (`myFunc()`).  

##### 3.1 `this` in method invocation

_`this` is the **object that owns the method** in a method invocation_  

When invoking a method on an object, `this` becomes the object itself.  

##### 3.2 Pitfall: separating method from its object

A method from an object can be extracted into a separated variable `var alone = myObj.myMethod`. When the method is called alone, detached from the original object `alone()`, you might think that `this` is the object on which the method was defined.  

If the method is called without an object, then a function invocation happens: where `this` is the global object `window` or `undefined` in strict mode.  

Creating a bound function `var alone = myObj.myMethod.bind(myObj)` (using `.bind()`) fixes the context, making it the object that owns the method.  

##### 4. Constructor invocation

LS says skip this section for now.

##### 5. Indirect invocation

**Indirect invocation** is performed when a function is called usying `myFun.call()` or `myFun.apply()` methods.  

Functions in JavaScript are first-class objects, which means that a function is an object.  The type of this object is `Function`.  

From the list of methods that a function object has, `.call()` and `.apply()` are used to invoke the function with a configurable context.

##### 5.1 `this` in indirect invocation

_`this` is the **first argument** of `.call()` or `.apply()` in an indirect invocation_  

The indirect invocation is useful when a function should be executed with a specific context. For example, to solve the context problems with funciton invocation, where `this` is always `window` or `undefined` in strict mode. It can be used to simulate a method call on an object.  

##### 6. Bound function

**A bound function** is a function connected with an object. Usually it is created from the original function using `.bind()` method. The original and bound functions share the same code and scope, but different contexts on execution.  

The method `.bind(thisArg[, arg1[, arg2[, ...]]])` accepts the first argument `thisArg` as the context of the bound function on invocation and an optional list of arguments `arg1, arg2, ...` that are passed as arguments to the called function. It returns a new function bound with `thisArg`.  

Contrary to `.apply()` and `.call()` methods (see [5.](https://web.archive.org/web/20180209163541/https://dmitripavlutin.com/gentle-explanation-of-this-in-javascript/#5indirectinvocation)), which invokes the function right away, the `.bind()` method only returns a new function that it supposed to be invoked later with a pre-configured `this`.  

##### 6.1 `this` in bound function

_`this` is the **first argument** of `.bind()` when invoking a bound function_  

The role of `.bind()` is to create a new function, which invocation will have the context as the first argument passed to `.bind()`. It is a powerful technique that allows one to create functions with a predefined `this` value.  

##### 6.2 Tight context binding

`.bind()` makes a **permanent context link** and will always keep it. A bound function cannot change its linked context when using `.call()` or `.apply()` with a different context, or even a rebound doesn't have any effect.  

Only `new one()` changes the context of the bound function; other types of invocation always have `this` equal to `1`.  

##### 7. Arrow function

LS says skip this section for now.

##### 8. Conclusion

---

### 15. Practice Problems: What is this? (1) ([here](https://launchschool.com/lessons/c9200ad2/assignments/82f593ef))

1. What does `this` point to in the code below?

   ```javascript
   function whatIsMyContext() {
     return this;
   }
   ```

   ###### My Solution

   It points to the global object, which is the `window` object in the browser.

   ###### LS Solution

   We won't know the context of a function until execution time. Thus, we don't know what the context is here.

2. What does `this` point to in the code below?

   ```javascript
   function whatIsMyContext() {
     return this;
   }
   
   whatIsMyContext();
   ```

   ###### My Solution

   It points to the global object, which is the `window` object in the browser.

   ###### LS Solution

   Function calls set the execution context to the **implicit global object**, or global context for short. When we use the global object implicitly to call a function, we call it with the **global context**.  

   Functions called inside a browser environment use the `window` object as the implicit global context, so `this` is the `window` object inside the function.  

   In strict mode, however, the global context is the value `undefined`.

3. What does `this` point to in the code below?  

   ```javascript
   function foo() {
     function bar() {
       function baz() {
         console.log(this);
       }
       
       baz();
     }
     
     bar();
   }
   
   foo();
   ```

   ###### My Solution

   It points to the global object. In the browser environment, `this` points to the `window` object.

   ###### LS Solution

   Since we call `baz` with the implicit global context, `this` is the `window` object.

4. What does `this` point to in the code below?

   ```javascript
   let obj = {
     count: 2,
     method() {
       return this.count;
     },
   };
   
   obj.method();
   ```

   ###### My Solution

   It points to the `obj` object.  

   ###### LS Solution

   Since we call `method` on object `obj`, `this` is the object `obj`. Thus, the return value will be `2`.

5. In strict mode, what does the following program log to the console?

   ```javascript
   function foo() {
     console.log(this.a);
   }
   
   let a = 2;
   foo();
   ```

   ###### My Solution

   In strict mode, the program will not log anything, but will return a `TypeError` because `this` is pointing to `undefined` and property `'a'` of `undefined` cannot be read.

   ###### LS Solution

   It raises an error. Since the function is called without an explicit object, `this` inside `foo` resolves to the global execution context, which is `undefined` in strict mode. The code raises an error because, in effect, we're trying to access the nonexistent `a` property of `undefined`.

6. What does the following program log to the console?

   ```javascript
   let a = 1;
   function bar() {
     console.log(this.a);
   }
   
   let obj = {
     a: 2,
     foo: bar,
   };
   
   obj.foo();
   ```

   ###### My Solution

   ```
   1
   ```

   Originally, the execution context of the `foo()` method call on `obj` is set to `obj`, but since `foo` points to the `bar()` function the execution context for `bar`when it is invoked is the global context. In the global context, `a` is associated with the value `1`.

   ###### LS Solution

   ```
   2
   ```

   Line 11 calls method `foo` with its context set to `obj` since the execution context for any method invoked without an explicit context provided is the calling object.

7. What does the following code log to the console?

   ```javascript
   let foo = {
     a: 1,
     bar() {
       console.log(this.baz());
     },
   
     baz() {
       return this;
     },
   };
   
   foo.bar();
   let qux = foo.bar;
   qux();
   ```

   ###### My Solution

   ```
   { a: 1, bar: { console.log(this.baz()) }, baz: { return this } }
   TypeError
   ```

   Not totally sure about this one.

   ###### LS Solution

   ```
   Object {a: 1, bar: f, baz: f}
   Uncaught TypeError: this.baz is not a function
   ```

   Executing from line 12 sets `this` in `bar` to the `foo` object (via implicit method execution context). From the body of the `bar` method, it then calls `foo`'s `baz` method. `baz` returns `foo` since it has `foo`'s context (again via implicit method execution context; `this` === `foo` following the execution from line 12), which causes line 4 to log `foo`.  

   Line 14 calls `bar` as a function in the global context, `window`; since `baz` doesn't exist in `window`, JavaScript raises an error.  

---

### 16. Practice Problems: What is this? (2) ([here](https://launchschool.com/lessons/c9200ad2/assignments/7bef6908))

While working through these practice problems, assume that the code runs within a web page.  

1. What does `this` point to in the code below, and what does the method return?

   ```javascript
   let myObject = {
     count: 1,
     myChildObject: {
       myMethod() {
         return this.count;
       },
     },
   };
   
   myObject.myChildObject.myMethod();
   ```

   ###### My Solution

   My guess is that this program will throw some kind of error since `myMethod()` is being called on the `myChildObject` and so `this` in the body of `myMethod()` is pointing to `myChildObject`, but since `myChildObject` does not have a `count` property, we get an error.  

   When I actually run the code, it returns `undefined`.

   ###### LS Solution

   `this` is `myChildObject`, which means `this.count` is `undefined`, so the return value is `undefined`.

2. In the previous problem, how would you change the context, or the value of `this`, to be the parent `myObject`?

   ###### My Solution

   We could try using the `call()` method to explicitly set the execution context for `myMethod()`.

   ```javascript
   myObject.myChildObject.myMethod.call(myObject);
   ```

   ###### LS Solution

   We can use the `call` or `apply` method; all you have to do is pass in the appropriate context object:

   ```javascript
   myObject.myChildObject.myMethod.call(myObject);
   ```

3. What does the following code log to the console?

   ```javascript
   let person = {
     firstName: 'Peter',
     lastName: 'Parker',
     fullName() {
       console.log(this.firstName + ' ' + this.lastName +
                   ' is the Amazing Spiderman!');
     },
   };
   
   let whoIsSpiderman = person.fullName.bind(person);
   whoIsSpiderman();
   ```

   ###### My Solution

   ```
   Peter Parker is the Amazing Spiderman!
   ```

   ###### LS Solution

   ```
   Peter Parker is the Amazing Spiderman!
   ```

   The `bind` method returns a new function that permanently binds `this` in the function assigned to `fullName` to the `person` object itself.

4. What does the following code log to the console?

   ```javascript
   let computer = {
     price: 30000,
     shipping: 2000,
     total() {
       let tax = 3000;
       function specialDiscount() {
         if (this.price > 20000) {
           return 1000;
         } else {
           return 0;
         }
       }
       
       return this.price + this.shipping + tax - specialDiscount();
     }
   };
   
   console.log(computer.total());
   ```

   If you want this program to log `34000`, how would you fix it?

   ###### My Solution

   I believe the function will log:

   ```
   NaN
   ```

   This is because, the `total()` method returns a line of code that include the inner `specialDiscount()` function, and since this function has a `this` reference and `this` refers not to the `computer` object but the global object in this context, it will return `undefined` and so the whole line of code will add up to `NaN`.  

   After running the code, we see that it actually logs the following to the console:

   ```
   35000
   ```

   However, what we want it to log is `34000`. Somehow, the `specialDiscount()` is just ignored but the rest of the numbers are computed. It must be that the `this.price` returns `undefined` and so the `if` conditional statement returns `false` and that part of the code does not run. Instead, the `else` condition is executed, which returns `0`. That means `specialDiscount()` returns `0` rather than `1000` and so we subtract `0` from the final result instead of `1000`.  

   If we want to the code to execute properly and the program to log `34000`, we must set the execution context of `specialDiscount()` explicitly. We could do this by using the `call` or `apply` method.  

   ```javascript
   return this.price + this.shipping + tax - specialDiscount.call(computer);
   ```

   ###### LS Solution

   As written, this code logs `35000` to the console. This is because `specialDiscount`'s `this` is the global object since we call `specialDiscount` as a function, which gives it implicit context. Thus, `specialDiscount` returns `0`. [Recall](https://launchschool.com/lessons/2555bbbb/assignments/28112e58) that nested functions lose the outer method's context.  

   One way to fix this code is to save `this` in the function's lexical scope and use that saved value in place of `this`:

   ```javascript
   let computer = {
     price: 30000,
     shipping: 2000,
     total() {
       let tax = 3000;
       let self = this;
       function specialDiscount() {
         if (self.price > 20000) {
           return 1000;
         } else {
           return 0;
         }
       }
   
       return this.price + this.shipping + tax - specialDiscount();
     }
   };
   
   console.log(computer.total());
   ```

   Another way is to bind `this` from `total` to the `specialDiscount` function, which makes `this` inside `specialDiscount` the same as `this` in `total`.

   ```javascript
   let computer = {
     price: 30000,
     shipping: 2000,
     total() {
       let tax = 3000;
       let specialDiscount = function () {
         if (this.price > 20000) {
           return 1000;
         } else {
           return 0;
         }
       }.bind(this);
   
       return this.price + this.shipping + tax - specialDiscount();
     }
   };
   
   console.log(computer.total());
   ```

   The final way to fix this code is to use `call` or `apply` with an argument of `this` to invoke `specialDiscount`:  

   ```javascript
   let computer = {
     price: 30000,
     shipping: 2000,
     total() {
       let tax = 3000;
       function specialDiscount() {
         if (this.price > 20000) {
           return 1000;
         } else {
           return 0;
         }
       };
   
       return this.price + this.shipping + tax - specialDiscount.apply(this);
     }
   };
   
   console.log(computer.total());
   ```

---

### 17. Summary ([here](https://launchschool.com/lessons/c9200ad2/assignments/8119e7ce))

- Function invocations (e.g., `parseInt(numberString)`) rely upon implicit execution context that resolves to the global object. Method invocations (e.g., `array.forEach(processElement)`) rely upon implicit context that resolves to the object that holds the method.
- All JavaScript code executes within a context. The top-level context in a web browser is the `window` object. All global methods and Objects (such as `parseInt` or `Math`) are properties of this object. In Node, the top-level context is called `global`. However, be aware that Node has some peculiarities that cause it to behave differently from browsers.  
- You can't use `delete` to delete variables and functions declared at the global scope.
- `this` is the current execution context of a function.
- The value of `this` changes based on **how you invoke a function**, not **how you define it.**
- In strict mode, `this` inside functions resolves to `undefined` when referring to the global execution context.  
- JavaScript has **first-class functions** which have the following characteristics:
  * You can add them to objects and execute them in the respective object's contexts.
  * You can remove them from their objects, pass them around, and execute them in entirely different contexts.
  * They're initally unbound, but dynamically bound to a context object at execution time.
- `call` and `apply` invoke a function with an explicit execution context.
- `bind` permanently binds a function to a context and returns a new function.
- Method invocations can operate on the data of the calling object.



