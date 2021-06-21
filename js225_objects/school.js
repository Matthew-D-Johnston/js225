"use strict";

function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],

    info() {
      console.log(this.name + ' is a ' + this.year + ' year student');
    },

    addCourse(course) {
      this.courses.push(course);
    },

    listCourses() {
      return this.courses;
    },

    addNote(code, note) {
      this.courses.forEach(course => {
        if (course.code === code) {
          if (course.note) {
            course.note += '; ' + note;
          } else {
            course.note = note;
          }
        }
      });
    },

    updateNote(code, note) {
      this.courses.forEach(course => {
        if (course.code === code) {
          course.note = note;
        }
      });
    },

    viewNotes() {
      this.courses.forEach(course => {
        if (course.note) {
          console.log(course.name + ': ' + course.note);
        }
      });
    }
  };
}

let school = {
  students: [],

  addStudent(name, year) {
    let student = createStudent(name, year);
    let validYears = ['1st', '2nd', '3rd', '4th', '5th'];

    if (validYears.includes(student.year)) {
      this.students.push(student);
    } else {
      console.log("Invalid Year");
    }
  },

  enrollStudent(studentName, studentYear, courseName, courseCode) {
    const student = this.students.filter(student => {
      return student.name === studentName && student.year === studentYear;
    }).pop();

    // console.log(student.name);

    if (student) {
      student.addCourse({ name: courseName, code: courseCode });
    } else {
      console.log("Student doesn't exist");
    }
  },

  addGrade(studentName, studentYear, courseCode, courseGrade) {
    const student = this.students.filter(student => {
      return student.name === studentName && student.year === studentYear;
    }).pop();

    if (student) {
      student.courses.forEach(course => {
        if (course.code === courseCode) {
          course.grade = courseGrade; 
        } 
      });
    }
  },

  getReportCard(student) {
    student.courses.forEach(course => {
      if (course.grade) {
        console.log(`${course.name}: ${course.grade}`);
      } else {
        console.log(`${course.name}: In progress`);
      }
    });
  },

  courseReport(courseName) {
    const courseStudents = this.students.filter(student => {
      return student.courses.some(course => {
        return course.name === courseName && course.grade;
      });
    });

    if (courseStudents.length > 0) {
      let gradeSum = 0;
      console.log(`=${courseName} Grades=`);
      courseStudents.forEach(student => {
        student.courses.forEach(course => {
          if (course.name === courseName) {
            console.log(`${student.name}: ${course.grade}`);
            gradeSum += course.grade;
          }
        });
      });
      console.log('---');
      console.log(`Course Average: ${gradeSum / courseStudents.length}`);
    } else {
      console.log(undefined);
    }
  }
}

school.addStudent('foo', '3rd');
school.enrollStudent('foo', '3rd', 'Math', 101);
school.enrollStudent('foo', '3rd', 'Advanced Math', 102);
school.enrollStudent('foo', '3rd', 'Physics', 202);
school.addGrade('foo', '3rd', 101, 95);
school.addGrade('foo', '3rd', 102, 90);
school.getReportCard(school.students[0]);
console.log("---------");

school.addStudent('bar', '1st');
school.enrollStudent('bar', '1st', 'Math', 101);
school.addGrade('bar', '1st', 101, 91);
school.getReportCard(school.students[1]);
console.log("---------");

school.addStudent('qux', '2nd');
school.enrollStudent('qux', '2nd', 'Math', 101);
school.enrollStudent('qux', '2nd', 'Advanced Math', 102);
school.addGrade('qux', '2nd', 101, 93);
school.addGrade('qux', '2nd', 102, 90);
school.getReportCard(school.students[2]);
console.log("---------");

school.courseReport('Math');
school.courseReport('Advanced Math');
school.courseReport('Physics');

