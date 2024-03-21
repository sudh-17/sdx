不借助apply或bind实现call


```js
Function.prototype.myCall = function (ctx, ...args) {
  // 判断ctx是否为null，如果是，则将ctx设置为全局对象globalThis
  ctx = ctx == null ? globalThis : Object(ctx)
  // 创建一个独一无二的key，用于存储函数
  const fnKey = Symbol()
  // 将函数存储到ctx中
  // ctx[fnKey] = this
  Object.defineProperty(ctx, fnKey, {
    value: this,
    enumerable: false
  })
  // 调用函数并传入参数
  const result = ctx[fnKey](...args)
  // 删除函数
  delete ctx[fnKey]
  // 返回结果
  return result
}

// 测试
function method(a, b) {
  console.log(this, a, b)
}

const obj = { name: 'obj' }
method.myCall(obj, 1, 2) // { name: 'obj' } 1 2
