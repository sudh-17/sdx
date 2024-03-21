// function* a() {
//   for (let i = 0; i < 5; i++) {
//     yield i
//   }
//   return 'done'
// }
// let ite = a()
// console.log(ite.next())
// console.log(ite.next())
// console.log(ite.next())
// console.log(ite.next())
// console.log(ite.next())
// console.log(ite.next())

// 迭代器比较两个字符串大小
function compareStrings(str1, str2) {
  let iterator1 = walk(str1)
  let iterator2 = walk(str2)
  while (true) {
    it1 = iterator1.next()
    it2 = iterator2.next()
    if (it1.done && it2.done) return 0
    if (it1.done) return -1
    if (it2.done) return 1
    if (it1.value < it2.value) return -1
    if (it1.value > it2.value) return 1
  }
}

function* walk(str) {
  let n = ''
  for(let i = 0; i < str.length; i++) {
    if (str[i] === '-') {
      yield Number(n)
      n = ''
    } else {
      n += str[i]
    }
  }
  if (n) {
    yield Number(n)
  }
}

let res = compareStrings('123-23-12', '123-456-90') // true
console.log(res)
// let i = walk('123-456-12')
// console.log(i.next())
// console.log(i.next())
// console.log(i.next())
// console.log(i.next())