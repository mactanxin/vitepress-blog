# ref 的一些用法

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

统一使用`ref`操作可以降低这种心智负担.

一些更深的思考比如: 

```vuejs
<script setup>
import { ref, reactive } from 'vue'

const name = ref('zhangsan')
// 这时 如果使用下面的操作, 会发生什么呢?
const anotherName = ref(name)


</script>
```
