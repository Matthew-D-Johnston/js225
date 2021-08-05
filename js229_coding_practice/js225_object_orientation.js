"use strict";

let scissorsId = 0;
let scissorsName = 'Scissors';
let scissorsStock = 8;
let scissorsPrice = 10;

let drillId = 1;
let drillName = 'Cordless Drill';
let drillStock = 15;
let drillPrice = 45;

// let scissors = {
//   id: 0,
//   name: 'Scissors',
//   stock: 8,
//   price: 10,

//   describe() {
//     console.log('=> Name: ' + this.name);
//     console.log('=> ID: ' + this.id);
//     console.log('=> Price: $' + this.price);
//     console.log('=> Stock: ' + this.stock);
//   },

//   setPrice(newPrice) {
//     if (newPrice >= 0) {
//       this.price = newPrice;
//     } else {
//       console.log('Alert: the new price is invalid.')
//     }
//   },
// };
  
// let drill = {
//   id: 1,
//   name: 'Cordless Drill',
//   stock: 15,
//   price: 45,

//   describe() {
//     console.log('=> Name: ' + this.name);
//     console.log('=> ID: ' + this.id);
//     console.log('=> Price: $' + this.price);
//     console.log('=> Stock: ' + this.stock);
//   },

//   setPrice(newPrice) {
//     if (newPrice >= 0) {
//       this.price = newPrice;
//     } else {
//       console.log('Alert: the new price is invalid.')
//     }
//   },
// };

// function setPrice(product, newPrice) {
//   if (newPrice >= 0) {
//     product.price = newPrice;
//   } else {
//     console.log('Alert: the new price is invalid.')
//   }
// }

// function describeProduct(product) {
//   console.log('=> Name: ' + product.name);
//   console.log('=> ID: ' + product.id);
//   console.log('=> Price: $' + product.price);
//   console.log('=> Stock: ' + product.stock);
// }

function createProduct(id, name, stock, price) {
  return {
    id,
    name,
    stock,
    price,
    describe() {
      console.log('=> Name: ' + this.name);
      console.log('=> ID: ' + this.id);
      console.log('=> Price: $' + this.price);
      console.log('=> Stock: ' + this.stock);
    },
  
    setPrice(newPrice) {
      if (newPrice >= 0) {
        this.price = newPrice;
      } else {
        console.log('Alert: the new price is invalid.')
      }
    },
  };
}

let scissors = createProduct(0, 'Scissors', 8, 10);
let drill = createProduct(1, 'Cordless Drill', 15, 45);

// console.log(scissors);
// console.log(drill);

scissors.describe();
drill.describe();

scissors.setPrice(79);
console.log(scissors);
