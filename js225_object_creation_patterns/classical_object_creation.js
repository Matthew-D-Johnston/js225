"use strict";

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

// const graduateStudent = new GraduateStudent('Matthew', 'Johnston', 37, 'male', 'BA Philosophy', 'MA Economics');

// console.log(graduateStudent instanceof Person);
// console.log(graduateStudent instanceof Student);
// console.log(graduateStudent instanceof GraduateStudent);
// graduateStudent.eat();
// graduateStudent.communicate();
// graduateStudent.sleep();
// console.log(graduateStudent.fullName());
// graduateStudent.study();
// graduateStudent.research();
