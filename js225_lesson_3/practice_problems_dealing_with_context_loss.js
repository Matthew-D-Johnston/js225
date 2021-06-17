// "use strict";

// let turk = {
//   firstName: 'Christopher',
//   lastName: 'Turk',
//   occupation: 'Surgeon',
//   getDescription() {
//     return this.firstName + ' ' + this.lastName + ' is a ' + this.occupation + '.';
//   }
// };

// let getTurkDescription = turk.getDescription.bind(turk);

// function logReturnVal(func, context) {
//   let returnVal = func.apply(context);
//   console.log(returnVal);
// }

// logReturnVal(turk.getDescription, turk);

// let TESgames = {
//   titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
//   seriesTitle: 'The Elder Scrolls',
//   listGames() {
//     this.titles.forEach(function(title) {
//       console.log(this.seriesTitle + ' ' + title);
//     }, this);
//   }
// };

// TESgames.listGames();

let foo = {
  a: 0,
  incrementA() {
    let increment = function() {
      this.a += 1;
    }.bind(this);
    
    increment(this);
    increment(this);
    increment(this);
  }
};

foo.incrementA();
foo.incrementA();
foo.incrementA();

console.log(foo.a);
