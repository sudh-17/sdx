---
layout: Basic
title: 练习页面
editLink: true
---


# 练习案例集合

[[toc]]


## 图片


## 表格
| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |

## 表情

:tada: :100:

## 容器

::: info
This is an info box.
:::
::: danger
This is an info box.
:::

### 容器自定义标题

::: danger STOP
危险区域，请勿继续
:::

::: details 点我查看代码
```js
console.log('Hello, VitePress!')
```
:::

## 代码块 与 代码块行高亮

```html{2}
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```

```html{2, 4}
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```

```js
export default {
  data () {
    return {
      msg: 'Highlighted!' // [!code highlight]
    }
  }
}
```
## frontmatter
<p style=color:red>
{{ $frontmatter.title }}
</p>

Guide content


## 使用 vue

<span v-for="i in 3">{{ i }}</span>


<script setup>
import { ref } from 'vue'
import { useData } from 'vitepress'
// import TextPanel from './.vitepress/components/TextPanel.vue'
import { data } from './data/example.data.js'

const count = ref(100)
const { page } = useData()
</script>

The count is: {{ count }}

<pre>{{ page }}</pre>

<pre>{{ data }}</pre>

<button :class="$style.button" @click="count++">Increment</button>

<style module>
.button {
  color: red;
  font-weight: bold;
}
</style>

## vue 组件

<TextPanel />

## 转义

This <span v-pre>{{ will be displayed as-is }}</span>

::: v-pre
{{ This will be displayed as-is }}`
:::


## 全局组件 

<my-tag >全局组件 </my-tag>