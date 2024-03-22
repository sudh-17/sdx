Function.prototype.myCall = function (ctx, ...args) {
  ctx = ctx == null ? globalThis : Object(ctx)
  const fnKey = Symbol()
  // ctx[fnKey] = this
  Object.defineProperty(ctx, fnKey, {
    value: this,
    enumerable: false
  })
  const result = ctx[fnKey](...args)
  delete ctx[fnKey]
  return result
}

// 测试
function method(a, b) {
  console.log(this, a, b)
}

const obj = { name: 'obj' }
method.myCall(obj, 1, 2) // { name: 'obj' } 1 2
