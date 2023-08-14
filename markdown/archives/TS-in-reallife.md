# 一些在实战中总计的TS小技巧

1. Union type 绑定关系
通过使用 `Union` 类型来绑定关系,
例如:
在开发中,
遇到某些需要根据同级别其他属性的类型来绑定属性类型时,
```typescript
type Person = {
    name: string;
    age: number;
    gender: 'male' | 'female';
}
```

这时如果 `gener` 是 `male` 的话, 需要新增一个 `strength` 属性,
如果是 `female` 的话, 需要一个 `makeup` 属性
如果用 `?` 来表示这个属性是可选的, 就会在开发中发现两个属性都可以被编辑器提示

这时就可以用`Union` type解决

```typescript
type Person = {
    name: string;
    age: number
} & ({
    gender: 'male'
    strength: number
} | {
    gener: 'female'
    makeup: string
})

```

需要注意的是, 这个技巧TS中的工具类型例如: `Omit`, `Pick`等不起作用
需要自己实现一个:

```typescript
type UnionOmit<T, K extends string | number | symbol> = 
    T extends unknown 
    ? Omit<T, K> 
    : never
```
