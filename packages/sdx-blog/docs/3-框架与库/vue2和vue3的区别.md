vue2 和 vue3 的区别

- 首先两者管理源码的方式不同，而vue2 的核心都用一个项目管理，而vue3 使用monorepo的方式管理源码，因此 vue3 对摇树优化更加友好。因为这样用户可以按需使用 vue3 的功能，而不是全部引入。比如我只需要响应式的核心模块那直接引入 reactive 即可，不需要引入整个 vue3。

- vue3 增加了 Composition API，可以更好的逻辑复用，让代码更加优雅。同时摈弃了 mixin，这种可能会导致命名冲突，变量来源不清晰的方式。

- vue3 对ts 支持更加友好，因为 vue3 本身就是基于 ts 重写的，因此对 ts 的支持更加友好。开发者可以更好的利用 ts 来进行类型检查和推断。

- vue3 性能更好，因为 vue3 的响应式模块是基于 Proxy 的，而 vue2 使用的 Object.defineProperty。首先proxy的功能更全面，它除了能拦截setter和getter之外，还能拦截处理数组的增删函数，因此在处理数组的时候比后者更有优势。其次 Proxy 定义的响应式属性不会想 Object.defineProperty 那样会给所有属性遍历一次，而是在需要用到的时候才会去调用，因此执行性能好一些。 但是 Proxy 目前兼容性不好，因为一些浏览器不支持。
defineProperty 虽然兼容性好，但是它只能劫持对象的属性，因此需要对每个属性进行遍历，这会带来性能上的损耗。而 Proxy 可以直接代理对象，因此不需要对每个属性进行遍历。并且proxy 可以拦截的方法不仅仅是setter 和 getter，它还可以拦截更多的操作，比如 deleteProperty, has, ownKeys 等。因此 proxy 比 defineProperty 更加灵活。

- vue3 双向绑定的优化，vue2 双绑(v-model) 只能作用在一个属性上。而 vue3 支持多个属性，比如 v-model:name="name" v-model:age="age"。

- vue3 增加了一些内置组件，比如传送门，Teleport 等。让开发者开发一些组件更加方便。比如模态框，toast 等。此外还有 Suspense， 它用于处理组件的异步加载和错误状态。它允许你在组件加载或发生错误时显示备用内容。

- vue3 支持 Fragment 了，组件可以使用多根节点，vue2 只支持一个根节点。

- vue3 的生命周期钩子函数更加合理，比如 vue2 的 beforeDestroy 钩子函数在 vue3 中改名为 beforeUnmount。并且增加了一些新的钩子函数，让vue 可以适应更多场景。比如 onRenderTracked, onRenderTriggered 等。

- vue3 的指令的生命周期钩子函数更加合理，采用了和组件生命周期钩子函数的命名方式，让开发者更加容易理解。

- diff 算法不同，vue2 的 diff 算法是双端比较，而 vue3 的 diff 算法是同层比较。

  **vue2中的diff算法**

  遍历每一个虚拟节点，进行虚拟节点对比，并返回一个patch对象，用来存储两个节点不同的地方。用patch记录的消息去更新dom

  缺点：比较每一个节点，而对于一些不参与更新的元素，进行比较是有点消耗性能的。
  特点：特别要提一下Vue的patch是即时的，并不是打包所有修改最后一起操作DOM，也就是在vue中边记录变更新。（React则是将更新放入队列后集中处理）。

  **vue3中的diff算法**

  在初始化的时候会给每一个虚拟节点添加一个patchFlags，是一种优化的标识。只会比较patchFlags发生变化的节点，进行识图更新。而对于patchFlags没有变化的元素作静态标记，在渲染的时候直接复用。
