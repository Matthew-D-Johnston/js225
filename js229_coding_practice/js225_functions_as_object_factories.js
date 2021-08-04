"use strict";

// let chile = {
//     name: 'The Republic of Chile',
//     continent: 'South America',
//     getDescription() {
//         return this.name + ' is located in ' + this.continent + '.';
//     },
// };

// let southAfrica = {
//     name: 'The Republic of South Africa',
//     continent: 'Africa',
//     getDescription() {
//         return this.name + ' is located in ' + this.continent + '.';
//     },
// };

function makeCountry(name, continent, visited = false) {
    return {
        name,
        continent,
        visited,
        getDescription() {
            let visitMessage = "I haven't visited " + this.name + '.';
            if (visited) {
                visitMessage = 'I have visited ' + this.name + '.';
            }
            return this.name + ' is located in ' + this.continent + '. ' + visitMessage;
        },
        visitCountry() {
            this.visited = true;
        },
    };
}

let chile = makeCountry('The Republic of Chile', 'South America');
let canada = makeCountry('Canada', 'North America');
let southAfrica = makeCountry('The Republic of South Africa', 'Africa');

console.log(chile.getDescription());
console.log(canada.getDescription());
console.log(southAfrica.getDescription());
