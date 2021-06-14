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

### 6. Practice Problems: Implicit and Explicit Function Execution Contexts

