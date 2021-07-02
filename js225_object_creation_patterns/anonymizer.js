"use strict";

// let Account = {
//   init(email, password, firstName, lastName) {
//     this.email = function() {
//       return email;
//     }

//     this.password = password;

//     this.firstName = function(password) {
//       if (password === this.password) {
//         return firstName;
//       } else {
//         return 'Invalid Password';
//       }  
//     }

//     this.lastName = function(password) {
//       if (password === this.password) {
//         return lastName;
//       } else {
//         return 'Invalid Password';
//       }
      
//     }
    
//     this.displayName;

//     this.reanonymize(password);

//     return this;
//   },

//   reanonymize(password) {
//     if (password !== this.password) {
//       return 'Invalid Password';
//     }

//     const CHARS = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
//                     'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
//                   ];

//     let displayName = '';

//     for (let index = 1; index <= 16; index += 1) {
//       displayName += CHARS[Math.floor(Math.random() * 26)];
//     }

//     this.displayName = displayName;
//     return true;
//   },

//   resetPassword(currentPassword, newPassword) {
//     if (currentPassword === this.password) {
//       this.password = newPassword;
//       return true;
//     } else {
//       return 'Invalid Password';
//     }
//   },
// }

// let fooBar = Object.create(Account).init('foo@bar.com', '123456', 'foo', 'bar');
// console.log(fooBar.firstName);
// console.log(fooBar.email);
// console.log(fooBar.firstName('123456'));
// console.log(fooBar.firstName('abc'));
// console.log(fooBar.displayName);
// console.log(fooBar.resetPassword('123', 'abc'));
// console.log(fooBar.resetPassword('123456', 'abc'));

// let displayName = fooBar.displayName;
// fooBar.reanonymize('abc');
// console.log(displayName === fooBar.displayName);


// LS Solution

// let Account = (function() {
//   let userEmail;
//   let userPassword;
//   let userFirstName;
//   let userLastName;

//   function isValidPassword(testPassword) {
//     return userPassword === testPassword;
//   }

//   function getRandomLetterNumber() {
//     let randomIndex = Math.floor(Math.random() * 62);
//     return 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRTSUVWXYZ1234567890'[randomIndex];
//   }

//   function anonymize() {
//     let result = '';

//     for (let i = 0; i < 16; i += 1) {
//       result += getRandomLetterNumber();
//     }

//     return result;
//   }

//   return {
//     init: function(email, password, firstName, lastName) {
//       userEmail = email;
//       userPassword = password;
//       userFirstName = firstName;
//       userLastName = lastName;
//       this.displayName = anonymize();
//       return this;
//     },

//     reanonymize: function(password) {
//       if (isValidPassword(password)) {
//         this.displayName = anonymize();
//         return true
//       } else {
//         return 'Invalid Password';
//       }
//     },

//     resetPassword: function(currentPassword, newPassword) {
//       if (isValidPassword(currentPassword)) {
//         userPassword = newPassword;
//         return true;
//       } else {
//         return 'Invalid Password';
//       }
//     },

//     firstName: function(password) {
//       if (isValidPassword(password)) {
//         return userFirstName;
//       } else {
//         return 'Invalid Password';
//       }
//     },

//     lastName: function(password) {
//       if (isValidPassword(password)) {
//         return userLastName;
//       } else {
//         return 'Invalid Password';
//       }
//     },

//     email: function(password) {
//       if (isValidPassword(password)) {
//         return userEmail;
//       } else {
//         return 'Invalid Password';
//       }
//     },
//   };
// })();

// let fooBar = Object.create(Account).init('foo@bar.com', '123456', 'foo', 'bar');
// console.log(fooBar);
// console.log(fooBar.firstName);                     // returns the firstName function
// console.log(fooBar.email);                         // returns the email function
// console.log(fooBar.firstName('123456'));           // logs 'foo'
// console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
// console.log(fooBar.displayName);                   // logs 16 character sequence
// console.log(fooBar.resetPassword('123', 'abc'))    // logs 'Invalid Password'
// console.log(fooBar.resetPassword('123456', 'abc')) // logs true

// let displayName = fooBar.displayName;
// fooBar.reanonymize('abc');                         // returns true
// console.log(displayName === fooBar.displayName);   // logs false

// let bazQux = Object.create(Account).init('baz@qux.com', '123456', 'baz', 'qux');
// console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
// console.log(fooBar.email('abc'));                  // logs 'Invalid Password'

// Further Exploration

let Account = (function() {
  let userEmail;
  let userPassword;
  let userFirstName;
  let userLastName;

  function isValidPassword(testPassword) {
    return userPassword === testPassword;
  }

  function getRandomLetterNumber() {
    let randomIndex = Math.floor(Math.random() * 62);
    return 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRTSUVWXYZ1234567890'[randomIndex];
  }

  function anonymize() {
    let result = '';

    for (let i = 0; i < 16; i += 1) {
      result += getRandomLetterNumber();
    }

    return result;
  }

  return {
    init: function(email, password, firstName, lastName) {
      userEmail = email;
      userPassword = password;
      userFirstName = firstName;
      userLastName = lastName;
      this.displayName = anonymize();
      return this;
    },

    reanonymize: function(password) {
      if (isValidPassword(password)) {
        this.displayName = anonymize();
        return true
      } else {
        return 'Invalid Password';
      }
    },

    resetPassword: function(currentPassword, newPassword) {
      if (isValidPassword(currentPassword)) {
        userPassword = newPassword;
        return true;
      } else {
        return 'Invalid Password';
      }
    },

    firstName: function(password) {
      if (isValidPassword(password)) {
        return userFirstName;
      } else {
        return 'Invalid Password';
      }
    },

    lastName: function(password) {
      if (isValidPassword(password)) {
        return userLastName;
      } else {
        return 'Invalid Password';
      }
    },

    email: function(password) {
      if (isValidPassword(password)) {
        return userEmail;
      } else {
        return 'Invalid Password';
      }
    },
  };
})();

// let fooBar = Object.create(Account).init('foo@bar.com', '123456', 'foo', 'bar');
// console.log(fooBar.firstName);                     // returns the firstName function
// console.log(fooBar.email);                         // returns the email function
// console.log(fooBar.firstName('123456'));           // logs 'foo'
// console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
// console.log(fooBar.displayName);                   // logs 16 character sequence
// console.log(fooBar.resetPassword('123', 'abc'))    // logs 'Invalid Password'
// console.log(fooBar.resetPassword('123456', 'abc')) // logs true

// let displayName = fooBar.displayName;
// fooBar.reanonymize('abc');                         // returns true
// console.log(displayName === fooBar.displayName);   // logs false

// let bazQux = Object.create(Account).init('baz@qux.com', '123456', 'baz', 'qux');
// console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
// console.log(fooBar.email('abc'));                  // logs 'Invalid Password'


// console.log(bazQux.firstName('123456'));              // logs 'Invalid Password'
// console.log(bazQux.email('123456'));  
