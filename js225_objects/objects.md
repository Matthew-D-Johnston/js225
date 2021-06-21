##### JS225 – Object Oriented JavaScript > Objects

---

## Buggy Code 1

The code below is expected to output the following when run:  

```javascript
const helloVictor = createGreeter('Victor');
helloVictor.greet('morning');
= Good Morning Victor
```

```javascript
function createGreeter(name) {
  return {
    name,
    morning: 'Good Morning',
    afternoon: 'Good Afternoon',
    evening: 'Good Evening',
    greet(timeOfDay) {
      let msg = '';
      switch (timeOfDay) {
        case 'morning':
          msg += `${morning} ${name}`;
          break;
        case 'afternoon':
          msg += `${afternoon} ${name}`;
          break;
        case 'evening':
          msg += `${evening} ${name}`;
          break;
      }
      
      console.log(msg);
    },
  };
}
```

However, it instead results in an error. What is the problem with the code? Why isn't it producing the expected results?

###### My Solution

The error that we get is a `ReferenceError` saying that `morning is not defined`. The problem is that the variable references such as `morning` and `afternoon` within our `greet` method are implicitly being called on the global object rather than the object returned by `createGreeter`. To ensure that they are being called on the appropriate object, we need to prepend those variables with `this.`.  

```javascript
function createGreeter(name) {
  return {
    name,
    morning: 'Good Morning',
    afternoon: 'Good Afternoon',
    evening: 'Good Evening',
    greet(timeOfDay) {
      let msg = '';
      switch (timeOfDay) {
        case 'morning':
          msg += `${this.morning} ${this.name}`;
          break;
        case 'afternoon':
          msg += `${this.afternoon} ${this.name}`;
          break;
        case 'evening':
          msg += `${this.evening} ${this.name}`;
          break;
      }

      console.log(msg);
    },
  };
}
```

###### LS Solution

The problem is that it didn't use `this` keyword to access the properties of the object returned by the `createGreeter` function.  

```javascript
// rest of code omitted for brevity

      switch (timeOfDay) {
        case 'morning':
          msg += this.morning + ' ' + this.name;
          break;
        case 'afternoon':
          msg += this.afternoon + ' ' + this.name;
          break;
        case 'evening':
          msg += this.evening + ' ' + this.name;
          break;
      }

// rest of code omitted for brevity
```

###### Further Exploration

An alternative solution to this exercise is the following code:

```javascript
// rest of code omitted for brevity

      switch (timeOfDay) {
        case 'morning':
          msg += this.morning + ' ' + name;
          break;
        case 'afternoon':
          msg += this.afternoon + ' ' + name;
          break;
        case 'evening':
          msg += this.evening + ' ' + name;
          break;
      }

// rest of code omitted for brevity
```

Why does it work? What concept does this demonstrate?

###### My FE Solution  

The reason the code where `name` is not prepended by `this` works is because the `createGreeter` function takes a single argument that becomes assigned to a variable called `name`. When we call the `createGreeter` function and assign the returned object to a new variable, such as `helloVictor`, a closure is formed around the `name` variable and its associated value. Thus, `name` without the prepended `this` in the `greet` method references this `name` variable that is wrapped in the closure. If we prepend `name` with `this` then we are referencing the `name` property within the object. But they both have the same value so it does not affect the output.  

---

## Buggy Code 2

A grocery store uses a JavaScript function to calculate discounts on various items. They are testing out various percentage discounts but are getting unexpected results. Go over the code, and identify the reason why they aren't getting the expected discounted prices from the function. Then, modify the code so that it produces the correct results.  

```javascript
const item = {
  name: 'Foo',
  description: 'Fusce consequat dui est, semper.',
  price: 50,
  quantity: 100,
  discount(percent) {
    const discount = this.price * percent / 100;
    this.price -= discount;

    return this.price;
  },
};
```

```javascript
> item.discount(20)   // should return 40
= 40
> item.discount(50)   // should return 25
= 20
> item.discount(25)   // should return 37.5
= 15
```

###### My Solution

The reason we're not getting the expected output is that every time we use the `discount` method it is permanently changing the `price` property of the `item`, which is not what we want. We need to eliminate the use of the `-=` operator on `this.price`.  

```javascript
const item = {
  name: 'Foo',
  description: 'Fusce consequat dui est, semper.',
  price: 50,
  quantity: 100,
  discount(percent) {
    const discount = this.price * percent / 100;
    
    return this.price - discount;
  },
};
```

###### Solution

```javascript
const item = {
  name: 'Foo',
  description: 'Fusce consequat dui est, semper.',
  price: 50,
  quantity: 100,
  discount(percent) {
    const discount = this.price * percent / 100;
    return this.price - discount;
  },
};
```

---

## Testing Object Equality

In JavaScript, comparing two objects either with `==` or `===` checks for object identity. In other words, the comparison evaluates as true if it's the same object on either side of `==` or `===`. This is a limitation, in a sense, because sometimes we need to check if two objects have the same key/value pairs. JavaScript doesn't give us a way to do that.  

Write a function `objectsEqual` that accepts two object arguments and returns `true` or `false` depending on whether the objects have the same key/value pairs.  

```javascript
console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false
```

###### My Solution

```javascript
function objectsEqual(obj1, obj2) {
  let obj1Keys = Object.keys(obj1);
  let obj2Keys = Object.keys(obj2);

  if (obj1Keys.length !== obj2Keys.length) {
    return false;
  }

  for (let index = 0; index < obj1Keys.length; index += 1) {
    let key = obj1Keys[index];

    if (Array.isArray(obj1[key]) && Array.isArray(obj2[key])) {
      return arraysEqual(obj1[key], obj2[key]);
    } else if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      return objectsEqual(obj1[key], obj2[key]);
    } else if (!obj2Keys.includes(key)) {
      return false
    } else if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}

function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let index = 0; index < arr1.length; index += 1) {
    if (arr1[index] !== arr2[index]) {
      return false;
    }
  }

  return true;
}
```

###### LS Solution

```javascript
function objectsEqual(a, b) {
  if (a === b) {
    return true;
  }

  return (keysMatch(a, b) && valuesMatch(a, b));
}

function keysMatch(a, b) {
  const aKeys = Object.getOwnPropertyNames(a).sort();
  const bKeys = Object.getOwnPropertyNames(b).sort();

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  return aKeys.every((key, index) => key === bKeys[index]);
}

function valuesMatch(a, b) {
  const aKeys = Object.getOwnPropertyNames(a).sort();

  return aKeys.every(key => a[key] === b[key]);
}
```

###### Discussion

The solution is straightforward, it checks whether the keys are the same and the values for the respective keys are the same, and it makes use of helper functions for each. The solution also has a guard clause to immediately returns true if the two arguments passed reference the same object.  

###### Further Exploration

A limitation of this function is that it doesn't look for deep equality. In other words, if one of the values is an object in both objects, this will return `false` unless that object is identical on both objects.  

---

## Student

Create an object factory for a student object. The student object should have the following methods and it should produce the expected results demonstrated in the sample code: 

* `info`: Logs the name and year of the student.
* `addCourse`: Enrolls student in a course. A course is an object literal that has properties for its `name` and `code`.
* `listCourses`: Returns a list of the courses student has enrolled in.
* `addNote`: Adds a `note` property to a course. Takes a `code` and a `note` as an argument. If a note already exists, the `note` is appended to the existing one.
* `updateNote`: Updates a `note` for a course. Updating a note replaces the existing note with the new note.
* `viewNotes`: Logs the notes for all the courses. Courses without notes are not displayed.

```javascript
> let foo = createStudent('Foo', '1st');
> foo.info();
= "Foo is a 1st year student"
> foo.listCourses();
= [];
> foo.addCourse({ name: 'Math', code: 101 });
> foo.addCourse({ name: 'Advanced Math', code: 102 });
> foo.listCourses();
= [{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]
> foo.addNote(101, 'Fun course');
> foo.addNote(101, 'Remember to study for algebra');
> foo.viewNotes();
= "Math: Fun course; Remember to study for algebra"
> foo.addNote(102, 'Difficult subject');
> foo.viewNotes();
= "Math: Fun course; Remember to study for algebra"
= "Advanced Math: Difficult subject"
> foo.updateNote(101, 'Fun course');
> foo.viewNotes();
= "Math: Fun course"
= "Advanced Math: Difficult subject"
```

###### My Solution

```javascript
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
```

###### LS Solution

```javascript
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
```

###### Discussion

All the methods are straightforward. The main thing to handle is the mutation of the specific course when adding and updating a note. The solution does this by filtering the array of courses and returning the course object itself. Another thing to note, is the conditional for checking if a `course` was found for both the `addNote` and `updateNotes` method. This conditional ensures that a note will only be added when a student has the course.

---

## School

Create a `school` object. The `school` object uses the `student` object from the previous exercise. It has methods that use and update information about the student. Be sure to check out the previous exercise for the other arguments that might be needed by the `school` object. Implement the following methods for the school object:  

- `addStudent`: Adds a student by creating a new student and adding the student to a collection of students. The method adds a constraint that the year can only be any of the following values: `'1st'`, `'2nd'`, `'3rd'`, `'4th'`, or `'5th'`. Returns a student object if year is valid otherwise it logs "Invalid Year".
- `enrollStudent`: Enrolls a student in a course.
- `addGrade`: Adds the grade of a student for a course.
- `getReportCard`: Logs the grades of a student for all courses. If the course has no grade, it uses "In progress" as the grade.
- `courseReport`: Logs the grades of all students for a given course name. Only student with grades are part of the course report.

To test your code, use the three student objects listed below. Using the three student objects, produces the following values from the `getReportCard` and `courseReport` methods respectively.  

```javascript
// Examples of created student objects with grades; methods on the objects are not shown here for brevity.
// The following are only showing the properties that aren't methods for the three objects
foo;
{
  name: 'foo',
  year: '3rd',
  courses: [
    { name: 'Math', code: 101, grade: 95, },
    { name: 'Advanced Math', code: 102, grade: 90, },
    { name: 'Physics', code: 202, }
  ],
}

bar;
{
  name: 'bar',
  year: '1st',
  courses: [
    { name: 'Math', code: 101, grade: 91, },
  ],
}

qux;
{
  name: 'qux',
  year: '2nd',
  courses: [
    { name: 'Math', code: 101, grade: 93, },
    { name: 'Advanced Math', code: 102, grade: 90, },
   ],
}
```

```javascript
> school.getReportCard(foo);
= Math: 95
= Advanced Math: 90
= Physics: In progress
```

```javascript
> school.courseReport('Math');
= =Math Grades=
= foo: 95
= bar: 91
= qux: 93
= ---
= Course Average: 93

> school.courseReport('Advanced Math');
= =Advanced Math Grades=
= foo: 90
= qux: 90
= ---
= Course Average: 90

> school.courseReport('Physics');
= undefined
```

###### My Solution

```javascript
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
```

###### LS Solution

```javascript
const school = {
  students: [],
  addStudent(name, year) {
    if (['1st', '2nd', '3rd', '4th', '5th'].includes(year)) {
      const student = createStudent(name, year);
      this.students.push(student);
      return student;
    } else {
      console.log('Invalid Year');
    }
  },

  enrollStudent(student, courseName, courseCode) {
    student.addCourse({name: courseName, code: courseCode})
  },

  addGrade(student, courseName, grade) {
    const course = student.listCourses().filter(({name}) => name === courseName)[0];

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

  courseReport(courseName) {
    function getCourse(student, courseName) {
      return student.listCourses().filter(({name}) => name === courseName)[0];
    }

    const courseStudents = this.students.map(student => {
      const course = getCourse(student, courseName) || { grade: undefined };
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
```

###### Discussion

The key to the `enrollStudent`, `addGrade`, and `getReportCard` method is the use of the `student` object as a parameter. With the `student` object, the three methods just use the methods and properties of the object to update the information on the student object. Although not passed as an argument, the key also for the `courseReport` method is using the methods on the `student` object and then using list processing techniques to convert the list of students to the appropriate data needed to log the scores and average for a course. Of note is the use of `map` to transform the student object to only contain the name and grade of the student for a course.

