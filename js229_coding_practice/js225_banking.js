"use strict";

function makeAccount(number) {
  let balance = 0;
  let transactions = [];
  return {
    balance() {
      return balance;
    },

    number() {
      return number;
    },

    transactions() {
      return transactions;
    },

    deposit(amount) {
      balance += amount;
      transactions.push({type: 'deposit', amount: amount});
      return amount;
    },
  
    withdraw(amount) {
      if (amount > balance) {
        amount = balance;
      }
  
      balance -= amount;
      transactions.push({type: 'withdraw', amount: amount});
      return amount;
    },
  };
}

function makeBank() {
  let accounts = [];

  return {
    currentAccountNumber: 101,

    openAccount() {
      let account = makeAccount(this.currentAccountNumber);
      this.currentAccountNumber += 1;
      accounts.push(account);
      return account;
    },

    transfer(source, destination, amount) {
      if (source.balance < amount) {
        amount = source.balance;
      }
      source.withdraw(amount);
      destination.deposit(amount);
      return amount;
    },
  };
}

// let account = makeAccount();
let bank = makeBank();
// let account = bank.openAccount();
// console.log(account.number);
// console.log(bank.accounts);
// console.log(bank.accounts[0]);
// let secondAccount = bank.openAccount();
// console.log(secondAccount.number);
// let source = bank.openAccount();
// console.log(source.deposit(10));
// let destination = bank.openAccount();
// console.log(source.balance);
// console.log(bank.transfer(source, destination, 7));
// console.log(source.balance);
// console.log(destination.balance);
console.log(bank.accounts);


// let account = bank.openAccount();
// console.log(account.balance());
// console.log(account.deposit(17));

// let secondAccount = bank.openAccount();
// console.log(secondAccount.number());

// console.log(account.transactions());

// console.log(bank.accounts);


// console.log(account.balance);
// console.log(account.deposit(12));
// console.log(account.balance);
// console.log(account.deposit(10));
// console.log(account.balance);
// account.deposit(78);

// console.log(account.balance);
// console.log(account.withdraw(19));
// console.log(account.balance);
// console.log(account.withdraw(91));
// console.log(account.balance);

// console.log(account.deposit(23));
// console.log(account.transactions[0]);
