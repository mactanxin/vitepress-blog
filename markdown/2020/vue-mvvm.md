# 自己动手系列之: 手写一个MVVM (Part 1)
*如何实现双向绑定mvvm*

> 本文主要做什么？
> 1. 了解vue的双向数据绑定原理以及核心代码模块
> 2. 了解如何实现双向绑定
> 为了便于说明原理与实现，本文相关代码主要摘自 [vue源码](https://github.com/vuejs/vue) , 并进行了简化改造，相对较简陋，并未考虑到数组的处理、数据的循环依赖等，也难免存在一些问题，欢迎大家指正。不过这些并不会影响大家的阅读和理解，相信看完本文后对大家在阅读vue源码的时候会更有帮助

*几种实现双向绑定的做法*  
目前几种主流的mvc(vm)框架都实现了单向数据绑定，而我所理解的双向数据绑定无非就是在单向绑定的基础上给可输入元素（input、textare等）添加了change(input)事件，来动态修改model和 view，并没有多高深。所以无需太过介怀是实现的单向或双向绑定。

实现数据绑定的做法有大致如下几种：
1. 发布者-订阅者模式（backbone.js）
2. 脏值检查（angular.js）
3. 数据劫持（vue.js）

*发布者-订阅者模式* :   
一般通过sub, pub的方式实现数据和视图的绑定监听，更新数据方式通常做法是 vm.set('property', value)，这里有篇文章讲的比较详细，有兴趣可点[这里](http://www.html-js.com/article/Study-of-twoway-data-binding-JavaScript-talk-about-JavaScript-every-day)

这种方式现在毕竟太low了，我们更希望通过 vm.property = value 这种方式更新数据，同时自动更新视图，于是有了下面两种方式

*脏值检查* :   
angular.js 是通过脏值检测的方式比对数据是否有变更，来决定是否更新视图，最简单的方式就是通过 setInterval() 定时轮询检测数据变动，当然Google不会这么low，angular只有在指定的事件触发时进入脏值检测，大致如下:  

> DOM事件，譬如用户输入文本，点击按钮等。( ng-click )
> XHR响应事件 ( $http )
> 浏览器Location变更事件 ( $location )
> Timer事件( $timeout , $interval )
> 执行 $digest() 或 $apply()

数据劫持: vue.js 则是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。  

思路整理
已经了解到vue是通过数据劫持的方式来做数据绑定的，其中最核心的方法便是通过Object.defineProperty()来实现对属性的劫持，达到监听数据变动的目的，无疑这个方法是本文中最重要、最基础的内容之一，如果不熟悉defineProperty，猛戳这里 整理了一下，要实现mvvm的双向绑定，就必须要实现以下几点： 
> 实现一个数据监听器Observer，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者  
> 实现一个指令解析器Compile，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数   
> 实现一个Watcher，作为连接Observer和Compile的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图 4、mvvm入口函数，整合以上三者. 

<!-- [![示例](https://raw.githubusercontent.com/mactanxin/xin-vue-blog/master/src/statics/images/mvvm.png)](https://tanx.in/2020/vue-mvvm/) -->

![示例](https://raw.githubusercontent.com/mactanxin/xin-vue-blog/master/src/statics/images/mvvm.png "")

```javascript
let data = { name: 'Xin' };
observe(data);

// 此时监听到数据变化👇
data.name = 'Wow, awesome';


function observe(data) {
  if (!data || typeof data !== 'object') return;

  // 遍历
  Object.keys(data).forEach(function(key) {
    defineReactive(data, key, data[key]);
  })
};

function defineReactive(data, key, val) {
  observe(val);
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: false, //不能再次define
    get: function () {
      return val;
    },
    set: function (newVal) {
      val = newVal;
    }
  })
}
```

这样我们已经可以监听每个数据的变化了，那么监听到变化之后就是怎么通知订阅者了，所以接下来我们需要实现一个消息订阅器，很简单，维护一个数组，用来收集订阅者，数据变动触发notify，  
再调用订阅者的update方法.  

更新之后的代码样例👇:  

```javascript
function defineReactive(data, key, val) {
    var dep = new Dep();
    observe(val); // 监听子属性

    Object.defineProperty(data, key, {
        // ... 省略
        set: function(newVal) {
          if (val === newVal) return;
            console.log('哈哈哈，监听到值变化了 ', val, ' --> ', newVal);
            val = newVal;
            dep.notify(); // 通知所有订阅者
        }
    });
}

function Dep() {
    this.subs = [];
}
Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub);
    },
    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};
```

那么问题来了，谁是订阅者？怎么往订阅器添加订阅者？ 没错，上面的思路整理中我们已经明确订阅者应该是`Watcher`, 而且
`var dep = new Dep();` 是在 defineReactive方法内部定义的，  
所以想通过dep添加订阅者，就必须要在闭包内操作，所以我们可以在`getter`里面动手脚：


```javascript
// Observer.js
Object.defineProperty(data, key, {
  get: function() {
    // 由于需要在闭包内添加watcher，所以通过Dep定义一个全局target属性，暂存watcher, 添加完移除
    Dep.target && dep.addDep(Dep.target);
    return val;
  }
});

// 实现 Watcher.js

Watcher.prototype = {
  get: function (key) {
    Dep.target = this;
    this.value = data[key];
    Dep.target = null;
  }
}
```


这里已经实现了一个Observer了，已经具备了监听数据和数据变化通知订阅者的功能. 