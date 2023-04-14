# 3、实现Watcher

Watcher订阅者作为Observer和Compile之间通信的桥梁，主要做的事情是: 
1. 在自身实例化时往属性订阅器(dep)里面添加自己 
2. 自身必须有一个update()方法 
3. 待属性变动dep.notice()通知时，能调用自身的update()方法，并触发Compile中绑定的回调，则功成身退。

```javascript
function Watcher(vm, exp, cb) {
    this.cb = cb;
    this.vm = vm;
    this.exp = exp;
    // 此处为了触发属性的getter，从而在dep添加自己，结合Observer更易理解
    this.value = this.get(); 
}
Watcher.prototype = {
    update: function() {
        this.run(); // 属性值变化收到通知
    },
    run: function() {
        var value = this.get(); // 取到最新值
        var oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value, oldVal); // 执行Compile中绑定的回调，更新视图
        }
    },
    get: function() {
        Dep.target = this;  // 将当前订阅者指向自己
        var value = this.vm[exp]; // 触发getter，添加自己到属性订阅器中
        Dep.target = null;  // 添加完毕，重置
        return value;
    }
};
// 这里再次列出Observer和Dep，方便理解
Object.defineProperty(data, key, {
  get: function() {
    // 由于需要在闭包内添加watcher，所以可以在Dep定义一个全局target属性，暂存watcher, 添加完移除
    Dep.target && dep.addDep(Dep.target);
    return val;
  }
    // ... 省略
});
Dep.prototype = {
    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update(); // 调用订阅者的update方法，通知变化
        });
    }
};
```

实例化 `Watcher` 的时候，调用 `get()` 方法，通过 `Dep.target = watcherInstance` 标记订阅者是当前 `watcher` 实例，  
强行触发属性定义的 `getter` 方法，`getter` 方法执行的时候，就会在属性的订阅器 `dep` 添加当前 `watcher` 实例，  
从而在属性值有变化的时候，`watcherInstance` 就能收到更新通知。