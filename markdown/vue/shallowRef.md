# 使用shallowRef减少不必要的更新

作为 `ref` 的浅层作用形式, 与`ref` 不同, shallowRef 不会深层递归地转为响应式.
只有只管的对  `.value` 进行更新, 才会触发更新.

```vue
import { shallowRef } from 'vue'
const state = shallowRef({count : 1})

state.value.count = 2; //不会触发更改

state.value = { count : 2 } // 会触发
```
