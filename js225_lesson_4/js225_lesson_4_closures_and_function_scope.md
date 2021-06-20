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

Functions *close over* or *enclose* the context at their definition point, so we call them **closures**. They always have access to that context, regardless of when and where the program invokes the function. Here's some code that uses a closure to increment and log a number with each call:  

```javascript
function makeCounter() {
  let count = 0;			// declare a new variable
  return function() {
    count += 1;				// references count from the outer scope
    console.log(count);
  };
}
```

In reality, closures are a little more restrictive than described above. Functions close over the context of their definition point when the function refers to any variables, functions, or classes that are defined in the function's outer scope. Functions that are completely self-contained don't form closures.  

Since `makeCounter` returns a function, we use it like this:

```javascript
let counter = makeCounter();
counter();
=> 1
counter();
=> 2
counter();
=> 3
```

![img](https://d3905n0khyu9wc.cloudfront.net/images/function_scope1_v2.png)

Note that `count` is private data for the function returned by `makeCounter`. The closure makes it *impossible* to access the value of `count` from outside itself:

```javascript
let counter = makeCounter();
console.log(count);
// ReferenceError: count is not defined
console.log(counter.count);
// undefined: Declarations inside closures aren't accessible from outside
```

On the other hand, as we saw above, the function returned by `makeCounter` can freely access and update `counter`.

#### Problems

1. Create a `makeCounterLogger` function that takes a number as an argument and returns a function. When we invoke the returned function with a second number, it should count up or down from the first number to the second number, logging each number to the console:

   ```javascript
   > let countlog = makeCounterLogger(5);
   > countlog(8);
   5
   6
   7
   8
   > countlog(2);
   5
   4
   3
   2
   ```

   ###### My Solution

   ```javascript
   function makeCounterLogger(startNumber) {
     return function(endNumber) {
       if (endNumber > startNumber) {
         for (let count = startNumber; count <= endNumber; count += 1) {
           console.log(count);
         }
       } else if (endNumber < startNumber) {
         for (let count = startNumber; count >= endNumber; count -= 1) {
           console.log(count);
         }
       } else {
         console.log(endNumber);
       }
     };
   }
   ```

   ###### LS Solution

   ```javascript
   function makeCounterLogger(start) {
     return function(finish) {
       let i;
       
       if (start > finish) {
         for (i = start; i >= finish; i -= 1) {
           console.log(i);
         }
       } else {
         for (i = start; i <= finish; i += 1) {
           console.log(i);
         }
       }
     };
   }
   ```

2. We'll build a simple todo list program using the techniques we've seen in this assignment. Write a `makeList` function that returns a new function that implements a todo list. The returned function should have the following behavior:

   * When called with an argument that is not already on the list, it adds that argument to the list.
   * When called with an argument that is already on the list, it removes the element from the list.
   * When called without arguments, it logs all items on the list. If the list is empty, it logs an appropriate message.  

   ```javascript
   > let list = makeList();
   > list();
   The list is empty.
   > list('make breakfast');
   make breakfast added!
   > list('read book');
   read book added!
   > list();
   make breakfast
   read book
   > list('make breakfast');
   make breakfast removed!
   > list();
   read book
   ```

   ###### My Solution

   ```javascript
   function makeList() {
     let items = [];
     return function(item) {
       if (item === undefined) {
         if (items.length === 0) {
           console.log('The list is empty.');
         } else {
           items.forEach(item => console.log(item));
         }
       } else if (items.includes(item)) {
         let itemIndex = items.indexOf(item);
         items.splice(itemIndex, 1);
         console.log(`${item} removed!`);
       } else {
         items.push(item);
         console.log(`${item} added!`);
       }
     };
   }
   ```

   ###### LS Solution

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
           console.log('This list is empty.');
         } else {
           items.forEach(function(item) {
             console.log(item);
           });
         }
       }
     };
   }
   ```

---

### 5. Practice Problems: Closures ([here](https://launchschool.com/lessons/0b371359/assignments/5271e93c))

1. Write a function named `makeMultipleLister` that, when invoked and passed a number, returns a function that logs every positive integer multiple of that number less than 100. Usage looks like this:

   ```javascript
   > let lister = makeMultipleLister(13);
   > lister();
   13
   26
   39
   52
   65
   78
   91
   ```

   ###### My Solution

   ```javascript
   function makeMultipleLister(number) {
     return function() {
       for (let multiple = number; multiple < 100; multiple += number) {
         console.log(multiple);
       }
     };
   }
   ```

   ###### LS Solution

   ```javascript
   function makeMultipleLister(number) {
     return function () {
       let i;
       for (i = number; i < 100; i += number) {
         console.log(i);
       }
     };
   }
   ```

2. Write a program that uses two functions, `add` and `subtract`, to manipulate a running total value. When you invoke either function with a number, it should add or subtract that number from the running total and log the new total to the console. Usage looks like this:

   ```javascript
   > add(1);
   1
   > add(42);
   43
   > subtract(39);
   4
   > add(6);
   10
   ```

   ###### My Solution

   ```javascript
   let currentTotal = 0;
   
   function add(number) {
     currentTotal += number;
     console.log(currentTotal);
   }
   
   function subtract(number) {
     currentTotal -= number;
     console.log(currentTotal);
   }
   ```

   ###### LS Solution

   ```javascript
   let total = 0;
   
   function add(number) {
     total += number;
     console.log(total);
   }
   
   function subtract(number) {
     total -= number;
     console.log(total);
   }
   ```

3. Given the following code:

   ```javascript
   function startup() {
     let status = 'ready';
     return function() {
       console.log('The system is ready.');
     };
   }
   
   let ready = startup();
   let systemStatus = // ?
   ```

   How can you set the value of `systemStatus` to the value of the inner variable `status` without changing `startup` in any way?  

   ###### My Solution

   My initial sense is that you can't. `status` is part of the closure in the function `ready`. It cannot be accessed from outside of `ready`.

   ###### LS Solution

   You can't do this. **There is no way to access the value of the variable from outside the function.** `status` is only available to the closure formed by the anonymous function returned by `startup`.  

   This technique lets us define "private" variables.

---

### 6. Objects and Closures ([here](https://launchschool.com/lessons/0b371359/assignments/621678ef))

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

#### Problems

1. Reimplement `makeList`, so that it returns an Object that provides the interface shown above, including `add`, `list`, and `remove` methods.

   ###### My Solution

   ```javascript
   function makeList() {
     return {
       items: [],
       add(item) {
         this.items.push(item);
         console.log(item + ' added!');
       },
       remove(item) {
         let itemIndex = this.items.indexOf(item);
         if (itemIndex >= 0) {
           this.items.splice(itemIndex, 1);
           console.log(item + ' removed!');
         }
       },
       list() {
         this.items.forEach(item => console.log(item));
       },
     };
   }
   ```

   ###### LS Solution

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

2. Notice that the solution lets us access the array of items through the `items` property:  

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

   ###### My Solution

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

   ###### LS Solution

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

#### Why use closures to make data private?

As shown above, you have choices about how to organize your code and data. Using closures to restrict data access is a good way to force other developers to use the intended interface. By keeping the collection of items private, we enforce access via the provided methods.  

---

### 7. Project: Banking with Objects and Closures ([here](https://launchschool.com/lessons/0b371359/assignments/e071c151))

In this assignment, we'll build a small banking application and look at how we can use closures to control access to the application's data. We'll proceed through this assignment using some example code and then you will write code that satisfies it.

1. Create an object named `account` that represents a bank account. It should contain a `balance` property that stores the account's current balance.

   ###### My Solution

   ```javascript
   let account = {
     balance: 0,
   };
   ```

   ###### LS Solution

   ```javascript
   let account = {
     balance: 0,
   };
   ```

2. Add a `deposit` method to the `account` object that takes a single argument, the value of the deposit. `deposit` adds the value of argument passed to it to the account's balance, and then returns it.

   ```javascript
   > account.balance;
   = 0
   > account.deposit(12);
   = 12
   > account.balance;
   = 12
   > account.deposit(10);
   = 10
   > account.balance;
   = 22
   ```

   ###### My Solution

   ```javascript
   let account = {
     balance: 0,
     deposit(amount) {
       this.balance += amount;
       return amount;
     },
   };
   ```

   ###### LS Solution

   ```javascript
   let account = {
     balance: 0,
     deposit(amount) {
       this.balance += amount;
       return amount;
     }
   };
   ```

3. Add a `withdraw` method to the `account` object that takes a single argument, the amount to withdraw. It should subtract the amount from the account's balance and return the amount subtracted.

   ```javascript
   > account.balance;
   = 100
   > account.withdraw(19);
   = 19
   > account.balance;
   = 81
   ```

   If the account contains less than the withdrawal amount, the method should limit the withdrawal to the amount available, and return the actual amount withdrawn. This should leave the account with a balance of `0`.

   ```javascript
   > account.balance;
   = 81
   > account.withdraw(91);
   = 81
   > account.balance;
   = 0
   ```

   ###### My Solution

   ```javascript
   let account = {
     balance: 0,
     deposit(amount) {
       this.balance += amount;
       return amount;
     },
     withdraw(amount) {
       if (amount <= this.balance) {
         this.balance -= amount;
         return amount;
       } else {
         let withdrawnAmount = this.balance;
         this.balance = 0;
         return withdrawnAmount;
       }
     },
   };
   ```

   ###### LS Solution

   ```javascript
   let account = {
     balance: 0,
     deposit(amount) {
       this.balance += amount;
       return amount;
     },
   
     withdraw(amount) {
       if (amount > this.balance) {
         amount = this.balance;
       }
   
       this.balance -= amount;
       return amount;
     },
   };
   ```

4. Each account should have a record of every deposit and withdrawal applied to it. To do this, add a property named `transactions` to `account` that contains an array of transactions, each of which is an object with `type` and `amount` properties.

   ```javascript
   > account.deposit(23);
   = 23
   > account.transactions;
   = [{...}]
   > account.transactions[0];
   = {type: "deposit", amount: 23}
   ```

   ###### My Solution

   ```javascript
   let account = {
     balance: 0,
     transactions: [],
     deposit(amount) {
       this.balance += amount;
       this.transactions.push({ type: "deposit", amount: amount });
       return amount;
     },
     withdraw(amount) {
       if (amount <= this.balance) {
         this.balance -= amount;
         this.transactions.push({ type: "withdraw", amount: amount });
         return amount;
       } else {
         let withdrawnAmount = this.balance;
         this.balance = 0;
         this.transactions.push({ type: "withdraw", amount: withdrawnAmount });
         return withdrawnAmount;
       }
     },
   };
   ```

   ###### LS Solution

   ```javascript
   let account = {
     balance: 0,
     transactions: [],
     deposit(amount) {
       this.balance += amount;
       this.transactions.push({type: "deposit", amount: amount});
       return amount;
     },
   
     withdraw(amount) {
       if (amount > this.balance) {
         amount = this.balance;
       }
   
       this.balance -= amount;
       this.transactions.push({type: "withdraw", amount: amount});
       return amount;
     },
   };
   ```

5. We want to create more than one account. Move the account creation code to a function named `makeAccount` that returns a new account object.

   ```javascript
   > let account = makeAccount();
   > account.deposit(15);
   = 15
   > account.balance;
   = 15
   > let otherAccount = makeAccount();
   > otherAccount.balance;
   = 0
   ```

   ###### My Solution

   ```javascript
   function makeAccount() {
     return {
       balance: 0,
       transactions: [],
       deposit(amount) {
         this.balance += amount;
         this.transactions.push({ type: "deposit", amount: amount });
         return amount;
       },
       withdraw(amount) {
         if (amount <= this.balance) {
           this.balance -= amount;
           this.transactions.push({ type: "withdraw", amount: amount });
           return amount;
         } else {
           let withdrawnAmount = this.balance;
           this.balance = 0;
           this.transactions.push({ type: "withdraw", amount: withdrawnAmount });
           return withdrawnAmount;
         }
       },
     };
   }
   ```

   ###### LS Solution

   ```javascript
   function makeAccount() {
     return {
       balance: 0,
       transactions: [],
       deposit(amount) {
         this.balance += amount;
         this.transactions.push({type: "deposit", amount: amount});
         return amount;
       },
   
       withdraw(amount) {
         if (amount > this.balance) {
           amount = this.balance;
         }
   
         this.balance -= amount;
         this.transactions.push({type: "withdraw", amount: amount});
         return amount;
       },
     };
   }
   
   let account = makeAccount();
   ```

6. We also need an object to manage accounts: a bank. Create a function that returns an object that represents a bank. The bank should have a property named `accounts` that represents a list of accounts.

   ```javascript
   > let bank = makeBank();
   > bank.accounts;
   = []
   ```

   ###### My Solution

   ```javascript
   function makeBank() {
     return {
       accounts: [],
     };
   }
   ```

   ###### LS Solution

   ```javascript
   function makeBank() {
     return {
       accounts: []
     };
   }
   
   let bank = makeBank();
   ```

7. Add a new method named `openAccount` to the object returned by `makeBank`. It should create a new account, add it to the bank's `accounts` collection, and return the new account. Each new account should have a unique account number, starting at `101`; each account number should be one greater than the previous account created.

   ```javascript
   > let bank = makeBank();
   > let account = bank.openAccount();
   > account.number;
   = 101
   > bank.accounts;
   = [{...}]
   > bank.accounts[0];
   = {number: 101, balance: 0, transactions: Array[0]}
   > let secondAccount = bank.openAccount();
   > secondAccount.number;
   = 102
   ```

   ###### My Solution

   ```javascript
   function makeBank() {
     let accountNumber = 101;
     return {
       accounts: [],
       openAccount() {
         let newAccount = {
           number: accountNumber,
           balance: 0,
           transactions: [],
         }
   
         this.accounts.push(newAccount);
         accountNumber += 1;
         return newAccount;
       },
     };
   }
   ```

   ###### LS Solution

   ```javascript
   function makeAccount(number) {
     return {
       number,
       balance: 0,
       transactions: [],
       deposit(amount) {
         this.balance += amount;
         this.transactions.push({type: "deposit", amount: amount});
         return amount;
       },
   
       withdraw(amount) {
         if (amount > this.balance) {
           amount = this.balance;
         }
   
         this.balance -= amount;
         this.transactions.push({type: "withdraw", amount: amount});
         return amount;
       }
     };
   }
   
   function makeBank() {
     return {
       accounts: [],
       openAccount() {
         let number = this.accounts.length + 101;
         let account = makeAccount(number);
         this.accounts.push(account);
         return account;
       },
     };
   }
   ```

8. Add a new method to the bank object that transfers money from one account to another.

   ```javascript
   > let bank = makeBank();
   > let source = bank.openAccount();
   > source.deposit(10);
   = 10
   > let destination = bank.openAccount();
   > bank.transfer(source, destination, 7);
   = 7
   > source.balance;
   = 3
   > destination.balance;
   = 7
   ```

   ###### My Solution

   ```javascript
   function makeAccount(number) {
     return {
       number,
       balance: 0,
       transactions: [],
       deposit(amount) {
         this.balance += amount;
         this.transactions.push({ type: "deposit", amount: amount });
         return amount;
       },
       withdraw(amount) {
         if (amount <= this.balance) {
           this.balance -= amount;
           this.transactions.push({ type: "withdraw", amount: amount });
           return amount;
         } else {
           let withdrawnAmount = this.balance;
           this.balance = 0;
           this.transactions.push({ type: "withdraw", amount: withdrawnAmount });
           return withdrawnAmount;
         }
       },
     };
   }
   
   function makeBank() {
     return {
       accounts: [],
       openAccount() {
         let number = this.accounts.length + 101;
         let account = makeAccount(number);
         this.accounts.push(account);
         return account;
       },
       transfer(source, destination, amount) {
         if (amount > source.balance) {
           amount = source.balance;
         }
         
         source.withdraw(amount);
         destination.deposit(amount);
         return amount;
       }
     };
   }
   ```

   ###### LS Solution

   ```javascript
   function makeAccount(number) {
     return {
       number,
       balance: 0,
       transactions: [],
       deposit(amount) {
         this.balance += amount;
         this.transactions.push({type: "deposit", amount: amount});
         return amount;
       },
   
       withdraw(amount) {
         if (amount > this.balance) {
           amount = this.balance;
         }
   
         this.balance -= amount;
         this.transactions.push({type: "withdraw", amount: amount});
         return amount;
       },
     };
   }
   
   function makeBank() {
     return {
       accounts: [],
       openAccount() {
         let number = this.accounts.length + 101;
         let account = makeAccount(number);
         this.accounts.push(account);
         return account;
       },
   
       transfer(source, destination, amount) {
         return destination.deposit(source.withdraw(amount));
       },
     };
   }
   ```

9. Change the code so that users can access the account balance, account number, and transactions list by calling methods, but not by directly accessing those properties.

   ```javascript
   > let bank = makeBank();
   > let account = bank.openAccount();
   > account.balance();
   = 0
   > account.deposit(17);
   = 17
   > let secondAccount = bank.openAccount();
   > secondAccount.number();
   = 102
   > account.transactions();
   = [Object]
   ```

   ###### My Solution

   ```javascript
   function makeAccount(number) {
     let balance = 0;
     let transactions = [];
   
     return {
       balance() {
         return balance;
       },
       transactions() {
         return transactions;
       },
       number() {
         return number;
       },
       deposit(amount) {
         balance += amount;
         transactions.push({ type: "deposit", amount: amount });
         return amount;
       },
       withdraw(amount) {
         if (amount <= balance) {
           balance -= amount;
           transactions.push({ type: "withdraw", amount: amount });
           return amount;
         } else {
           let withdrawnAmount = balance;
           balance = 0;
           transactions.push({ type: "withdraw", amount: withdrawnAmount });
           return withdrawnAmount;
         }
       },
     };
   }
   
   function makeBank() {
     return {
       accounts: [],
       openAccount() {
         let number = this.accounts.length + 101;
         let account = makeAccount(number);
         this.accounts.push(account);
         return account;
       },
       transfer(source, destination, amount) {
         if (amount > source.balance) {
           amount = source.balance;
         }
   
         source.withdraw(amount);
         destination.deposit(amount);
         return amount;
       }
     };
   }
   ```

   ###### LS Solution

   ```javascript
   function makeBank() {
     function makeAccount(number) {
       let balance = 0;
       let transactions = [];
   
       return {
         deposit(amount) {
           transactions.push({type: "deposit", amount: amount});
           balance += amount;
           return amount;
         },
   
         withdraw(amount) {
           if (amount > balance) {
             amount = balance;
           }
   
           transactions.push({type: "withdraw", amount: amount});
           balance -= amount;
           return amount;
         },
   
         balance() {
           return balance;
         },
   
         number() {
           return number;
         },
   
         transactions() {
           return transactions;
         },
       };
     }
   
     return {
       accounts: [],
       openAccount() {
         let number = this.accounts.length + 101;
         let account = makeAccount(number);
         this.accounts.push(account);
         return account;
       },
   
       transfer(source, destination, amount) {
         return destination.deposit(source.withdraw(amount));
       },
     };
   }
   ```

   Note how the solution leverages a closure to have the `number` method use the value passed to the `makeAccount` function.

10. Change the code so that users can no longer access the list of accounts.

    ```javascript
    > let bank = makeBank();
    > bank.accounts;
    = undefined
    ```

    ###### My Solution

    ```javascript
    function makeAccount(number) {
      let balance = 0;
      let transactions = [];
    
      return {
        balance() {
          return balance;
        },
        transactions() {
          return transactions;
        },
        number() {
          return number;
        },
        deposit(amount) {
          balance += amount;
          transactions.push({ type: "deposit", amount: amount });
          return amount;
        },
        withdraw(amount) {
          if (amount <= balance) {
            balance -= amount;
            transactions.push({ type: "withdraw", amount: amount });
            return amount;
          } else {
            let withdrawnAmount = balance;
            balance = 0;
            transactions.push({ type: "withdraw", amount: withdrawnAmount });
            return withdrawnAmount;
          }
        },
      };
    }
    
    function makeBank() {
      let accounts = [];
      return {
        openAccount() {
          let number = accounts.length + 101;
          let account = makeAccount(number);
          accounts.push(account);
          return account;
        },
        transfer(source, destination, amount) {
          if (amount > source.balance) {
            amount = source.balance;
          }
    
          source.withdraw(amount);
          destination.deposit(amount);
          return amount;
        }
      };
    }
    ```

    ###### LS Solution

    ```javascript
    function makeBank() {
      let accounts = [];
    
      function makeAccount(number) {
        let balance = 0;
        let transactions = [];
    
        return {
          deposit(amount) {
            transactions.push({type: "deposit", amount: amount});
            balance += amount;
            return amount;
          },
    
          withdraw(amount) {
            if (amount > balance) {
              amount = balance;
            }
    
            transactions.push({type: "withdraw", amount: amount});
            balance -= amount;
            return amount;
          },
    
          balance() {
            return balance;
          },
    
          number() {
            return number;
          },
    
          transactions() {
            return transactions;
          },
        };
      }
    
      return {
        openAccount() {
          let number = accounts.length + 101;
          let account = makeAccount(number);
          accounts.push(account);
          return account;
        },
    
        transfer(source, destination, amount) {
          return destination.deposit(source.withdraw(amount));
        },
      };
    }
    ```

---

### 8. Garbage Collection ([here](https://launchschool.com/lessons/0b371359/assignments/48d2a179))

In JavaScript, values are allocated memory when they are created, and they are eventually, "automatically" freed up when they are not in use. This process of "automatically" freeing memory up is called **garbage-collection**. As developers, we don't often have to worry about managing memory, though we sometimes need to concern ourselves with how much memory we use.  

Programming languages that don't have garbage collection, **GC** for short, make the developer write code to deallocate (unclaim or release) memory when the program no longer needs the data. This process is messy and error-prone, and often leads to serious bugs and "memory leaks."  

---

### 9. How Closures Affect Garbage Collection ([here](https://launchschool.com/lessons/0b371359/assignments/c19c9fbf))

When no references to the object or value remain in a program, it's eligible for garbage collection.  

When you create a closure, it stores a reference to all variables it can access. Each of those variables references an object or primitive value. Theoretically, as long as the closure exists, those variables remain in existence, which means that the objects or values they reference must also endure. For this reason, JavaScript can't garbage collect any objects or values referenced by the variables that the closure keeps in its context.  

```javascript
function makeHello(name) {
  return function() {
    console.log("Hello, " + name + "!");
  };
}

let helloSteve = makeHello("Steve");
```

After the above code runs, `helloSteve` references a function that closed over the local variable `name`, which right now contains the string `"Steve"`. Since the closure must keep `name` around, the reference to `"Steve"` must also stick around, which means that JavaScript can't garbage collect `"Steve"`. When we call `helloSteve` some time later, it still has access to `name` and can log its value.

```javascript
helloSteve();        // => Hello, Steve!
```

Before JavaScript can garbage collect `"Steve"`, you must ensure that nothing else in the program references `"Steve"`; that includes every closure that has access to the `"Steve"` string. That's not typically a concern, but if you find that you must remove a closure or other reference explicitly, you can assign `null` to the item that references it. For instance:  

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

This code returns an anonymous function that closes over *both* the `name` and `message` variables. Those variables, in turn, reference the strings `"Steve"` and `"Hello, Steve!"`, respectively. Theoretically, this will prevent garbage collection on both strings. However, notice that `name` isn't referenced within the `helloSteve` function. Now, depending on the browser, `"Steve"` might or might not be garbage collected. (Note: modern browsers will usually garbage collect `"Steve"` in this situation. In most cases, they can see that `"Steve"` is no longer used.)  

#### Problems

1. In the following code, when can JavaScript garbage collect the values assigned to the variables `a`, `b`, and `c`?

   ```javascript
   let a = 'abc';
   
   function add(b) {
     a += b;
   }
   
   function run() {
     let c = add('xyz');
   }
   
   run();
   ```

   ###### My Solution

   After the final line with the invocation of the `run()` function we can garbage collect the values assigned to `a`, `b`, and `c` since there are no more references to them after that line.

   ###### LS Solution

   ```javascript
   let a = 'abc';
   
   function add(b) {
     a += b;
     // We can GC the value `'abc'` initially assinged to `a`
     // after we replace the value assigned to it with the value
     // `abcxyz` (result of `'abc' + 'xyz'`)
   }
   // The value assigned to `b` is a copy of the value `'xyz'`
   // passed as an argument. Since it's a copy, we can GC it as
   // soon as the function finishes running.
   
   function run() {
     let c = add('xyz');
   }
   // The value of c is eligible for GC when this function
   // returns.
   
   run();
   // The value of `'abcxyz'` assigned to `a` is eligible
   // for GC when the program finishes running
   ```

2. In the following code, when can JavaScript garbage collect the value `"Steve"`?

   ```javascript
   function makeHello(name) {
     return function() {
       console.log("Hello, " + name + "!");
     };
   }
   
   let helloSteve = makeHello("Steve");
   ```

   ###### My Solution

   As long as `helloSteve` holds a reference to the `makeHello("Steve")` function with `"Steve"` as an argument, a closure is formed around the `name` variable, which references `"Steve"`, we cannot garbage collect the value `"Steve"`.  

   ###### LS Solution

   `"Steve"` is eligible for GC when the program finishes; specifically, after JavaScript garbage collects the function referenced by `helloSteve`.

---

### 10. Practice Problems: Garbage Collection ([here](https://launchschool.com/lessons/0b371359/assignments/d5156138))

1. Is JavaScript a garbage-collected language, and if so, what does this entail?

   ###### My Solution

   Yes. This means that JavaScript dynamically assigns space in memory to store values and then collects those values to erase them from memory when they are no longer needed (i.e. no longer referenced within the program).

   ###### LS Solution

   JavaScript is a garbage-collected language. This means that the JS runtime, rather than the developer, handles memory deallocation.

2. Consider the code below:

   ```javascript
   let myNum = 1;
   
   function foo() {
     let myStr = 'A string';
     // what is eligible for GC here?
   }
   
   foo();
   
   // What is eligible for GC here?
   
   // more code
   ```

   Are either of the values `1` or `'A string'` eligible for garbage collection on line 5? What about on line 10?  

   ###### My Solution

   Neither of the values are eligible for garbage collection on line 5 nor on line 10 since both are still being referenced by the separate variables `myNum` and `myString`. 

   ###### LS Solution

   Neither value is eligible for garbage collection on line 5. Since variables that contain numbers are stored on the stack, the value `1` is never eligible for GC.  

   `'A string'` is eligible for garbage collection on line 10. Since `myStr` is function scoped, the variable's reference to `'A string'` is broken after the function finishes running.  

3. In the code below, is the value of `outerFoo` eligible for garbage collection on line 10?

   ```javascript
   let outerFoo;
   
   function bar() {
     let innerFoo = 'abc';
     outerFoo = innerFoo;
   }
   
   bar();
   
   // can outerFoo's value be garbage collected here?
   
   // more code
   ```

   ###### My Solution

   No, `outerFoo` is declared in the global scope and even though it is assigned the value `'abc'` in the function scope, it now retains reference to `'abc'` and that value cannot be garbage collected. Although, I guess you could say that the original value of `undefined` assigned to `outerFoo` at declaration is garbage collected.

   ###### LS Solution

   No. Although `innerFoo`'s copy of `'abc'` is eligible for garbage collection when `bar` returns, `outerFoo`'s copy of the value persists, since it is a global variable.

4. Consider the code below:

   ```javascript
   function makeString() {
     let index = 'abc';
     return function() {
       return index += 'xyz';
     };
   }
   
   let str = makeString();
   
   // is 'abc' eligible for GC here?
   
   // more code
   ```

   ###### My Solution

   No, `abc` is not eligibile for GC.  This is because a closure is formed around the variable `index` and its associated value `abc`. Since `str` references the function returned by `makeString()` it has access to the closure and the value referenced by `index`.

   ###### LS Solution

   No, it is not. The closure created on the function returned by `makeString` on line 8 prevents `'abc'` from being garbage collected.  

5. Consider the script below:

   ```javascript
   let bash = "Some val";
   ```

   Will the value `"Some val"` ever be eligible for garbage collection?

   ###### My Solution

   As long as `bash`, or some other variable, retains a reference to `"Some val"`, it will not be eligible for garbage collection as it is in the global scope. If `bash` is reassigned, then `"Some val"` would be eligible so long as it is not being referenced by another variable in the global scope.  

   ###### LS Solution

   Yes. After the script finishes running the value will be eligible for garbage collection.

---

### 11. Partial Function Application ([here](https://launchschool.com/lessons/0b371359/assignments/f2c6f687))

Partial function application refers to the creation of a function that can call a second function with fewer arguments than the second function expects. The created function supplies the remaining arguments ([here](https://launchschool.com/lessons/7cd4abf4/assignments/0ea7c745)).   

Partial function application is most useful when you need to pass a function to another function that won't call the passed function with enough arguments. It lets you create a function that fills in the gaps by supplying the missing elements ([here](https://launchschool.com/lessons/7cd4abf4/assignments/0ea7c745)).  

Partial function application uses a function (we'll call it the _generator_) that creates a new function (the _applicator_) to call a third function (the _primary_). The generator receives some of the primary's arguments, while the applicator receives the rest when it gets invoked.  The applicator then calls the primary and passes it all of its arguments, both those passed to the generator and those passed to the applicator.  

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
applicatorFunction(37.2);   // Performs primaryFunction('Hello', 37.2);
// => Hello
// => 37.2
```

With our `add` primary, we can write a `makeAddN` generator function that saves the first number for `add` and returns an applicator function that we'll call later with the second number. The applicator retains access to the first number via closure, and receives the second as its sole argument:  

```javascript
function makeAddN(addend) {                 // generator
  // Saves addend via closure; uses addend when function invoked.
  return function(number) {                 // applicator
    return add(addend, number);             // call primary
  }
}

let add1 = makeAddN(1);
add1(1);                           // 2
add1(41);                          // 42

let add9 = makeAddN(9);
add9(1);                           // 10
add9(9);                           // 18
```

Note how the closure lets us "carry around" a reference to the variable `addend`, which is a local variable in `makeAddN`. Closure allows the applicator to use the value of `addend` later, long after the local `makeAddN` finishes running. In effect, closure lets us define private data that persists for the function's lifetime. This technique is useful when we need to package both data and functionality together. We can pass around functions like this and not lose the private data.  

![img](https://d3905n0khyu9wc.cloudfront.net/images/partial_function_makeAddN_v2.png)

###### Using Function.prototype.bind for Partial Function Application

In the lesson on [Function Context and Objects](https://launchschool.com/lessons/c9200ad2/assignments/bb359c53), we used `bind` to set an explicit execution context. However, we can also use it to make a function with pre-specified initial arguments. Here's an example using the `add` and `repeat` functions above:

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

Closures have a lot of similarities to objects. They both provide the means to organize code into data and a chunk of behavior that relies on that data. We'll discuss this relationship in later courses.  

#### Problems

1. Write a function named `greet` that takes two arguments and logs a greeting:

   ```javascript
   > greet('howdy', 'Joe');
   Howdy, Joe!
   > greet('good morning', 'Sue');
   Good morning, Sue!
   ```

   ###### My Solution

   ```javascript
   function greet(greeting, name) {
     greeting = greeting[0].toUpperCase() + greeting.slice(1);
     console.log(greeting + ', ' + name + '!');
   }
   ```

   ###### LS Solution

   ```javascript
   function greet(greeting, name) {
     let capitalized = greeting[0].toUpperCase() + greeting.slice(1);
     let message = capitalized + ', ' + name + '!';
     console.log(message);
   }
   ```

   

2. Use the `partial` function shown above and your solution to problem 1 to create `sayHello` and `sayHi` functions that work like this:

   ```javascript
   > sayHello('Brandon');
   Hello, Brandon!
   > sayHi('Sarah');
   Hi, Sarah!
   ```

   ###### My Solution

   ```javascript
   function greet(greeting, name) {
     greeting = greeting[0].toUpperCase() + greeting.slice(1);
     console.log(greeting + ', ' + name + '!');
   }
   
   function partial(primary, arg1) {
     return function(arg2) {
       return primary(arg1, arg2);
     };
   }
   
   let sayHello = partial(greet, 'hello');
   sayHello('Brandon');
   
   let sayHi = partial(greet, 'hi');
   sayHi('Sarah');
   ```

   ###### LS Solution

   ```javascript
   let sayHello = partial(greet, 'hello');
   let sayHi = partial(greet, 'hi');
   ```

---

### 12. Practice Problems: Partial Function Application ([here](https://launchschool.com/lessons/0b371359/assignments/4cb22406))

1. Using partial function application implement a function, `sub5`, that returns the value of a number subtracted by `5`.

   ```javascript
   function subtract(a, b) {
     return a - b;
   }
   
   function sub5(a) {
     // implement this function using partial function application
   }
   
   sub5(10); // 5
   sub5(20); // 15
   ```

   ###### My Solution

   ```javascript
   function subtract(a, b) {
     return a - b;
   }
   
   function sub5(a) {
     return subtract(a, 5);
   }
   ```

   ###### LS Solution

   ```javascript
   function sub5(a) {
     return subtract(a, 5);
   }
   ```

2. This code is a bit limited however, because we can only subtract by `5`. Implement the `makeSubN` function below so that we can supply any value we want to be subtracted from `a`, and get a new function that will always subtract this value.

   ```javascript
   function subtract(a, b) {
     return a - b;
   }
   
   function makeSubN(n) {
     // implement this function...
   }
   
   let sub5 = makeSubN(5);
   sub5(10); // 5
   ```

   ###### My Solution

   ```javascript
   function makeSubN(n) {
     return function(a) {
       return subtract(a, n);
     };
   }
   ```

   ###### LS Solution

   ```javascript
   function makeSubN(n) {
     return function(a) {
       return subtract(a, n);
     };
   }
   ```

3. Although the solution above is more flexible, we now want to be able to supply any operation, not just subtraction. Implement `makePartialFunc` below.

   ```javascript
   function makePartialFunc(func, b) {
     // implement this function...
   }
   
   function multiply(a, b) {
     return a * b;
   }
   
   let multiplyBy5 = makePartialFunc(multiply, 5);
   
   multiplyBy5(100); // 500
   ```

   ###### My Solution

   ```javascript
   function makePartialFunc(func, b) {
     return function(a) {
       return func(a, b);
     };
   }
   ```

   ###### LS Solution

   ```javascript
   function makePartialFunc(func, b) {
     return function(a) {
       return func(a, b);
     };
   }
   ```

4. In our previous solution, `multiplyBy5` retains access to `func` and `b` long after `makePartialFunc` has finished execution. What makes this possible?

   ###### My Solution

   Closure. The anonymous function returned by `makePartialFunction` forms a closure containing `func` and `b` that `multiplyBy5` retains access to.

   ###### LS Solution

   This behaviour is made possible by closures. When a new function is created, it retains access to any variables that are defined in the function's outer scope.  

5. Consider the code below:

   ```javascript
   let subjects = {
     English: ['Bob', 'Tyrone', 'Lizzy'],
     Math: ['Fatima', 'Gary', 'Susan'],
     Biology: ['Jack', 'Sarah', 'Tanya'],
   };
   
   function rollCall(subject, students) {
     console.log(subject + ':');
     students.forEach(function(student) {
       console.log(student);
     });
   }
   
   function makeMathRollCall() {
     // implement this function...
   }
   
   let mathRollCall = makeMathRollCall();
   mathRollCall(subjects['Math']);
   // => Math:
   // => Fatima
   // => Gary
   // => Susan
   ```

   Implement `makeMathRollCall` such that it returns a partially applied `rollCall` function, with the `subject` as `'Math'`.

   ###### My Solution

   ```javascript
   function makeMathRollCall() {
     return function(students) {
       return rollCall('Math', students);
     };
   }
   ```

   ###### LS Solution

   ```javascript
   function makeMathRollCall() {
     return function(students) {
       rollCall('Math', students);
     };
   }
   ```

   This is a somewhat contrived solution, since there aren't any circumstances, given this code, in which we wouldn't supply the set of students returned by `subjects['Math']`. Can you think of any situations where partial application would be more useful?

---

### 13. Immediately Invoked Function Expressions ([here](https://launchschool.com/lessons/0b371359/assignments/9c1daec2))

An **immediately invoked function expression (IIFE)** is a function that we define and invoke simultaneously. It looks like this:  

```javascript
(function() {
  console.log('hello');
})();											// => hello
```

---

### 14. Creating a Private Scope with an IIFE ([here](https://launchschool.com/lessons/0b371359/assignments/f27fd52c))

---

### 15. Creating Private Data with an IIFE ([here](https://launchschool.com/lessons/0b371359/assignments/470d67c3))

---

### 16. Practice Problems: IIFEs

1. Will the code below execute?

   ```javascript
   function() {
     console.log("Sometimes, syntax isn't intuitive!")
   }();
   ```

   ###### My Solution

   No, the code will not execute. It will throw an error. We are trying to use an immediately invoked function expression, but to do so we need to wrap the function expression in parentheses.

   ###### LS Solution

   ```
   Uncaught SyntaxError: Unexpected token (
   ```

   No, the code won't execute, it will instead produce a syntax error. Revisit [this assignment](https://launchschool.com/lessons/7cd4abf4/assignments/5cb67110) for a refresher on function declarations and function expressions and [this assignment](https://launchschool.com/lessons/0b371359/assignments/9c1daec2) for a refresher on IIFEs.

2. Edit the code from problem one so it executes without error.

   ###### My Solution

   ```javascript
   (function() {
     console.log("Sometimes, syntax isn't intuitive!")
   })();
   ```

   ###### LS Solution

   ```javascript
   (function() {
     console.log("Sometimes, syntax isn't intuitive!")
   })();
   ```

3. The code below throws an error:

   ```javascript
   var sum = 0;
   var numbers;
   
   sum += 10;
   sum += 31;
   
   numbers = [1, 7, -3, 3];
   
   function sum(arr) {
     return arr.reduce(function(sum, number) {
       sum += number;
       return sum;
     }, 0);
   }
   
   sum += sum(numbers); // ?
   ```

   What kind of problem does this error highlight? Use an IIFE to address it, so that code runs without error.  

   ###### My Solution

   The problem is that we have a function declaration which attempts to use a variable name, `sum`, that is already in use. Thus, we get an error saying that `sum` is not a function; `sum` is referencing a value that is of a number type rather than a function type. We can solve this problem using an IIFE as shown below:

   ```javascript
   var sum = 0;
   var numbers;
   
   sum += 10;
   sum += 31;
   
   numbers = [1, 7, -3, 3];
   
   sum += (function(arr) {
     return arr.reduce(function(sum, number) {
       sum += number;
       return sum;
     }, 0);
   })(numbers);
   ```

   ###### LS Solution

   The last line of code in the snippet demonstrates a variable naming conflict. We intend to invoke the `sum` function we declared on line 9, but `sum` actually references the variable defined on line 1 because of JavaScript hoisting. Since this variable references a primitive value, which can't be invoked as a function, our code throws a `TypeError`. We can solve this problem using an IIFE:

   ```javascript
   var sum = 0;
   var numbers;
   
   sum += 10;
   sum += 31;
   
   numbers = [1, 7, -3, 3];
   
   sum += (function(arr) {
     return arr.reduce(function(sum, number) {
       sum += number;
       return sum;
     }, 0);
   })(numbers);
   ```

4. Consider the output below:

   ```
   countdown(7);
   7
   6
   5
   4
   3
   2
   1
   0
   Done!
   ```

   Implement a function `countdown` that uses an IIFE to generate the desired output.  

   ###### My Solution

   ```javascript
   let countdown = (function() {
     return function(start) {
       for (let number = start; number >= 0; number -= 1) {
         console.log(number);
       }
       console.log('Done!');
     }
   })();
   
   countdown(7);
   ```

   ###### LS Solution

   ```javascript
   function countdown(count) {
     (function(n) {
       for (let i = n; i >= 0; i -= 1) {
         console.log(i);
       }
       
       console.log('Done!');
     })(count);
   }
   ```

5. Is the named function in this IIFE accessible in the global scope?

   ```javascript
   (function foo() {
     console.log('Bar');
   })();
   
   foo() // ?
   ```

   ###### My Solution

   My initial inkling is to say, "no". After running the code, I think I'm correct. Trying to run the last line, `foo()`, results in a `ReferenceError` that indicates that `foo is not defined`. Because we wrapped the function expression in parentheses we did not define a `foo` variable. We merely created an IIFE which executes as soon as we finish defining the function.

   ###### LS Solution

   No. Although the function is named, it isn't visible outside of the scope created by the IIFE.  

6. For an extra challenge, refactor the solution to problem 4 using recursion, bearing in mind that a named function created in an IIFE can be referenced inside of the IIFE.

   ###### My Solution

   ```javascript
   function countdown(count) {
     let n = count;
     
     (function counting() {
       console.log(n);
       n -= 1;
       
       if (n >= 0) {
         counting(n);
       } else {
         console.log('Done!');
       }
     })();
   }
   
   countdown(7);
   ```

   ###### LS Solution

   ```javascript
   function countdown(count) {
     (function recursiveSub(n) {
       console.log(n);
       
       if (n === 0) {
         console.log('Done!');
       } else {
         recursiveSub(n - 1);
       }
     })(count);
   }
   
   countdown(7);
   ```

---

### 17. Summary ([here](https://launchschool.com/lessons/0b371359/assignments/7cc229dd))

* Closures let a function access any variable that was in scope when the function was defined.
* Objects, arrays, strings, and bigint values that are no longer accessible from anywhere in the code are eligible for **garbage collection**, which frees up the memory that they use for reuse by other parts of the program.
* You can use closures to make variables "private" to a function, or set of functions, and inaccessible elsewhere.
* Closures allow functions to "carry around" values for later use.
* **Higher-order functions** are functions that take a function as an argument, return a function, or both.

---

