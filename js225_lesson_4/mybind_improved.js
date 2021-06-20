// function myBind(func, ctx, arg1) {
//   return function(arg2) {
//     return func.call(ctx, arg1, arg2);
//   };
// }



// let lists = {
//   numList: [],
// }

// function sumNumsThenAddToList(num1, num2) {
//   let sum = num1 + num2;
//   this.numList.push(sum);
// }

// let makeList3 = myBind(sumNumsThenAddToList, lists, 3);

// makeList3(2);

// console.log(lists.numList);

// LS Solution

function myBind(func, ctx, ...partialArgs) {
  return function(...args) {
    const fullArgs = partialArgs.concat(args);

    return func.apply(ctx, fullArgs);
  };
}

function addNumbers(a, b) {
  return a + b;
}


const addFive = myBind(addNumbers, null, 5);

console.log(addFive(10));

