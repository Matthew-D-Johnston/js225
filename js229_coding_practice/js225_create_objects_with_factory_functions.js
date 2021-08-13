"use strict";

function createInvoice(services = {}) {
  let invoice = {
    phone: services.phone || 3000,
    internet: services.internet || 5500,
    payments: [],
  };

  invoice.total = function() {
    return this.phone + this.internet;
  };

  invoice.addPayment = function(payments) {
    if (Array.isArray(payments)) {
      this.payments = this.payments.concat(payments);
    } else {
      this.payments.push(payments);
    }
  }

  invoice.amountDue = function() {
    let paymentTotal = 0;
    this.payments.forEach(payment => {
      paymentTotal += payment.total();
    });

    return this.total() - paymentTotal;
  }

  return invoice;
}

function invoiceTotal(invoices) {
  let total = 0;
  let i;

  for (i = 0; i < invoices.length; i += 1) {
    total += invoices[i].total();
  }

  return total;
}

let invoices = [];
invoices.push(createInvoice());
invoices.push(createInvoice({
  internet: 6500,
}));

invoices.push(createInvoice({
  phone: 2000,
}));

invoices.push(createInvoice({
  phone: 1000,
  internet: 4500,
}));

console.log(invoiceTotal(invoices));

function createPayment(services = {}) {
  return {
    phone: services.phone || 0,
    internet: services.internet || 0,
    amount: services.amount,
    total() {
      if (this.amount) {
        return this.amount;
      } else {
        return this.phone + this.internet;
      }
    },
  };
}

function paymentTotal(payments) {
  let total = 0;
  let i;

  for (i = 0; i < payments.length; i += 1) {
    total += payments[i].total();
  }

  return total;
}

let payments = [];
payments.push(createPayment());
payments.push(createPayment({
  internet: 6500,
}));

payments.push(createPayment({
  phone: 2000,
}));

payments.push(createPayment({
  phone: 1000,
  internet: 4500,
}));

payments.push(createPayment({
  amount: 10000,
}));

console.log(paymentTotal(payments));


console.log('------------');

let invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({
  amount: 2000,
});

let payment2 = createPayment({
  phone: 1000,
  internet: 1200,
});

let payment3 = createPayment({
  phone: 1000,
});

invoice.addPayment(payment1);
invoice.addPayment([payment2, payment3]);
console.log(invoice.amountDue());
