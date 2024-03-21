# EsModule 在浏览器的工作原理

## 案例代码

::: code-group

```html [index.html]
<body>
  <script type="module" src="./main.js"></script>
</body>
```

```js [main.js]
import foo from './foo.js'
import('./dynamic.js').then(module => {
  console.log('main', module.default)
})

import bar from './bar.js'
console.log('main', foo, bar)
```

```js [foo.js]
import bar from './bar.js'
console.log('foo', bar)
export default 'foo'
```

```js [bar.js]
console.log('bar')
export default 'bar'
```

```js [dynamic.js]
import bar from './bar.js'
console.log('dynamic', bar)
export default 'dynamic'
```

:::

##  代码的解析与执行过程

浏览器会把 main.js 模块路径补全（包括协议端口，文件路径）。如下面./main.js 会被补全为 http://xxx/main.js。 补全路径之后下载模块，并解析其中的代码。把静态导入提前。下面 bar 的导入会被提前到顶部。

```js
import foo from './foo.js'
import bar from './bar.js' // [!code ++]
import('./dynamic.js').then(module => {
  console.log('main', module.default)
})

import bar from './bar.js' // [!code --]
console.log('main', foo, bar)
```

因为 main.js 静态导入了foo，所以浏览器接着下载模块foo 并解析该模块代码。同理，foo模块静态导入bar，所以浏览器接着下载模块bar 并解析该模块代码。如此递归的解析。先解析完的模块先执行。到此，bar 模块先解析完成，然后bar模块就可以执行了。打印了
```bash
bar
```
接着 foo 模块也解析完成，然后 foo 模块就可以执行了。输出了

```bash
foo bar
```

然后回到 main.js 的解析工作。因为它也静态导入了 bar模块，因为在foo 模块中已经解析过 bar 模块了，所以bar 可以直接执行。所以输出了
```bash
bar
```
main.js 模块中 dynamic 是动态导入的，它是异步加载的。所以代码会继续往后执行，输出
```bash
main foo bar
```
所有同步代码执行完成之后，解析动态导入的模块 dynamic.js。模块内静态导入了 bar， 已经解析过，直接执行输出
```bash
dynamic bar
```
最后 main.js 模块执行，拿到 promise 的结果，输出
```bash
main dynamic
```
