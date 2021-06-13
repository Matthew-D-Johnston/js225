"use strict";

let invoices = {
  unpaid: [],
};

invoices.add = function(name, amount) {
  this.unpaid.push({
    name: name,
    amount: amount,
  });
};

invoices.totalDue = function() {
  return this.unpaid.reduce((total, invoice) => total + invoice.amount, 0);
};

invoices.paid = [];

invoices.payInvoice = function(name) {
  let remainingUnpaid = [];

  for (let invoice = 0; invoice < this.unpaid.length; invoice += 1) {
    if (this.unpaid[invoice].name === name) {
      this.paid.push(this.unpaid[invoice]);
    } else {
      remainingUnpaid.push(this.unpaid[invoice]);
    }
  }

  this.unpaid = remainingUnpaid;
};

invoices.totalPaid = function() {
  return this.paid.reduce((total, invoice) => total + invoice.amount, 0);
}

invoices.add('Due North Development', 250);
invoices.add('Moonbeam Interactive', 187.50);
invoices.add('Slough Digital', 300);

invoices.payInvoice('Due North Development');
invoices.payInvoice('Slough Digital');
console.log(invoices.totalPaid());
console.log(invoices.totalDue());

console.log(invoices);
