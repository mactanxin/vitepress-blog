# The newer the better



## Better DX in TypeScript



### Imported types in `<script setup>`



```typescript
// types.ts
export type BaseProps = {
  baseId: number
}
```



现在在 `v3.3` 中 ,可以 *引入且组合类型*

```vue
<script setup lang="ts">
  import type { BaseProps } from './types'
  
  const { msg, baseId } = defineProps<BaseProps & { msg: string }>()
</script>
```



### Generics component

在 `<script setup>` 中新增了 一个新的attribute: `generic`



```vue
<script setup lang="ts" generic="T">
  defineProps<{
    items: T[]
    seleted: T
  }>()
</script>
```



以及多个参数和继承



```vue
<script setup lang="ts" generic="T extends string | number, U extends Item">
  import type { Item } from './dummy-types'
  
  defineProps<{
    id: T
    list: U[]
  }>()
</script>
```



### 更好的 `defineEmits`

`3.3` 之前的 `defineEmits` 也还行, 但是新版中更直观了



```vue
<script setup lang="ts">
const emit = defineEmits<{
  foo: [id: number]
  bar: [name: string, ...rest: any[]]
}>()
</script>
```





### 具有类型的 `slots` 来啦



现在的 `defineSlots` 可以声明类型了



```vue
<script setup lang="ts">
defineSlots<{
  default?: (props: { msg: string }) => any
  item?: (props: {id: number}) => any
}>()
</script>
```

