# Promise 按顺序执行

献丑了, 又献丑了. 最近遇到的问题:  
(感谢当时提问我的这位大神)

[Promise1, Promise2, Promise3, Promise4] 如何安装顺序依序执行?

```javascript
function generatePromiseFunc(index) {
    return function () {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(index)
                resolve(index)
            }, 1000)
        })
    }
}

const promise_list = []

for(let i = 0; i < 10; i++) {
    promise_list.push(generatePromiseFunc(i))
}
```

## 方法1:
使用 async 和 await 遍历,  
这里还被问到了如果遍历的话, 数组下标和执行顺序的问题,  
当时想了一下, 既然是await 应该是先执行完再下标更新, 结果答错了

```javascript
async function promise_queue(list) {
    let index = 0
    while (index >= 0 && index < list.length) {
        await list[index]()
        index++
    }
}
promise_queue(promise_list)
```

## 方法2
使用 `array` 的 `reduce()` 方法, 比如:

```javascript
let result = [1,2,5].reduce((accumulator, item) => {
  return accumulator + item;
}, 0); // <-- 初始值 0

console.log(result); // 8
```

实际code的时候大概是这样的:

```javascript

promise_list.reduce((prevPromise, nextPromise) => {
  return prevPromise.then(() => {
    return fakeFuncReturnsPromise(nextPromise);
  });
}, Promise.resolve());

```

更简洁一点的话还可以写成这样: 

```javascript

promise_list.reduce(async (prev, next) => {
  await prev;
  return fakeFuncReturnsPromise(next);
}, Promise.resolve());

```

~~好神奇的~~原理:
使用 `reduce` 的本意是接受一个函数作为累加器,对数组中的每个值进行缩减, 最终计算为一个值. 
但是数组里的值不一定要是数字, 也可以是别的内容, 比如这里的 `promise`.

最后总结一下代码片段:

```javascript
function generatePromiseFunc(index) {
    return function () {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(index)
                resolve(index)
            }, 1000)
        })
    }
}

const promise_list = []

for(let i = 0; i < 10; i++) {
    promise_list.push(generatePromiseFunc(i))
}

function fakeFuncReturnsPromise(nextPromise) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Resolve!`);
      resolve();
    }, 1000);
  });
}

promise_list.reduce(async (prev, next) => {
  await prev;
  return fakeFuncReturnsPromise(next);
}, Promise.resolve());
```

继续追问之: 那么为什么数组别的方法不行🤔?  
我们的目标是在当前的 `promise` 执行完之前不去执行下一个, 要完全同步的去执行, 那么:

1. Array.prototype.map()
2. Array.prototype.forEach()
3. Array.prototype.filter()
4. Array.prototype.some()
5. Array.prototype.every()

这几个~~弟弟~~都不行.

*Array.prototype.reduce()* 是特殊的存在.

`Array.prototype.reduce()`可以成功的原因是因为我们可以给当前的promise有返回值, 拿到这个之后再去执行后续的操作.