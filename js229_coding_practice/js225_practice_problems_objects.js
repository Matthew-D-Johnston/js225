"use strict";

let invoices = {
    unpaid: [],
}

invoices.add = function(name, amount) {
    let obj = {
        name,
        amount,
    };

    this.unpaid.push(obj);
}

invoices.totalDue = function() {
    return this.unpaid.reduce((total, invoice) => total + invoice.amount, 0);
}

invoices.paid = [];

invoices.payInvoice = function(name) {
    let remainingUnpaid = [];
    this.unpaid.forEach(invoice => {
        if (invoice.name === name) {
            this.paid.push(invoice);
        } else {
            remainingUnpaid.push(invoice);
        }
    });
    
    this.unpaid = remainingUnpaid;
}

invoices.totalPaid = function() {
    return this.paid.reduce((total, invoice) => total + invoice.amount, 0);
}

invoices.add('Due North Development', 250);
invoices.add('Moonbeam Interactive', 187.50);
invoices.add('Slough Digital', 300);
console.log(invoices.unpaid);
console.log(invoices.totalDue());

invoices.payInvoice('Due North Development');
invoices.payInvoice('Slough Digital');
console.log(invoices.paid);
console.log(invoices.unpaid);
console.log(invoices.totalPaid());
console.log(invoices.totalDue());


