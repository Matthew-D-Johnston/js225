"use strict";

let Account = (function() {
  function anonymizer() {
    let chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
                 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
                 'q', 'r', 's', 't', 'u', 'v', 'x', 'y',
                 'z', '0', '1', '2', '3', '4', '5', '6',
                 '7', '8', '9'];
    const NUMBER_OF_CHARS = chars.length;
    
    let randomSequence = '';
    for (let i = 1; i <= 16; i += 1) {
      randomSequence += chars[Math.floor(NUMBER_OF_CHARS * Math.random())];
    }
    
    return randomSequence;
  }

  return {
    reanonymize(password) {
      if(password === this.password) {
        this.displayName = anonymizer();
        return true;
      } else {
        return 'Invalid Password';
      }
    },

    resetPassword(password, newPassword) {
      if (password === this.password) {
        this.password = newPassword;
        return true;
      } else {
        return 'Invalid Password';
      }
    },

    // firstName(password) {
    //   if (password = this.password) {
    //     return this.firstName;
    //   } else {
    //     return 'Invalid Password';
    //   }
    // },

    // lastName(password) {
    //   if (password = this.password) {
    //     return this.lastName;
    //   } else {
    //     return 'Invalid Password';
    //   }
    // },

    // email(password) {
    //   if (password = this.password) {
    //     return this.email;
    //   } else {
    //     return 'Invalid Password';
    //   }
    // },

    init(email, password, firstName, lastName) {
      this.password = password;
      this.displayName = anonymizer();

      this.email = (function() {
        return function(password) {
          if (password === this.password) {
            return email;
          } else {
            return 'Invalid Password';
          }
        };
      })(email);

      this.firstName = (function() {
        return function(password) {
          if (password === this.password) {
            return firstName;
          } else {
            return 'Invalid Password';
          }
        };
      })(firstName);

      this.lastName = (function() {
        return function(password) {
          if (password === this.password) {
            return lastName;
          } else {
            return 'Invalid Password';
          }
        };
      })(lastName);

      return this;
    }
  };
})();

let fooBar = Object.create(Account).init('foo@bar.com', '123456', 'foo', 'bar');
console.log(fooBar.firstName);
console.log(fooBar.email);
console.log(fooBar.firstName('123456'));
console.log(fooBar.firstName('abc'));
console.log(fooBar.displayName);
console.log(fooBar.resetPassword('123', 'abc'));
console.log(fooBar.resetPassword('123456', 'abc'));
let displayName = fooBar.displayName;
fooBar.reanonymize('abc');
console.log(displayName === fooBar.displayName);
