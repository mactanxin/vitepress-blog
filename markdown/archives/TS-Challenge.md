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

      