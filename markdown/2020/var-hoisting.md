#关于变量的作用域, 作用域提升和查找

```javascript
// hello tom

var name = 'Tom';
(function() {
    if (typeof name == 'undefined') {
        name = 'Jack';
        console.log('Goodbye ' + name);
    } else {
        console.log('Hello ' + name);
    }
})();
```


## 第一题

> hello Tom

1. 首先在进入函数作用域当中，获取name属性
2. 在当前作用域没有找到name
3. 通过作用域链找到最外层，得到name属性
4. 执行else的内容，得到Hello Tom

示例代码: 

```javascript
var name = 'Tom';
(function() {
    console.info('name', name);
    console.info('typeof name', typeof name);
    if (typeof name == 'undefined') {
        name = 'Jack';
        console.log('Goodbye ' + name);
    } else {
        console.log('Hello ' + name);
    }
})();
```

## 第二题


```javascript
// goodbye jack

var name = 'Tom';
(function() {
    if (typeof name == 'undefined') {
        var name = 'Jack';
        console.log('Goodbye ' + name);
    } else {
        console.log('Hello ' + name);
    }
})();
```

> goodbye jack

1. var 声明的变量没有块作用域，变量会提升到最近的 function 作用域的上层，但此时只是声明了变量，并没有赋值，到实际运行了赋值语句之后才有值，在之前值为 undefined
2. IIFE内的var穿透了块作用域，name被提升至if()之前，且此时name为undefined。

> 为什么把var name改成let name，结果就变成Hello Tom了呢

3. var 存在提升关系， let不会提升。
