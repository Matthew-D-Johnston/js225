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

##### Instances

* In OOP, we often refer to individual objects of a specific data type as **instances** of that type.
* An instance is just another term for the objects created using any means of defining multiple objects of the same kind (e.g., dogs). The term _object_ is more general, while _instance_ is more specific.  

###### Instance Properties

* It's convenient to describe the properties of an instance as **instance properties**. These properties belong to a specific instance of some type.
* In our `Dog` example, we say that the `name`, `breed`, and `weight` properties are all instance properties of the various instances of the `Dog` type.

###### Instance Methods

* Since methods are also properties on an object, we can refer to methods stored directly in an object as instance properties too. More commonly, we call them **instance methods** just to distinguish them from ordinary data properties.  
* However, methods usually shouldn't be stored directly in instances. Instead, they should be stored in the instance's prototype. While methods defined on the prototype aren't stored in the instance object, they still operate on individual instances. Therefore, we usually refer to methods on the prototype as instance methods as well. In our `Dog` example, `bark` is an instance method since it's defined on the `Dog.prototype` object.
* 

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

* The concepts of closure and scope are intimately related. Closures use the scope in effect at a function's definition point to determine what variables that function can access. What variables are in scope during a function's execution depend on the closure formed by the function's definition. It's somewhat circular reasoning, but it's impossible to separate the two.  
* MDN defines **closure** as "the combination of a function and the lexical environment within which that function was [defined]." You can think of closure as a function combined with any variables from its lexical scope that the function needs. In other words, if a function uses a variable that is not declared or initialized in that function, then that variable will be part of the closure (provided it exists).
* Closures are created when you define a function or method. The closure essentially _closes over_ its environment--what's in scope. In effect, the function definition and its scope become a single entity called a closure. When the function is invoked, it can access any variables it needs from that environment. That is, the function can use variables from the lexical scope where the function was defined. **Even if those variables aren't in the lexical scope where you invoke the function, it can still access them.**  
* Note that closures only close over the variables that the function needs. If the function uses the variable `foo`, but the outer scope contains both `foo` and `bar`, only `foo` will be included in the closure.  
* Wait a minute. How can you use variables that aren't in scope? Doesn't scope govern what variables you can use? Yes, that's true, but it's a little imprecise. When we say that a variable is no longer in scope, we mean that it isn't in scope at the point in your program where you invoke the function. However, closure and scope are lexical concepts. Where you invoke a function is unimportant; where you define the function is. A closure includes the variables it needs from the scope where you defined the function. Those variables may not be in scope when you invoke the function, but they're still available to the function.
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

* Imagine that you need to add some code to a large and messy JavaScript program. (Yes, it's true. You will encounter messy code, and you need to learn how to work with it.) The program looks something like this:

  ```javascript
  // thousands of lines of messy JavaScript code!
  
  // here you need to define an object literal that creates a pet and logs the information
  
  // more messy JavaScript code
  ```

  This task seems simple, so let's take a stab at it:

  ```javascript
  // thousands of lines of messy JavaScript code!
  
  let myPet = {
    type: 'Dog',
    name: 'Spot',
  };
  
  console.log(`I have pet ${myPet.type} named ${myPet.name}`);
  
  // more messy JavaScript code
  ```

  This code has a subtle problem. Can you see it?  

  **Solution:** We don't know whether `myPet` is already in the global scope. If `myPet` already exists in the global scope, our definition will result in an error.  

  Since functions create their own scopes, let's tryp putting the variable inside a function to hide it from the rest of the program:  

  ```javascript
  // thousands of lines of messy JavaScript code!
  
  function createAndLogPet() {
    let myPet = {
      type: 'Dog',
      name: 'Spot',
    };
  
    console.log(`I have pet ${myPet.type} named ${myPet.name}`);
  }
  
  // more messy JavaScript code
  ```

  This function works. It isolates `myPet` from other declarations of `myPet` in the program, but it has a sublte problem of its own. Can you identify the problem?  

  **Solution:** We don't know whether the program already contains a `createAndLogPet` function in the global scope. If there's a clash of function names, one will overwrite the other, and there will be trouble.  

  We can solve this dilemma by turning the function declaration and invocation into an IIFE:  

  ```javascript
  // thousands of lines of messy JavaScript code!
  (function() {
    let myPet = {
      type: 'Dog',
      name: 'Spot',
    };
    
    console.log(`I have pet ${myPet.type} named ${myPet.name}`);
  })();
  
  // more messy JavaScript code
  ```

  This code works! It has a private scope for `myPet`, and it won't clash with any other functions.  

  We can also pass values into the IIFE as arguments during invocation:  

  ```javascript
  // thousands of lines of messy JavaScript code!
  
  (function(type, name) {
    let myPet = {
      type,
      name,
    };
    
    console.log(`I have pet ${myPet.type} named ${myPet.name}`);
  })('Dog', 'Spot');
  
  // more messy JavaScript code
  ```

##### Creating Private Data with an IIFE

As we have seen earlier, we can create private data with closures. We could extend this concept and use it with an IIFE. With an IIFE we can make functions and objects that have access to private data.  

###### Using an IIFE to Return a Function with Access to Private Data

Let's say we want a function for generating unique numbers (i.e., unique id for students, employees, etc).  

```javascript
let studentId = 0;

function generateStudentId() {
  studentId += 1;
  return studentId;
}
```

This will work. However, it has the risk that `studentId` is reassigned unintentionally. When it's reassigned, there is no guarantee that `generateStudentId` will return unique student IDs.  

An alternative is to have `generateStudentId` take an argument so that the user of the function has control. The challenge, though, is that the uniqueness of the student ID is now dependent on how well the user is able to keep track of the previously generated student IDs.  

Finally, we can instead use an IIFE so that the `generateStudentId` function is responsible by itself for keeping track of the student IDs generated without exposing the IDs to being unintentionally reassigned.  

```javascript
let generateStudentId = (function() {
  let studentId = 0;
  
  return function() {
    studentId += 1;
    return studentId;
  };
})();
```

###### Using an IIFE to Return an Object with Access to Private Data  

For this use case, let's say that we have an `inventory` object that maintains a list of stock objects (name and quantity properties) and has a method that logs the stock count of each item. Here's an initial attempt at implementing this:  

```javascript
let inventory = {
  stocks: [],
  stockCounts() {
    this.stocks.forEach(function(stock) {
      console.log(stock.name + ': ' + String(stock.count));
    });
  },
};
```

This implementation will work, however, it has limitations particularly when it comes to validating the stock objects that are added to the stocks list. For instance, it is common that stock items should be unique. In our scenario, we could take this to mean that the names of stock objects have to be unique. Here's an example run that demonstrates this limitation:  

```javascript
inventory.stocks.push({
  name: 'ballpen',
  count: 5,
});

inventory.stockCounts();
// logs:
// ballpen: 5

inventory.stocks.push({
  name: 'ballpen',
  count: 5,
});

inventory.stockCounts();
// logs:
// ballpen: 5
// ballpen: 5
```

Notice in the example run that the current implementation doesn't validate that the object we're adding to the list has a unique name.  

As an improvement on this, we could add a method on the `inventory` object for adding a stock object so that it validates that the name is unique:

```javascript
let inventory = {
  stocks: [],
  stockCounts() {
    this.stocks.forEach(function(stock) {
      console.log(stock.name + ': ' + String(stock.count));
    });
  },
  addStock(newStock) {
    let isValid = this.stocks.every(function(stock) {
      return newStock.name ! == stock.name;
    });
    
    if (isValid) { this.stocks.push(newStock) };
  },
};
```

With the improved code, the `addStock` method now prevents the adding of stock objects when there is a current one with the same name already:  

```javascript
inventory.addStock({
  name: 'ballpen',
  count: 5,
});

inventory.stockCounts();
// logs:
// ballpen: 5

inventory.addStock({
  name: 'ballpen',
  count: 5,
});

inventory.stockCounts();
// logs:
// ballpen: 5
```

This will work already. However, it doesn't prevent the user from intentionally or unintentionally adding a new stock object with the same name directly to the stock list:  

```javascript
// continuing from the previous sample run
inventory.stocks.push({
  name: 'ballpen',
  count: 5,
});

inventory.stockCounts();
// logs:
// ballpen: 5
// ballpen: 5
```

In order to address this potential problem of adding directly to the stock list, we can make use of an IIFE to make the list private, and allow the adding of new stocks through the `addstock` method only:  

```javascript
let inventory = (function() {
  let stocks = [];
  
  return {
    stockCounts() {
      stocks.forEach(function(stock) {
        console.log(stock.name + ': ' + String(stock.count));
      });
    },
    addStock(newStock) {
      let isValid = stocks.every(function(stock) {
        return newStock.name !== stock.name;
      });
      
      if (isValid) { stocks.push(newStock) }
    },
  };
})();
```

With this, the stocks list is private. Consequently, what is displayed by the `stockCounts` method will only be influenced by what is added through the `addStock` method.  

```javascript
inventory.addStock({
  name: 'ballpen',
  count: 5,
});

inventory.stockCounts();
// logs:
// ballpen: 5

inventory.addStock({
  name: 'ballpen',
  count: 5,
});

inventory.stockCounts();
// logs:
// ballpen: 5

inventory.stocks.push({
  name: 'ballpen',
  count: 5,
});
// results in an error
```

As a final refactor, we can extract the function for validating that the new stock to be added has a unique name to a private function as well. This will clean up the `addStock` method and make the logic clearer to readers:  

```javascript
let inventory = (function() {
  let stocks = [];
  function isValid(newStock) {
    return stocks.every(function(stock) {
      return newStock.name !== stock.name;
    });
  }

  return {
    stockCounts() {
      stocks.forEach(function(stock) {
        console.log(stock.name + ': ' + String(stock.count));
      });
    },
    addStock(newStock) {
      if (isValid(newStock)) { stocks.push(newStock) }
    },
  };
})();
```





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

##### Factory Functions

* Using functions as object factories or, more succinctly, using factory functions (also called the "Factory Object Creation Pattern") provides us a way to create objects based on a pre-defined template:

  ```javascript
  function createPerson(firstName, lastName) {
    let person = {};
    person.firstName = firstName;
    person.lastName = lastName || '';
    person.fullName = function() {
      return (this.firstName + ' ' + this.lastName).trim();
    }
    
    return person;
  }
  
  let john = createPerson('John', 'Doe');
  let jane = createPerson('Jane');
  
  john.fullName();				// "John Doe"
  jane.fullName();				// "Jane"
  ```

  We could also just return an object literal to write the function as:

  ```javascript
  function createPerson(firstName, lastName = '') {
    return {
      firstName,
      lastName,
      fullName() {
        return (this.firstName + ' ' + this.lastName.trim());
      },
    };
  }
  ```

* The factory function allows us to create same "type" of objecs easily with a pre-defined "template," however, it also has some disadvantages:

  * Every object created with the factory function has a full copy of all the methods, which can be redundant.
  * There isn't a way for us to inspect an object and know whether we created it from a factory function. This makes it difficult to identify whether an object is of a specific "type."

##### Constructor Pattern

* Factory functions have disadvantages when it comes to creating objects. In this assignment, we'll look at the constructor pattern.

* Let's start by looking at the following code snippet to see how to use the constructor pattern to create objects:

  ```javascript
  // constructor function
  function Person(firstName, lastName = '') {
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = function() {
      return (this.firstName + ' ' + this.lastName).trim();
    };
  }
  
  let john = new Person('John', 'Doe');
  let jane = new Person('Jane');
  
  john.fullName();							// "John Doe"
  jane.fullName();							// "Jane"
  
  john.constructor;							// function Person(..)
  jane.constructor;							// function Person(..)
  
  john instanceof Person;				// true
  jane instanceof Person;				// true
  ```

  In this example, the `Person` function is a construtor function that we use to create objects. The reason that we say it's a constructor function is that **it's intended to be called with the `new` operator**; otherwise, it's just a regular JavaScript function. The fact that we capitalized the function's name is not a syntactical requirement, but a convention to reveal the intention that we should only use the function to construct objects.  

* If we call a function without the `new` operator:

  ```javascript
  function Person(firstName, lastName = '') {
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = function() {
      return (this.firstName + ' ' + this.lastName).trim();
    };
  }
  
  Person('John', 'Doe');
  window.fullName(); 						// "John Doe"
  ```

  In this case, the `this` in the function points to the global object, and we've defined properties and functions on the global object itself!

* When we call a function with the `new` operator, the following happens:

  1. A new object is created.
  2. `this` in the function is set to point to the new object.
  3. The code in the function is executed.
  4. `this` is returned if the constructor doesn't explicitly return an object.

* ###### `this` is returned if the constructor doesn't explicitly return an object

  It can be a subtle bug if you don't take note of the implication of not return an object. A typical scenario for this is when you have validation as part of the body of the constructor function. For instance, let us modify our `Person` constructor function to validate that a `lastName` is provided. If no `lastName` is provided, we will inform the user via the returned value.

  ```javascript
  function Person(firstName, lastName) {
    if (!lastName) {
      return 'Please provide a last name';
    }
    
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = function() {
      return (this.firstName + ' ' + this.lastName).trim();
    };
  }
  
  let noLastName = new Person('John');
  console.log(noLastName);		// logs an instance of a Person object
  console.log(noLastName instanceof Person); // => true
  ```

  Notice in the above code that even though we exit from the function by returning a string on line 3, the value that the function returns is still an instance of the `Person` type created by the `Person` constructor. To change the value from an instance of the `Person` type, we have to return an object instead:

  ```javascript
  function Person(firstName, lastName) {
    if (!lastName) {
      return { invalidInput: 'Please provide a last name' };
    }
    
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = function() {
      return (this.firstName + ' ' + this.lastName).trim();
    };
  }
  
  let noLastName = new Person('John');
  console.log(noLastName);	 // => { invalidInput: 'Please provide a first name' };
  console.log(noLastName instanceof Person); // => false
  ```



##### Function Prototypes and Object Prototypes

* In JavaScript, every **function** has a special `prototype` property. It is assigned, by default, an object that instances created by the constructor function can delegate to. Note that this `prototype` property is only used when we use the function as a constructor, in which case all objects that it constructs will have this object set as their prototype. This is a mouthful, but it's easier to show this in code:  

  ```javascript
  let Foo = function() {};
  let obj = Foo.prototype;
  
  let bar = new Foo();
  let baz = new Foo();
  
  Object.getPrototypeOf(bar) === obj;  // true
  Object.getPrototypeOf(baz) === obj;  // true
  
  bar.constructor === Foo;						 // true; bar is created from Foo
  baz.constructor === Foo;						 // true; baz is created from Foo
  bar instanceof Foo;									 // true; bar is an instance of Foo
  baz instanceof Foo;									 // true; baz is an instance of Foo
  ```

  We can also represent the above code as a diagram. Visually, it is apparent that both objects (`bar` and `baz`) that we construct from `Foo` delegate to--or have their prototype object set to--the object assigned to the `prototype` property of `Foo`.

  ![Delegation in action](https://d3905n0khyu9wc.cloudfront.net/images/constructor_prototypes_1.png)

* To understand better how instances created by a constructor function point to the object assigned to its `prototype` property,  let's deconstruct what happens when we call a constructor function:

  ```javascript
  // The comments are added for illustration purposes only
  function Foo(a, b) {
    this.a = a;
    this.b = b;
  }
  
  // when Foo is called with new, as a constructor
  function Foo(a, b) {
    // this = new Object();												// a new object, or just {}
    // Object.setPrototype(this, Foo.prototype);  // have the object inherit from Foo.prototype
    
    this.a = a;
    this.b = b;
    
    // return this;											// return the created object
  }
  
  // another way to write it, with Object.create()
  function Foo(a, b) {
    // this = Object.create(Foo.prototype);
    
    this.a = a;
    this.b = b;
    
    // return this;										 // return the created object
  }
  ```

  The key takeaway here is that every time we call a function as a constructor, JavaScript creates objects that are prototype linked to the object that is assigined to the `prototype` property (this happens via lines 10 and 20 above). With this understanding, we can use a constructor function and its `prototype` property to set up behavior delegation:  

  ```javascript
  let Dog = function() {};
  
  Dog.prototype.say = function() {
    console.log(this.name + ' says Woof!');
  }
  
  Dog.prototype.run = function() {
    console.log(this.name + ' runs away.');
  }
  
  let fido = new Dog();
  fido.name = 'Fido';
  fido.say();							// => Fido says Woof!
  fido.run();							// => Fido runs away.
  
  let spot = new Dog();
  spot.name = 'Spot';
  spot.say();							// => Spot says Woof!
  spot.run(); 						// => Spot runs away.
  ```

  This approach of defining shared behaviors on the constructor's `prototype` property is called the "Prototype Pattern" of object creation.

##### Static Properties

* **Static properties** are defined and accessed directly on the constructor, not on an instance or a prototype. Typically, static properties belong to the type (e.g., `Dog`) rather than to the individual instances or the prototype object.  

* One common use of static properties is to keep track of all of the objects created by a constructor. For instance:

  ```javascript
  function Dog(name, breed, weight) {
    this.name = name;
    this.breed = breed;
    this.weight = weight;
    Dog.allDogs.push(this);
  }
  
  Dog.allDogs = [];
  ```

  In this case, the static property `allDogs` contains an array with a reference to every `Dog` object created while the program is running. While `allDogs` maintains a list of all the dogs, it isn't information that is pertinent to a specific dog -- it's information about dogs in general. Therefore, it should be a static property.

##### Static Methods

* Static properties don't have to be ordinary data properties. You can also define static methods:

  ```javascript
  Dog.showSpecies = function() {
    console.log(`Dogs belong to the species ${Dog.species}`);
  }
  ```

  You've already seen examples of static methods on built-in JavaScript constructors. `Object.assign`, `Array.isArray`, and `Date.now` are all examples of static methods.

* You may sometimes here such methods described as _class methods_. However, in JavaScript, that's a bit of a misnomer. Instead, you should call such methods **static methods**.

* 

#### Prototype objects

##### Objects' Prototypes

* Every JavaScript Object has a special hidden property called `[[Prototype]]`. We can retreive and set this property's value with the `Object.getPrototypeOf` and `Object.setPrototypeOf` methods. When we use `Object.create` to create an object, it sets the `[[Prototype]]` property of the created object to the passed-in object:

  ```javascript
  let foo = {};
  let qux = Object.create(foo);
  console.log(Object.getPrototypeOf(qux) === foo); // true 
  ```

  In this case, we say that the object assigned to `foo` is the **prototype object** of the object returned by `Object.create` and assigned to `qux`. We could also say that we created the object `qux` with object `foo` as its prototype.  

  We can use `Object.prototype.isPrototypeOf` to determine whether an object has a given value for its `[[Prototype]]` property.

  ```javascript
  foo.isPrototypeOf(qux)			/// true
  ```

  Finally, we can use `Object.setPrototypeOf` to give the `[[Prototype]]` property a new value:

  ```javascript
  let foo = {};
  let bar = {};
  
  let qux = Object.create(foo);
  console.log(Object.getPrototypeOf(qux) === foo); // true
  console.log(foo.isPrototypeOf(qux));						 // true
  
  Object.setPrototypeOf(qux, bar);
  console.log(Object.getPrototypeOf(qux) === bar); // true
  console.log(bar.isPrototypeOf(qux));						 // true
  ```

  Setting the `[[Prototype]]` of an object directly is a slow operation in Browsers and JavaScript engines. As such, it would be better to use `Object.create` than `Object.setPrototypeOf` to create an object with the desired `[[Prototype]]` property.  
  
* Every object has a `[[Prototype]]` property that points to a special object, the object's prototype, which is used to lookup properties that don't exist on the object itself.

  * `Object.create` returns a new object with the argument object as its prototype.
  * `Object.getPrototypeOf` can be used to retrieve the prototype object for an object.
  * `Object.setPrototypeOf` can be used to replace an object's prototype object with another object.
  * `obj.isPrototypeOf` can be used to check for prototype relationships between objects.

* 

##### The `__proto__` Property

* Many older JavaScript programs use a property named `__proto__`, which is pronounced **dunder prototype** instead of `Object.setPrototypeOf` and `Object.getPrototypeOf`. "dunder" is a shortened version of "double underscore", which alludes to teh double underscores at the beginning and end of the name. The `__proto__` property is a _deprecated_, non-hidden version of the `[[Prototype]]` property. As a rule, you should only use `__proto__` if you need to support very old browsers or old versions of Node, or as a convenient shortcut with temporary code or debugging operations. You may run into code that uses it, so you need to at least be aware of it.  

##### Prototype Chain and the Object.prototype Object

We can use `Object.create` to create objects that form a prototype chain:

```javascript
let foo = {
  a: 1,
  b: 2,
};

let bar = Object.create(foo);
let baz = Object.create(bar);
let qux = Object.create(baz);

Object.getPrototypeOf(qux) === baz;					// true
Object.getPrototypeOf(baz) === bar;					// true
Object.getPrototypeOf(bar) === foo;					// true

foo.isPrototypeOf(qux);											// true - because foo is on qux's prototype chain
```

The `Object.prototype` object is at the end of the prototype chain for all JavaScript objects. If you don't create an object from a prototype, its prototype is the `Object.prototype` object:

```javascript
let foo = {
  a: 1,
  b: 2,
};																	// created with object literal

Object.getPrototypeOf(foo) === Object.prototype;		// true
```

##### More Methods on the Object Constructor

* We'd like to highlight a fe more methods on the `Object` constructor.

###### Object.create and Object.getPrototypeOf

* The `getPrototypeOf` method on `Object` is used to return the prototype object of an object that is passed in. When we combine it with `Object.create` we can create a prototype chain that mimics classical inheritance.

* Let's study the following code:

  ```javascript
  Object.getPrototypeOf([]) === Array.prototype; 			// true
  
  function NewArray() {}
  NewArray.prototype = Object.create(Object.getPrototypeOf([]));
  ```

  The empty array is an object whose prototype object is the `Array.prototype` object. Then we create a function and use `Object.create` to have the `NewArray.prototype` object inherit from `Array.prototype`.  

  ```javascript
  NewArray.prototype.first = function() {
    return this[0];
  };
  ```

  Next we add a method on `NewArray.prototype`. `NewArray.prototype` can now delegate all the Array methods to `Array.prototype`, and it has the special ability to respond to `first` and return the first element in the array.

  ```javascript
  let newArr = new NewArray();
  let oldArr = new Array();
  
  oldArr.push(5);
  newArr.push(5);
  oldArr.push(2);
  newArr.push(2);
  console.log(newArr.first());					// => 5
  console.log(oldArr.first);						// => undefined
  ```

###### Object.defineProperties

* We want to have an object constructor that returns a new object with a log function that cannot be modified. In a normal constructor this is not possible. However, using the `defineProperties` method on `Object` we can provide properties and values and set whether each property can be changed or not. Here is an example of creating a property on an object that is read-only.  

  ```javascript
  let obj = {
    name: 'Obj',
  };
  
  Object.defineProperties(obj, {
    age: {
      value: 30,
      writable: false,
    },
  });
  
  console.log(obj.age); // => 30
  obj.age = 32;					// throws an error in strict mode
  console.log(obj.age); // => 30
  ```

###### Object.freeze

* If we wanted to have an object with properties that are immutable, or not able to be changed, we can use the `Object.freeze` method to prevent anything from being changed about an object. This prevents any property values that are not objects from being changed or deleted.

  ```javascript
  let frozen = {
    integer: 4,
    string: 'String',
    array: [1, 2, 3],
    object: {
      foo: 'bar'
    },
    func() {
      console.log('I\'m frozen');
    },
  };
  
  Object.freeze(frozen);
  frozen.integer = 8;
  frozen.string = 'Number';
  frozen.array.pop();
  frozen.object.foo = 'baz';
  frozen.func = function() {
    console.log('I\'m not really frozen');
  };
  
  console.log(frozen.integer); 			// => 4
  console.log(frozen.string);				// => String
  console.log(frozen.array);				// => [1, 2]
  console.log(frozen.object.foo);		// => baz
  frozen.func();										// I'm frozen
  ```

   Can you explain why the array and object properties are changed, but the method is not?  

  **Solution:** For property values that are objects, the references to the objects are frozen. This means that you can't point to other objects, but you can still use the frozen references to mutate the objects.

* Keep in mind that if you freeze an object, it cannot be unfrozen.

#### Behavior delegation

* When we try to access a property or a method on an object, JavaScript searches not only in the object itself, but all the objects on its prototype chain, until the end is reached.

##### Prototypal Inheritance and Behavior Delegation

* JavaScript's prototype chain lookup for properties gives us the ability to store an object's data and behaviors not just in the object itself, but anywhere on its prototype chain. This is very powerful when we want to share data or behaviors.  

  ```javascript
  let dog = {
    say() {
      console.log(this.name + ' says Woof!');
    },
    
    run() {
      console.log(this.name + ' runs away.');
    },
  };
  
  let fido = Object.create(dog);
  fido.name = 'Fido';
  fido.say();							// => Fido says Woof!
  fido.run();							// => Fido runs away.
  
  let spot = Object.create(dog);
  spot.name = 'Spot';
  spot.say();							// => Spot says Woof!
  spot.run();							// => Spot runs away.
  ```

  We may have thousands (or more!) of dogs in our program, but instead of defining the `say` and `run` methods on every object, we defined those methods on `dog`, the prototype object of all dogs. This gives us several advantages:

  * We can create dogs much more easily with the `dog` prototype, and don't have to duplicate `say` and `run` on every single dog object.
  * If we need to add/remove/update behavior to apply to all dogs, we can just modify the prototype object, and all dogs will pick up the changed behavior automatically.

* Some people call this pattern JavaScript's **Prototypal Inheritance**. The word "inheritance" comes from the classical object oriented programming languages (Java, C++, Ruby, Python, etc.) where classes are used to create objects with a carefully designed hierarchy for the purpose of behavior sharing. JavaScript doesn't have true classes, but in a true object oriented (as opposed to "class oriented") way, objects can be created directly from other objects and behaviors (methods) can be shared via the prototype chain.  

* From a top down / design time point of view, the objects on the bottom of the prototype chain "inherited" the properties and behaviors of all the upstream objects on the prototype chain; from a bottom up / run time point of view, objects on the bottom of the prototype chain can "delegate" requests to the upstream objects to be handled. Hence this design pattern is also called **Behavior Delegation**.

* **Overriding default behavior**: objects created from prototypes can override shared behaviors by defining the same methods locally.

* With behavior delegation, using `obj.prop !== undefined` is no longer a reliable way to test if a property is defined on an object--that expression returns true as long as `prop` is defined anywhere on the object's prototype chain. JavaScript gives you the following two methods to check an object's own property:

  * The `hasOwnProperty` method on an object tests if a property is defined on the object itself.
  * The `Object.getOwnPropertyNames` method returns an array of an object's own property names.
  
* The prototype chain property lookup is the basis for "prototypal inheritance", or property sharing through the prototype chain. Downstream objects "inherit" properties and behaviors from upstream objects, or, put differently, downstream objects can "delegate" properties or behaviors upstream.  

  * A downstream object **overrides** an inherited property if it has a same-named property on itself. (Overriding is similar to shadowing, but it doesn't completely hide the overriden properties.)
  * `Object.getOwnPropertyNames` and `obj.hasOwnProperty` can be used to test whether a given property is owned by an object.

##### Methods on Object.prototype

* The `Object.prototype` object is on the top of all JavaScript objects' prototype chain, therefore the methods defined there can be called from any JavaScript object. Here are 3 useful ones:
  * `Object.prototype.toString()`: returns a string representation of the object
  * `Object.prototype.isPrototypeOf(obj)`: tests if the object is in another object's prototype chain
  * `Object.prototype.hasOwnProperty(prop)`: tests whether the property is defined on the object itself

##### Method Delegation to Prototypes

* Delegation means that we can share methods by putting them in the prototype object; if an object doesn't contain a requested method, JavaScript searches the prototype chain to find the method.  

* Thus, we can define a method once in the prototype object, and let the inheriting objects delegate the method calls to the prototype. We can use the prototypes in conjunction with constructors to achieve the same result:

  ```javascript
  let DogPrototype = {
    bark() {
      console.log(this.weight > 20 ? 'Woof!' : 'Yip!');
    }
  };
  
  function Dog(name, breed, weight) {
    Object.setPrototypeOf(this, DogPrototype);
    this.name = name;
    this.breed = breed;
    this.weight = weight;
    // this.bark method removed
  }
  ```

  In this code, we've changed our `Dog` constructor and created a `DogPrototype` object. The first thing we do inside the constructor is set `DogPrototype` as the prototype of the newly created `Dog` object. We then assign the arguments to the properties.  

  This time, however, the `bark` method isn't defined on the individual objects, but is, instead, defined on the `[[Prototype]]` property.  

  The `DogPrototype` object has the only copy of the method; all `Dog` objects delegate `bark` to the `DogPrototype` object. If you have dozens of `Dog` objects in your program, it's easy to see that adding prototypes into the mix can make better use of memory.  

  Okay, we now have a constructor and a related prototype object. Together, they construct objects of some type. In our code here, we can guess that the constructor and prototype are related by looking at their names. However, it would be better if we could establish that relationship more concretely. Let's assign the prototype object to a property of the `Dog` function.  

  ```javascript
  // Delete DogPrototype
  
  function Dog(name, breed, weight) {
    Object.setPrototypeOf(this, Dog.myPrototype);
    // rest of the code
  }
  
  Dog.myPrototype = {
    bark() {
      console.log(this.weight > 20 ? 'Woof!' : 'Yip!');
    }
  };
  ```

  Since JavaScript functions are objects, we can add properties to them. Here, we assign the prototype object to a `myPrototype` property on the `Dog` function object. Thus, we clearly show our intent that all dogs inherit from the `Dog.myPrototype` object. Once we've done that, we can change our constructor function to use `Dog.myPrototype` as the prototype object.  

##### The Constructor `prototype` Property

* So far, so good. We have a constructor function and a prototype object that work together. Between them, they create `Dog` objects for us that don't waste memory with multiple copies of methods. However, we still haven't explained why we should bother with constructors. We can pair a prototype with a factory function and get the same effect.  

* What makes constructors special is a characteristic of all function objects in JavaScript: they all have a `prototype` property that we call the **function prototype** to distinguish them from the prototypes used when creating ordinary objects. The code we showed in the previous section emulates something that JavaScript bundles with constructors. Let's take a look at that property:

  ```javascript
  Dog.prototype; // => Dog {}
  ```

* When you call a function `Foo` with the `new` keyword, JavaScript sets the new object's prototype to the current value of `Foo`'s `prototype` property. That is, the constructor creates an object that inherits from the constructor function's prototype. Since inheritance in JavaScript uses prototypes, we can also say that the constructor creates an object with a prototype that is the same as the constructor function's prototype.  

* The terminology of constructor prototypes and object prototypes is extremely confusing. Note in particular that we use the term "prototype" to refer to 2 distinct but related concepts:

  * If `bar` is an object, then the object from which `bar` inherits is the **object prototype**. By default, constructor functions set the object prototype for the objects they create to the constructor's prototype object.
  * The **constructor's prototype object**, also called the **function prototype**, is an object that the constructor uses as the object prototype for the objects it creates. In other words, each object that the constructor creates inherits from the constructor's prototype object. JavaScript stores the constructor's prototype object in the constructor's `prototype` property; that is, if the constructor's name is `Foo`, then `Foo.prototype` references the constructor's prototype object.  

* In most cases when we talk about a **prototype** without being more explicit, we mean an **object prototype**. We'll talk about the constructor's prototype, the function prototype, or the `prototype` property when talking about a constructor's prototype object.  

* Note that constructors don't inherit from the constructor's prototype object. Instead, the objects that the constructor creates inherit from it.  

* As we've said before, every JavaScript function has a `prototype` property. However, JavaScript only uses it when you call that function as a constructor, that is, by using the `new` keyword. With this information, we can abandon our home-grown constructor-prototype pairing and use the one that JavaScript provides instead:

  ```javascript
  function Dog(name, breed, weight) {
    // deleted Object.setPrototype(this, Dog.myPrototype);
    this.name = name;
    this.breed = breed;
    this.weight = weight;
  }
  
  Dog.prototype.bark = function() {
    console.log(this.weight > 20 ? 'Woof!' : 'Yip!');
  };
  
  let maxi = new Dog('Maxi', 'German Sheperd', 32);
  maxi.bark(); // 'Woof!'
  
  let biggie = new Dog('Biggie', 'Whippet', 9);
  biggie.bark();  // 'Yip!'
  ```

  Here's a diagram illustrating the `prototype` and `constructor` links we've discussed.

  ![Diagram](https://dbdwvr6p7sskw.cloudfront.net/images/js120/constructor-prototype-map.png)

  

  Note that our constructor doesn't have to explicitly set the prototype of `this` to `Dog.prototype`. JavaScript does that for us when we call the function with `new`. We glossed over this detail earlier, so let's restate those steps with updated information. We'll assume that the constructor function is named `Foo`:

  1. It creates an entirely new object.
  2. It sets `Foo.prototype` as the prototype for the new object. That is, the new object inherits from the object referenced by `Foo.prototype`.  
  3. It sets the execution context (`this`) for the function to point to the new object.
  4. It invokes the function.
  5. It returns the new object unless the function returns another **object**.

* 

#### OLOO and Pseudo-Classical patterns

* Before we get into the two object creation patterns, let's use an example to see the typical considerations we face when we need to create similar objects. For example, we may have the object `pointA` to represent a point in the coordinate plane, who also knows how to calculate its distance to the origin, and whether it's on the X or the Y axis:

  ```javascript
  let pointA = {
    x: 30,
    y: 40,
  
  	onXAxis() {
    	return this.y === 0;
  	},
    
    onYAxis() {
      return this.x === 0;
    },
    
    distanceToOrigin() {
      return Math.sqrt((this.x * this.x) + (this.y * this.y));
    },
  };
  
  pointA.distanceToOrigin();				// 50
  pointA.onXAxis(); 								// false
  pointA.onYAxis();									// false
  ```

  Use of the object literal form is great if all we need is one object. When we need to have many points in our program, we'd like our points to:

  * Be able to have their own **states**, represented by the x and y values;
  * Share the `distanceToOrigin`, `onXAxis` and `onYAxis` **behaviors**, because they work the same way for all points on the coordinate plane.

##### The Pseudo-classical Pattern

* The Pseudo-classical pattern is a combination of the constructor pattern and the prototype pattern. With this pattern, we use a constructor to set object states, and put shared methods on the constructor function's prototype:

  ```javascript
  let Point = function(x = 0, y = 0) {			// capitalized constructor name as a convention
    this.x = x;															// initialize states with arguments
    this.y = y;															// 0 as default value
  };
  
  Point.prototype.onXAxis = function() { // shared behaviors added to constructor's prototype property
  	return this.y === 0;
  };
  
  Point.prototype.onYAxis = function() { // these methods are added one by one
    return this.x === 0;
  };
  
  Point.prototype.distanceToOrigin = function() {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  };
  
  let pointA = new Point(30, 40);						// use new to create objects
  let pointB = new Point(20);
  
  pointA instanceof Point;									// use instanceof to check type
  pointB instanceof Point;
  ```

##### The OLOO Pattern

* OLOO, which stands for "Object Linking to Other Objects," was first popularized by Kyle Simpson. JavaScript sheds its pretense as a "class oriented" language, where it uses constructor functions as fake classes. Instead, it embraces its prototype based object model.

* With the OLOO pattern, we define the shared beahviors on a prototype object, then use `Object.create` to create objects that delegate directly from that object, without going through the roundabout way that involves "constructors and their properties."

  ```javascript
  let Point = {							// capitalized name for the prototype as a convention
    onXAxis() {							// shared methods defined on the prototype
      return this.y === 0;
    },
    
    onYAxis() {
      return this.x === 0;
    },
    
    distanceToOrigin() {
      return Math.sqrt((this.x * this.x) + (this.y * this.y));
    },
    
    init(x, y) {						// optional init method to set states
      this.x = x;
      this.y = y;
      return this;
    },
  };
  
  let pointA = Object.create(Point).init(30, 40);
  
  Point.isPrototypeOf(pointA);				// use isPrototypeOf to check type
  Point.isPrototypeOF(pointA);
  
  pointA.distanceToOrigin();					// 50
  pointA.onXAxis();										// false
  ```

  Note that this form OLOO requires you to call the `init` method after creating the new object. If you don't call `init`, the various properties may not be assigned to usable values.  

  If you want, you can provide default values so you don't need to call `init`:  

  ```javascript
  let Point = {             // capitalized name for the prototype as a convntion
    x: 0,
    y: 0,
  
    onXAxis() {             // shared methods defined on the prototype
      return this.y === 0;
    },
  
    onYAxis() {
      return this.x === 0;
    },
  
    distanceToOrigin() {
      return Math.sqrt((this.x * this.x) + (this.y * this.y));
    },
  
    init(x, y) {            // optional init method to set states
      this.x = x;
      this.y = y;
      return this;
    },
  };
  
  let pointB = Object.create(Point);
  
  Point.isPrototypeOf(pointB);
  pointB.distanceToOrigin();          // 0
  pointB.onXAxis();                   // true
  ```

  

* 

#### `class` syntax

* ES6 has introduced `class` as another way to create objects as well as establish inheritance. The usage of `class` in JavaScript though is quite misleading as the language doesn't really have true classes. As you know by now, JavaScript implements object-oriented features through prototypes.  

* What is `class`? Simply, it is just syntactic sugar that wraps around one of the object creation patterns we have already discussed -- pseudo-classical pattern. In other words, it is just another way to write code.  

* Recall the pseudo-classical example in the previous assignment.

  ```javascript
  function Point(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  };
  
  Point.prototype.onXAxis = function() {
    return this.y === 0;
  };
  
  Point.prototype.onYAxis = function() {
    return this.x === 0;
  };
  
  Point.prototype.distanceToOrigin = function() {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  }
  ```

  Lines 1 to 4 defines the `Point` constructor function, while lines 6 to 16 define methods on `Point.prototype`. No surprises here. How then do we "translate" this same code and functionality in the form of the `class` syntactic sugar? 

  ```javascript
  class Point {
    constructor(x = 0, y = 0) {
      this.x = x;
      this.y = y;
    }
    
    onXAxis() {
      return this.y === 0;
    }
    
    onYAxis() {
      return this.x === 0;
    }
    
    distanceToOrigin() {
      return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }
  }
  ```

* Though they may look different, both programs functionally do the exact same thing. You can check out the image below to see them side-by-side.

  ![img](https://d3905n0khyu9wc.cloudfront.net/images/class_vs_pseudo_classical.png)

* Syntactically, there are three main differences here:

  1. The obvious one is the use of the keyword `class` instead of `function`.
  2. Parameters are defined and states are set within the `constructor` function, which automatically runs whenever an object is created.
  3. All methods defined within the `class` definition, with the exception of `constructor`, are defined on the prototype object. In this case, on `Point.prototype`.

* How about instantiating objects? We do that exactly the same way that we create objects with constructor functions.  

  ```javascript
  class Point {
    constructor(x = 0, y = 0) {
      this.x = x;
      this.y = y;
    }
    
    // rest of the code
  }
  
  let pointA = new Point(30, 40);
  let pointB = new Point(20);
  
  pointA instanceof Point;							// true
  pointB instanceof Point;							// true
  
  pointA.distanceToOrigin();						// 50
  pointB.onXAxis();											// true
  ```

##### A Couple of Caveats

* There is nothing special with the `class` "method" of object creation. Again, it is merely syntactic sugar. However, there are things we need to take note of.

  1. All code in `class` executes in strict mode.

  2. Unlike function declarations, class declarations are not hoisted.

     ```javascript
     let pointA = new Point(30, 40);						// ReferenceError: Point is not defined
     
     class Point {
       constructor(x = 0, y = 0) {
         this.x = x;
         this.y = y;
       }
       
     // rest of the code
     }
     ```

  3. Invoking the class constructor without the `new` keyword raises an error.  

     ```javascript
     class Point {
       constructor(x = 0, y = 0) {
         this.x = x;
         this.y = y;
       }
       
     // other code
     }
     
     let pointA = Point(30, 40);					// TypeError: Class constructor Point cannot be
     																		// invoked without 'new'
     ```

##### Static Methods using `class` syntax

* It should come as no surprise that you can defined static methods with the `class` keyword as well: just use the `static` keyword:

  ```javascript
  class Rectangle {
    constructor(length, width) {
      this.length = length;
      this.width = width;
    }
    
    static getDescription() {
      return 'A rectangle is a shape with 4 sides';
    }
    
    getArea() {
      return this.length * this.width;
    }
  }
  
  console.log(Rectangle.getDescription()); // A rectangle is a shape with 4 sides
  ```

* You can also define static properties. Static properties are properties that are defined on the constructor function instead of the individual objects. One well-known example of a static property is the `length` property used by the `String` type. To define a static property with the constructor and prototype pattern, just add it to the constructor function object:

  ```javascript
  Rectangle.description = 'A rectangle is a shape with 4 sides';
  ```

  To do the same with a `class`, just use the `static` keyword inside the `class`:

  ```javascript
  class Rectangle {
    static description = 'A rectangle is a shape with 4 sides';
  }
  ```

##### Inheritance With Class Declarations

* In a prior assignment, we learned how one consructor's prototype can inherit from another constructor's prototype. For example:

  ```javascript
  function Rectangle(length, width) {
    this.length = length;
    this.width = width;
  }
  
  Rectangle.prototype.getArea = function() {
    return this.length * this.width;
  };
  
  Rectangle.prototype.toString = function() {
    return this.length * this.width;
  };
  
  Rectangle.prototype.toString = function() {
    return `[Rectangle ${this.length} x ${this.width}]`;
  };
  
  function Square(size) {
    Rectangle.call(this, size, size);
  }
  
  Square.prototype = Object.create(Rectangle.prototype);
  Square.prototype.constructor = Square;
  
  Square.prototype.toString = function() {
    return `[Square ${this.length} x ${this.width}]`;
  };
  ```

  Let's convert that code to use classes instead of constructors and prototypes. The `Square` consructor's prototype inherits from `Rectangle.prototype`, which gives square objects access to methods defined for rectangle objects. We can do the same thing with classes, but we now use the clean, straightforward syntax provided for JavaScript classes:

  ````javascript
  class Rectangle {
    constructor(length, width) {
      this.length = length;
      this.width = width;
    }
    
    getArea() {
      return this.length * this.width;
    }
    
    toString() {
      return `[Rectangle ${this.width * this.length}]`;
    }
  }
  
  class Square extends Rectangle {
    constructor(size) {
      super(size, size);
    }
    
    toString() {
      return `[Square] ${this.width * this.length}`;
    }
  }
  ````

  The `extends` keyword signifies that the class named to the left of `extends` should inherit from the class specified to the right of `extends`. Note that we don't define `getArea` on the `Square` class since `Square` inherits it from `Rectangle` and doesn't need to customize or override the method.

##### `super`

* Note also that the `Square` consructor calls a function that is represented by the keyword `super`. When called inside the `constructor` method, the `super` keyword refers to the constructor method for the parent class (the class that we inherit from). Thus, `super(size, size)` performs the same role performed by this code from our constructor/prototype example:

  ```javascript
  function Square() {
    Rectangle.call(this, size, size);
  }
  ```

  You don't need to use `super` in every subclass, but in most cases you do. In particular, if the superclass's constructor creates any object properties, you must call `super` to ensure that those properties are set properly. For instance, in the `Rectangle` class above, we create two properties in the `Rectangle` constructor, so we must call `super` in `Square`'s constructor.

* If you do call `super` in a subclass's constructor, you must call it before you use `this` in that constructor.

##### Inheritance With Class Expressions

* Let's look at another example of inheritance with classes:

  ```javascript
  let Person = class {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
    
    sayName() {
      console.log(`My name is ${this.name}.`);
    }
  };
  
  let Student = class extends Person {
    constructor(name, age, semester) {
      super(name, age);
      this.semester = semester;
    }
    
    enrollInCourse(courseNumber) {
      console.log(`${this.name} has enrolled in course ${courseNumber}.`);
    }
  };
  
  let student = new Student('Kim', 22, 'Fall');
  student.sayName();	// logs 'My name is Kim.'
  student.enrollInCourse('JS120');  // logs 'Kim has enrolled in course JS120.'
  ```

  In this example, the `Student` class inherits from the `Person` class. That gives student objects access to methods of the `Person` class and extends person objects further by adding a `semester` property and an `enrollInCourse` method. Notice that we've reused `Person`'s constructor inside the `Student` constructor, and calling `super` with `name` and `age` since the `Student` constructor expects those arguments. We also assign the `semester` argument to the `semester` property after `super` returns.

* Note that this most recent example uses class expressions instead of class declarations.

---

### Further Reading

In addition to the course content, you may also find these articles written by one of our students for the weekly JavaScript study group as helpful in your review. These articles cut across concepts and give an additional perspective that may help firm up your understanding and mental model of the concepts that we've covered in this course.

- [JavaScript Weekly: Making Sense of Closures](https://medium.com/launch-school/javascript-weekly-making-sense-of-closures-daa2e0b56f88)
- [JavaScript Weekly: Understanding Links on the Object Prototype Chain](https://medium.com/launch-school/javascript-weekly-understanding-links-on-the-object-prototype-chain-12962f05e149)
- [JavaScript Weekly: An Introduction to First-Class Functions](https://medium.com/launch-school/javascript-weekly-an-introduction-to-first-class-functions-9d069e6fb137)
- [JavaScript Weekly: What in the World is this?!](https://medium.com/launch-school/what-in-the-world-is-this-be803a85ed47)



