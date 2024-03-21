class User {
  private name = null
  constructor(name) {
    this.name = name
  }

  getName() {
    return this.name
  }
}

console.log(new User('张三').getName()) // 输出: 张三
