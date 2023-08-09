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

     

108. 实现`TrimRight`

     ```typescript
     type WhiteSpace = ' ' | '\n' | '\t'
     type Trim<S> = S extends `${WhiteSpace}${infer T}`|`${infer T}${WhiteSpace}`? Trim<T>:S
     
     /* _____________ 测试用例 _____________ */
     import type { Equal, Expect } from '@type-challenges/utils'
     
     type cases = [
       Expect<Equal<Trim<'str'>, 'str'>>,
       Expect<Equal<Trim<' str'>, 'str'>>,
       Expect<Equal<Trim<'     str'>, 'str'>>,
       Expect<Equal<Trim<'str   '>, 'str'>>,
       Expect<Equal<Trim<'     str     '>, 'str'>>,
       Expect<Equal<Trim<'   \n\t foo bar \t'>, 'foo bar'>>,
       Expect<Equal<Trim<''>, ''>>,
       Expect<Equal<Trim<' \n\t '>, ''>>,
     ]
     ```



110. `Capitalize`

     ```typescript
     type MyCapitalize<S extends string> = S extends `${infer F}${infer tail}` ? `${Uppercase<F>}${tail}` : S
     
     /* _____________ 测试用例 _____________ */
     import type { Equal, Expect } from '@type-challenges/utils'
     
     type cases = [
       Expect<Equal<MyCapitalize<'foobar'>, 'Foobar'>>,
       Expect<Equal<MyCapitalize<'FOOBAR'>, 'FOOBAR'>>,
       Expect<Equal<MyCapitalize<'foo bar'>, 'Foo bar'>>,
       Expect<Equal<MyCapitalize<''>, ''>>,
       Expect<Equal<MyCapitalize<'a'>, 'A'>>,
       Expect<Equal<MyCapitalize<'b'>, 'B'>>,
       Expect<Equal<MyCapitalize<'c'>, 'C'>>,
       Expect<Equal<MyCapitalize<'d'>, 'D'>>,
       Expect<Equal<MyCapitalize<'e'>, 'E'>>,
       Expect<Equal<MyCapitalize<'f'>, 'F'>>,
       Expect<Equal<MyCapitalize<'g'>, 'G'>>,
       Expect<Equal<MyCapitalize<'h'>, 'H'>>,
       Expect<Equal<MyCapitalize<'i'>, 'I'>>,
       Expect<Equal<MyCapitalize<'j'>, 'J'>>,
       Expect<Equal<MyCapitalize<'k'>, 'K'>>,
       Expect<Equal<MyCapitalize<'l'>, 'L'>>,
       Expect<Equal<MyCapitalize<'m'>, 'M'>>,
       Expect<Equal<MyCapitalize<'n'>, 'N'>>,
       Expect<Equal<MyCapitalize<'o'>, 'O'>>,
       Expect<Equal<MyCapitalize<'p'>, 'P'>>,
       Expect<Equal<MyCapitalize<'q'>, 'Q'>>,
       Expect<Equal<MyCapitalize<'r'>, 'R'>>,
       Expect<Equal<MyCapitalize<'s'>, 'S'>>,
       Expect<Equal<MyCapitalize<'t'>, 'T'>>,
       Expect<Equal<MyCapitalize<'u'>, 'U'>>,
       Expect<Equal<MyCapitalize<'v'>, 'V'>>,
       Expect<Equal<MyCapitalize<'w'>, 'W'>>,
       Expect<Equal<MyCapitalize<'x'>, 'X'>>,
       Expect<Equal<MyCapitalize<'y'>, 'Y'>>,
       Expect<Equal<MyCapitalize<'z'>, 'Z'>>,
     ]
     ```




116. `Replace`

     ```typescript
     type Replace<S extends string, From extends string, To extends string> = 
     From extends ''
     ? S
     : S extends `${infer V}${From}${infer R}`
       ? `${V}${To}${R}`
       : S
     
     /* _____________ 测试用例 _____________ */
     import type { Equal, Expect } from '@type-challenges/utils'
     
     type cases = [
       Expect<Equal<Replace<'foobar', 'bar', 'foo'>, 'foofoo'>>,
       Expect<Equal<Replace<'foobarbar', 'bar', 'foo'>, 'foofoobar'>>,
       Expect<Equal<Replace<'foobarbar', '', 'foo'>, 'foobarbar'>>,
       Expect<Equal<Replace<'foobarbar', 'bar', ''>, 'foobar'>>,
       Expect<Equal<Replace<'foobarbar', 'bra', 'foo'>, 'foobarbar'>>,
       Expect<Equal<Replace<'', '', ''>, ''>>,
     ]
     ```

117.  `ReplaceAll`

     ```typescript
     type ReplaceAll<S extends string, From extends string, To extends string> = From extends '' ? S : S extends `${infer R}${From}${infer Q}` ? `${ReplaceAll<R, From, To>}${To}${ReplaceAll<Q, From, To>}` : S;11
     
     /* _____________ 测试用例 _____________ */
     import type { Equal, Expect } from '@type-challenges/utils'
     
     type cases = [
       Expect<Equal<ReplaceAll<'foobar', 'bar', 'foo'>, 'foofoo'>>,
       Expect<Equal<ReplaceAll<'foobar', 'bag', 'foo'>, 'foobar'>>,
       Expect<Equal<ReplaceAll<'foobarbar', 'bar', 'foo'>, 'foofoofoo'>>,
       Expect<Equal<ReplaceAll<'t y p e s', ' ', ''>, 'types'>>,
       Expect<Equal<ReplaceAll<'foobarbar', '', 'foo'>, 'foobarbar'>>,
       Expect<Equal<ReplaceAll<'barfoo', 'bar', 'foo'>, 'foofoo'>>,
       Expect<Equal<ReplaceAll<'foobarfoobar', 'ob', 'b'>, 'fobarfobar'>>,
       Expect<Equal<ReplaceAll<'foboorfoboar', 'bo', 'b'>, 'foborfobar'>>,
       Expect<Equal<ReplaceAll<'', '', ''>, ''>>,
     ]
     ```

     



1042. `IsNever`

      ```typescript
      type IsNever<T> = Equal<T, never>
      
      /* _____________ Test Cases _____________ */
      import type { Equal, Expect } from '@type-challenges/utils'
      
      type cases = [
        Expect<Equal<IsNever<never>, true>>,
        Expect<Equal<IsNever<never | string>, false>>,
        Expect<Equal<IsNever<''>, false>>,
        Expect<Equal<IsNever<undefined>, false>>,
        Expect<Equal<IsNever<null>, false>>,
        Expect<Equal<IsNever<[]>, false>>,
        Expect<Equal<IsNever<{}>, false>>,
      ]
      ```

      

223. `IsAny`

     ```typescript
     type IsAny<T> = Equal<T, any>
     /* _____________ Test Cases _____________ */
     import type { Equal, Expect } from '@type-challenges/utils'
     
     type cases = [
       Expect<Equal<IsAny<any>, true>>,
     
       Expect<Equal<IsAny<undefined>, false>>,
       Expect<Equal<IsAny<unknown>, false>>,
       Expect<Equal<IsAny<never>, false>>,
       E
     ```



529. `Absolute`

     核心解法是，是将 T 转换为字符串，然后检查字符串前面是否有 `-`。 如果有，则返回 `-` 之后的字符串，否则返回已转换为字符串的 T。

     ```typescript
     
     type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer U}` ? U : `${T}`
     
     /* _____________ 测试用例 _____________ */
     import type { Equal, Expect } from '@type-challenges/utils'
     
     type cases = [
       Expect<Equal<Absolute<0>, '0'>>,
       Expect<Equal<Absolute<-0>, '0'>>,
       Expect<Equal<Absolute<10>, '10'>>,
       Expect<Equal<Absolute<-5>, '5'>>,
       Expect<Equal<Absolute<'0'>, '0'>>,
       Expect<Equal<Absolute<'-0'>, '0'>>,
       Expect<Equal<Absolute<'10'>, '10'>>,
       Expect<Equal<Absolute<'-5'>, '5'>>,
       Expect<Equal<Absolute<-1_000_000n>, '1000000'>>,
       Expect<Equal<Absolute<9_999n>, '9999'>>,
     ]
     ```



2688. `startsWith`

      ```typescript
      type StartsWith<T extends string, U extends string> = T extends `${U}${string}` ? true : false
      
      /* _____________ 测试用例 _____________ */
      import type { Equal, Expect } from '@type-challenges/utils'
      
      type cases = [
        Expect<Equal<StartsWith<'abc', 'ac'>, false>>,
        Expect<Equal<StartsWith<'abc', 'ab'>, true>>,
        Expect<Equal<StartsWith<'abc', 'abc'>, true>>,
        Expect<Equal<StartsWith<'abc', 'abcd'>, false>>,
        Expect<Equal<StartsWith<'abc', ''>, true>>,
        Expect<Equal<StartsWith<'abc', ' '>, false>>,
        Expect<Equal<StartsWith<'', ''>, true>>,
      ]
      ```

      

2693. `EndsWith`

      ```typescript
      type EndsWith<T extends string, U extends string> = T extends `${string}${U}` ? true : false
      
      /* _____________ 测试用例 _____________ */
      import type { Equal, Expect } from '@type-challenges/utils'
      
      type cases = [
        Expect<Equal<EndsWith<'abc', 'bc'>, true>>,
        Expect<Equal<EndsWith<'abc', 'abc'>, true>>,
        Expect<Equal<EndsWith<'abc', 'd'>, false>>,
        Expect<Equal<EndsWith<'abc', 'ac'>, false>>,
        Expect<Equal<EndsWith<'abc', ''>, true>>,
        Expect<Equal<EndsWith<'abc', ' '>, false>>,
      ]
      ```

      
