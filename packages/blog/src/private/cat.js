// 优点：真正做到了私有
// 缺点：兼容性差，它是比较新的特性

class Cat {
  #name
  constructor(name) {
    this.#name = name
  }

  meow() {
    console.log(`${this.#name} says meow`)
  }
}
let cat = new Cat('Tom')
console.log(cat.#name) // 报错

