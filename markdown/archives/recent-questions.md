# 献丑了
总结一下最近遇到 ~~而我又没回答上来~~ 的问题:
更新中

1. `Angular` 中, `component`, `service`, `module`的概念?
> 只回答上来了 `component` 和 `service`.

2. 说一说 `JavaScript` 中的事件对象

> event bubbling 和 event capturing, 顺序?
> 从上到下, 触底之后从下往上
> addEventListener()

3. [Promise1, Promise2, Promise3, Promise4] 如何安装顺序依序执行?

> 这个还挺tricky的.
> `Promise.all([])` 的话不能保证一定按顺序执行完.
> `.then()` 一直写的话当然可以, 但是这应该是不符合出题人的本意
> 可以用 for loop ~~来自提示~~

4. 那 for loop 的话, 是先执行完还是先下标0-3呢?

> 先执行完

5. 说一说 ES6 中的 `Proxy` 了解么?

> 后续

6. Lighthouse 或 Chrome 开发者的性能调优工具?

7. Web Component 相关
8. `Object` 对象的方法用过哪些
9. `Object.defineProperty` 的使用
10. `Object.create` vs `Object.assign`
11. webpack中 loader 和 plugin 的区别
12. webpack中配置 DLL
13. 自己实现一个单选框, 滚动到底部的时候加载更多选项
14. VueX的原理, 简单实现
15. Vue Router的原理, 简单实现

> [区别见这里](https://stackoverflow.com/questions/34838294/what-is-difference-between-creating-object-using-object-create-and-object-assi)