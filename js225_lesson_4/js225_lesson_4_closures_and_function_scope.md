##### JS225 Closures and Function Scope

---

## Lesson 4: Closures and Function Scope

### 1. Closures and Function Review ([here](https://launchschool.com/lessons/0b371359/assignments/613bd3bb))

The `function` keyword creates JavaScript Functions. There are two different syntaxes you can use to define a function:

```javascript
// This is the function declaration syntax
function hello() {
  console.log('Welcome!');
}

// This is the [anonymous] function expression syntax
let hello = function() {
  console.log('Welcome!');
};
```

The **function expression** syntax is handy when passing a function to another function as an argument or return value. For example, developers often use function expressions with the built-in `Array.prototype.map` method:  

```javascript
let squares = [1, 2, 3, 4, 5].map(function(number) {
  return Math.pow(number, 2);
});
```

All functions, regardless of syntax, obey the same lexical scoping rules:

* They can access any variables defined within it.
* They can any variables that were in scope based on the context where the function was **defined**.

##### Remember these important variable scoping rules:

* Every function declaration creates a new local variable scope.
* Every block creates a new local variable scope.
* Lexical scope uses the structure of the source code to determine the variable's scope. This means that the code doesn't have to be executed for the scope to exist.
* All variables in the same or surrounding scopes are visible inside functions and blocks.

---

### 2. Higher-Order Functions ([here](https://launchschool.com/lessons/0b371359/assignments/f5b3f244))

**Higher-order functions** can accept a function as an argument, return a function when invoked, or both. In other words, higher-order functions work with other functions.  

To understand this concept, you must think of JavaScript functions as *values*; functions are objects. We know that they can take values as input and return a value as output. Thus, a higher-order function is one where either an input or output value is a function.  

---

### 3. Practice Problems: Higher-Order Functions ([here](https://launchschool.com/lessons/0b371359/assignments/a4544340))

1. What are the characteristics that define higher-order functions?

   ###### My Solution

   Higher-order functions are functions that either take a function as an argument or return a function, or both.

   ###### LS Solution

   A higher-order function must either:

   1. Take a function as an argument,
   2. return a function,
   3. or Both.

2. Consider the code below:

   ```javascript
   let numbers = [1, 2, 3, 4];
   function checkEven(number) {
     return number % 2 === 0;
   }
   
   numbers.filter(checkEven); // [2, 4]
   ```

   Of the two functions invoked (`checkEven` and `filter`), which is a higher-order function and why?  

   ###### My Solution

   `filter` is the higher order function because it takes another function as an argument.

   ###### LS Solution

   `filter` is a higher-order function because it takes a function — `checkEven` — as an argument. `checkEven` is not a higher-order function since it doesn't take any function as an argument and doesn't return a function.

3. Implement `makeCheckEven` below, such that the last line of the code returns an array `[2, 4]`.

   ```javascript
   let numbers = [1, 2, 3, 4];
   function makeCheckEven() {
     // ... implement this function
   }
   
   let checkEven = makeCheckEven();
   
   numbers.filter(checkEven); // [2, 4]
   ```

   ###### My Solution

   ```javascript
   let numbers = [1, 2, 3, 4];
   function makeCheckEven() {
     return function(number) {
       return number % 2 === 0;
     };
   }
   
   let checkEven = makeCheckEven();
   
   numbers.filter(checkEven);
   ```

   ###### LS Solution

   ```javascript
   function makeCheckEven() {
     return function(number) {
       return number % 2 === 0;
     };
   }
   ```

4. Implement `execute` below, such that the return values for the two function invocations match the commented values.

   ```javascript
   function execute(func, operand) {
     // ... implement this function
   }
   
   execute(function(number) {
     return number * 2;
   }, 10); // 20
   
   execute(function(string) {
     return string.toUpperCase();
   }, 'hey there buddy'); // "HEY THERE BUDDY"
   ```

   ###### My Solutin

   ```javascript
   function execute(func, operand) {
     return func(operand);
   }
   ```

   ###### LS Solution

   ```javascript
   function execute(func, operand) {
     return func(operand);
   }
   ```

5. Implement `makeListTransformer` below such that `timesTwo`'s return value matches the commented return value.

   ```javascript
   function makeListTransformer(func) {
     // ... implement this function
   }
   
   let timesTwo = makeListTransformer(function(number) {
     return number * 2;
   });
   
   timesTwo([1, 2, 3, 4]);
   ```

   ###### My Solution

   ```javascript
   function makeListTransformer(func) {
     return function(array) {
       return array.map(func);
     };
   }
   ```

   ###### LS Solution

   ```javascript
   function makeListTransformer(func) {
     return function(collection) {
       return collection.map(func);
     };
   }
   ```

---

### 4. Closures and Private Data ([here](https://launchschool.com/lessons/0b371359/assignments/7bd21ae8))



