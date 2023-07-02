# TS Challenge

##  Easy



4. 实现 `Pick`

   ```typescript
   type MyPick<T, K> = {
   	[k in K]: T[k]
   }
   ```



7. 实现 `Readonly`

   

   ```typescript
   type MyReadOnly<T> = {
   	readonly [P in keyof T]: T[P]
   }
   ```

   

11. 实现 `Tuple` 转 对象

    ```typescript
    type TupleToObject<T extends readonly (string|number)[]> {
      [P in T[number]]: P
    }
    ```



14. 第一个元素

    ```typescript
    type First<T extends any[]> = T extends [] ? never : T[0]
    ```

    

43. 实现 `Exclude`

    ```typescript
    type MyExclude<T, U> = T extends U ? never : T
    
    /* _____________ 测试用例 _____________ */
    import type { Equal, Expect } from '@type-challenges/utils'
    
    type cases = [
      Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a'>, 'b' | 'c'>>,
      Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a' | 'b'>, 'c'>>,
      Expect<Equal<MyExclude<string | number | (() => void), Function>, string | number>>,
    ]
    ```



268. 实现 `if`

     ```typescript
     type If<C, T, F> = C extends true ? T : F
     ```

     

533. 实现`Concat`

     ```typescript
     type Concat<T extends readonly any[], U extends readonly any[]> = [...T, ...U]
     ```

     

     实现`Equals`

     ```typescript
     type Equals<X, Y> =
         (<T>() => T extends X ? 1 : 2) extends
         (<T>() => T extends Y ? 1 : 2) ? true : false;
     ```



898. 实现`Includes`

     ```typescript
     type Includes<Value extends any[], Item> =
     	Equals<Value[0], Item> extends true
     		? true
     		: Value extends [Value[0], ...infer rest]
     			? Includes<rest, Item>
     			: false;
     ```

     

3057. 实现`push`

      ```typescript
      type Push<T extends any[], U> = [...T, U]
      
      /* _____________ 测试用例 _____________ */
      import type { Equal, Expect } from '@type-challenges/utils'
      
      type cases = [
        Expect<Equal<Push<[], 1>, [1]>>,
        Expect<Equal<Push<[1, 2], '3'>, [1, 2, '3']>>,
        Expect<Equal<Push<['1', 2, '3'], boolean>, ['1', 2, '3', boolean]>>,
      ]
      ```

      

3060. 实现`unshift` 

      ```typescript
      
      type Unshift<T extends any[], U> = [U, ...T]
      
      /* _____________ 测试用例 _____________ */
      import type { Equal, Expect } from '@type-challenges/utils'
      
      type cases = [
        Expect<Equal<Unshift<[], 1>, [1]>>,
        Expect<Equal<Unshift<[1, 2], 0>, [0, 1, 2]>>,
        Expect<Equal<Unshift<['1', 2, '3'], boolean>, [boolean, '1', 2, '3']>>,
      ]
      ```


3312. 实现`Parameters`

      ```typescript
      // type MyParameters<T extends (...args: any[]) => any> = any
      type MyParameters<T extends (...args: any[]) => any> = T extends (...any: infer S) => any ? S : any 
      
      /* _____________ 测试用例 _____________ */
      import type { Equal, Expect } from '@type-challenges/utils'
      
      const foo = (arg1: string, arg2: number): void => {}
      const bar = (arg1: boolean, arg2: { a: 'A' }): void => {}
      const baz = (): void => {}
      
      type cases = [
        Expect<Equal<MyParameters<typeof foo>, [string, number]>>,
        Expect<Equal<MyParameters<typeof bar>, [boolean, { a: 'A' }]>>,
        Expect<Equal<MyParameters<typeof baz>, []>>,
      ]
      ```

      

## Medium

2. 获取函数返回类型

   ```typescript
   type MyReturnType<T extends Function> = T extends (...args: any) => infer R ? R : never
   
   /* _____________ 测试用例 _____________ */
   import type { Equal, Expect } from '@type-challenges/utils'
   
   type cases = [
     Expect<Equal<string, MyReturnType<() => string>>>,
     Expect<Equal<123, MyReturnType<() => 123>>>,
     Expect<Equal<ComplexObject, MyReturnType<() => ComplexObject>>>,
     Expect<Equal<Promise<boolean>, MyReturnType<() => Promise<boolean>>>>,
     Expect<Equal<() => 'foo', MyReturnType<() => () => 'foo'>>>,
     Expect<Equal<1 | 2, MyReturnType<typeof fn>>>,
     Expect<Equal<1 | 2, MyReturnType<typeof fn1>>>,
   ]
   
   type ComplexObject = {
     a: [12, 'foo']
     bar: 'hello'
     prev(): number
   }
   
   const fn = (v: boolean) => v ? 1 : 2
   const fn1 = (v: boolean, w: any) => v ? 1 : 2
   ```



3. 实现`Omit`

   ```typescript
   
   type MyOmit<T, K extends keyof T> = {
     [P in keyof T as P extends K ? never : P]:T[P]
   }
   
   /* _____________ 测试用例 _____________ */
   import type { Equal, Expect } from '@type-challenges/utils'
   
   type cases = [
     Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
     Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>,
   ]
   
   // @ts-expect-error
   type error = MyOmit<Todo, 'description' | 'invalid'>
   
   interface Todo {
     title: string
     description: string
     completed: boolean
   }
   
   interface Expected1 {
     title: string
     completed: boolean
   }
   
   interface Expected2 {
     title: string
   }
   ```

   

8. 对象部分属性只读

   ```typescript
   type MyReadonly2<T, K extends keyof T = keyof T> = {
     [p in keyof T as p extends K? never: p]: T[p]
   } & {
     readonly [p in K]: T[p]
   }
   
   /* _____________ 测试用例 _____________ */
   import type { Alike, Expect } from '@type-challenges/utils'
   
   type cases = [
     Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
     Expect<Alike<MyReadonly2<Todo1, 'title' | 'description'>, Expected>>,
     Expect<Alike<MyReadonly2<Todo2, 'title' | 'description'>, Expected>>,
     Expect<Alike<MyReadonly2<Todo2, 'description' >, Expected>>,
   ]
   
   // @ts-expect-error
   type error = MyReadonly2<Todo1, 'title' | 'invalid'>
   
   interface Todo1 {
     title: string
     description?: string
     completed: boolean
   }
   
   interface Todo2 {
     readonly title: string
     description?: string
     completed: boolean
   }
   
   interface Expected {
     readonly title: string
     readonly description?: string
     completed: boolean
   }
   ```

   

10. 实现元祖转集合

    ```typescript
    type TupleToUnion<T extends any[]> = T[number]
    
    /* _____________ 测试用例 _____________ */
    import type { Equal, Expect } from '@type-challenges/utils'
    
    type cases = [
      Expect<Equal<TupleToUnion<[123, '456', true]>, 123 | '456' | true>>,
      Expect<Equal<TupleToUnion<[123]>, 123>>,
    ]
    ```

    

15. 最后一个元素

    ```typescript
    type Last<T extends any[]> = [never, ...T][T['length']]
    
    /* _____________ 测试用例 _____________ */
    import type { Equal, Expect } from '@type-challenges/utils'
    
    type cases = [
      Expect<Equal<Last<[2]>, 2>>,
      Expect<Equal<Last<[3, 2, 1]>, 1>>,
      Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>,
    ]
    ```

    

16. 实现`Pop`

    ```typescript
    type Pop<T extends any[]> = T extends [...infer U, any] ? U : never
    
    /* _____________ 测试用例 _____________ */
    import type { Equal, Expect } from '@type-challenges/utils'
    
    type cases = [
      Expect<Equal<Pop<[3, 2, 1]>, [3, 2]>>,
      Expect<Equal<Pop<['a', 'b', 'c', 'd']>, ['a', 'b', 'c']>>,
      Expect<Equal<Pop<[]>, []>>,
    ]
    ```

    一些举一反三

    ```typescript
    type Push<T extends unknown[], U> = [...T, U]
    type Shift<T extends unknown[]> = T extends [unknown, ...infer U] ? U : never
    type Unshift<T extends unknown[], U> = [U, ...T]
    ```

20. 实现`Promise.all`

    ```typescript
    declare function PromiseAll<T extends any[]>(values: readonly [...T]): Promise<{
      [key in keyof T]: Awaited<T[key]>
    }>
    
    /* _____________ 测试用例 _____________ */
    import type { Equal, Expect } from '@type-challenges/utils'
    
    const promiseAllTest1 = PromiseAll([1, 2, 3] as const)
    const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const)
    const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)])
    const promiseAllTest4 = PromiseAll<Array<number | Promise<number>>>([1, 2, 3])
    
    type cases = [
      Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
      Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
      Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>,
      Expect<Equal<typeof promiseAllTest4, Promise<number[]>>>,
    ]
    ```

    

106. 实现`TrimLeft`

     ```typescript
     /* _____________ 你的代码 _____________ */
     
     type Space = ' ' | '\n' | '\t'
     type TrimLeft<S extends string> = S extends `${Space}${infer R}` ? TrimLeft<R> : S
     
     /* _____________ 测试用例 _____________ */
     import type { Equal, Expect } from '@type-challenges/utils'
     
     type cases = [
       Expect<Equal<TrimLeft<'str'>, 'str'>>,
       Expect<Equal<TrimLeft<' str'>, 'str'>>,
       Expect<Equal<TrimLeft<'     str'>, 'str'>>,
       Expect<Equal<TrimLeft<'     str     '>, 'str     '>>,
       Expect<Equal<TrimLeft<'   \n\t foo bar '>, 'foo bar '>>,
       Expect<Equal<TrimLeft<''>, ''>>,
       Expect<Equal<TrimLeft<' \n\t'>, ''>>,
     ]
     ```

     
