##### JS225 Object Oriented JavaScript

---

## Lesson 5: Object Creation Patterns

### 1. Introduction ([here](https://launchschool.com/lessons/24a4613a/assignments/71d1df25))

---

### 2. Factory Functions ([here](https://launchschool.com/lessons/24a4613a/assignments/d76ba762))

Using functions as object factories or, more succinctly, using factory functions (also called the "Factory Object Creation Pattern") provides us a way to create objects based on a pre-defined template:

```javascript
function createPerson(firstName, lastName) {
  let person = {};
  person.firstName = firstName;
  person.lastName = lastName || '';
  person.fullName = function() {
    return (this.firstName + ' ' + this.lastName).trim();
  };
  
  return person;
}

let john = createPerson('John', 'Doe');
let jane = createPerson('Jane');

john.fullName();
jane.fullName():
```

We could also just return an object literal to write the function as:

```javascript
function createPerson(firstName, lastName = '') {
  return {
    firstName,
    lastName,
    fullName() {
      return (this.firstName + ' ' + this.lastName).trim();
    },
  };
}
```

The factory function allows us to create same "type" of objects easily with a pre-defined "template," however, it also has some disadvantages:

- Every object created with the factory function has a full copy of all the methods, which can be redundant.
- There isn't a way for us to inspect an object and know whether we created it from a factory function. This makes it difficult to identify whether an object is of a specific "type."

---

### 3. Practice Problems: Create Objects with Factory Functions ([here](https://launchschool.com/lessons/24a4613a/assignments/4b9d7572))

1. What are the two disadvantages of working with factory functions?

   ###### My Solution

   1. Each object created with a factory function has a full copy of all of the methods, which is redundant.
   2. We can't know whether we created a specific object from a factory function, which makes it difficult to identify whether an object is of a specific "type".

   ###### LS Solution

   1. Each object created by the factory function owns the same methods, which can be redundant.
   2. There is no way to tell whether an object was created by any given function.

2. Rewrite the code below to use object-literal syntax to generate the returned object:

   ```javascript
   function makeObj() {
     let obj = {};
     obj.propA = 10;
     obj.propB = 20;
     return obj;
   }
   ```

   ###### My Solution

   ```javascript
   function makeObj() {
     return {
       propA: 10,
       propB: 20,
     };
   }
   ```

   ###### LS Solution

   ```javascript
   function makeObj() {
     return {
       propA: 10,
       propB: 20,
     };
   }
   ```

3. In the following problems, we'll be working through an invoice processing program. To get you started, we provide you with the following code that can process one invoice:

   ```javascript
   let invoice = {
     phone: 3000,
     internet: 6500,
   };
   let payment = {
     phone: 1300,
     internet: 5500,
   }
   let invoiceTotal = invoice.phone + invoice.internet;
   let paymentTotal = payment.phone + payment.internet;
   let remainingDue = invoiceTotal - paymentTotal;
   
   console.log(paymentTotal);
   console.log(remainingDue);
   ```

   To be able to process multiple invoices, we'll need to have a factory function that we can use to create invoices. The requirements for this factory function are the following:

   1. It returns an invoice object, with `phone` and `internet` properties, and a `total` method.
   2. The default value for the phone service is `3000`, and the internet service is `5500` (in cents, of course!).
   3. The function takes an object argument with attributes to override the default values.

   Your implemented function should be able to work with the code below:

   ```javascript
   function createInvoice(services) {
     // implement the factory function here
   }
   
   function invoiceTotal(invoices) {
     let total = 0;
     let i;
     
     for (i = 0; i < invoices.length; i += 1) {
       total += invoices[i].total();
     }
     
     return total;
   }
   
   let invoices = [];
   invoices.push(createInvoice());
   invoices.push(createInvoice({
     internet: 6500,
   }));
   
   invoices.push(createInvoice({
     phone: 2000,
   }));
   
   invoices.push(createInvoice({
     phone: 1000,
     internet: 4500,
   }));
   
   console.log(invoiceTotal(invoices));					// => 31000
   ```

   ###### My Solution

   ```javascript
   function createInvoice(services) {
     services = services || {};
     return {
     	phone: services.phone || 3000,
   		internet: services.internet || 5500,
       total() {
         return this.phone + this.internet;
       },
     };
   }
   ```

   ###### LS Solution

   ```javascript
   function createInvoice(services = {}) {
     let invoice = {
       phone: services.phone || 3000,
       internet: services.internet || 5500,
     };
     
     invoice.total = function() {
       return this.phone + this.internet;
     };
     
     return invoice;
   }
   ```

   Or we can return the object directly:

   ```javascript
   function createInvoice(services = {}) {
     return {
       phone: services.phone || 3000,
       internet: services.internet || 5500,
       total: function() {
         return this.phone + this.internet;
       },
     };
   }
   ```

4. Now let's build a factory function to create payments. The function can take an `object` argument in one of 3 forms:

   * Payment for one service, such as: `{internet: 1000}` or `{phone: 1000}`
   * Payment for both services, such as: `{internet: 2000, phone: 1000}`.
   * Payment with just an `amount` property, such as: `{amount: 2000}`.

   and should return an object that has paid services, and a `total` method that returns the payment total. If the `amount` property is not present, this should return the sum of phone and internet services; if the `amount` property is present, just return the value of that property.  

   Your code should work with the following:

   ```javascript
   function createPayment(services) {
     // implement the factory function here
   }
   
   function paymentTotal(payments) {
     let total = 0;
     let i;
     
     for (i = 0; i < payments.length; i += 1) {
       total += payments[i].total();
     }
     
     return total;
   }
   
   let payments = [];
   payments.push(createPayment());
   payments.push(createPayment({
     internet: 6500,
   }));
   
   payments.push(createPayment({
     phone: 2000,
   }));
   
   payments.push(createPayment({
     phone: 1000,
     internet: 4500,
   }));
   
   payments.push(createPayment({
     amount: 10000,
   }));
   
   console.log(paymentTotal(payments));			// => 24000
   ```

   ###### My Solution

   ```javascript
   function createPayment(services = {}) {
     let payment = {};
     
     payment.phone = services.phone || 0;
     payment.internet = services.internet || 0;
     
     if (services.amount) {
       payment.amount = services.amount || 0;
     }
     
     payment.total = function() {
       if (this.amount) {
         return this.amount;
       } else {
         return this.phone + this.internet;
       }
     };
     
     return payment;
   }
   ```

   ###### LS Solution

   ```javascript
   function createPayment(services) {
     services = services || {};
     let payment = {
       phone: services.phone || 0,
       internet: services.internet || 0,
       amount: services.amount,
     };
     
     payment.total = function() {
       return this.amount || (this.phone + this.internet);
     };
     
     return payment;
   }
   ```

   Or to return the object directly:

   ```javascript
   function createPayment(services) {
     services = services || {};
     return {
       phone: services.phone || 0,
       internet: services.internet || 0,
       amount: services.amount,
       total: function() {
         return this.amount || (this.phone + this.internet);
       },
     };
   }
   ```

5. Update your `createInvoice` function to make it possible to add payment(s) to invoices. Use the code below as a guideline:

   ```javascript
   let invoice = createInvoice({
     phone: 1200,
     internet: 4000,
   });
   
   let payment1 = createPayment({
     amount: 2000,
   });
   
   let payment2 = createPayment({
     phone: 1000,
     internet: 1200,
   });
   
   let payment3 = createPayment({
     phone: 1000,
   });
   
   invoice.addPayment(payment1);
   invoice.addPayments([payment2, payment3]);
   invoice.amountDue();				// this should return 0
   ```

   ###### My Solution

   ```javascript
   function createInvoice(services = {}) {
     return {
     	phone: services.phone || 3000,
   		internet: services.internet || 5500,
       payments: [],
       
       total() {
         return this.phone + this.internet;
       },
       
       addPayment(payment = {}) {
         let total = 0;
         let phone = payment.phone || 0;
         let internet = payment.internet || 0;
         let amount = payment.amount || 0;
         
         amount > 0 ? this.payments.push(amount) : this.payments.push(phone + internet);
       },
       
       addPayments(payments = []) {
         payments.forEach(payment => this.addPayment(payment));
       },
       
       amountDue() {
         return this.total() - this.payments.reduce((total, amt) => total + amt);
       },
     };
   }
   ```

   ###### LS Solution

   ```javascript
   function createInvoice(services) {
     services = services || {};
     let invoice = {
       phone: services.phone || 3000,
       internet: services.internet || 5500,
       payments: [],
     };
   
     invoice.total = function() {
       return invoice.phone + invoice.internet;
     };
   
     invoice.addPayment = function(payment) {
       invoice.payments.push(payment);
     };
   
     invoice.addPayments = function(payments) {
       let i;
   
       for(i = 0; i < payments.length; i += 1) {
         invoice.addPayment(payments[i]);
       }
     };
   
     invoice.paymentTotal = function() {
       let totalPaid = 0;
       let i;
   
       for (i = 0; i < invoice.payments.length; i += 1) {
         totalPaid += invoice.payments[i].total();
       }
   
       return totalPaid;
     };
   
     invoice.amountDue = function() {
       return this.total() - this.paymentTotal();
     };
   
     return invoice;
   }
   ```

   Alternatively, we can refactor the function to return an object directly:

   ```javascript
   function createInvoice(services) {
     services = services || {};
     return {
       phone: services.phone || 3000,
       internet: services.internet || 5500,
       payments: [],
   
       total: function() {
         return this.phone + this.internet;
       },
   
       addPayment: function(payment) {
         this.payments.push(payment);
       },
   
       addPayments: function(payments) {
         let i;
   
         for (i = 0; i < payments.length; i += 1) {
           this.addPayment(payments[i]);
         }
       },
   
       paymentTotal: function() {
         let totalPaid = 0;
         let i;
   
         for (i = 0; i < this.payments.length; i += 1) {
           totalPaid += this.payments[i].total();
         };
   
         return totalPaid;
       },
   
       amountDue: function() {
         return this.total() - this.paymentTotal();
       },
     };
   }
   ```

---

### 4. Constructor Pattern ([here](https://launchschool.com/lessons/24a4613a/assignments/c659f8e4))

Let's start by looking at the following code snippet to see how to use the constructor pattern to create objects:

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

In this example, the `Person` function is a constructor function that we use to create objects. The reason that we say it's a constructor function is that **it's intended to be called with the `new` operator**; otherwise, it's just a regular JavaScript function. The fact that we capitalized the function's name is not a syntactical requirement, but a convention to reveal the intention that we should only use the function to construct objects.  

If we call a function without the `new` operator:

```javascript
function Person(firstName, lastName = '') {
  this.firstName = firstName;
  this.lastName = lastName;
  this.fullName = function() {
    return (this.firstName + ' ' + this.lastName).trim();
  };
}

Person('John', 'Doe');
window.fullName();          // "John Doe"
```

In this case, the `this` in the function points to the global object, and we've defined properties and functions on the global object itself!  

When we call a function with the `new` operator, the following happens:

1. A new object is created.
2. `this` in the function is set to point to the new object.
3. The code in the function is executed.
4. `this` is returned if the constructor doesn't explicitly return an object.

#### Problems

1. What naming convention separates constructor functions from other functions?

   ###### My Solution

   The first letter of the constructor function's name is capitalized.

   ###### LS Solution

   Constructor functions are capitalized.

2. What will the code below output? Why?

   ```javascript
   function Lizard() {
     this.scamper = function() {
       console.log("I'm scampering!");
     };
   }
   
   let lizzy = Lizard();
   lizzy.scamper(); // ?
   ```

   ###### My Solution

   I think we get an error indicating that `lizzy.scamper()` is not a function. The reason is that in the line just above it, we declare the `lizzy` variable and initialize it with the return value from the `Lizard()` function call. But all that function call does is assign a `scamper` variable to a function. The `scamper` variable gets defined as a property of the global object in this case. But there is no explicit return value from calling the `Lizard()` function so `lizzy` is assigned to the value of `undefined`.  

   After actually running the code, the output is the following:

   ```
   Uncaught TypeError: Cannot read property 'scamper' of undefined
   ```

   But this error results from similar problems from what I described above, so I believe.  

   ###### LS Solution

   This code will throw a `TypeError` because `scamper` is an undefined property on `lizzy`. This is the case because `Lizard` was invoked without the `new` operator and since there is no explicit return value, the return value is `undefined`. As a result, the value assigned to `lizzy` is `undefined` and, consequently calling `lizzy.scamper` results in an error since it is attempting to call the `scamper` method on `undefined`.

3. Alter the code in problem 2 so that it produces the desired output.

   ###### My Solution

   ```javascript
   function Lizard() {
     this.scamper = function() {
       console.log("I'm scampering!");
     };
   }
   
   let lizzy = new Lizard();
   lizzy.scamper();
   ```

   ###### LS Solution

   ```javascript
   function Lizard() {
     this.scamper = function() {
       console.log("I'm scampering!");
     };
   }
   
   let lizzy = new Lizard();
   lizzy.scamper();
   ```

---

### 5. Objects and Prototypes ([here](https://launchschool.com/lessons/24a4613a/assignments/da0992e3))

Every JavaScript Object has a special hidden property called `[[Prototype]]`. Yes, the square brackets are indeed part of its name. We can retrieve and set this property's value with the `Object.getPrototypeOf` and `Object.setPrototypeOf` methods. When we use `Object.create` to create an object, it sets the `[[Prototype]]` property of the created object to the passed-in object:

```javascript
let foo = {};
let qux = Object.create(foo);
console.log(Object.getPrototypeOf(qux) === foo); // true
```

In this case, we say that the object assigned to `foo` is the **prototype object** of the object returned by `Object.create` and assigned to `qux`. We could also say that we created the object `qux` with object `foo` as its prototype.  

###### The `__proto__` Property

Many older JavaScript programs use a property named `__proto__`, which is pronounced **dunder proto** instead of `Object.setPrototypeOf` and `Object.getPrototypeOf`. "dunder" is a shortened version of "double underscore", which alludes to the double underscores at the beginning and end of the name. The `__proto__` property is a *deprecated*, non-hidden version of the `[[Prototype]]` property. As a rule, you should only use `__proto__` if you need to support very old browsers or old versions of Node, or as a convenient shortcut with temporary code or debugging operations. You may run into code that uses it, so you need to at least be aware of it.   

#### Problems

1. Use the method we learned above to assign `foo` below to a new Object with `prot` as its prototype.

   ```javascript
   let prot = {};
   
   let foo = // ?
   ```

   ###### My Solution

   ```javascript
   let foo = Object.create(prot);
   ```

   ###### LS Solution

   ```javascript
   let prot = {};
   
   let foo = Object.create(prot);
   ```

2. Use `getPrototypeOf` to demonstrate the prototypal relationship between `prot` and `foo`.

   ###### My Solution

   ```javascript
   Object.getPrototypeOf(foo) === prot;
   // true
   ```

   ###### LS Solution

   ```javascript
   Object.getPrototypeOf(foo) === prot; // true
   ```

3. Use `isPrototypeOf` to demonstrate the prototypal relationship between `prot` and `foo`.  

   ###### My Solution

   ```javascript
   prot.isPrototypeOf(foo); // true
   ```

   ###### LS Solution

   ```javascript
   prot.isPrototypeOf(foo); // true
   ```

4. What will the last two lines of the code below return? Why?

   ```javascript
   let prot = {};
   
   let foo = Object.create(prot);
   prot.isPrototypeOf(foo);
   Object.prototype.isPrototypeOf(foo);
   ```

   ###### My Solution

   ```
   true
   true
   ```

   ###### LS Solution

   Each line will return `true`. The first line returns `true` because we assign `foo` on line 3 a new object with `prot` set explicitly as its prototype. The second line returns `true` because of prototype chaining. The default prototype object, `Object.prototype`, is `prot`'s object prototype since it was created as an Object literal. Because of the relationship between `foo` and `prot`, `Object.prototype` is on `foo`'s prototype chain.

---

### 6. Prototypal Inheritance and Behavior Delegation ([here](https://launchschool.com/lessons/24a4613a/assignments/7143264c))

#### Prototype Chain Lookup for Property Access

When we try to access a property or a method on an object, JavaScript searches not only in the object itself, but all the objects on its prototype chain, until the end is reached. Let us look at a simple example:

```javascript
let foo = {
  a: 1,
  b: 2,
};

let bar = Object.create(foo);
let baz = Object.create(bar);

bar.a;
baz.a;
baz.c;
```

#### Prototypal Inheritance and Behavior Delegation

JavaScript's prototype chain lookup for properties gives us the ability to store an object's data and behaviors not just in the object itself, but anywhere on its prototype chain. This is very powerful when we want to share data or behaviors:  

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
fido.say();             // => Fido says Woof!
fido.run();             // => Fido runs away.

let spot = Object.create(dog);
spot.name = 'Spot';
spot.say();             // => Spot says Woof!
spot.run();             // => Spot runs away.
```

We may have thousands (or more!) of dogs in our program, but instead of defining the `say` and `run` methods on every object, we defined those methods on `dog`, the prototype object of all dogs. This gives us several advantages:  

- We can create dogs much more easily with the `dog` prototype, and don't have to duplicate `say` and `run` on every single dog object.
- If we need to add/remove/update behavior to apply to all dogs, we can just modify the prototype object, and all dogs will pick up the changed behavior automatically.

Some people call this pattern JavaScript's **Prototypal Inheritance**. The word "inheritance" comes from the classical object oriented programming languages (Java, C++, Ruby, Python, etc.) where classes are used to create objects with a carefully designed hierarchy for the purpose of behavior sharing. JavaScript doesn't have true classes, but in a true object oriented (as opposed to "class oriented") way, objects can be created directly from other objects and behaviors (methods) can be shared via the prototype chain.  

From a top down / design time point of view, the objects on the bottom of the prototype chain "inherited" the properties and behaviors of all the upstream objects on the prototype chain; from a bottom up / run time point of view, objects on the bottom of the prototype chain can "delegate" requests to the upstream objects to be handled. Hence this design pattern is also called **Behavior Delegation**.  

#### Overriding Default Behavior

Objects created from prototypes can override shared behaviors by defining the same methods locally:  

```javascript
let dog = {
  say() {
    console.log(this.name + ' says Woof!');
  },
};

let fido = Object.create(dog);
fido.name = 'Fido';
fido.say = function() {
  console.log(this.name + ' says Woof Woof!');
};

fido.say();             // => Fido says Woof Woof!
let spot = Object.create(dog);
spot.name = 'Spot';
spot.say();             // => Spot says Woof!
```

The `say` method is overridden locally on the `fido` object, but it doesn't impact any other objects created from the prototype.  

#### Object.getOwnPropertyNames and object.hasOwnProperty

With behavior delegation, using `obj.prop !== undefined` is no longer a reliable way to test if a property is defined on an object — that expression returns true as long as `prop` is defined anywhere on the object's prototype chain. JavaScript gives you the following two methods to check an object's own property:  

- The `hasOwnProperty` method on an object tests if a property is defined on the object itself.
- The `Object.getOwnPropertyNames` method returns an array of an object's own property names.

```javascript
let foo = {
  a: 1,
};

let bar = Object.create(foo);
bar.a = 1;
bar.b = 2;
bar.hasOwnProperty('a');            // true
Object.getOwnPropertyNames(bar);    // ["a", "b"]

delete bar.a;
bar.hasOwnProperty('a');            // false
Object.getOwnPropertyNames(bar);    // ["b"]

bar.hasOwnProperty('c');            // false
```

#### Methods on Object.prototype

The `Object.prototype` object is on the top of all JavaScript objects' prototype chain, therefore the methods defined there can be called from any JavaScript object. Here are 3 useful ones:  

- `Object.prototype.toString()`: returns a string representation of the object
- `Object.prototype.isPrototypeOf(obj)`: tests if the object is in another object's prototype chain
- `Object.prototype.hasOwnProperty(prop)`: tests whether the property is defined on the object itself

#### Problems

1. What will the code below log to the console?

   ```javascript
   let foo = {};
   let bar = Object.create(foo);
   
   foo.a = 1;
   
   console.log(bar.a);
   ```

   ###### My Solution

   ```
   1
   ```

   ###### LS Solution

   ```
   1
   ```

2. What will the code below log to the console?

   ```javascript
   let foo = {};
   let bar = Object.create(foo);
   
   foo.a = 1;
   bar.a = 2;
   console.log(bar.a);
   ```

   ###### My Solution

   ```
   2
   ```

   ###### LS Solution

   ```
   2
   ```

3. Given the code below, do we know for certain that on the last line we are ultimately referencing a property owned by boo? How can we test that `far` is not delegating to `boo`?

   ```javascript
   let boo = {};
   boo.myProp = 1;
   
   let far = Object.create(boo);
   
   // lots of code
   
   far.myProp;				// 1
   ```

   ###### My Solution

   I'm a bit confused by the question. My assumption is that, yes, we are ultimately referencing a property owned by `boo`. However, that would mean that `far` _is_ delegating to `boo`, no??? The question seems to imply that if we are referencing a property owned by `boo` then that would mean that `far` is not delegating to `boo`, or do I have that wrong?  

   ###### LS Solution

   No, we don't know for certain, because there could be a property `myProp` created on `far` in the omitted code between the declaration and assignment of `far` and the property reference on the last line.  

   Given the code, we can use `hasOwnProperty` to test whether myProp is a property owned by `far` or it is just delegating to `boo`. 

   ```javascript
   far.hasOwnProperty('myProp');
   ```

---

### 7. Practice Problems: Prototypes and Prototypal Inheritance ([here](https://launchschool.com/lessons/24a4613a/assignments/b158be5a))

1. Write a function that returns the object on a given object's prototype chain where a property is defined. See the example code below:

   ```javascript
   function getDefiningObject(object, propKey) {
     // ...
   }
   
   let foo = {
     a: 1,
     b: 2,
   };
   
   let bar = Object.create(foo);
   let baz = Object.create(bar);
   let qux = Object.create(baz);
   
   bar.c = 3;
   
   console.log(getDefiningObject(qux, 'c') === bar);			// => true
   console.log(getDefiningObject(qux, 'e'));							// => null
   ```

   ###### My Solution

   ```javascript
   function getDefiningObject(object, propKey) {
     if (object[propKey]) {
       if (object.hasOwnProperty(propKey)) {
         return object;
       } else {
         let parent = Object.getPrototypeOf(object);
         return getDefiningObject(parent, propKey);
       }
     }
   
     return null;
   }
   ```

   ###### LS Hint

   You'll need to traverse up the prototype chain of the object and for each object, see if the property is defined, with the `hasOwnProperty` method. Note that `Object.prototype` is at the top of the prototype chain. If you can't find the property there and use `Object.getPrototypeOf` to get its prototype, you'll get `null` and that's what you should return.

   ###### LS Solution

   ```javascript
   function getDefiningObject(object, propKey) {
     while (object && !object.hasOwnProperty(propKey)) {
       object = Object.getPrototypeOf(object);
     }
     
     return object;
   }
   ```

2. Write a function to provide a shallow copy of an object. The object that you copy should share the same prototype chain as the original object, and it should have the same own properties that return the same values or objects when accessed. Use the code below to verify your implementation:

   ```javascript
   function shallowCopy(object) {
     // ...
   }
   
   let foo = {
     a: 1,
     b: 2,
   };
   
   let bar = Object.create(foo);
   bar.c = 3;
   bar.say = function() {
     console.log('c is ' + this.c);
   };
   
   let baz = shallowCopy(bar);
   console.log(baz.a);				// => 1
   baz.say();								// c is 3
   baz.hasOwnProperty('a');  // false
   baz.hasOwnProperty('b');	// false
   ```

   ###### My Solution

   ```javascript
   function shallowCopy(object) {
     let objectPrototype = Object.getPrototypeOf(object);
     let copy = Object.create(objectPrototype);
   
     Object.keys(object).forEach(key => { copy[key] = object[key] });
   
     return copy;
   }
   ```

   ###### LS Solution

   This would be a straightforward implementation:

   ```javascript
   function shallowCopy(object) {
     let result = Object.create(Object.getPrototypeOf(object));
     let prop;
     
     for (prop in object) {
       if (object.hasOwnProperty(prop)) {
         result[prop] = object[prop];
       }
     }
     
     return result;
   }
   ```

   However, this implementation doesn't consider the fact that the object could have a property with the name of `hasOwnProperty`, in which case we'll get an error: 

   ```javascript
   let a = {
     hasOwnProperty: 1,
   };
   
   shallowCopy(a);		// Uncaught TypeError: object.hasOwnProperty is not a function
   ```

   A more robust solution is the following:

   ```javascript
   function shallowCopy(object) {
     let result = Object.create(Object.getPrototypeOf(object));
     let prop;
     
     for (prop in object) {
       if (Object.prototype.hasOwnProperty.call(object, prop)) {
         result[prop] = object[prop];
       }
     }
     
     return result;
   }
   ```

   Note: the reason this is called "shallow copy" is because we don't recursively copy the objects referenced by the original object, which would be a "deep copy" or "deep clone".

   ###### LS Alternative Solution

   This solution avoids the need to check if the object `hasOwnProperty` when iterating over each of its properties. The difference with using `Object.getOwnPropertyNames` is that it returns properties of the object that are not enumerable. Properties that are not enumerable don't show up when used in conjunction with `for...in`. This difference isn't critical at this stage. However, should you wish to know more about it here is a link to an [MDN article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties) that goes into more detail.

   ```javascript
   function shallowCopy(object) {
     let copy = Object.create(Object.getPrototypeOf(object));
     
     Object.getOwnPropertyNames(object).forEach(function(prop) {
       copy[prop] = object[prop];
     });
     
     return copy;
   }
   ```

3. Write a function that extends an object (destination object) with contents from multiple objects (source objects).

   ```javascript
   function extend(destination) {
     // ...
   }
   
   let foo = {
     a: 0,
     b: {
       x: 1,
       y: 2,
     },
   };
   
   let joe = {
     name: 'Joe'
   };
   
   let funcs = {
     sayHello() {
       console.log('Hello, ' + this.name);
     },
   
     sayGoodBye() {
       console.log('Goodbye, ' + this.name);
     },
   };
   
   let object = extend({}, foo, joe, funcs);
   
   console.log(object.b.x);          // => 1
   object.sayHello();                // => Hello, Joe
   ```

   ###### My Solution

   ```javascript
   function extend(destination) {
     for (let index = 0; index < arguments.length; index += 1) {
       Object.keys(arguments[index]).forEach(key => {
         destination[key] = arguments[index][key];
       });
     }
   
     return destination;
   }
   
   let foo = {
     a: 0,
     b: {
       x: 1,
       y: 2,
     },
   };
   
   let joe = {
     name: 'Joe'
   }
   
   let funcs = {
     sayHello() {
       console.log('Hello, ' + this.name);
     },
   
     sayGoodBye() {
       console.log('Goodbye, ' + this.name);
     },
   };
   
   let object = extend({}, foo, joe, funcs);
   
   console.log(object);
   
   console.log(object.b.x);
   object.sayHello();
   ```

   ###### LS Solution

   ```javascript
   function extend(destination) {
     for (let i = 1; i < arguments.length; i++) {
       let source = arguments[i];
       for (let prop in source) {
         if (Object.prototype.hasOwnProperty.call(source, prop)) {
           destination[prop] = source[prop];
         }
       }
     }
     
     return destination;
   }
   ```

   The `extend` function is JavaScript's way for the "Mixin" pattern. For example in this case, our `funcs` object is a bag of methods that can be mixed into objects with the `extend` method. Many popular JavaScript libraries and frameworks provide functionality like our `extend` function here. ECMAScript 6 (ES6) provides `Object.assign` method that does the same too.

   - [Object.assign in ES6](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign): See the polyfill implementation on the bottom
   - [_.extend in Underscore](http://underscorejs.org/#extend)

   Also, we can implement the `shallowCopy` function with `extend`, if we don't care about preserving the prototype chain:

   ```javascript
   function shallowCopy(object) {
     return extend({}, object);
   }
   ```

   ###### LS Alternative Solution

   Similar to that of the alternative solution to question 2, we can also use `Object.getOwnPropertyNames` for the solution to this question (3).  

   ```javascript
   function extend(destination) {
     for (let i = 1; i < arguments.length; i++) {
       let source = arguments[i];
       Object.getOwnPropertyNames(source).forEach(function(prop) {
         destination[prop] = source[prop];
       });
     }
     
     return destination;
   }
   ```

---

### 8. Function Prototypes and Object Prototypes ([here](https://launchschool.com/lessons/24a4613a/assignments/441a520a))

Yes, you read the title of the assignment right. It's unfortunate, but JavaScript uses the term "prototype" to represent two related concepts. The first use of the term is for a property of functions and the second use is to describe the next object in the lookup for property access. In this assignment and the next, we'll cover the two terms and how we use them to create a prototype chain for behavior delegation using constructor functions.   

In JavaScript, every **function** has a special `prototype` property. It is assigned, by default, an object that instances created by the constructor function can delegate to. Note that this `prototype` property is only useful when we use the function as a constructor, in which case all objects that it constructs will have this object set as their prototype. This is a mouthful, but it's easier to show this in code:  

```javascript
let Foo = function() {};
let obj = Foo.prototype;

let bar = new Foo();
let baz = new Foo();

Object.getPrototypeOf(bar) === obj;  // true
Object.getPrototypeOf(baz) === obj;  // true

bar.constructor === Foo;             // true; bar is created from Foo
baz.constructor === Foo;             // true; baz is created from Foo
bar instanceof Foo;                  // true; bar is an instance of Foo
baz instanceof Foo;                  // true; baz is an instance of Foo
```

We can also represent the above code as a diagram. Visually, it is apparent that both objects (`bar` and `baz`) that we construct from `Foo` delegate to — or have their prototype object set to — the object assigned to the `prototype` property of `Foo`.  

![Delegation in action](https://d3905n0khyu9wc.cloudfront.net/images/constructor_prototypes_1.png)

To understand better how instances created by a constructor function point to the object assigned to its `prototype` property, let's deconstruct what happens when we call a constructor function:

```javascript
// The comments are added for illustration purposes only
function Foo(a, b) {
  this.a = a;
  this.b = b;
}

// when Foo is called with new, as a constructor
function Foo(a, b) {
  // this = new Object();                      // a new object, or just {}
  // Object.setPrototype(this, Foo.prototype); // have the object inherit from Foo.prototype

  this.a = a;
  this.b = b;

  // return this;                     // return the created object
}

// another way to write it, with Object.create()
function Foo(a, b) {
  // this = Object.create(Foo.prototype);

  this.a = a;
  this.b = b;

  // return this;                     // return the created object
}
```

The key takeaway here is that every time we call a function as a constructor, JavaScript creates objects that are prototype linked to the object that is assigned to the `prototype` property (this happens via lines 10 and 20 above). With this understanding, we can use a constructor function and its `prototype` property to set up behavior delegation:  

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
fido.say();             // => Fido says Woof!
fido.run();             // => Fido runs away.

let spot = new Dog();
spot.name = 'Spot';
spot.say();             // => Spot says Woof!
spot.run();             // => Spot runs away.
```

This approach of defining shared behaviors on the constructor's `prototype` property is called the "Prototype Pattern" of object creation.  

---

### 9. Constructors, Prototypes, and the Prototype Chain ([here](https://launchschool.com/lessons/24a4613a/assignments/5de6e5a0))

In an earlier assignment, we learned how to use constructor functions as factories that create objects. One question we didn't answer, however, was why we need to have constructor functions along with their somewhat strange use of `this` and `new`. We can accomplish practically the same thing with object factories. We'll answer that question in this assignment.  

Let's take a closer look at what happens when we create some objects with a constructor:  

```javascript
function Dog(name, breed, weight) {
  this.name = name;
  this.breed = breed;
  this.weight = weight;

  this.bark = function() {
    console.log(this.weight > 20 ? 'Woof!' : 'Yip!');
  };
}

let maxi = new Dog('Maxi', 'German Shepherd', 32);
let dexter = new Dog('Dexter', 'Rottweiler', 50);
let biggie = new Dog('Biggie', 'Whippet', 9);

maxi.bark(); // 'Woof!'
```

Each of these `Dog` objects, when created, receive the `name`, `breed`, and `weight` properties as well as the `bark` method. The properties have values that differ between objects, but the `bark` method remains the same in all. However, every time we create a new `Dog` object, we must create a new `bark` method so we can add it to the object. We can verify that each object has its own `bark` method with `hasOwnProperty`:

```javascript
maxi.hasOwnProperty('bark');   // true
dexter.hasOwnProperty('bark'); // true
biggie.hasOwnProperty('bark'); // true
maxi.bark === dexter.bark;     // false
maxi.bark === biggie.bark;     // false
dexter.bark === biggie.bark;   // false
```

If that seems inefficient and wasteful to you, you're right! We're not repeating any code, but the runtime must create a new copy of the method every time we create an object. For small programs with few objects like this one, that may not be a problem. However, when you start getting into hundreds or thousands or even millions of objects, the multiple function objects can be hard on resources, especially on devices with little memory. Wouldn't it be nice if we could create the `bark` method just once rather than using a different copy of that method in every `Dog` object?  

###### Method Delegation to Prototypes  

Earlier, we learned that we could use prototypes to share code between objects of the same type. Prototypes are especially useful for sharing methods as all objects of a particular type share the same prototype object. Furthermore, delegation means that we can share methods by putting them in the prototype object; if an object doesn't contain a requested method, JavaScript searches the prototype chain to find the method.  

Thus, we can define a method once in the prototype object, and let the inheriting objects delegate the method calls to the prototype. We can use prototypes in conjunction with constructors to achieve the same result:

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
  // this.bark method removed.
}
```

In this code, we've changed our `Dog` constructor and created a `DogPrototype` object. The first thing we do inside the constructor is set `DogPrototype` as the prototype of the newly created `Dog` object. We then assign the arguments to the properties.  

Note that we can continue to use our constructor without change:  

```javascript
let maxi = new Dog('Maxi', 'German Shepherd', 32);
let dexter = new Dog('Dexter', 'Rottweiler', 50);
let biggie = new Dog('Biggie', 'Whippet', 9);

maxi.bark(); // 'Woof!'
```

This time, however, the `bark` method isn't defined on the individual objects, but is, instead, defined on the `[[Prototype]]` property:  

```javascript
maxi.hasOwnProperty('bark'); // false
dexter.hasOwnProperty('bark'); // false
biggie.hasOwnProperty('bark'); // false
Object.getPrototypeOf(maxi).bark === DogPrototype.bark; // true
Object.getPrototypeOf(dexter).bark === DogPrototype.bark; // true
Object.getPrototypeOf(biggie).bark === DogPrototype.bark; // true
```

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

Take some time to understand why this code works. It can be confusing when you first encounter it. It's a little like working with recursive functions as we did in the [Introduction to Programming With JavaScript book](https://launchschool.com/books/javascript/read/loops_iterating#recursion), which is to say, it's a bit hard to wrap your head around this code. To help, here's the complete code as it now stands:

```javascript
function Dog(name, breed, weight) {
  Object.setPrototypeOf(this, Dog.myPrototype);
  this.name = name;
  this.breed = breed;
  this.weight = weight;
}

Dog.myPrototype = {
  bark() {
    console.log(this.weight > 20 ? 'Woof!' : 'Yip!');
  }
};

let maxi = new Dog('Maxi', 'German Shepherd', 32);
let dexter = new Dog('Dexter', 'Rottweiler', 50);
let biggie = new Dog('Biggie', 'Whippet', 9);
maxi.bark(); // 'Woof!'

maxi.hasOwnProperty('bark'); // false
dexter.hasOwnProperty('bark'); // false
biggie.hasOwnProperty('bark'); // false
Object.getPrototypeOf(maxi).bark === Dog.myPrototype.bark; // true
Object.getPrototypeOf(dexter).bark === Dog.myPrototype.bark; // true
Object.getPrototypeOf(biggie).bark === Dog.myPrototype.bark; // true
```

###### The Consructor `prototype` Property

So far, so good. We have a constructor function and a prototype object that work together. Between them, they create `Dog` objects for us that don't waste memory with multiple copies of methods. However, we still haven't explained why we should bother with constructors. We can pair a prototype with a factory function and get the same effect.  

What makes constructors special is a characteristic of all function objects in JavaScript: they all have a `prototype` property that we call the **function prototype** to distinguish them from the prototypes used when creating ordinary objects. The code we showed in the previous section emulates something that JavaScript bundles with constructors. Let's take a look at that property:

```javascript
Dog.prototype; // => Dog {}
```

When you call a function `Foo` with the `new` keyword, JavaScript sets the new object's prototype to the current value of `Foo`'s `prototype` property. That is, the constructor creates an object that inherits from the constructor function's prototype. Since inheritance in JavaScript uses prototypes, we can also say that the constructor creates an object with a prototype that is the same as the constructor function's prototype.  

The terminology of constructor prototypes and object prototypes is extremely confusing. Note in particular that we use the term "prototype" to refer to 2 distinct but related concepts:

- If `bar` is an object, then the object from which `bar` inherits is the **object prototype**. By default, constructor functions set the object prototype for the objects they create to the constructor's prototype object.
- The **constructor's prototype object**, also called the **function prototype**, is an object that the constructor uses as the object prototype for the objects it creates. In other words, each object that the constructor creates inherits from the constructor's prototype object. JavaScript stores the constructor's prototype object in the constructor's `prototype` property; that is, if the constructor's name is `Foo`, then `Foo.prototype` references the constructor's prototype object.

It's easy to get confused about the differences between these two kinds of prototypes. Be sure you understand the differences before moving on. In most cases, when we talk about a **prototype** without being more explicit, we mean an **object prototype**. We'll talk about the constructor's prototype, the function prototype, or the `prototype` property when talking about a constructor's prototype object.

Note that constructors don't inherit from the constructor's prototype object. Instead, the objects that the constructor creates inherit from it.

At this point, you may find it helpful to rewatch the first 12 minutes of the [JavaScript OOP video](https://www.youtube.com/watch?v=-N9tBvlO9Bo&feature=youtu.be) that you watched earlier. The discussion of the differences between the object prototype (what the speaker calls *dunder proto* or `__proto__`) and the constructor's prototype object should help clarify these differences.  

As we've said before, every JavaScript function has a `prototype` property. However, JavaScript only uses it when you call that function as a constructor, that is, by using the `new` keyword. With this information, we can abandon our home-grown constructor-prototype pairing and use the one that JavaScript provides instead:

```javascript
function Dog(name, breed, weight) {
  // deleted Object.setPrototypeOf(this, Dog.myPrototype);
  this.name = name;
  this.breed = breed;
  this.weight = weight;
}

Dog.prototype.bark = function() {
  console.log(this.weight > 20 ? 'Woof!' : 'Yip!');
};

let maxi = new Dog('Maxi', 'German Shepherd', 32);
maxi.bark(); // 'Woof!'

let biggie = new Dog('Biggie', 'Whippet', 9);
biggie.bark(); // 'Yip!'
```

Here's a diagram illustrating the `prototype` and `constructor` links we've discussed.  

![Diagram](https://dbdwvr6p7sskw.cloudfront.net/images/js120/constructor-prototype-map.png)

Note that our constructor doesn't have to explicitly set the prototype of `this` to `Dog.prototype`. JavaScript does that for us when we call the function with `new`. We glossed over this detail earlier, so let's restate those steps with updated information. We'll assume that the constructor function is named `Foo`:

1. It creates an entirely new object.
2. It sets `Foo.prototype` as the prototype for the new object. That is, the new object inherits from the object referenced by `Foo.prototype`.
3. It sets the execution context (`this`) for the function to point to the new object.
4. It invokes the function.
5. It returns the new object unless the function returns another **object**.

Since the `bark` method refers to `this` and `bark` belongs to the prototype object, you may think that `this` in `this.weight` refers to the prototype object rather than the object itself (e.g., `maxi` or `biggie`). However, that's not how `this` binding works. You already know those rules, so take a moment to think about what it means inside the `bark` method.  

When you call a method on an object, JavaScript binds `this` to the object whose method you used to call it. If it doesn't find the method in that object, but it does find it in the prototype, that doesn't change the value of `this`. `this` always refers to the original object -- that is, the object used to call the method --even if the method is in the prototype. If we find the `bark` method in the prototype, `this` references the original `Dog` object, not the prototype.  

A property of interest on a prototype object is the `constructor` property. For instance:

```javascript
Dog.prototype.constructor; // [Function: Dog]
```

As with the `instanceof` operator, the `constructor` property lets us determine the type of an object:

```javascript
let maxi = new Dog('Maxi', 'German Shepherd', 32);

if (maxi.constructor === Dog) {
  console.log("It's a dog");
} else {
  console.log("It's not a dog");
}
```

Be careful, however. It's possible to reassign the `constructor` property to something else. We'll learn about reassigning the `constructor` property in the next assignment. In that case, the test shown above would fail, even though the object is still a dog.  

```javascript
Dog.prototype.constructor = function() {};

maxi.constructor === Dog; // false
maxi instanceof Dog;      // true
```

Note that `instanceof` still works.  

###### Overriding the Prototype

Inheriting methods from a prototype doesn't mean that the inheriting object is stuck with those methods. JavaScript objects are incredibly dynamic and flexible. Two objects created with the same constructor may end up looking completely different from each other because of changes and additions made after constructing the object. For instance, suppose we have a `dexter` dog that has an unusually loud and deep bark. We want to change the `bark` method to log `WOOF!` instead of `Woof!`. We can do that easily by defining a custom `bark` method on `dexter`.  

```javascript
let maxi = new Dog('Maxi', 'German Shepherd', 32);
let dexter = new Dog('Dexter', 'Rottweiler', 50);

dexter.bark = function() {
  console.log('WOOF!')
}

maxi.bark();   // Woof!
dexter.bark(); // WOOF!
```

The `dexter` object now has its own `bark` method that **overrides** the `bark` method from `Dog.prototype`. Each time we call `bark` on `dexter`, JavaScript looks for it first in the `dexter` object itself. Since it finds it there, it doesn't need to check the prototype.  

