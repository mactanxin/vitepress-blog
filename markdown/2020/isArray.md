# JS中如何判断一个变量是数组

> TL;DR:   
> 可以使用 `Array.isArray` 方法   

假定我们需要在代码里检测接收到的变量是否为数组(赞美`TypeScript`), 那么在现代浏览器里使用 `Array.isArray()` 方法来判断,  
如果是老的浏览器, 那么可以根据[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray#Polyfill)的这个样例写一个

示例如下:  


```javascript
if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}
```

具体使用:

```javascript
let arr = ['🦉', '🐳', '🐿️'];
Object.prototype.toString.call(arr) === '[object Array]';
```
