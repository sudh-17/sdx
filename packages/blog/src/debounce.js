// function db(fn, delay) {
//   let timer = null
//   return function () {
//     clearTimeout(timer)
//     timer = setTimeout(() => {
//       fn.apply(this, arguments)
//     }, delay)
//   }
// }

function throttle(fn, limit) {
  let timer = null
  let lastExec = 0
  return function () {
    let context = this
    let args = arguments
    let now = Date.now()
    if (now - lastExec < limit) {
      clearTimeout(timer)
      timer = setTimeout(function () {
        lastExec = now
        fn.apply(context, args)
      }, limit - (now - lastExec))
    } else {
      lastExec = now
      fn.apply(context, args)
    }
  }
}

function throttle(func, limit) {  
  let lastExec = 0; // 上次执行的时间  
  let timeout; // setTimeout 的标识符  
  
  return function throttled() {  
    const context = this;  
    const args = arguments;  
    const now = Date.now(); // 当前时间  
  
    if (now - lastExec < limit) {  
      // 如果距离上次执行的时间小于限制时间，则清除之前的定时器并重新设置  
      if (timeout) {  
        clearTimeout(timeout);  
      }  
      timeout = setTimeout(function() {  
        lastExec = Date.now(); // 更新上次执行的时间  
        func.apply(context, args); // 执行函数  
      }, limit - (now - lastExec));  
    } else {  
      lastExec = now; // 更新上次执行的时间  
      func.apply(context, args); // 执行函数  
    }  
  };  
}

function handleClick(a, b) {
  console.log('点击事件被触发', a, b)
}

let a = throttle(handleClick, 1000)
for(let i = 0; i < 10; i++) {
  a(i, i * 2)
}