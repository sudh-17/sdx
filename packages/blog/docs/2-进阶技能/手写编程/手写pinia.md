# 手写 pinia

## 1. 定义 pinia

:::code-group

```js [index.js]
export { createPinia, storeKey } from './createPinia'
export { defineStore } from './defineStore'
```

```js [createPinia.js]
export const storeKey = Symbol()

export function createPinia() {
  const piniaStore = {
    _store: new Map(),
    install(app) {
      app.provide(storeKey, piniaStore)
      app.config.globalProperties.$pinia = piniaStore
      console.log('my-pinia 安装')
    }
  }
  return piniaStore
}
```

```js [defineStore.js]
import { getCurrentInstance, inject, computed, reactive } from 'vue'
import { storeKey } from './createPinia'
const extend = Object.assign

export function defineStore(idOrOptions, optionsOrSetup) {
  let id, options
  if (typeof idOrOptions === 'string') {
    id = idOrOptions
    options = optionsOrSetup
  } else {
    id = idOrOptions.id
    options = idOrOptions
  }
  function useStore() {
    const instance = getCurrentInstance()
    const piniaStore = instance && inject(storeKey)
    if (!piniaStore._store.has(id)) {
      if (typeof optionsOrSetup === 'function') {
        createSetupOptions(id, optionsOrSetup, piniaStore)
      } else {
        createOptionsStore(id, options, piniaStore)
      }
    }
    return piniaStore._store.get(id)
  }

  return useStore
}

function createSetupOptions(id, setup, piniaStore) {
  const reactiveStore = reactive({})
  const setupStore = setup()

  for (const key in setupStore) {
    if (typeof setupStore[key] === 'function') {
      setupStore[key] = wrapAction(setupStore[key])
    }
  }

  function wrapAction(action) {
    return function () {
      let ret = action.apply(reactiveStore, arguments)
      return ret
    }
  }

  extend(reactiveStore, setupStore)
  piniaStore._store.set(id, reactiveStore)
}

function createOptionsStore(id, options, piniaStore) {
  const { state, actions, getters } = options

  function setup() {
    const localState = state ? state() : {}
    const res = extend(
      localState,
      actions,
      Object.keys(getters).reduce((computedGetters, name) => {
        computedGetters[name] = computed(() => {
          //获取当前store的指向
          //先要获取整个store
          let store = piniaStore._store.get(id)
          return getters[name].call(store, store)
        })
        return computedGetters
      }, {})
    ) //返回的数据就是actions合并到localState对象中了
    return res
  }

  // 将setup函数完成的内容直接放置在_store的man对象中
  // piniaStore._store.set(id, setup())
  createSetupOptions(id, setup, piniaStore)
}
```

:::

## 2. 使用 pinia

**选项式**

```js [index.js]
import { defineStore } from '../my-pinia'
export const userStore = defineStore('user', {
  // 其他配置...
  state: () => ({
    name: 'Kiki',
    age: 23
  }),
  actions: {
    setName(val) {
      this.name = val
      return this.name
    },
    setAge(val) {
      this.age = val
    }
  },
  getters: {
    fullName(state) {
      return `James - ${state.name}`
    }
  }
})
```

**函数式**

```js [index.js]
import { defineStore } from '../my-pinia'
import { computed, ref } from 'vue'

export const userStore = defineStore('storeId', () => {
  const age = ref(23)
  const name = ref('jack')
  function setName(val) {
    name.value = val
    return name.value
  }
  /* const changeCount2 = ()=>{

    } */
  const fullName = computed(() => {
    return name.value + 100
  })

  return {
    age,
    name,
    setName,
    fullName
  }
})
```
