"use strict";

function makeCountry(name, continent, visited = false) {
  return {
    name,
    continent,
    visited,
    getDescription() {
      let visitMessage;
      if (this.visited) {
        visitMessage = 'I have visited ' + this.name;
      } else {
        visitMessage = "I haven't visited " + this.name;
      }
      return this.name + ' is located in ' + this.continent + '. ' + visitMessage + '.';
    },
    visitCountry() {
      this.visited = true;
    },
  };
}

let chile = makeCountry('The Republic of Chile', 'South America');
let canada = makeCountry('Canada', 'North America');
let southAfrica = makeCountry('The Republic of South Africa', 'Africa');

// console.log(chile.getDescription());
console.log(canada.getDescription());
canada.visitCountry();
console.log(canada.getDescription());
// console.log(southAfrica.getDescription());
