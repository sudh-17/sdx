/**
 * 删除顺序数组中重复项
 * @param {*} arr 
 * @returns 
 */
function compress(arr) {
  let j = 0
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== arr[j]) {
      arr[++j] = arr[i]
    }
  }
  return a.slice(0, j+1)
}

// let a = [0, 1, 2, 2, 3, 3, 4]
// console.log(compress(a))  // [0, 1, 2, 3, 4]

/**
 * 移动零
 * @param {*} arr 
 * @returns 
 */
function move0(arr) {
  let i = 0,
    j = 0
  while (i < arr.length) {
    if (arr[i] !== 0) {
      arr[j++] = arr[i]
    }
    i++
  }
  return arr.slice(0, j)
}

// console.log(move0([0, 1, 0, 3, 12])) // [1, 3, 12, 0, 0]

/**
 * 最长不重复子串
 * @param {*} str 
 * @returns 
 */
function longestStr(str) {
  let map = new Map()
  let max = -Infinity
  let j = 0
  for(let i = 0; i < str.length; i++) {
    if(map.has(str[i]) && map.get(str[i]) >= j){
      j = map.get(str[i]) + 1
    }
    let len = i - j + 1
    max = Math.max(max, len)
    map.set(str[i], i)
  }
  return Math.min(max, str.length)
}
console.log(longestStr('abcabcbb')) // 3
console.log(longestStr('abckkkbxacccb')) // 5