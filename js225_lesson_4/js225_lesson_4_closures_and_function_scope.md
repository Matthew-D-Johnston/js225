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



