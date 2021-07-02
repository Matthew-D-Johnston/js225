##### JS225 - Object Oriented JavaScript > Object Creation Patterns

---

## Classical Object Creation

Implement the following diagram using the pseudo-classical approach. Subclasses should inherit all of the superclass's methods. Reuse the constructors of the superclass when implementing a subclass.  

###### Hint

Revisit this article on [inheritance on MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance) for an idea on how to reuse the constructor of the superclass when implementing a subclass and inherit not just the methods.  

![img](https://dbdwvr6p7sskw.cloudfront.net/js-exercises/object_creation_patterns/Classical.png)

For the methods, you can have it log out anything you want.  

Here's a sample run you can use as a reference:

```javascript
const person = new Person('foo', 'bar', 21, 'gender');
console.log(person instanceof Person);     // logs true
person.eat();                              // logs 'Eating'
person.communicate();                      // logs 'Communicating'
person.sleep();                            // logs 'Sleeping'
console.log(person.fullName());            // logs 'foo bar'

const doctor = new Doctor('foo', 'bar', 21, 'gender', 'Pediatrics');
console.log(doctor instanceof Person);     // logs true
console.log(doctor instanceof Doctor);     // logs true
doctor.eat();                              // logs 'Eating'
doctor.communicate();                      // logs 'Communicating'
doctor.sleep();                            // logs 'Sleeping'
console.log(doctor.fullName());            // logs 'foo bar'
doctor.diagnose();                         // logs 'Diagnosing'

const graduateStudent = new GraduateStudent('foo', 'bar', 21, 'gender', 'BS Industrial Engineering', 'MS Industrial Engineering');
// logs true for next three statements
console.log(graduateStudent instanceof Person);
console.log(graduateStudent instanceof Student);
console.log(graduateStudent instanceof GraduateStudent);
graduateStudent.eat();                     // logs 'Eating'
graduateStudent.communicate();             // logs 'Communicating'
graduateStudent.sleep();                   // logs 'Sleeping'
console.log(graduateStudent.fullName());   // logs 'foo bar'
graduateStudent.study();                   // logs 'Studying'
graduateStudent.research();                // logs 'Researching'
```

---

###### My Solution

```javascript
// Define the Person Constructor

function Person(firstName, lastName, age, gender) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  this.gender = gender;
}

Person.prototype.fullName = function() { return this.firstName + ' ' + this.lastName; };
Person.prototype.communicate = () => { console.log('Communicating'); };
Person.prototype.eat = () => { console.log('Eating'); };
Person.prototype.sleep = () => { console.log('Sleeping'); };

// Define the Doctor Constructor (inherits from Person)

function Doctor(firstName, lastName, age, gender, specialization) {  
  Person.call(this, firstName, lastName, age, gender);

  this.specialization = specialization;
}

Doctor.prototype = Object.create(Person.prototype);
Doctor.prototype.constructor = Doctor;

Doctor.prototype.diagnose = () => { console.log('Diagnosing') };

// Define the Professor Constructor (inherits from Person)

function Professor(firstName, lastName, age, gender, subject) {
  Person.call(this, firstName, lastName, age, gender);

  this.subject = subject;
}

Professor.prototype = Object.create(Person.prototype);
Professor.prototype.constructor = Professor;

Professor.prototype.teach = () => { console.log('Teaching') };

// Define the Student Constructor (inherits from Person)

function Student(firstName, lastName, age, gender, degree) {
  Person.call(this, firstName, lastName, age, gender);

  this.degree = degree;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.study = () => { console.log('Studying') };

// Define the GraduateStudent Constructor (inherits from Student)

function GraduateStudent(firstName, lastName, age, gender, degree, graduateDegree) {
  Student.call(this, firstName, lastName, age, gender, degree);

  this.graduateDegree = graduateDegree;
}

GraduateStudent.prototype = Object.create(Student.prototype);
GraduateStudent.prototype.constructor = GraduateStudent;

GraduateStudent.prototype.research = () => { console.log('Researching') };
```

###### LS Solution

```javascript
function Person(firstName, lastName, age, gender) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  this.gender = gender;
}

Person.prototype.fullName = function() {
  return `${this.firstName} ${this.lastName}`;
};

Person.prototype.communicate = () => {
  console.log('Communicating');
};

Person.prototype.eat = () => {
  console.log('Eating');
};

Person.prototype.sleep = () => {
  console.log('Sleeping');
};

function Doctor(firstName, lastName, age, gender, specialization) {
  Person.call(this, firstName, lastName, age, gender);
  this.specialization = specialization;
}

Doctor.prototype = Object.create(Person.prototype);
Doctor.prototype.diagnose = () => {
  console.log('Diagnosing');
};
Doctor.prototype.constructor = Doctor;

function Professor(firstName, lastName, age, gender, subject) {
  Person.call(this, firstName, lastName, age, gender);
  this.subject = subject;
}

Professor.prototype = Object.create(Person.prototype);
Professor.prototype.teach = () => {
  console.log('Teaching');
};
Professor.prototype.constructor = Professor;

function Student(firstName, lastName, age, gender, degree) {
  Person.call(this, firstName, lastName, age, gender);
  this.degree = degree;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.study = () => {
  console.log('Studying');
};
Student.prototype.constructor = Student;

function GraduateStudent(firstName, lastName, age, gender, degree, graduateDegree) {
  Student.call(this, firstName, lastName, age, gender, degree);
  this.graduateDegree = graduateDegree;
}

GraduateStudent.prototype = Object.create(Student.prototype);
GraduateStudent.prototype.research = () => {
  console.log('Researching');
};
GraduateStudent.prototype.constructor = GraduateStudent;
```

###### Discussion

The solution is a bit long, but it's not complicated. The points to note are the following:  

* Use of `Function.prototype.call` to have the subclass "inherit" properties from the parent class.
* Use of `Function.prototype = Object.create(obj)` to "inherit" methods from the parent class.
* Use of `Function.prototype.constructor` to manually reset the property to point back to the appropriate constructor.  

###### Further Exploration

Refactor the solution to use ES6 `class` syntax.

###### My FE Solution

```javascript
class Person {
  constructor(firstName, lastName, age, gender) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.gender = gender;
  }

  fullName() {
    return this.firstName + ' ' + this.lastName;
  }

  communicate() {
    console.log('Communicating');
  }

  eat() {
    console.log('Eating');
  }

  sleep() {
    console.log('Sleeping');
  }
}

class Doctor extends Person {
  constructor(firstName, lastName, age, gender, specialization) {
    super(firstName, lastName, age, gender);

    this.specialization = specialization;
  }

  diagnose() {
    console.log('Diagnosing');
  }
}

class Professor extends Person {
  constructor(firstName, lastName, age, gender, subject) {
    super(firstName, lastName, age, gender);

    this.subject = subject;
  }

  teach() {
    console.log('Teaching');
  }
}

class Student extends Person {
  constructor(firstName, lastName, age, gender, degree) {
    super(firstName, lastName, age, gender);

    this.degree = degree;
  }

  study() {
    console.log('Studying');
  }
}

class GraduateStudent extends Student {
  constructor(firstName, lastName, age, gender, degree, graduateDegree) {
    super(firstName, lastName, age, gender, degree);

    this.graduateDegree = graduateDegree;
  }

  research() {
    console.log('Researching');
  }
}
```

###### LS Solution

```javascript
class Person {
  constructor(firstName, lastName, age, gender) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.gender = gender;
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  communicate() {
    console.log('Communicating');
  }

  eat() {
    console.log('Eating');
  }

  sleep() {
    console.log('Sleeping');
  }
}

class Doctor extends Person {
  constructor(firstName, lastName, age, gender, specialization) {
    super(firstName, lastName, age, gender);
    this.specialization = specialization;
  }

  diagnose() {
    console.log('Diagnosing');
  }
}

class Professor extends Person {
  constructor(firstName, lastName, age, gender, subject) {
    super(firstName, lastName, age, gender);
    this.subject = subject;
  }

  teach() {
    console.log('Teaching');
  }
}

class Student extends Person {
  constructor(firstName, lastName, age, gender, degree) {
    super(firstName, lastName, age, gender);
    this.degree = degree;
  }

  study() {
    console.log('Studying');
  }
}

class GraduateStudent extends Student {
  constructor(firstName, lastName, age, gender, degree, graduateDegree) {
    super(firstName, lastName, age, gender, degree);
    this.graduateDegree = graduateDegree;
  }

  research() {
    console.log('Researching');
  }
}
```

