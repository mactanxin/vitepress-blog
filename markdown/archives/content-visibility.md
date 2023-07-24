# 使用 Content-visibility 优化渲染性能



## 何为 `content-visibility`？

`content-visibility`：属性控制一个元素是否渲染其内容，它允许用户代理（浏览器）潜在地省略大量布局和渲染工作，直到需要它为止。

> MDN 原文：The content-visibility CSS property controls whether or not an element renders its contents at all, along with forcing a strong set of containments, allowing user agents to potentially omit large swathes of layout and rendering work until it becomes needed. Basically it enables the user agent to skip an element's rendering work (including layout and painting) until it is needed — which makes the initial page load much faster.

它有几个常见的取值。

```CSS
/* Keyword values */
content-visibility: visible;
content-visibility: hidden;
content-visibility: auto;
```

分别解释一下：

- `content-visibility: visible`：默认值，没有任何效果，相当于没有添加 `content-visibility`，元素的渲染与往常一致。
- `content-visibility: hidden`：与 `display: none` 类似，用户代理将跳过其内容的渲染。（这里需要注意的是，跳过的是内容的渲染）
- `content-visibility: auto`：如果该元素不在屏幕上，并且与用户无关，则不会渲染其后代元素。

### contain-intrinsic-size

当然，除 `content-visibility` 之外，还有一个与之配套的属性 -- `contain-intrinsic-size`。

`contain-intrinsic-size`：控制由 `content-visibility` 指定的元素的自然大小。

上面两个属性光看定义和介绍会有点绕。

我们首先来看看 `content-visibility` 如何具体使用。

`content-visibility: visible` 是默认值，添加后没有任何效果，我们就直接跳过。

## 利用 `content-visibility: hidden` 优化展示切换性能

首先来看看 `content-visibility: hidden`，它通常会拿来和 `display: none` 做比较，但是其实它们之间还是有很大的不同的。

首先，假设我们有两个 DIV 包裹框：

```HTML
<div class="g-wrap">
    <div>1111</div>
    <div class="hidden">2222</div>
</div>
```

设置两个 div 为 `200x200` 的黑色块：

```CSS
.g-wrap > div {
    width: 200px;
    height: 200px;
    background: #000;
}
```

效果如下：

![img](/image-1.jpg)



OK，没有问题，接下来，我们给其中的 `.hidden` 设置 `content-visibility: hidden`，看看会发生什么：

```CSS
.hidden {
    content-visibility: hidden;
}
```

效果如下：

![img](/image-2.jpg)

注意，仔细看效果，这里添加了 `content-visibility: hidden` 之后，**消失的只是添加了该元素的 div 的子元素消失不见，而父元素本身及其样式，还是存在页面上的**。

如果我们去掉设置了 `content-visibility: hidden` 的元素本身的 `width`、`height`、`padding`、`margin` 等属性，则元素看上去就如同设置了 `display: none` 一般，在页面上消失不见了。

那么，`content-visibility: hidden` 的作用是什么呢？

设置了 `content-visibility: hidden` 的元素，**其元素的子元素将被隐藏，但是，它的渲染状态将会被缓存**。所以，当 `content-visibility: hidden` 被移除时，用户代理无需重头开始渲染它和它的子元素。

因此，如果我们将这个属性应用在一些一开始需要被隐藏，但是其后在页面的某一时刻需要被渲染，或者是一些需要被频繁切换显示、隐藏状态的元素上，其渲染效率将会有一个非常大的提升。
