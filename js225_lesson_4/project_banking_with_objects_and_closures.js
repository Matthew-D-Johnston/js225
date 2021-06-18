"use strict";

function makeAccount(number) {
  let balance = 0;
  let transactions = [];

  return {
    balance() {
      return balance;
    },
    transactions() {
      return transactions;
    },
    number() {
      return number;
    },
    deposit(amount) {
      balance += amount;
      transactions.push({ type: "deposit", amount: amount });
      return amount;
    },
    withdraw(amount) {
      if (amount <= balance) {
        balance -= amount;
        transactions.push({ type: "withdraw", amount: amount });
        return amount;
      } else {
        let withdrawnAmount = balance;
        balance = 0;
        transactions.push({ type: "withdraw", amount: withdrawnAmount });
        return withdrawnAmount;
      }
    },
  };
}

function makeBank() {
  let accounts = [];
  return {
    openAccount() {
      let number = accounts.length + 101;
      let account = makeAccount(number);
      accounts.push(account);
      return account;
    },
    transfer(source, destination, amount) {
      if (amount > source.balance) {
        amount = source.balance;
      }

      source.withdraw(amount);
      destination.deposit(amount);
      return amount;
    }
  };
}
