# Advanced TypeScript Exercises

If we have a type which is wrapped type like Promise. How we can get a type which is inside the wrapped type? For example if we have Promise<ExampleType> how to get ExampleType?

Take a look at below code. Write an utility type Transform which will take a generic type argument, and if it is a Promise it will evaluate to the type inside it.

```typescript
type X = Promise<string>
type Y = Promise<{ field: number }>

type ResultX = Transform<X>; // ResultX type equals string
type ResultY = Transform<Y>; // ResultY type equals { field: number }

/** here your answer **/
type Transform<A> = A extends Promise<infer Inner> ? Inner : never
```

## Understanding `infer`

We can use infer also with other types, consider example with Array:
```typescript
type InsideArray<A> = A extends Array<infer Inside> ? Inside : never

// Str is type string
type Str = InsideArray<Array<string>>
```

custom parameterized types?
```typescript
type Supprise<A> = { inside: A }
type UnpackSupprise<S> = S extends Supprise<infer Inside> ? Inside : never
// Num is type number
type Num = UnpackSupprise<Supprise<number>>
```

We can even use infer to get mapped types properties
```typescript
type User = {
    id: number,
    name: string,
}

type Doc = {
    id: string,
}

type GetProperty<T, Prop extends keyof T> = T extends { [K in Prop]: infer Value } ? Value : never

type UserId = GetProperty<User, 'id'>
type DocId = GetProperty<Doc, 'id'>
```

Convert to tuple
```typescript
type ABC<A, B, C> = { a: A, b: B, c: C }
type ABCIntoTuple<T> 
  = T extends ABC<infer A, infer B, infer C> ? [A, B, C] : never
type Example = ABC<string, boolean, number>
type ExampleTuple = ABCIntoTuple<Example> 
```



# Part 2

In this question I will ask you, why TS fails here. And I can say there is a valid reason why such construct is wrong, its not a language bug. Can you spot why, and what is example type which proves TypeScript rightly prevents such code to compile?

```
type User = {
  id: number;
  kind: string;
};

function makeCustomer<T extends User>(u: T): T {
  // Below error, why?
  return {
    id: u.id,
    kind: 'customer'
  }
}
```



when `extends` only `extends`



At the first look object which is returned by `makeCustomer` is valid `User` type as it has both needed fields defined in the `User`. The crucial thing to understand is that we work here with type variable `T` which extends from `User` but it doesn't mean it is `User`. `T` is assignable to `User`, so it needs to have all fields which `User` has, but, it can have more fields!

Yes and this is exactly the issue, returned object is a `User` and pass all constraints of it, but doesn't pass all constraints of `T` which can have additional fields. We don't know what are those fields though, so in order to fix the typing we should make an object which has all fields of `T`, and we know all fields of `T` are in argument `u`. We can then use spread operator in order to spread all unknown fields to the newly created object.

```typescript
function makeCustomer<T extends User>(u: T): T {
  // no error
    return {
    ...u, // spread all properties of u being T
    id: u.id, // yes redundant line, leaving it for consistency
    kind: 'customer'
  }
}
```