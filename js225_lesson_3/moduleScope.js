// Use "node moduleScope.js" to run this code

var foo = 'foo';
// with `var`, the variable is in the module scope
// and not added to the global object

bar = 'bar';
// without `var` declaration, the variable is in the global scope
// and added to the global object

let qux = 'qux';
// with `qux`, the variable is in the module scope
// and is not added to the global object

console.log(global.foo);    // => undefined
console.log(global.bar);    // => bar
console.log(global.qux);    // => undefined
console.log(qux);           // => qux
