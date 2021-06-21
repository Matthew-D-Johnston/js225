##### JS225 – Object Oriented JavaScript > Function Context, Scope, and Closures

---

## What is This

Read the following code carefully. What do you think is logged on line 7. Try to answer the question before you run the code.

```javascript
const person = {
  firstName: 'Rick ',
  lastName: 'Sanchez',
  fullName: this.firstName + this.lastName,
};

console.log(person.fullName);
```

###### My Solution

```
undefined undefined
```

After running the code:

```
NaN
```

That's because, `this` refers to the global object and so when we try to log `person.fullName` to the console, we end up adding `undefined` and `undefined` which results in `NaN`.

###### LS Solution

If you said it logs `NaN`, you're correct. It is tempting to say that the code will log "Rick Sanchez" to the console but that's not correct.  

Anywhere outside a function, the keyword `this` is bound to the global object. If the keyword is used inside a function, then its value depends on how the function was invoked.  

Since `window.firstName` and `window.lastName` (if you're using a browser) are not defined, the operation being performed here is `undefined + undefined` which results in fullName having the value `NaN`.  

---

## The Franchise

The method `franchise.allMovies` is supposed to return the following array:  

```
[
  'How to Train Your Dragon 1',
  'How to Train Your Dragon 2',
  'How to Train Your Dragon 3'
]
```

Explain why this method will not return the desired object? Try fixing this problem by taking advantage of JavaScript lexical scoping rules.  

```javascript
const franchise = {
  name: 'How to Train Your Dragon',
  allMovies() {
    return [1, 2, 3].map(function(number) {
      return `${this.name} ${number}`;
    });
  },
};
```

###### My Solution

The problem is that the anonymous function passed to the `map` method has the `global` object as its execution context rather than the `franchise` object. Thus, `this` is bound to the `global` object and since the `global` object does not have a `name` property, `this.name` returns `undefined`. That is why we get the following logged to the console:

```
[ 'undefined 1', 'undefined 2', 'undefined 3' ]
```

To fix this, we can use the `thisArg` argument associated with the `map` method to explicitly set the execution object to `franchise`:

```javascript
const franchise = {
  name: 'How to Train Your Dragon',
  allMovies() {
    return [1, 2, 3].map(function(number) {
      return `${this.name} ${number}`;
    }, this);
  },
};
```

Another solution is to use an arrow function within the `map` method instead of a function expression:

```javascript
const franchise = {
  name: 'How to Train Your Dragon',
  allMovies() {
    return [1, 2, 3].map(number => {
      return `${this.name} ${number}`;
    });
  },
};
```

###### LS Solution

The current implementation will not work because `this` will be bound to the wrong object (`window`) when the anonymous function passed to `map` is invoked. We want to access the object `franchise` from within that anonymous function.  

There are multiple ways to solve this problem. Both of the solutions below take advantage of JavaScript's lexical scoping rules, but in different ways.  

##### Solution 1

Here we take advantage of the fact that a variable defined in an outer scope is available to an inner scope by assigning a local variable `self` to `this` within the `allMovies` method and then referencing `self` within the anonymous callback function:

```javascript
const franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    const self = this;
    return [1, 2, 3].map(function(number) {
      return self.name + ' ' + number;
    });
  },
};
```

##### Solution 2

Here we take advantage of the fact that arrow functions don't create their own `this` binding, and so the value of `this` within an arrow function is determined lexically:

```javascript
const franchise = {
  name: 'How to Train Your Dragon',
  allMovies() {
    return [1, 2, 3].map(number => `${this.name} ${number}`);
  },
};
```

---

## The Franchise – Solution 2

In the previous exercise, we had a situation where an anonymous method passed to `map` had an undesirable execution context. We solved the problem by taking advantage of lexical scoping and introducing a new variable `self`. Solve the same problem again by passing a hard-bound anonymous function to `map`.  

###### My Solution

```javascript
const franchise = {
  name: 'How to Train Your Dragon',
  allMovies() {
    return [1, 2, 3].map(function(number) {
      return `${this.name} ${number}`;
    }.bind(this));
  },
};
```

###### LS Solution

```javascript
const franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    return [1, 2, 3].map(function(number) {
      return `${this.name} ${number}`;
    }.bind(this));
  },
};
```

The solutions provided for the same problem are all valid, usable solutions. That said, the `map` method and a few other methods on `Array.prototype` give us a convenient way to set the execution context of a callback: If you pass a second argument to these methods, it will be treated as the execution context of the passed in callback:

```javascript
const franchise = {
  name: 'How to Train Your Dragon',
  allMovies() {
    return [1, 2, 3].map(function(number) {
      return `${this.name} ${number}`;
    }, this);
  },
};
```

Note that we're using anonymous functions in the above solutions. It's not possible to bind an arrow function to `this`, since the value of `this` is always determined lexically in arrow functions.  

---

## Our very own bind()

[Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) is a method on all function objects that allows us to hard-bind a function to a particular object. The way this works is that you pass a context object to the `bind` method and it returns a new function that is essentially the same function but hard-bound to the context object supplied.  

Create a function `myBind`, that accepts two arguments: 1) The function to bind, 2) The context object, and returns a new function that's hard-bound to the passed in context object.  

###### Hint

Use `Function.prototype.apply` in your solution.  

###### My Solution

I'm confused.

###### LS Solution

```javascript
function myBind(func, ctx) {
  return function(...args) {
    return func.apply(ctx, args);
  };
}
```

The above solutions leverages `Function.prototype.apply` and the concept of closures to return a bound function. `myBind` receives a function and a context object as arguments. Then it returns a new function, which when called will call the original function using `apply` while passing in the `args` array in case the function has any arguments.

---

## myBind() Improved

Our earlier implementation of the `Function.prototype.bind` was simplistic. `Function.prototype.bind` has another trick up its sleeve besides hard-binding functions to context objects. It's called partial function application. Read [this assignment](https://launchschool.com/lessons/0b371359/assignments/f2c6f687) and the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind#Partially_applied_functions) to learn more about partial function application.  

Alter the `myBind` function written in the previous exercise to support partial function application.  

###### My Solution

```javascript
function myBind(func, ctx, arg1) {
  return function(arg2) {
    return func.call(ctx, arg1, arg2);
  };
}
```

###### LS Solution

```javascript
function myBind(func, ctx, ...partialArgs) {
  return function(...args) {
    const fullArgs = partialArgs.concat(args);
    
    return func.apply(ctx, fullArgs);
  };
}
```

Now to see the new `myBind` in action:

```javascript
function addNumbers(a, b) {
  return a + b;
}

const addFive = myBind(addNumbers, null, 5);

addFive(10); // 15
```

###### Discussion

The key here is visualizing what happens to the arguments when `myBind` is called and when the bound function is eventually called. The first thing to visualize is when `myBind` is executed, the `partialArgs` array contains the pre-specified initial arguments. Next, when the bound function is called, the remaining arguments are then concatenated with the `partialArgs`. Notice that the key here is to cache the initial set of arguments and have it accessible via the closure formed by the return value of `myBind`.  

With the complete args, the solution again leverages `Function.prototype.apply` to execute the function passed to `myBind` with its `this` set to `ctx`.  

---

## myFilter()

In this exercise we'll update the implementation of [myFilter](https://launchschool.com/lessons/bfc761bc/assignments/c6f3935e) by adding the functionality of accepting an optional `thisArg` just like the original [Array.prototype.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter#Parameters).  

Here's our original implementation. We also show an example of how we want to call our modified function: the 3rd argument, `filter`, supplies the desired context (`thisArg`).  

```javascript
function myFilter(array, func) {
  const result = [];
  
  array.forEach(value => {
    if (func(value)) {
      result.push(value);
    }
  });
  
  return result;
}

const filter = {
  allowedValues: [5, 6, 9],
}

myFilter([2, 1, 3, 4, 5, 6, 12], function(val) {
  return this.allowedValues.includes(val);
}, filter); // returns [5, 6]
```

Modify the original implementation such that the expected result is returned. Don't use the `thisArg` argument of `Array.prototype.forEach`.

###### My Solution

```javascript
function myFilter(array, func, thisArg) {
  const result = [];

  array.forEach(value => {
    if (func.call(thisArg, value)) {
      result.push(value);
    }
  });

  return result;
}
```

###### LS Solution

```javascript
function myFilter(array, func, thisArg) {
  const result = [];

  array.forEach(value => {
    if (func.call(thisArg, value)) {
      result.push(value);
    }
  });

  return result;
}
```

###### Discussion

The solution is straightforward. Since there is always only one argument at a time passed to the callback function of `myFilter`, the solution uses `Function.prototype.call` on it and passes it the `thisArg` and `value` arguments.  

---

## Garbage Collection

Read the following code carefully. Will the JavaScript garbage collection mechanism garbage collect the value assigned to the variable `count` after the function `counter` is run on line 10?  

```javascript
function makeCounter() {
  let count = 1;
  
  return () => {
    console.log(count++)
  };
}

const counter = makeCounter();
counter();
```

###### My Solution

Yes, the value of `1` will be garbage collected since after running `counter()` on line 10, the `count` variable will be reassigned the value of `2`.

###### LS Solution

No, the value assigned to the variable `count` will not be garbage collected after the function `counter` is run. The `counter` function has closed over its parent scope where the value assigned to `count` exists. As long as the `counter` function exists, it needs to have access to that scope and so JavaScript cannot garbage collect the value assigned to `count`.

---

## Make a Stack

A stack is a compound data type like an array. The difference between an array and a stack is that in an array you can insert and remove elements in any order you want, but a stack has a rule whereby you can only add new elements at the end and remove the last inserted element.  

Create a function `newStack`, that, when called, returns a stack object with three methods: `push`, `pop`, and `printStack`. `push` takes a value and appends it to the stack. `pop` removes and returns the last element from the stack. `printStack` logs each remaining element of the stack on its own line, starting with the item that was least recently added to the stack and ending with the most recently added item.  

Internally, use an array to implement the stack. Make sure that the array is not accessible from outside the methods.  

###### My Solution

```javascript
function newStack() {
  let stack = [];

  return {
    push(value) {
      stack.push(value);
    },
    pop() {
      stack.pop();
    },
    printStack() {
      stack.forEach(elem => console.log(elem));
    },
  };
}
```

###### LS Solution

```javascript
function newStack() {
  const stack = [];
  
  return {
    push(value) {
      stack.push(value);
    },
    
    pop() {
      return stack.pop();
    },
    
    printStack() {
      stack.forEach(value => {
        console.log(value);
      });
    }
  };
}
```

###### Discussion

The detail to watch out for in this exercise is keeping array from being acessible from the outside. The solution achieves this by using the concept of closures to create the `stack` array that is only accessible to the returned objects of the `newStack` function.  

---

## Don't Pollute My Window

Consider the following code:

```javascript
const name = 'Naveed';
const greeting = 'Hello';

const greeter = {
  message: `${greeting} ${name}!`,
  sayGreeting() {
    console.log(this.message);
  }
};
```

Note that the `message` property uses the result of interpolation as its value. As a result, we have two global variables: `name`, and `greeting` that pollute the global scope. As we already know, we should limit the use of global variables as much as we can. Here we can avoid using the global variables by simply setting the `message` property to the value `"Hello Naveed!"`. But let's pretend that we must use variables and interpolation to accomplish this. Can you think of a way to refactor this code so we don't have any other variables in the global scope besides `greeter`?

###### My Solution

```javascript
const greeter = {
  name: 'Naveed',
  greeting: 'Hello',
  message() {
    return `${this.greeting} ${this.name}`;
  },
  sayGreetings() {
    console.log(this.message());
  }
};
```

###### LS Solution

```javascript
const greeter = {
  message: (() => {
    const name = 'Naveed';
    const greeting = 'Hello';
    
    return `${greeting} ${name}!`;
  })(),
  
  sayGreetings() {
    console.log(this.message);
  }
};
```

Here we use an IIFE to set the value of the `message` property. This allows us to do all the work necessary for setting the value without using any extra global variables.

---

## School Improved

In an [earlier exercise](https://launchschool.com/exercises/4f445afb), we created a `school` object. It works, however, it can still be improved. The following are improvements for you to implement in the solution provided:

- Make the list `students` private. Right now, anyone can gain access to it and manipulate it.
- Make the constraint for allowed values for years a private variable. As a private variable it avoids an unnecessary statement in the `addStudent` method and at the same time makes the code more declarative.
- Make the `getCourse` function accessible in the `addGrade` method also. As it is, only the `courseReport` method has access.

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
    student.addCourse({name: courseName, code: courseCode});
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

###### My Solution

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
```

###### LS Solution

```javascript
const school = (() => {
  const students = [];
  const allowedYears = ['1st', '2nd', '3rd', '4th', '5th'];

  function getCourse(student, courseName) {
    return student.listCourses().filter(({name}) => name === courseName)[0];
  }

  return {
    addStudent(name, year) {
      if (allowedYears.includes(year)) {
        const student = createStudent(name, year);
        students.push(student);
        return student;
      } else {
        console.log('Invalid Year');
      }
    },

    enrollStudent(student, courseName, courseCode) {
      student.addCourse({
        name: courseName,
        code: courseCode
      })
    },

    addGrade(student, courseName, grade) {
      const course = getCourse(student, courseName);

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
      const courseStudents = students.map(student => {
        const course = getCourse(student, courseName) || {
          grade: undefined
        };
        return {
          name: student.name,
          grade: course.grade
        };
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
})();
```

###### Discussion

The key for all improvements is the use of an IIFE. The IIFE is used to create a function that returns an object that has access to variables and functions in the function expressions' body. Because of the concept of closures, those variables and functions are accessible to the methods of the returned object. Furthermore, since the function expression creates a scope, those variables and functions aren't accessible outside of the function.  

