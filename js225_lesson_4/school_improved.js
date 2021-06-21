function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],
    info() {
      console.log(`${this.name} is a ${this.year} year student`);
    },

    listCourses() {
      return this.courses;
    },

    addCourse(course) {
      this.courses.push(course);
    },

    addNote(courseCode, note) {
      const course = this.courses.filter(({code}) => code === courseCode)[0];

      if (course) {
        if (course.note) {
          course.note += `; ${note}`;
        } else {
          course.note = note;
        }
      }

    },

    viewNotes() {
      this.courses.forEach(course => {
        if (course.note) {
          console.log(`${course.name}: ${course.note}`);
        }
      });
    },

    updateNote(courseCode, note) {
      const course = this.courses.filter(({code}) => code === courseCode)[0];

      if (course) {
        course.note = note;
      }
    },
  };
}

function createSchool() {
  const students = [];
  const VALID_YEARS = ['1st', '2nd', '3rd', '4th', '5th'];

  return {
    addStudent(name, year) {
      if (VALID_YEARS.includes(year)) {
        const student = createStudent(name, year);
        students.push(student);
        return student;
      } else {
        console.log('Invalid Year');
      }
    },

    getStudent(studentName, studentYear) {
      return students.filter(({name, year}) => {
        return name === studentName && year === studentYear;
      })[0];
    },
    
    enrollStudent(student, courseName, courseCode) {
      student.addCourse({name: courseName, code: courseCode});
    },
    
    addGrade(student, courseName, grade) {
      const course = this.getCourse(student, courseName);
      
      if (course) {
        course.grade = grade;
      }
    },
    
    getReportCard(student) {
      student.listCourses().forEach(({grade, name}) => {
        if (grade) {
          console.log(`${name}: ${String(grade)}`);
        } else {
          console.log(`${name}: In progress`);
        }
      });
    },

    getCourse(student, courseName) {
      return student.listCourses().filter(({name}) => name === courseName)[0];
    },
    
    courseReport(courseName) {
      const courseStudents = students.map(student => {
        const course = this.getCourse(student, courseName) || { grade: undefined };
        return { name: student.name, grade: course.grade };
      }).filter(({grade}) => grade);
      
      if (courseStudents.length > 0) {
        console.log(`=${courseName} Grades=`);
        
        const average = courseStudents.reduce((total, {name, grade}) => {
          console.log(`${name}: ${String(grade)}`);
          return total + grade;
        }, 0) / courseStudents.length;
        
        console.log('---');
        console.log(`Course Average: ${String(average)}`);
      }
    },
  };
}

let school = createSchool();

school.addStudent('foo', '3rd');
let foo = school.getStudent('foo', '3rd');
school.enrollStudent(foo, 'Math', 101);
school.enrollStudent(foo, 'Advanced Math', 102);
school.enrollStudent(foo, 'Physics', 202);
school.addGrade(foo, 'Math', 95);
school.addGrade(foo, 'Advanced Math', 90);
school.getReportCard(foo);
console.log('---------')

school.addStudent('bar', '1st');
let bar = school.getStudent('bar', '1st');
school.enrollStudent(bar, 'Math', 101);
school.addGrade(bar, 'Math', 91);
school.getReportCard(bar);
console.log('---------')

school.addStudent('qux', '2nd');
let qux = school.getStudent('qux', '2nd');
school.enrollStudent(qux, 'Math', 101);
school.enrollStudent(qux, 'Advanced Math', 102);
school.addGrade(qux, 'Math', 93);
school.addGrade(qux, 'Advanced Math', 90);
school.getReportCard(qux);
console.log('---------')

school.courseReport('Math');
school.courseReport('Advanced Math');
school.courseReport('Physics');
