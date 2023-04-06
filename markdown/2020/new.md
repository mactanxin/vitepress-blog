# 如何实现一个 new 关键字


```javascript
function _new (func, ...rest) {
  const obj = Object.create(func.prototype)

  // 执行构造函数，改变构造函数的this指针，指向新创建的对象（新对象也就有了构造函数的所有属性）
  func.apply(obj, rest)
  return obj
}
```
