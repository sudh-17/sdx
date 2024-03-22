const weak = new WeakMap()

export default class Dog {
  constructor(name) {
    weak.set(this, { name })
  }
  getName() {
    return weak.get(this).name // 使用WeakMap来访问私有属性
  }
}
