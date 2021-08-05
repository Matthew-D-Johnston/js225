"use strict";

const item = {
  name: 'Foo',
  description: 'Fusce consequat dui est, semper.',
  price: 50,
  quantity: 100,
  discount(percent) {
    const discount = this.price * percent / 100;
    // this.price -= discount;

    return this.price - discount;
  },
};

console.log(item.discount(20));
console.log(item.discount(50));
console.log(item.discount(25));
