# ref 

[官方文档](https://vuejs.org/api/reactivity-core.html)建议在`ref`中放入原始数据类型进行操作.

在实际开发中, 其实也可以放入对象和数组, 比如:

```vue
<script setup>
import { ref } from 'vue'

const users = ref(['zhangsan', 'lisi'])

console.log(users.value)
</script>
```

主要原因是如果在开发过程中存在大量的`ref` 与 `reactive` 和 普通js对象并行, 就会加重"我现在操作的是否是ref对象"的心智负担.  

统一使用`ref`操作可以降低这种心智负担.(虽然我不喜欢`.value`的操作)
1. 显示调用, 有明确的类型检查.
2. 想必`reactive`的局限更少

## 如何解决呢?

在使用`watch`直接接受`ref`作为监听对象, 并在回调函数中返回解包后的值

```vue
const counter = ref(0)

watch(counter, count => {
  // 这时的 count 已经解包, 不再需要 `.value`
  console.log(count) 
})
```

以及可以在模板中自动解包

```vue
<template>
  <button @click="counter += 1">Counter is {{ counter }}</button>
</template>
```

甚至可以用`reactive`再包一层:

```vue
const name = ref('zhangsan')

const user = reactive({
  name,
  age: 18
})

// 这时可以操作 user.name, 不在需要 user.name.value
user.name // zhangsan
```

## unref
这个在业务组件用到的不太多,  功能性组件更多一点.
因为可以在接收到一个未知类型的数据时候, 直接`unref(whatEverThisIs)`

大概得实现就是
```typescript
function unref<T>(r: Ref<T> | T): T {
  return isRef(r) ? r.value : r
}
```

实际使用的时候就无脑`unref`

```typescript
import { ref, unref } from 'vue'

function myTool(whatEverThisIs: any) {
  return unref(whatEverThisIs)
}
```

# 使用`MaybeRef`类型简化开发

```typescript
type MaybeRef<T> = T | Ref<T>

export function useTimeAgo(
  time: MaybeRef<Date | number | string>,
) {
  return computed(() => someFormatting(unref(time)))
}
```

## 将 `ref` 绑定一个已有的 `ref`

```typescript
import { ref, computed } from 'vue'
import { useTitle } from '@vueuse/core'

const name = ref('Hello')
const title = computed(() => {
  return `${name.value} my friend`
})

// 这时绑定
useTitle(title) // Hello my friend

name.value = `hi` // hi my friend
```

## 如果重复使用已有的`ref`会发生什么呢?

它会原样返回

```vue
<script setup>
import { ref, reactive } from 'vue'

const name = ref('zhangsan')
// 这时 如果使用下面的操作, 会发生什么呢?
const anotherName = ref(name)

name === anotherName // true

</script>
```

## 使用由 `ref` 和 `reactive` 组成的对象

```vue
<script setup>
import { ref, reactive } from 'vue'

function useMouse() {
  return {
      x: ref(0),
      y: ref(0)
    }
}
// 可以单独使用 x 或 y
const { x, y } = useMouse()
// 也可以使用 reactive

const mouse = reactive(useMouse())

// 这时这两种都可以使用, 也可以保留响应式
// 防止ES6 解构造成的响应式丢失
mouse.x === x.value
</script>

```
