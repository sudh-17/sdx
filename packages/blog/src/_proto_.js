const r = console.log.call.call.call.call.call.apply(a => a, [1, 2])
console.log(r)
// console.log(console.log.call === Function.prototype.call) // true
// console.log(console.log.call.call === Function.prototype.call)  // true


// const r = Function.prototype.call.apply(a => a, [1, 2])

const fn = a => a
const r = fn.call(1,2)

console.log(r)