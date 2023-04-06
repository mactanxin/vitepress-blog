# 如何比较两个数组是否相等

今天遇到有人问我一个问题, 如何判断两个数组是否相等, 是用 `==` 呢 还是 `===` 呢?
例如:
```javascript
let arr = [1];
let another = [1];

arr == another;
arr === another;
```

结论是: 都不是.

无论用哪个都会返回 `false`  

那想要判断两个数组是否完全一样呢🤔?  

自己动手写一个

```javascript
Array.prototype.equals = function (arr) {
  if(arr.length !== this.length) {
    return false;
  }
  for (var i = arr.length - 1; i >= 0; i--) {
    if (this[i] !== arr[i]) {
      return false;
    }
  }
  return true;
}
```