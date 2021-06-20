function myBind(func, contextObj) {
  return function(...args) {
    return func.apply(contextObj, args);
  }
}

let nums = {
  a: 1,
  b: 2,
}

function add(arg1, arg2) {
  return arg1 + arg2;
}

let addArgs = myBind(add, nums);

console.log(addArgs(1, 2));