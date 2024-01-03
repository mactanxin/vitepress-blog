# 使用shallowRef减少不必要的更新

作为 `ref` 的浅层作用形式, 与`ref` 不同, shallowRef 不会深层递归地转为响应式.
只有只管的对  `.value` 进行更新, 才会触发更新.

```vue
<script setup>
import { shallowRef } from 'vue'
const state = shallowRef({count : 1})

// no deep reactivity
// better performance
state.value.count = 2; //不会触发更改

state.value = { count : 2 } // 会触发
</script>
```



同理, 可以使用 `shallowRef` 创建一个 `signal`



```vue
<script setup>
  import { shallowRef, triggerRef } from 'vue'
  
  export const createSignal(value, options) {
    // create a reactive reference of value
    const r = shallowRef(value)
    
    // getter
    const get = () => r.value
    
    // setter takes any value in
    const set = (v) => {
      // if setter is a function, evoke the function
      // otherwise set value
      r.value = typeof v === 'function' ? v(r.value) : v
      if (options.equals === false) triggerRef(r)
    }
    
    return [get, set]
  }
</script>
```

