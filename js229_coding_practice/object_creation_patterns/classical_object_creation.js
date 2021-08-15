"use strict";

function Person(firstName, lastName, age, gender) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  this.gender = gender;
}

Person.prototype.fullName = function() {
  console.log(this.firstName + ' ' + this.lastName);
};

Person.prototype.communicate = function() {
  console.log("I'm communicating!!!");
};

Person.prototype.eat = function() {
  console.log("I'm eating!!!");
};

Person.prototype.sleep = function() {
  console.log("Zzzzzzzzz...");
};

function Doctor(firstName, lastName, age, gender, specialization) {
  Person.call(this, firstName, lastName, age, gender);
  this.specialization = specialization;
};

Doctor.prototype = Object.create(Person.prototype);
Doctor.prototype.constructor = Doctor;
Doctor.prototype.diagnose = function() {
  console.log("I diangose diseases related to " + this.specialization + '.');
};

function Professor(firstName, lastName, age, gender, subject) {
  Person.call(this, firstName, lastName, age, gender);
  this.subject = subject;
};

Professor.prototype = Object.create(Person.prototype);
Professor.prototype.constructor = Professor;
Professor.prototype.teach = function() {
  console.log("I teach " + this.subject + '.');
};

function Student(firstName, lastName, age, gender, degree) {
  Person.call(this, firstName, lastName, age, gender);
  this.degree = degree;
};

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;
Student.prototype.study = function() {
  console.log("I study " + this.degree + '.');
};

function GraduateStudent(firstName, lastName, age, gender, degree, graduateDegree) {
  Student.call(this, firstName, lastName, age, gender, degree);
  this.graduateDegree = graduateDegree;
};

GraduateStudent.prototype = Object.create(Student.prototype);
GraduateStudent.prototype.constructor = GraduateStudent;
GraduateStudent.prototype.research = function() {
  console.log("I am conducting research in the field of " + this.graduateDegree + '.');
};

const person = new Person('foo', 'bar', 21, 'gender');
console.log(person instanceof Person);
person.eat();
person.communicate();
person.sleep();
person.fullName();

const doctor = new Doctor('foo', 'bar', 21, 'gender', 'Pediatrics');
console.log(doctor instanceof Person);
console.log(doctor instanceof Doctor);
doctor.eat();
doctor.communicate();
doctor.sleep();
doctor.fullName();
doctor.diagnose();

const graduateStudent = new GraduateStudent('foo', 'bar', 21, 'gender', 'BS Industrial Engineering', 'MS Industrial Engineering');
console.log(graduateStudent instanceof Person);
console.log(graduateStudent instanceof Student);
console.log(graduateStudent instanceof GraduateStudent);
graduateStudent.eat();
graduateStudent.communicate();
graduateStudent.sleep();
graduateStudent.fullName();
graduateStudent.study();
graduateStudent.research();
