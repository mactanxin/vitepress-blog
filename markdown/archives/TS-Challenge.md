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

     