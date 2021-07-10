##### JS229 Assessment: Object Oriented JavaScript > Start Assessment JS229

---

## Part 1: Study Guide for the Test ([here](https://launchschool.com/lessons/d6ad18da/assignments/588f2f82))

You should be able to clearly explain and apply the following concepts:

---

### Objects

#### Organizing code into appropriate objects

##### Mutating Objects

* Primitive types such as Number, String, Boolean, Undefined, and Null are immutable--you cannot change them; you can replace them by another value, but the original value doesn't change.
* Most JavaScript Objects are mutable--you can change them.

##### Objects

* An `Object` is a useful organizational tool that collects related data and behavior together.
* The benefits of this organization become evident when an application uses more than one instance of a given `Object` type.
* Objects can use their properties to define state and behavior.
* Objects:
  - organize related data and code together.
  - are useful whe a program needs more than one instance of something.
  - become more useful as the codebase size increases.

##### Object Oriented Programming

* At its core, object-oriented programming is a pattern that uses objects as the basic building blocks of a program instead of local variables and functions.
* The object-oriented approach to programming puts data and procedures that manipulate that data into containers for that data (i.e. objects). 
* We no longer deal solely with primitives, or composites of primitives, but "smart" objects that can perform actions on the data they own.
* This allows us to move complexity inside objects instead of exposing it globally.
* We can strict needed changes to specific objects that don't ripple throughout the entire project.
* Maintenance is easier when we can limit the scope of changes.

#### Object factories

- We can create objects using functions, which are known as **object factories**.
- Object factories allow us to create a single function that can be reused to make multiple instances of a particular type of object with similar properties and behavior.
- When an object factory creates objects wich have the same properties, they do not return `true` when compared with the strict equality operator.

---

### Determining/setting function execution context (`this`)

* The value of `this` is a reference to the object itself.
* When you invoke an object's methods, they can access the object to which they belong by using `this`.
* `this` is the current execution context of a function.
* The value of `this` changes based on **how you invoke a function**, not **how you define it**.

##### Function Execution Context

- Every time a JavaScript function is invoked, it has access to an object called the **execution context** of that function.
- This execution context is accessible through the keyword `this`.
- A JavaScript function can be invoked in a variety of ways. Which object `this` refers to depends on how the function was invoked.

##### First-Class Functions

* You can add them to objects and execute them in the respective object's contexts.
* You can remove them from their objects, pass them around, and execute them in entirely different contexts.
* They're initially unbound, but dynamically bound to a context object at execution time.

#### Implicit function execution context

* Implicit function execution context (also called implicit binding for functions): this is an execution context that JavaScript "implicitly" sets. It is the context for a function that you invoke without supplying an explicit context. JavaScript binds such functions to the global object.
* Implicit _method_ execution context is the execution context for any method (i.e., function referenced as an object property) invoked without an explicit context provided. JavaScript implicitly binds methods invoked in this manner to the calling object.
* Function invocations (e.g., `parseInt(numberString)`) rely upon implicit execution context that resolves to the global object. Method invocations (e.g., `array.forEach(processElement)`) rely upon implicit context that resolves to the object that holds the method.  
* 

##### Global Object as Implicit Context

- JavaScript creates a **global object** when it starts running, which serves as the implicit execution context.

- The global object is the implicit context when we evaluate expressions.

  ```javascript
  foo = 1;
  foo;								// 1
  ```

  In the code above, the first line doesn't declare a global variable since it doesn't use the `let`, `var`, or `const` keyword. It works, though, since JavaScript gives `foo` an implicit evaluation context: the global object. Thus, the first line is the ssame as `window.foo = 1` (or `global.foo = 1`), which assigns the property `foo` on the global object with a value of `1`.

- When we declare **global** variables with `var` or functions, JavaScript adds them to the global object as properties. You can verify this by examining the `window` object.

- The behavior for the `var` variable appears to be identical to what happens when you don't declare the variable. There's a subtle but significant difference, however: you can delete global variables that you don't declare, but not those that you did. 

- In non-browser JavaScript environments, such as Node, the global object is not `window`, but `global`.

- 

##### Module Scope

- Node introduces an additional "module" scope. Variables in the module scope are those declared at the top level (not inside a function definition or object) of a node.js file. Consequently, module-scoped variables are not added to the global object, `global` (again `window` for browsers). Module-scoped variables are only accessible from within the file but not accessible anywhere else.
- All of your variables and functions in Node programs have function scope. That plays a part later when we learn about execution context: the execution context for your top-level program in Node is the empty object `{}` 
- Global definitions actually have function scope in Node (see [here](https://launchschool.com/lessons/c9200ad2/assignments/c8e3c9a4)). 

##### Strict Mode

- In strict mode, we don't have access to the global object as the implicit context.
- In strict mode, `this` in the global scope is `undefined`.
- In strict mode, `this` inside functions resolves to `undefined` when referring to the global execution context.

#### Explicit function execution context

* Explicit execution context: this is an execution context that you "explicitly" set.
* JavaScript lets us use the `call` and `apply` methods to change a function's execution context at execution time. That is, we can explicitly bind a function's execution context to an object when we execute the function.  
* The `apply` method is identical to `call`, except that it uses an array to pass arguments.
* JavaScript also has a `bind` method that lets us bind a function to a context object permanently.
* Unlike `call` or `apply`, `bind` doesn't execute a function. Instead, it creates and returns a new Function, and permanently binds it to a given object. Since the binding is permanent, we can pass the function around without concern that its context will change; it won't.
* `bind`'s context is the original function, and it returns a new function that calls the original function with the context supplied to `bind` as its first argument. No matter what you do to the returned function, you can't change the value of `context`.

#### Dealing with context loss

##### Method Losing Context when Taken Out of Object

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

Some ways to deal with the context loss:

- You could use `foo.call(john)` to restore the context, but what happens if you don't want to execute the function right away, or you need to pass it to another function? By the time you're ready to call `foo`, `john` may be out of scope (see examples [here](https://launchschool.com/lessons/c9200ad2/assignments/013f9f02)).  
- In the case you want to pass the function to another function, you could update the receiving function with an extra parameter that accepts the desired context. This is what JavaScript does with some of its built-in methods, such as `Array.prototype.forEach`. These methods let you specify an optional `thisArg` argument as the context object (value of `this`) that the function should use.
- But if you can't update the function or supply a context object, then you might try **hard binding** using `bind`.

##### Internal Function Losing Method Context

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

obj.foo();				// => undefined undefined
```

Your instincts may tell you that this code will log `"hello world"` to the console. Your instincts are wrong here. Even though `foo` executes within the `obj` context, the call to `bar` on line 9 does not provide an explicit context, which means that JavaScript binds the global object to the function. As a result, `this` on line 6 is the global object, not `obj`.  

This trap is insidious and well-known. Most developers consider it to be a mistake in the language design. If we provide the context to call `foo`, then the context _should_ propagate to its internal function. It doesn't, though, and it's hard to imagine how binding the function to the global object is ever useful.  

Let's look at some solutions to this problem:  

###### Solution 1: Preserve Context with a Local Variable in the Lexical Scope

One common approach is the `let self = this` or `let that = this` fix. You save `this` in a variable named `self` or `that`	 before calling the function, then reference the variable in the function.  

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
> hello world
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
> hello world
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
> hello world
> hello world
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
> hello world
```

##### Function as Argument Losing Surrounding Context

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
      console.log(String(number) + ' ' + this.a + ' ' this.b);
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

Arrow functions do not have a `this` binding. Instead of `this` being dependent on the location of the function invocation, JavaScript resolves it by looking at teh enclosing scopes.  

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

`this` resolves to `obj` which is the immediatly enclosing scope.  

* `this` in an arrow function is the enclosing context where the arrow function is defined.
* The arrow function doesn't create its own execution context, but takes `this` from the outer function where it is defined.
* An arrow function is bound with the lexical context **once and forever**. `this` cannot be modified even if using the context modification methods.
* An arrow function has a static context that doesn't change on different invocation types.
* For an arrow function, ask yourself: "What is `this` where the arrow function is defined?"; for other function invocations, ask: "How is the function invoked?"



#### Lexical scope

* JavaScript uses _Lexical Scoping_ to determine where it looks for variables; it uses the structure of the source code to determine the variable's scope. That is, **the source code defines the scope**. This means that when you write a function in your code, it creates a scope even if the function never gets executed and has no variables of its own. At any point in a JavaScript program, there is a hierarchy of scopes from the local scope of the code up to the program's global scope.  

* When JavaScript tries to find a variable, it searches this hierarchy from the bottom to the top. It stops and returns the first variable it finds with a matching name. This means that variables in a lower scope can _shadow_, or hide, a variable with the same name in a higher scope. 

* Most mainstream programming languages use lexical scoping rules (also called "static scoping"). Some languages use "dynamic scoping" instead, or make dynamic scoping a choice.

* Take a look at the code below:

  ```javascript
  function lunch() {    // A function declaration creates a new variable scope
    let food = 'taco';  // 1. Add a new variable food within the current variable scope
  }
  
  function eat(food) {  // 2. Parameters create variables during function invocation
    console.log('I am eating ' + food);
  }
  
  function drink() {    // 3. Add a new variable drink within the global variable scope
    console.log('I am drinking a glass of water');
  }
  ```

  Of note in the above code is the scope of the `food` variable from the parameter of the `eat` function. Given lexical scoping rules, its scope is the `eat` function because of the way the source code is written not because the function gets invoked. At runtime, this scope implies that `food` can only be accessed from within the body of the `eat` function. 

* 

##### Lexical Scope & `this`

* The mechanics of how `this` binding works in JavaScript is an important but somewhat difficult concept. Some of this difficulty can arise from the tendency to apply lexical scoping rules to `this` binding.
* It's important to remember that the rules for `this` binding are entirely different than the rules for determining the scope of a variable. While variable scope is determined at the time of writing the code, `this` gets bound based on how a function is invoked.

---

### Scope and Closures

* All functions, regardless of syntax, obey the same lexical scoping rules:
  * They can access any variables defined within it.
  * They can access any variables that were in scope based on the context where the function was **defined**.

##### Variable Scope

* A variable's scope is the part of the program that can access that variable by name. This is true in all programming languages.
* Specifically, variable scoping rules descibe how and where the language finds and retrieves values from previously declared variables.
* In JavaScript, every function or block creates a new variable scope.

##### The Global Scope

* Very small JavaScript programs with no functions or blocks exist entirely within a single scope called the global scope.

##### Function Scope

* Variables declared inside a scope have function scope, and they cannot be accessed outside the body of the function.
* Function scopes nest inside each other. The code within an inner scope can access any variables in the same scope or **any surrounding scope**. This works no matter how deeply nested a function is.
* Both function and block scopes are also called local scopes.

##### Block Scope

* As with function scopes, the code inside a block scope can access any variables declared in the surrounding (outer) scope(s).  
* Both function and block scopes are also called local scopes.

##### Variable Shadowing

* If a function definition has a parameter with the same name as a variable from an outer scope, the parameter shadows the outer variable.

##### Remember these important variable scoping rules:

* Every function declaration creates a new local variable scope.
* Every block creates a new local variable scope.
* Lexical scope uses the structure of the source code to determine the variable's scope. This means that the code doesn't have to be executed for the scope to exist.
* All variables in the same or surrounding scopes are visible inside functions and blocks.

#### Higher-order functions

* **Higher-order functions** can accept a function as an argument, return a function when invoked, or both. In other words, higher-order functions work with other functions.
* To understand this concept, you must think of JavaScript functions as _values_; functions are objects. We know that they can take values as input and return a value as output. Thus, a higher-order function is one where either an input or output value is a function.  
* 

#### Creating and using private data

##### Closures and Private Data

* Closure lets us define private data that persists for the function's lifetime.

* Functions _close over_ or _enclose_ the context at their definition point, so we call them closures. They always have access to that context, regardless of when and where the program invokes the funciton.  

* Here's some code that uses a closure to increment and log a number with each call:

  ```javascript
  function makeCounter() {
    let count = 0;			 // declare a new variable
    return function() {
      count += 1;				 // references count from the outer scope
      console.log(count);
    };
  }
  ```

  In reality, closures are a little more restrictive than described above. Functions close over the context of their definition point when the function refers to any variables, functions, or classes that are defined in the function's outer scope. Functions that are completely self-contained don't form closures.  

  ![img](https://d3905n0khyu9wc.cloudfront.net/images/function_scope1_v2.png)

* Note that `count` is private data for the function returned by `makeCounter`. The closure makes it _impossible_ to access the value of `count` from outside itself.

##### Objects and Closures

We resume our discussion of objects and closures by examining an earlier practice problem where we built a function named `makeList` to manage a todo list. Here is the source code:

```javascript
function makeList() {
  let items = [];

  return function(newItem) {
    let index;
    if (newItem) {
      index = items.indexOf(newItem);
      if (index === -1) {
        items.push(newItem);
        console.log(newItem + ' added!');
      } else {
        items.splice(index, 1);
        console.log(newItem + ' removed!');
      }
    } else {
      if (items.length === 0) {
        console.log('The list is empty.');
      } else {
        items.forEach(function(item) {
          console.log(item);
        });
      }
    }
  };
}
```

This single-function solution provides a concise, but somewhat unclear, interface to developers:

```javascript
> let list = makeList();
> list('make breakfast');       // add an item to the list
= make breakfast added!
> list();                       // log the list's items
= make breakfast
> list('make breakfast');       // remove an item from the list
= make breakfast removed!
> list();
= The list is empty.
```

The function returned by `makeList` lets the user perform three different actions (adding, removing, and listing) by calling the function with appropriate arguments. This code works, but it's unclear. In fact, the single call `list('make breakfast')` can perform two entirely different operations based on the current state of the list!  

We can improve the interface by returning an Object from `makeList` instead of a single Function. If we do that, we can create an API that is easy to use and understand:  

```javascript
> let list = makeList();
> list.add('peas');
= peas added!
> list.list();
= peas
> list.add('corn');
= corn added!
> list.list();
= peas
= corn
> list.remove('peas');
= peas removed!
> list.list();
= corn
```

This example is much easier to understand since it uses the property names of methods to reveal the code's intent. The implementation is simpler since each well-named method does one thing.  

Here is a reimplementation of the `makeList` function so that it returns an Object that provides the interface shown above, including `add`, `list`, and `remove` methods.

```javascript
function makeList() {
  return {
    items: [],

    add(item) {
      let index = this.items.indexOf(item);
      if (index === -1) {
        this.items.push(item);
        console.log(item + ' added!');
      }
    },

    list() {
      if (this.items.length === 0) {
        console.log('The list is empty.');
      } else {
        this.items.forEach(function(item) {
          console.log(item);
        });
      }
    },

    remove(item) {
      let index = this.items.indexOf(item);
      if (index !== -1) {
        this.items.splice(index, 1);
        console.log(item + ' removed!');
      }
    },
  };
}
```

However, notice that the solution lets us access the array of items through the `items` property:  

```javascript
> list.items;            // items accessible from outside object
= ['corn']               // since it is an object property
```

This was not the case in the single-function implementation:

```javascript
> list.items;            // items not accessible from outside function
= undefined              // since it is within a closure
```

Update the implementation from problem 1 so that it retains the use of an object with methods but prevents outside access to the items the object stores internally.  

```javascript
function makeList() {
  let items = [];

  return {
    add(item) {
      let index = items.indexOf(item);
      if (index === -1) {
        items.push(item);
        console.log(item + ' added!');
      }
    },

    list() {
      if (items.length === 0) {
        console.log('The list is empty.');
      } else {
        items.forEach(function(item) {
          console.log(item);
        });
      }
    },

    remove(item) {
      let index = items.indexOf(item);
      if (index !== -1) {
        items.splice(index, 1);
        console.log(item + ' removed!');
      }
    },
  };
}
```

This solution uses the closure formed by the functions assigned to the object's properties returned by the `makeList` function to prevent outside access to `items`. Rather than modifying the `items` property, the array assigned to the `items` variable is modified instead.  

##### Why use closures to make data private?  

As shown above, you have choices about how to organize your code and data. Using closures to restrict data access is a good way to force other developers to use the intended interface. By keeping the collection of items private, we enforce access via the provided methods.  

This restriction helps protect data integrity since developers must use the defined interface. In this simple case, data integrity isn't a big concern, but the code illustrates the point; you must use `add` to add an item to the list, which ensures that we log every addition.  

These benefits have a cost. For instance, making data private can make it harder to extend the code. Suppose we need to add a `clear` method to delete all items from the list. If `items` is a property, we can do this:  

```javascript
let list = makeList();
list.clear = function() {
  this.items = [];
  console.log('all items deleted!');
};
```

```javascript
> let list = makeList();
> list.add('peas');
= peas added!
> list.add('corn');
= corn added!
> list.list();
= peas
= corn
> list.clear();
= all items deleted!
> list.items;
= []
```

With the solution that makes `items` private, we can't readily add a method:

```javascript
let list = makeList();
list.clear = function() {
  // there is no way to access the items from within this method
  // because the closure that contains them is inaccessible

  items;                  // throws ReferenceError!
  this.items;             // undefined
};
```

To add a method here, we must update the original definition of `makeList`:

```javascript
function makeList() {
  let items = [];

  return {
    add(item) {
      let index = items.indexOf(item);
      if (index === -1) {
        items.push(item);
        console.log(item + ' added!');
      }
    },

    clear() {
      items = [];
      console.log('all items deleted!');
    },

    list() {
      items.forEach(function(item) {
        console.log(item);
      });
    },

    remove(item) {
      let index = items.indexOf(item);
      if (index !== -1) {
        items.splice(index, 1);
        console.log(item + ' removed!');
      }
    }
  };
}
```

#### Garbage collection

* In JavaScript, values are allocated memory when they are created, and they are eventually, "automatically" freed up when they are not in use. This process of "automatically" freeing memory up is called **garbage-collection**. 

* JavaScript is a garbage-collected language, which means that the JS runtime, rather than the developer, handles memory deallocation.

* As developers, we don't often have to worry about managing memory, though we sometimes need to concern ourselves with how much memory we use.  

* Programming languages that don't have garbage collection make the developer write code to deallocate (unclaim or release) memory when the program no longer needs the data. This process is messy and error-prone, and often leads to serious bugs and "memory leaks".  

* Fortunately, JavaScript allocates memory for us and has garbage collection. This means you don't need to implement some intricate dance of claim/test/copy/use/release into your code. JavaScript runtime handles those things for us. It gets memory from the system when we create new objects and primitive values and releases it when the program has no more references to them. That is, when there are no variables, objects, or closures that maintain a reference to the object or value, JavaScript marks the memory as eligible for garbage collection. This concept is important. As long as the object or value remains accessible, JavaScript can't and won't garbage collect it. 

* To illustrate how references work with GC, here is an example:

  ```javascript
  function logName() {
    let name = 'Sarah'; // Declare a variable and set its value. The JavaScript
    										// runtime automatically allocates the memory.
    console.log(name);	// Do something with name
  }
  
  logName();
  // "Sarah" is now eligible for GC
  // more code below this line
  ```

  Here, the value `"Sarah"` that is assigned to `name` becomes eligible for GC when `logName` returns. Since the string is no longer accessible to your code, JavaScript can release memory the string uses so that JavaScript can reuse it later for other values. What happens, though, if `logName` returns the value of `name` and we save it?

  ```javascript
  function logName() {
    let name = 'Sarah'; // Declare a variable and set its value. The JavaScript
    										// runtime automatically allocates the memory.
    console.log(name);  // Do something with name
    return name; 				// Returns "Sarah" to caller
  }
  
  let loggedName = logName(); // loggedName variable is assigned the value "Sarah"
  														// the "Sarah" assigned to `loggedName` is NOT eligible
  														// for GC
  														// the "Sarah" assigned to `name` IS eligible for GC
  // more code below this line
  ```

  Take note that there were two `"Sarah"` values in memory since it is a primitive value and it is only one of the two that becomes eligible. Exploring further, what happens if we store the value `"Sarah"` as a property of an object?

  ```javascript
  function logName() {
    let name = {
      firstName: 'Sarah'					// Declare a variable and set its value. The JavaScript
    };														// runtime automatically allocates the memory.
    
    console.log(name.firstName);  // Do something with name
  }																// Returns the `name` object to caller
  
  let loggedName = logName()			// loggedName variable is assigned the value stored in
  																// name, which is a reference to the object literal
  																// { firstName: "Sarah" }
  																// The value returned is NOT eligible for GC.
  																// This value is the same value that is assigned to name
  // more code below this line		
  ```

##### The Stack and Heap

* Most programming languages divide memory into two principal regions: the stack and the heap. JavaScript stores most primitive values as well as references on the stack, and everything else on the heap. You can think of references as pointers to the actual value of an object, array, or string that lives in the heap.
* The stack doesn't participate in garbage collection. That means that **most primitive values don't get involved in garbage collection**; the main exceptions are strings and bigints.
* When a function or block begins executing in a JavaScript program, JavaScript allocates memory on the stack for the variables defined in that block or function. Since each item has fixed size, JavaScript can calculate the amount of memory it needs during the creation phase of execution without knowing the specific values. That means it can determine how much stack space it needs when hoisting occurs. When the block or function is done running, the allocated stack memory gets return to teh system automatically. This process is somewhat similar to garbage collection, but it is considered distinct.  
* The situation is more complicated when closures include variables that have primitive values. Since closures may need to track these variables and their values after the current stack frame is destroyed, they must be stored someplace other than the stack. You can think of these primitive values as being stored on the heap, which makes them subject to garbage collection.
* The heap is much trickier to deal with since each value has a different size that can't be determined ahead of time. Instead, new values must be added to the heap when they get created. Since the program can retain references to the values on the heap, it can't use the same allocate and release scheme used with the stack. Instead, it needs to rely on garbage collection to detect when a value's reference count reaches 0.
* Garbage collection can occur at any time; it often ocurrs at periodic intervals during a program's lifetime. In particular, the programmer usually has no control over when GC occurs. It used to be possible to trigger garbage collection in JavaScript, but that is no longer possible in modern versions of JavaScript.
* All the garbage collector must do is look for and deallocate values that are eligible for garbage collection. If it uses a reference counting system, it needs to look for values with a reference count of 0.
* Note that garbage collection doesn't happen when a variable goes out of scope. That's a common misconception. A variable can go out of scope, but there can be many other references. Closures and other objects are a significant source of persistent references.

##### Why Do You Need To Know About Garbage Collection

* Garbage collection isn't a cure-all for the problem of releasing the memory that you no longer need. For a simple case, consider a reference counting garbage collector with this code:

  ```javascript
  function go() {
    let foo = {};
    let bar = { qux: foo };
    foo.xyz = bar;
  }
  
  go();
  // Neither `foo` nor `bar` is eligible for GC
  ```

  In this code, we create two objects in `go` that we assign to the `foo` and `bar` local variables. Furthermore, `bar` holds a reference to `foo` in its `qux` property, while `foo` holds a reference to `bar` in its `xyz` property. Both the objects have reference counts of 2: 1 reference is to the variable to which each object is assigned, and the other reference is in a property of the other object.  

  When we exit the `go` function, the reference counts of both objects get decremented by 1 since both `foo` and `bar` have gone out of scope, so they no longer hold references to the objects. However, the two objects still exist and are not eligible for garbage collection since they still reference each other. These two objects will never go away until the program ends.  

  Now let's add a loop:

  ```javascript
  function go() {
    let foo = {};
    let bar = { qux: foo };
    foo.xyz = bar;
  }
  
  for (let count = 0; count < 1000000; count += 1) {
    go();
  }
  // There are now 2000000 objects still on the heap but ineligible for GC
  ```

  When this code runs, none of those objects ever get garbage collected. As can be seen in the comments, we now have 2000000 unused objects that aren't going to go away.  

  Modern JavaScript engines use what is called a mark and sweep algorithm to do GC. That eliminates the reference cycle problem described above, but also introduces other problems, including the potential for fragmented memory. Fragmented memory means that your program's memory isn't contiguous, but is broken up into discontiguous chunks. If there are enough such chunks, your system will have a harder time allocating large chunks of memory.

##### How Closures Affect Garbage Collection

* Remember that JavaScript uses a process called garbage collection to clean up the memory used for objects and primitive values. When no references to the object or value remain in a program, it's eligible for garbage collection.  

* When you create a closure, it stores a reference to all variables it can access. Each of those variables references an object or primitive value. Theoretically, as long as the closure exists, those variables remain in existence, which means that the objects or values they reference must also endure. For this reason, JavaScript can't garbage collect any objects or values referenced by the variables that the closure keeps in its context.  

* ```javascript
  function makeHello(name) {
    return function() {
      console.log("Hello, " + name + "!");
    };
  }
  
  let helloSteve = makeHello("Steve");
  ```

  After the above code runs, `helloSteve` references a function that closed over the local variable `name`, which right now contains the string `"Steve"`. Since the closure must keep `name` around, the reference to `"Steve"` must also stick around, which means that JavaScript can't garbage collect `"Steve"`. When we call `helloSteve` some time later, it still has access to `name` and can log its value.

  ```javascript
  helloSteve();				// => Hello, Steve!
  ```

  Before JavaScript can garbage collect `"Steve"`, you must ensure that nothing else in the program references `"Steve"`; that includes every closure that has access to teh `"Steve"` string. That's not typically a concern, but if you find that you must remove a closure or other reference explicitly, you can assign `null` to the item that references it. For instance:  

  ```javascript
  helloSteve = null;
  ```

  That dereferences the closure shown above, which in turn dereferences `"Steve"` through the `name` variable. If nothing else now has a reference to `"Steve"`, JavaScript is free to garbage collect it.  

  In the example we looked at above, the local variable `name` was an argument that we passed into the outer function. Let's modify the code by introducing a variable prior to returning the anonymous function. For example, this code creates a `message` local variable:

  ```javascript
  function makeHello(name) {
    let message = "Hello, " + name + "!";
    return function() {
      console.log(message);
    };
  }
  
  let helloSteve = makeHello("Steve");
  ```

  This code returns an anonymous function that closes over _both_ the `name` and `message` variables. Those variables, in turn, reference the strings `"Steve"` and `"Hello, Steve!"`, respectively. Theoretically, this will prevent garbage collection on both strings. However, notice that `name` isn't referenced within the `helloSteve` function. Now, depending on the browser, `"Steve"` might or might not be garbage collected. (Note: modern browsers will usually garbage collect `"Steve"` in this situation. In most cases, they can see that `"Steve"` is no longer used.)

#### IIFEs

* An **immediately invoked function expression (IIFE)** is a function that we define and invoke simultaneously. It looks like this:

  ```javascript
  (function() {
    console.log('hello');
  })();											// => hello
  ```

  This syntax adds a pair of parentheses around the function expression, and the parentheses at the end invoke the function. The extra parentheses around the function expression are important--without them, we can't invoke the function right away.

* With IIFEs, we use parentheses to make it explicit that we want to parse the function definition as an expression. As an expression it means that there is a value returned--the function--that we can immediately "invoke".  

* You may sometimes see a slightly different style for IIFEs:

  ```javascript
  (function() {
    console.log('hello');
  }());
  ```

  Here, the argument list is inside the outer set of parentheses. As with the original style, they let JavaScript distinguish between an ordinary function declaration and an IIFE. JavaScript handles this style the same as with the earlier approach.  

* We can omit the parentheses around an IIFE when the function definition is an expression that doesn't occur at the beginning of a line (recall the earlier invalid syntax example):

  ```javascript
  let foo = function() {
    return function() {
      return 10;
    }();
  }();
  
  console.log(foo); 				// => 10
  ```

##### Creating a Private Scope with an IIFE



#### Partial Function Application

* Partial function appliation refers to the creation of a function that can call a second function with fewer arguments than the second function expects. The created function supplies the remaining arguments.

* Partial function application uses a function (we'll call it the _generator_) that creates a new function (the _applicator_) to call a third function (the _primary_). The generator receives some of the primary's arguments, while the applicator receives the rest when it gets invoked. The applicator then calls the primary and passes it all of its arguments, both those passed to the generator and those passed to the applicator.  

  ```javascript
  function primaryFunction(arg1, arg2) {
    console.log(arg1);
    console.log(arg2);
  }
  
  function generatorFunction(arg1) {
    return function(arg2) { // applicator
    	return primaryFunction(arg1, arg2);
    }
  }
  
  let applicatorFunction = generatorFunction('Hello');
  applicatorFunction(37.2);		// Performs primaryFunction('Hello', 37.2);
  // => Hello
  // => 37.2
  ```

  The terms **primary**, **generator**, and **applicator** are for convenience in this assignment; you won't find them discussed elsewhere. We won't use them in the future, so don't bother memorizing them.  

* An example of partial function application:

  ```javascript
  function multiply(first, second) {
    return first * second;
  }
  
  function makeMultiplyN(multiplicand) {
    return function(number) {
      return multiply(multiplicand, number);
    }
  }
  
  let double = makeMultiplyN(2);
  double(3);
  => 6
  
  double(10);
  => 20
  
  let triple = makeMultiplyN(3);
  triple(4);
  => 12
  
  triple(9);
  => 27
  ```

* Another approach produces a more flexible solution. We can create a general purpose function that partially applies a single argument to any two-argument primary:

  ```javascript
  function add(first, second) {
    return first + second;
  }
  
  function repeat(count, string) {
    let result = '';
    let i;
    for (i = 0; i < count; i += 1) {
      result += string;
    }
    
    return result;
  }
  
  function partial(primary, arg1) {
    return function(arg2) {
      return primary(arg1, arg2);
    };
  }
  ```

  ```javascript
  > let add1 = partial(add, 1);
  > add1(2);
  = 3
  > add1(6);
  = 7
  > let threeTimes = partial(repeat, 3);
  > threeTimes('Hello');
  = HelloHelloHello
  > threeTimes('!');
  = !!!
  ```

##### Using Function.prototype.bind for Partial Function Application

* In the lesson on [Function Context and Objects](https://launchschool.com/lessons/c9200ad2/assignments/bb359c53), we used `bind` to set an explicit execution context. However, we can also use it to make a function with pre-specified initial arguments. Here's an example using the `add` and `repeat` functions above:

  ```javascript
  // we use `null` since the function doesn't depend on `this`
  > let add1 = add.bind(null, 1);
  > add1(2);
  = 3
  > add1(6);
  = 7
  > let threeTimes = repeat.bind(null, 3);
  > threeTimes('Hello');
  = HelloHelloHello
  > threeTimes('!');
  = !!!
  ```

* Closures have a lot of similarities to objects. They both provide the means to organize code into data and a chunk of behavior that relies on that data.

---

### Object creation patterns

#### Constructor functions

#### Prototype objects

#### Behavior delegation

#### OLOO and Pseudo-Classical patterns

#### `class` syntax

---

### Further Reading

In addition to the course content, you may also find these articles written by one of our students for the weekly JavaScript study group as helpful in your review. These articles cut across concepts and give an additional perspective that may help firm up your understanding and mental model of the concepts that we've covered in this course.

- [JavaScript Weekly: Making Sense of Closures](https://medium.com/launch-school/javascript-weekly-making-sense-of-closures-daa2e0b56f88)
- [JavaScript Weekly: Understanding Links on the Object Prototype Chain](https://medium.com/launch-school/javascript-weekly-understanding-links-on-the-object-prototype-chain-12962f05e149)
- [JavaScript Weekly: An Introduction to First-Class Functions](https://medium.com/launch-school/javascript-weekly-an-introduction-to-first-class-functions-9d069e6fb137)
- [JavaScript Weekly: What in the World is this?!](https://medium.com/launch-school/what-in-the-world-is-this-be803a85ed47)



