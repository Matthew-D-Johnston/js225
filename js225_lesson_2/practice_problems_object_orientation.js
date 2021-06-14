"use strict";

function createProduct(id, name, price, stock) {
  return {
    id,
    name,
    price,
    stock,
    setPrice(newPrice) {
      if (newPrice >= 0) {
        this.price = newPrice;
      } else {
        return 'WARNING: The new price is invalid!'
      }
    },
    describe() {
      console.log('Name: ' + this.name);
      console.log('ID: ' + this.id);
      console.log('Price: $' + this.price);
      console.log('Stock: ' + this.stock);
    },
  };
}

let scissors = createProduct(0, 'Scissors', 10, 8);
let drill = createProduct(1, 'Cordless Drill', 45, 15);
let hammer = createProduct(2, 'Hammer', 15, 12);
let saw = createProduct(3, 'Hacksaw', 13, 20);

scissors.describe();
console.log('');
drill.describe();
console.log('');
hammer.describe();
console.log('');
saw.describe();
