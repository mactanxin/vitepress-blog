# 实现MVVM

MVVM作为数据绑定的入口，整合Observer、Compile和Watcher三者，通过Observer来监听自己的model数据变化，通过Compile来解析编译模板指令，最终利用Watcher搭起Observer和Compile之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据model变更的双向绑定效果。

一个简单的MVVM构造器是这样子：

```javascript
function MVVM(options) {
    this.$options = options;
    var data = this._data = this.$options.data;
    observe(data, this);
    this.$compile = new Compile(options.el || document.body, this)
}
```

但是这里有个问题，从代码中可看出监听的数据对象是 `options.data` ，每次需要更新视图都必须通过
```
var vm = new MVVM({data:{name: 'tan'}}); 
vm._data.name = 'xin';
```
这样的方式来改变数据.  


显然不符合我们一开始的期望，我们所期望的调用方式应该是这样的： 
```
var vm = new MVVM({data: {name: 'tan'}}); 
vm.name = 'xin';
```

所以这里需要给MVVM实例添加一个属性代理的方法，使访问vm的属性代理为访问 `vm._data` 的属性，改造后的代码如下：

```javascript
function MVVM(options) {
    this.$options = options;
    var data = this._data = this.$options.data, me = this;
    // 属性代理，实现 vm.xxx -> vm._data.xxx
    Object.keys(data).forEach(function(key) {
        me._proxy(key);
    });
    observe(data, this);
    this.$compile = new Compile(options.el || document.body, this)
}

MVVM.prototype = {
  _proxy: function(key) {
    var me = this;
        Object.defineProperty(me, key, {
            configurable: false,
            enumerable: true,
            get: function proxyGetter() {
                return me._data[key];
            },
            set: function proxySetter(newVal) {
                me._data[key] = newVal;
            }
        });
  }
};
```

这里主要还是利用了 `Object.defineProperty()` 这个方法来劫持了vm实例对象的属性的读写权，使读写vm实例的属性转成读写了 `vm._data `的属性值

至此，全部模块和功能已经完成了, 一个简单的MVVM模块已经实现，其思想和原理大部分来自经过简化改造的vue源码，猛戳这里可以看到本文的所有相关代码

## 总结

本文主要围绕
1. “几种实现双向绑定的做法”
2. “实现Observer”
3. “实现Compile”
4. “实现Watcher”
5. “实现MVVM”这几个模块来阐述了双向绑定的原理和实现。  
并根据思路流程渐进梳理讲解了一些细节思路和比较关键的内容点，以及通过展示部分关键代码讲述了怎样一步步实现一个双向绑定MVVM。  
文中肯定会有一些不够严谨的思考和错误，欢迎大家指正，有兴趣欢迎一起探讨和改进~