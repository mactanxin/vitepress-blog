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


## `as const`

通常使用一个 `const` 定义常量之后,
我们希望使用这个常量对象来获取他的值

例如: 

```typescript
const routes = {
    home: '/',
    about: '/'
}

const goToRoute = (route: "/" | "/about") => {};

```

但是这是当我们想要使用 `goToRoute(routes.admin)` 时, 就会报错,
因为 `routes.admin` 的类型是 `string`.

### 为什么会这样呢?

因为 `routes` 是一个 `const` , 但是 `routes.admin` 是可以修改.  


可以使用

```typescript
const goToRoute = (route: "/" | "/about") => {};
```

### 解决方式
就是使用 `as const`

```typescript
const routes = {
    home: '/',
    about: '/'
} as const
```

这样就可以使用 `goToRoute(routes.admin)` 了



### Object.freeze?

用 `Object.freeze`呢?



```typescript
const routes = Object.freeze({
    home: '/',
    about: '/'
})
```



针对单层对象可以, 但是`Object.freeze`不会处理深层的属性, 例如:



```typescript
const routes = Object.freeze({
    home: '/',
    about: '/',
    deep: {
      name: '/deep'
    }
})

// 这一行不会报错
routes.deep.name = '/hello'
```



### 获取 const 的值

```typescript
const routes = {
    home: '/',
    about: '/about',
    user: '/user'
} as const	
```





这时可以定义一个:



```typescript
type TypeOfRoutes = typeof routes;
```

此时 `TypeOfRoutes`的值就是变成了:



```typescript
const routes = {
    home: '/',
    about: '/about',
    user: '/user'
} as const

type TypeOfRoutes = typeof routes;

type Routes = (typeof routes)[keyof typeof routes]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/1367/answer
  > View solutions: https://tsch.js.org/1367/solutions
  > More Challenges: https://tsch.js.org
*/

type TypeOfRoutes = {
    readonly home: "/";
    readonly about: "/about";
    readonly user: "/user";
}
```



再从 `TypeOfRoutes`中提取实际的`value`



```typescript
type Routes = (typeof routes)[keyof typeof routes]
```



那么 `Routes`就变成了 ` "/" | "/about" | "/user"`, 就可以直接使用这个type了



```typescript
const goToRoute = (route: Route) => {}```
```

