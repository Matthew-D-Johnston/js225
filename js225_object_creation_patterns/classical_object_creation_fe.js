"use strict";

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

// const person = new Person('foo', 'bar', 21, 'gender');
// console.log(person instanceof Person);
// person.eat();
// person.communicate();
// person.sleep();
// console.log(person.fullName());

// const doctor = new Doctor('foo', 'bar', 21, 'gender', 'Pediatrics');
// console.log(doctor instanceof Person);
// console.log(doctor instanceof Doctor);
// doctor.eat();
// doctor.communicate();
// doctor.sleep();
// console.log(doctor.fullName());
// doctor.diagnose();

// const professor = new Professor('Matt', 'Johnston', 37, 'male', 'Economics');
// console.log(professor instanceof Person);
// console.log(professor instanceof Professor);
// professor.eat();
// professor.communicate();
// professor.sleep();
// console.log(professor.fullName());
// professor.teach();

// const student = new Student('Matt', 'Johnston', 37, 'male', 'BA Philosophy');
// console.log(student instanceof Person);
// console.log(student instanceof Student);
// student.eat();
// student.communicate();
// student.sleep();
// console.log(student.fullName());
// student.study();

const graduateStudent = new GraduateStudent('Matthew', 'Johnston', 37, 'male', 'BA Philosophy', 'MA Economics');
console.log(graduateStudent instanceof Person);
console.log(graduateStudent instanceof Student);
console.log(graduateStudent instanceof GraduateStudent);
graduateStudent.eat();
graduateStudent.communicate();
graduateStudent.sleep();
console.log(graduateStudent.fullName());
graduateStudent.study();
graduateStudent.research();
