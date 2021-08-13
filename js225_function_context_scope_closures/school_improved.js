"use strict";

function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],

    info() {
      console.log(`${this.name} is a ${this.year} year student`);
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
            course.note += `; ${note}`;
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
      })
    },
  }
}

let school = (function() {
  const students = [];
  function validYear(year) {
    return ['1st', '2nd', '3rd', '4th', '5th'].includes(year);
  };

  return {
    addStudent(name, year) {
      if (validYear(year)) {
        let student = createStudent(name, year);
        students.push(student);
        return student;
      } else {
        console.log("Invalid Year");
      }
    },

    enrollStudent(studentName, course) {
      let student = students.filter(student => student.name === studentName)[0];
      student.addCourse(course);
    },

    addGrade(studentName, courseName, grade) {
      let student = students.filter(student => student.name === studentName)[0];
      let course = student.courses.filter(course => course.name === courseName)[0];
      course.grade = grade;
    },

    getReportCard(studentName) {
      let student = students.filter(student => student.name === studentName)[0];
      student.courses.forEach(course => {
        if (course.grade) {
          console.log(course.name + ': ' + course.grade);
        } else {
          console.log(course.name + ': In progress');
        }
      });
    },

    courseReport(courseName) {
      let studentsWithGradeForCourse = students.filter(student => {
        let course = student.courses.filter(course => course.name === courseName)[0];
        if (course && course.grade) {
          return student;
        }
      });

      if (studentsWithGradeForCourse.length > 0) {
        console.log(`=${courseName} Grades=`);
        let gradeSum = 0;
        studentsWithGradeForCourse.forEach(student => {
          let course = student.courses.filter(course => course.name === courseName)[0];
          gradeSum += course.grade;
          console.log(student.name + ': ' + course.grade);
        });
        console.log('---');
        let courseAverage = gradeSum / studentsWithGradeForCourse.length;
        console.log(`Course Average: ${courseAverage}`);
      } else {
        return undefined;
      }
    },
  };
})();


school.addStudent('foo', '3rd')
school.enrollStudent('foo', { name: 'Math', code: 101 });
school.enrollStudent('foo', { name: 'Advanced Math', code: 102 });
school.enrollStudent('foo', { name: 'Physics', code: 202 });
school.addGrade('foo', 'Math', 95);
school.addGrade('foo', 'Advanced Math', 90);

school.addStudent('bar', '1st');
school.enrollStudent('bar', { name: 'Math', code: 101 });
school.addGrade('bar', 'Math', 91);

school.addStudent('qux', '2nd');
school.enrollStudent('qux', { name: 'Math', code: 101 });
school.enrollStudent('qux', { name: 'Advanced Math', code: 102 });
school.addGrade('qux', 'Math', 93);
school.addGrade('qux', 'Advanced Math', 90);

school.getReportCard('foo');
console.log('');
school.courseReport('Math');
console.log('');
school.courseReport('Advanced Math');
console.log('');
console.log(school.courseReport('Physics'));
