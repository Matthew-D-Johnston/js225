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

1. What will the code below output to the console?

   ```javascript
   let message = 'Hello from the global scope!';
   
   function func(message) {
     message = 'Hello from the function scope!';
     console.log(message);
   }
   
   func(message);
   console.log(message);
   ```

   ###### My Solution

   ```javascript
   // => Hello from the function scope!
   // => Hello from the global scope!
   ```

   ###### LS Solution

   ```
   Hello from the function scope!
   Hello from the global scope!
   ```

2. What will the code below log to the console? What does this output demonstrate in relation to the output of problem one?

   ```javascript
   let myObj = { message: 'Greetings from the global scope!' };
   
   function func(obj) {
     obj.message = 'Greetings from the function scope!';
     console.log(obj.message);
   }
   
   func(myObj);
   
   console.log(myObj.message);
   ```

   ###### My Solution

   ```
   Greetings from the function scope!
   Greetings from the function scope!
   ```

   ###### LS Solution

   ```
   Greetings from the function scope!
   Greetings from the function scope!
   ```

3. What will the code below log to the console?

   ```javascript
   let message = 'Hello from the global scope!';
   
   function func() {
     message = 'Hello from the function scope!';
     console.log(message);
   }
   
   func();
   console.log(message);
   ```

   ###### My Solution

   ```
   Hello from the function scope!
   Hello from the function scope!
   ```

   ###### LS Solution

   ```
   Hello from the function scope!
   Hello from the function scope!
   ```

4. What will the code below log to the console?

   ```javascript
   let a = 10;
   let obj = {
     a
   }
   
   let newObj = obj;
   newObj.a += 10;
   
   console.log(obj.a === a);
   console.log(newObj.a === obj.a);
   ```

   ###### My Solution

   ```
   false
   true
   ```

   ###### LS Solution

   ```
   false
   true
   ```

   

5. Consider the code below:

   ```javascript
   let animal = {
     name: 'Pumbaa',
     species: 'Phacochoerus africanus',
   };
   
   let menagerie = {
     warthog: animal,
   };
   
   animal = {
     name: 'Timon',
     species: 'Suricata suricatta',
   };
   
   menagerie.meerkat = animal;
   
   menagerie.warthog === animal; // false
   menagerie.meerkat === animal; // true
   ```

   If objects are mutable, why does the second to last line return false?

   ###### My Solution

   It returns false because the key `warthog` is pointing to the following object:

   ```javascript
   {
     name: 'Pumbaa',
     species: 'Phacochoerus africanus',
   };
   ```

   The variable `animal` was originally assigned to this object. However, after assigning this object to the `warthog` key in the `menagerie` object, we reassign the variable `animal` to a new object:

   ```javascript
   {
     name: 'Timon',
     species: 'Suricata suricatta',
   };
   ```

   Thus, in the second to last line, the equality comparison between `menagerie.warthog` and `animal` results in `false` being returned because we are comparing two different objects.

   ###### LS Solution

   Line 10 creates a new object and assigns it to `animal`, reassigning the variable rather than mutating the original value. This new object isn't the same as the object initialized on line 1, and as a result, line 17 evaluates to `false`, and line 18 evaluates to `true`.

---

### 8. Functions as Object Factories ([here](https://launchschool.com/lessons/4671d66f/assignments/6463ca43))

```javascript
> let sedan = makeCar(8);
> sedan.accelerate();
> sedan.speed;
= 8

> let coupe = makeCar(12);
> coupe.accelerate();
> coupe.speed;
= 12
```

#### Problems

1. Write a `makeCar` function that works as shown above.

   ###### My Solution

   ```javascript
   function makeCar(rate) {
     return {
       speed: 0,
       rate,
       accelerate() {
         this.speed += this.rate;
       },
     };
   }
   ```

   ###### LS Solution

   ```javascript
   function makeCar(rate) {
     return {
       speed: 0,
       rate,
       accelerate() {
         this.speed += this.rate;
       },
     };
   }
   ```

2. Use your new definition of `makeCar` to create a hatchback car whose rate of acceleration is 9 mph/s.

   ###### My Solution

   ```javascript
   let hatchback = makeCar(9);
   ```

   ###### LS Solution:

   ```javascript
   let hatchback = makeCar(9);
   ```

3. Our application now needs to handle braking to slow down. Extend the code from problem 1 to handle specifying a braking rate for each car. Also, add a method that tells the car to apply the brakes for one second. It should work like this:

   ```javascript
   > let sedan = makeCar(8, 6);
   > sedan.accelerate();
   > sedan.speed;
   = 8
   > sedan.brake();
   > sedan.speed;
   = 2
   > sedan.brake();
   > sedan.speed;
   = 0
   ```

   Notice how the car's speed doesn't go lower than `0`.

   ###### My Solution

   ```javascript
   function makeCar(rate, brakeRate) {
     return {
       speed: 0,
       rate,
       brakeRate,
       accelerate() {
         this.speed += this.rate;
       },
       brake() {
         if (this.speed < this.brakeRate) {
           this.speed = 0;
         } else {
           this.speed -= this.brakeRate;
         }
       },
     };
   }
   ```

   ###### LS Solution

   ```javascript
   function makeCar(accelRate, brakeRate) {
     return {
       speed: 0,
       accelRate,
       brakeRate,
       accelerate() {
         this.speed += this.accelRate;
       },
       brake() {
         this.speed -= this.brakeRate;
         if (this.speed < 0) {
           this.speed = 0;
         }
       },
     };
   }
   ```

---

### 9. Practice Problems: Functions as Object Factories ([here](https://launchschool.com/lessons/4671d66f/assignments/e45ab60c))

In these problems, we will be developing a factory function for objects representing countries.

1. Consider the code below:

   ```javascript
   let chile = {
     name: 'The Republic of Chile',
     continent: 'South America',
     getDescription() {
       return this.name + ' is located in ' + this.continent + '.';
     },
   };
   
   let canada = {
     name: 'Canada',
     continent: 'North America',
     getDescription() {
       return this.name + ' is located in ' + this.continent + '.';
     },
   };
   
   let southAfrica = {
     name: 'The Republic of South Africa',
     continent: 'Africa',
     getDescription() {
       return this.name + ' is located in ' + this.continent + '.';
     },
   };
   ```

   Think about what is necessary and unnecessary in this code. Where is there duplication?

   ###### My Solution

   They all have a `name` and `continent` property as well as a `getDescription()` method. Both the `name` and `continent` keys are associated with unique values for each separate country. The `getDescription()`method, on the other hand, is the same for each country. 

   ###### LS Solution

   The method `getDescription` is repeated in the same form in each object. However, each object needs to hold unique values for its `name` and `continent` properties.

2. Given our observations about the code above, implement a factory function for our country objects following the template laid out below:

   ```javascript
   let chile = makeCountry('The Republic of Chile', 'South America');
   let canada = makeCountry('Canada', 'North America');
   let southAfrica = makeCountry('The Republic of South Africa', 'Africa');
   
   chile.getDescription();       // "The Republic of Chile is located in South America."
   canada.getDescription();      // "Canada is located in North America."
   southAfrica.getDescription(); // "The Republic of South Africa is located in Africa."
   ```

   ###### My Solution

   ```javascript
   function makeCountry(name, continent) {
     return {
       name,
       continent,
       getDescription() {
         console.log(this.name + ' is located in ' + this.continent + '.');
       },
     };
   }
   ```

   ###### LS Solution

   ```javascript
   function makeCountry(name, continent) {
     return {
       name,
       continent,
       getDescription() {
         return this.name + ' is located in ' + this.continent + '.';
       },
     };
   }
   ```

3. We've decided that we want to track which countries we've visited, and which we haven't. Alter the factory function so that the object it returns includes a property `visited` with a value of `false`.

   ###### My Solution

   ```javascript
   function makeCountry(name, continent) {
     return {
       name,
       continent,
       visited: false,
       getDescription() {
         return this.name + ' is located in ' + this.continent + '.';
       },
     };
   }
   ```

   ###### LS Solution

   ```javascript
   function makeCountry(name, continent) {
     return {
       name,
       continent,
       visited: false,
       getDescription() {
         return this.name + ' is located in ' + this.continent + '.';
       },
     };
   }
   ```

4. This situation seems a bit problematic, though. Suppose we want to add a country that we've already visited. Alter the factory function to use an optional `visited` parameter with a default value of `false`.

   ###### My Solution

   ```javascript
   function makeCountry(name, continent, visited = false) {
     return {
       name,
       continent,
       visited,
       getDescription() {
         return this.name + ' is located in ' + this.continent + '.';
       },
     };
   }
   ```

   ###### LS Solution

   ```javascript
   function makeCountry(name, continent, visited) {
     if (visited === undefined) {
       visited = false;
     }
   
     return {
       name,
       continent,
       visited,
       getDescription() {
         return this.name + ' is located in ' + this.continent + '.';
       },
     };
   }
   ```

   ###### Or...

   Note that ES2015 (ES6) features the ability to assign default values explicitly in the parameters list. You can read more about this functionality [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters), and see such an implementation below:

   ```javascript
   function makeCountry(name, continent, visited = false) {
     return {
       name,
       continent,
       visited,
       getDescription() {
         return this.name + ' is located in ' + this.continent + '.';
       },
     };
   }
   ```

5. Let's add a method to our country objects that lets us visit them. Implement a method `visitCountry` that sets the `visited` property to `true`.

   ###### My Solution

   ```javascript
   function makeCountry(name, continent, visited = false) {
     return {
       name,
       continent,
       visited,
       getDescription() {
         return this.name + ' is located in ' + this.continent + '.';
       },
       visitCountry() {
         this.visited = true;
       },
     };
   }
   ```

   ###### LS Solution

   ```javascript
   function makeCountry(name, continent, visited = false) {
     return {
       name,
       continent,
       visited,
       visitCountry() {
         this.visited = true;
       },
       getDescription() {
         return this.name + ' is located in ' + this.continent + '.';
       },
     };
   }
   ```

6. Finally, let's update our `getDescription` function to reflect the `visited` data. Assuming that `canada.visited` is `false`, your code should look like this:

   ###### My Solution

   ```javascript
   function makeCountry(name, continent, visited = false) {
     return {
       name,
       continent,
       visited,
       getDescription() {
         let visitMessage;
         if (this.visited) {
           visitMessage = 'I have visited ' + this.name;
         } else {
           visitMessage = "I haven't visited " + this.name;
         }
         return this.name + ' is located in ' + this.continent + '. ' + visitMessage + '.';
       },
       visitCountry() {
         this.visited = true;
       },
     };
   }
   ```

   ###### LS Solution

   ```javascript
   function makeCountry(name, continent, visited = false) {
     return {
       name,
       continent,
       visited,
       visitCountry() {
         this.visited = true;
       },
       getDescription() {
         return this.name + ' is located in ' + this.continent + '. I ' +
         (this.visited ? 'have' : "haven't") +
         ' visited ' + this.name + '.';
       },
     };
   }
   ```

---

### 10. Object Orientation

Object-oriented programming:

```javascript
function makeVehicle(fuel, mpg) {
  return {
    fuel,
    mpg,
    range() {
      return this.fuel * this.mpg;
    },
  };
}

let smallCar = makeVehicle(7.9, 37);
smallCar.range();   // 292.3

let largeCar = makeVehicle(9.4, 29);
largeCar.range();   // 272.6

let truck = makeVehicle(14.4, 23);
truck.range();      // 331.2
```

The non-object-oriented-programming approach:

```javascript
let smallCarFuel = 7.9;
let smallCarMpg = 37;

let largeCarFuel = 9.4;
let largeCarMpg = 29;

let truckFuel = 14.4;
let truckMpg = 23;

function vehicleRange(fuel, mpg) {
  return fuel * mpg;
}

vehicleRange(smallCarFuel, smallCarMpg); // 292.3
vehicleRange(largeCarFuel, largeCarMpg); // 272.6
vehicleRange(truckFuel, truckMpg);       // 331.2
```

The object oriented code makes these questions easier to answer:

1. What are the important concepts in the program?
2. What are the properties of a vehicle?
3. How do we create vehicles?
4. What operations can I perform on a vehicle?
5. Where should we add new properties and methods?

Objects:

- organize related data and code together.
- are useful when a program needs more than one instance of something.
- become more useful as the codebase size increases.

---

### 11. Practice Problems: Object Orientation ([here](https://launchschool.com/lessons/4671d66f/assignments/1b026797))

In these problems, we will be building an object-oriented inventory management system.

1. Suppose we want to use code to keep track of products in our hardware store's inventory. A first stab might look something like this:

   ```javascript
   let scissorsId = 0;
   let scissorsName = 'Scissors';
   let scissorsStock = 8;
   let scissorsPrice = 10;
   
   let drillId = 1;
   let drillName = 'Cordless Drill';
   let drillStock = 15;
   let drillPrice = 45;
   ```

   This code presents a number of problems, however. What if we want to add another kind of drill? Given what we've learned about object orientation in the previous assignment, how could we use objects to organize these two groups of data?

   ###### My Solution

   ```javascript
   let scissors = {
     id: 0,
     name: 'Scissors',
     stock: 8,
     price: 10,
   }
   
   let drill = {
     id: 1,
     name: 'Cordless Drill',
     stock: 15,
     price: 45,
   }
   ```

   ###### LS Solution

   ```javascript
   let scissors = {
     id: 0,
     name: 'Scissors',
     stock: 8,
     price: 10,
   }
   
   let drill = {
     id: 1,
     name: 'Cordless Drill',
     stock: 15,
     price: 45,
   }
   ```

2. Our new organization also makes it easier to write functions dealing with the products, because we can now take advantage of conventions in the objects' data. Create a function that takes one of our product objects as an argument, and sets the object's price to a non-negative number of our choosing, passed in as a second argument. If the new price is negative, alert the user that the new price is invalid.

   ###### My Solution

   ```javascript
   function setPrice(product, price) {
     if (price >= 0) {
       product.price = price;
     } else {
       return 'WARNING: The new price is invalid!'
     }
   }
   ```

   ###### LS Solution

   ```javascript
   function setProductPrice(product, newPrice) {
     if (newPrice >= 0) {
       product.price = newPrice;
     } else {
       alert('Invalid price!');
     }
   }
   ```

3. It would also be useful to have the ability to output descriptions of our product objects. Implement such a function following the example below:

   ###### My Solution

   ```javascript
   function describeProduct(product) {
     console.log('=> Name: ' + product.name);
     console.log('=> ID: ' + product.id);
     console.log('=> Price: ' + product.price);
     console.log('=> Stock: ' + product.stock);
   }
   ```

   ###### LS Solution

   ```javascript
   function describeProduct(product) {
     console.log('Name: ' + product.name);
     console.log('ID: ' + product.id);
     console.log('Price: $' + product.price);
     console.log('Stock: ' + product.stock);
   }
   ```

4. We want our code to take an object-oriented approach to keeping track of the products, and although the functions we just wrote work fine, since they are manipulating data in the objects, we should place them in the objects themselves. Rewrite the code such that the functions `describeProduct` and `setProductPrice` become methods `describe` and `setPrice` on both our `scissors` and `drill` objects.

   ###### My Solution

   ```javascript
   let scissors = {
     id: 0,
     name: 'Scissors',
     stock: 8,
     price: 10,
     setPrice(newPrice) {
       if (newPrice >= 0) {
         this.price = newPrice;
       } else {
         return 'WARNING: The new price is invalid!'
       }
     },
     describe() {
       console.log('Name: ' + this.name);
       console.log('ID: ' + this.id);
       console.log('Price: $' + this.price);
       console.log('Stock: ' + this.stock);
     },
   }
   
   let drill = {
     id: 1,
     name: 'Cordless Drill',
     stock: 15,
     price: 45,
     setPrice(newPrice) {
       if (newPrice >= 0) {
         this.price = newPrice;
       } else {
         return 'WARNING: The new price is invalid!'
       }
     },
     describe() {
       console.log('Name: ' + this.name);
       console.log('ID: ' + this.id);
       console.log('Price: $' + this.price);
       console.log('Stock: ' + this.stock);
     },
   }
   ```

   ###### LS Solution

   ```javascript
   let scissors = {
     id: 0,
     name: 'Scissors',
     stock: 8,
     price: 10,
     setPrice(newPrice) {
       if (newPrice >= 0) {
         this.price = newPrice;
       } else {
         alert('Invalid price!');
       }
     },
   
     describe() {
       console.log('Name: ' + this.name);
       console.log('ID: ' + this.id);
       console.log('Price: $' + this.price);
       console.log('Stock: ' + this.stock);
     },
   };
   
   let drill = {
     id: 1,
     name: 'Cordless Drill',
     stock: 15,
     price: 45,
     setPrice(newPrice) {
       if (newPrice >= 0) {
         this.price = newPrice;
       } else {
         alert('Invalid price!');
       }
     },
   
     describe() {
       console.log('Name: ' + this.name);
       console.log('ID: ' + this.id);
       console.log('Price: $' + this.price);
       console.log('Stock: ' + this.stock);
     },
   };
   ```

5. This solution has brought us closer to our object-oriented ideal, but has also introduced some inefficiency, insofar as our `setPrice` and `describe` methods are duplicated in each object, and we will have to type out this code for each new object we want to create. One solution to this problem is to stop manually creating each object, and instead use a factory function to generate them. Create a new function `createProduct` which takes arguments for `id`, `name`, `stock`, and `price` and also adds `setPrice` and `describe` to the new object.

   ###### My Solution

   ```javascript
   function createProduct(id, name, stock, price) {
     return {
       id,
       name,
       stock,
       price,
       setPrice(newPrice) {
         if (newPrice >= 0) {
           this.price = newPrice;
         } else {
           return 'WARNING: The new price is invalid!'
         }
       },
       describe() {
         console.log('Name: ' + this.name);
         console.log('ID: ' + this.id);
         console.log('Price: $' + this.price);
         console.log('Stock: ' + this.stock);
       },
     };
   }
   ```

   ###### LS Solution

   ```javascript
   function createProduct(id, name, stock, price) {
     let newProduct = {};
     newProduct.id = id;
     newProduct.name = name;
     newProduct.stock = stock;
     newProduct.price = price;
     newProduct.setPrice = function(newPrice) {
       if (newPrice >= 0) {
         this.price = newPrice;
       } else {
         alert('Invalid price!');
       }
     };
   
     newProduct.describe = function() {
       console.log('Name: ' + this.name);
       console.log('ID: ' + this.id);
       console.log('Price: $' + this.price);
       console.log('Stock: ' + this.stock);
     };
   
     return newProduct;
   }
   ```

6. Finally, remove the `scissors` and `drill` object-literal object creations from the code, and recreate these objects using our `createProduct` factory function, along with two or three more products of your choosing.

   ###### My Solution

   ```javascript
   let scissors = createProduct(0, 'Scissors', 10, 8);
   let drill = createProduct(1, 'Cordless Drill', 45, 15);
   ```

   ###### LS Solution

   ```javascript
   function createProduct(id, name, stock, price) {
     let newProduct = {};
     newProduct.id = id;
     newProduct.name = name;
     newProduct.stock = stock;
     newProduct.price = price;
     newProduct.setPrice = function(newPrice) {
       if (newPrice >= 0) {
         this.price = newPrice;
       } else {
         alert('Invalid price!');
       }
     };
   
     newProduct.describe = function() {
       console.log('Name: ' + this.name);
       console.log('ID: ' + this.id);
       console.log('Price: $' + this.price);
       console.log('Stock: ' + this.stock);
     };
   
     return newProduct;
   }
   
   let scissors = createProduct(0, 'Scissors', 10, 8);
   let drill = createProduct(1, 'Cordless Drill', 15, 45);
   let saw = createProduct(2, 'Circular Saw', 12, 95);
   let hammer = createProduct(3, 'Sledge Hammer', 78, 45);
   let boxCutter = createProduct(4, 'Box Cutter', 41, 15);
   ```

---

### 12. Summary ([here](https://launchschool.com/lessons/4671d66f/assignments/f6635c42))

- **Object-oriented programming** is a pattern that uses objects to organize code instead of Functions. Objects can also contain data or state.
- You can call the property of an object a `method` when the value you assign to it is a function.
- When you invoke an object's methods, they can access the object to which they belong by using `this`.
- Objects become more useful as projects become larger and more complicated.



