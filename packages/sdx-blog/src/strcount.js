let str = 'aabbbcc'

let res = [...str].reduce((sum, cur) => (sum[cur]++ || (sum[cur] = 1), sum), {})

console.log(res)