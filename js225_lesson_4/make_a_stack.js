
function newStack() {
  let stack = [];

  return {
    push(value) {
      stack.push(value);
    },
    pop() {
      stack.pop();
    },
    printStack() {
      stack.forEach(elem => console.log(elem));
    },
  };
}

let myStack = newStack();
console.log(myStack);
myStack.push(5);
myStack.push(3);
myStack.push(12);
myStack.printStack();
myStack.pop();
myStack.printStack();



