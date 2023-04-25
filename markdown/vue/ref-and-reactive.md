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

在使用`watch`直接接受`ref`作为监听对象, 并在回调函数中返回解包后的值

```vuejs
const counter = ref(0)

watch(counter, count => {
  // 这时的 count 已经解包, 不再需要 `.value`
  console.log(count) 
})
```

以及可以在模板中自动解包

```vuejs
<template>
  <button @click="counter += 1">Counter is {{ counter }}</button>
</template>
```

一些更深的思考比如: 

```vuejs
<script setup>
import { ref, reactive } from 'vue'

const name = ref('zhangsan')
// 这时 如果使用下面的操作, 会发生什么呢?
const anotherName = ref(name)

</script>
```


# reactive 

