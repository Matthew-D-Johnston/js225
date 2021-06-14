"use strict";

// let sedan = {
//   speed: 0,
//   rate: 8,
//   accelerate() {
//     this.speed += this.rate;
//   },
// };

// let coupe = {
//   speed: 0,
//   rate: 12,
//   accelerate() {
//     this.speed += this.rate;
//   },
// };

// sedan.accelerate();
// console.log(sedan.speed);

// coupe.accelerate();
// console.log(coupe.speed);


function makeCar(rate, brakeRate) {
  return {
    speed: 0,
    rate,
    brakeRate,
    accelerate() {
      this.speed += this.rate;
    },
    brake() {
      if (this.speed < this.brakeRate) {
        this.speed = 0;
      } else {
        this.speed -= this.brakeRate;
      }
    },
  };
}

let sedan = makeCar(8, 6);
sedan.accelerate();
console.log(sedan.speed);
sedan.brake();
console.log(sedan.speed);
sedan.brake();
console.log(sedan.speed);

// let coupe = makeCar(12);
// coupe.accelerate();
// console.log(coupe.speed);

// let hatchback = makeCar(9);


