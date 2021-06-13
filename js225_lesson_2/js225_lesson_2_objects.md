##### JS225 Object Oriented JavaScript

---

## Lesson 2: Objects

### 2. Prerequisites ([here](https://launchschool.com/lessons/4671d66f/assignments/41ceaaeb))

* destructuring
* spread syntax
* rest syntax

---

### 3. Objects and Methods ([here](https://launchschool.com/lessons/4671d66f/assignments/42efa5b4))

Functions vs. Methods: You can think of methods as Functions with a receiver, which is the object the method is called on. If a call doesn't have an explicit receiver, it is a function. 

###### Function and Method Invocation

```javascript
let greeter = {
  morning: function() {
    console.log('Good morning!');
  },
};

function evening() {
  console.log('Good evening!');
}

// Method invocation
greeter.morning();   // greeter is the receiver/calling object; morning() is a method

// Function invocation
evening();           // there is no explicit receiver; evening() is a function
```

###### `this` during Method Invocation

The value of `this` is a reference to the object itself. Here's an example that shows this in action:

```javascript
let counter = {
  count: 0,
  advance: function() {
    this.count += 1;
  },
};

counter;                // { count: 0, advance: [Function] }

counter.advance();
counter;                // { count: 1, advance: [Function] }

counter.advance();
counter.advance();

counter;                // { count: 3, advance: [Function] }
```

Within `advance`, `this` references the `counter` object. The function can use `this` to access and change the object's properties. Here, `advance` uses `this` to increment the `count` property in `counter`.

---

### 4. Walkthrough: Object Methods ([here](https://launchschool.com/lessons/4671d66f/assignments/cd3f4b07))

---

### 5. Practice Problems: Objects ([here](https://launchschool.com/lessons/4671d66f/assignments/90e3243c))

In this assignment, we will create a JavaScript object to help us keep track of our invoices.

1. Start by creating a new object, `invoices`. The object requires a property named `unpaid`; `unpaid` should be an array that is initially empty.

   ```javascript
   let invoices = {
     unpaid: [],
   };
   ```

2. Write a method named `add` for the `invoices` object. This method should take two arguments: a string for the client name and a number for the amount they owe. The method should create a new object with these two arguments as properties, then push it onto the `unpaid` array. The object should look like `{ name: "Starbucks", amount: 300 }`. Be sure to use the `this` keyword to reference the `unpaid` array in your method.

   ```javascript
   let invoices = {
     unpaid: [],
     add: function(client, owing) {
       this.unpaid.push({ name: client, amount: owing });
     },
   };
   ```

   ###### LS Solution

   ```javascript
   invoices.add = function(name, amount) {
     this.unpaid.push({
       name: name,
       amount: amount,
     });
   };
   ```

   ###### Or

   ```javascript
   invoices.add = function(name, amount) {
     this.unpaid.push({
       name,
       amount
     });
   };
   ```

3. Now that we have a way to store our unpaid invoices, we should have a way to compute the total amount of all unpaid invoices. Create a method on the invoices object named `totalDue` that iterates over the `unpaid` array and computes the total `amount` for its contents. Return the total at the end of the method.

   ###### My Solution

   ```javascript
   invoices.totalDue = function() {
     return this.unpaid.reduce((total, invoice) => total + invoice.amount, 0);
   }
   ```

   ###### LS Solution

   ```javascript
   invoices.totalDue = function() {
     let total = 0;
     let i;
     
     for (i = 0; i < this.unpaid.length; i += 1) {
       total += this.unpaid[i].amount;
     }
     
     return total;
   };
   ```

4. Let's test what we have so far. Create three new unpaid invoices using this data:

| Name                  | Amount |
| --------------------- | ------ |
| Due North Development | 250    |
| Moonbeam Interactive  | 187.50 |
| Slough Digital        | 300    |

Once you've added the invoices, call the `totalDue` method to compute and log the total unpaid invoice amount. Your result should be 737.5

###### My Solution

```javascript
invoices.add('Due North Development', 250);
invoices.add('Moonbeam Interactive', 187.50);
invoices.add('Slough Digital', 300);

console.log(invoices.totalDue());
// => 737.5
```

###### LS Solution

```javascript
invoices.add('Due North Development', 250);
invoices.add('Moonbeam Interactive', 187.50);
invoices.add('Slough Digital', 300);
console.log(invoices.totalDue());
```

5. Now that we have some invoices, we need to add a way to mark invoices as paid. Add a `paid` property to the `invoices` object and initialize it as an empty Array; we will use this property to store the paid invoices.

   Now, create a method named `payInvoice` that takes a client name as an argument. Your method should loop over the unpaid invoices and check the name of each invoice. If the name matches, push the invoice object to the `paid` property. If the name does not match, push the invoice object to a new array defined as a local variable in your method. When the loop ends, replace the existing `unpaid` property with the newly created array of remaining unpaid invoices.

   ###### My Solution

   ```javascript
   invoices.paid = [];
   
   invoices.payInvoice = function(name) {
     let remainingUnpaid = [];
   
     for (let invoice = 0; invoice < this.unpaid.length; invoice += 1) {
       if (this.unpaid[invoice].name === name) {
         this.paid.push(this.unpaid[invoice]);
       } else {
         remainingUnpaid.push(this.unpaid[invoice]);
       }
     }
   
     this.unpaid = remainingUnpaid;
   };
   ```

   ###### LS Solution

   ```javascript
   invoices.paid = [];
   invoices.payInvoice = function(name) {
     let unpaid = [];
     let i;
     
     for (i = 0; i < this.unpaid.length; i += 1) {
       if (name === this.unpaid[i].name) {
         this.paid.push(this.unpaid[i]);
       } else {
         unpaid.push(this.unpaid[i]);
       }
     }
     
     this.unpaid = unpaid;
   }
   ```

6. Create a method that is functionally identical to the `totalDue` method, but that computes and returns the total of the paid invoices. Name this new method `totalPaid`.

   ###### My Solution

   ```javascript
   invoices.totalPaid = function() {
     return this.paid.reduce((total, invoice) => total + invoice.amount, 0);
   }
   ```

   ###### LS Solution

   ```javascript
   invoices.totalPaid = function() {
     let total = 0;
     let i;
     
     for (i = 0; i < this.paid.length; i += 1) {
       total += this.paid[i].amount;
     }
     
     return total;
   }
   ```

7. Call the `payInvoice` method twice, once with "Due North Development" as the argument, and once with "Slough Digital" as the argument. Then call `totalPaid` and `totalDue`, and log the results of both methods; they should be 550 and 187.50, respectively.

   ```javascript
   invoices.payInvoice('Due North Development');
   invoices.payInvoice('Slough Digital');
   
   console.log(invoices.totalPaid());			// => 550
   console.log(invoices.totalDue());				// => 187.5
   ```

   ###### LS Solution

   ```javascript
   invoices.payInvoice('Due North Development');
   invoices.payInvoice('Slough Digital');
   console.log(invoices.totalPaid());
   console.log(invoices.totalDue());
   ```

---

### 6. Mutating Objects ([here](https://launchschool.com/lessons/4671d66f/assignments/35a7fec7))

The immutability of primitive values:

![img](https://d3905n0khyu9wc.cloudfront.net/images/mutating_objects1_v2.png)

The mutability of compound or reference values:

![img](https://d3905n0khyu9wc.cloudfront.net/images/mutating_objects2_v2.png)

---

### 7. Practice Problems: Mutating Objects ([here](https://launchschool.com/lessons/4671d66f/assignments/9695cfa4))

