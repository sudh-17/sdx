const nameKey = Symbol()
export default class Solution {
  constructor(name) {
    this[nameKey] = name
  }

  getName() {
    return this[nameKey]
  }
}
