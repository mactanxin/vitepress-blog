# 自己动手实现一个 Array.flat() 方法

假设有数组 `let arr = [1, 2, [3, 4, 5, [6, 7], 8], 9, 10, [11, [12, 13]]]`

要求返回一个扁平的一维数组.
 
方法1: 
```javascript
let arr = [1, 2, [3, 4, 5, [6, 7], 8], 9, 10, [11, [12, 13]]]

const flat = function (arr) {
  while (arr.some(item => Array.isArray(item))) {
      arr = [].concat(...arr);
  }
  return arr
}
```

方法2: 使用字符串

```javascript
return arr.join(',').split(',').map(item => Number(item))
```