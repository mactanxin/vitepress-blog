# 使用Lighthouse 优化

一直想要 ~~但是没有勇气~~ 使用Lighthouse测试一下性能, 最近终于在自己的博客上开刀了.  
我没有开PWA, 在Desktop模式下测试了一下, 主要针对这几类, 对自己的问题做个总结.  

## Desktop

### Performance - 100分

_Max Potential First Input Delay 170 ms_ 这一项比较低, 有待改进

[详解](https://www.imqianduan.com/tool/fid.html)

### 什么是第一次输入延迟？

第一输入延迟（FID）测量用户首次与您的站点交互时的时间（即，当他们单击链接，点击按钮或使用自定义的JavaScript驱动控件时）到浏览器实际能够的时间回应这种互动。

作为编写响应事件的代码的开发人员，我们经常假设我们的代码将在事件发生后立即运行。 但作为用户，我们经常遇到相反的情况 - 我们在手机上加载了一个网页，试图与它进行交互，然后在没有任何反应时感到沮丧。

通常，输入延迟（或输入延迟）发生是因为浏览器的主线程忙于执行其他操作，因此它无法（尚未）响应用户。 可能发生这种情况的一个常见原因是浏览器正忙于解析并执行应用程序加载的大型JavaScript文件。 虽然它正在这样做，它不能运行任何事件监听器，因为它加载的JavaScript可能会告诉它做其他事情。

### Accessibility - 92分

_Background and foreground colors do not have a sufficient contrast ratio._
主要是针对配色的, 不太想改了.  

### Best Practises

#### Links to cross-origin destinations are unsafe

_Add `rel="noopener"` or `rel="noreferrer"` to any external links to improve performance and prevent security vulnerabilities._  
我的 Github 外链没有加这个`rel`, 查了一下是个新特性

当你浏览一个页面点击一个a标签连接 `<a href="www.google.com" target="_blank">` 跳转到另一个页面时，

在新打开的页面（Google）中可以通过 window.opener获取到源页面的部分控制权， 即使新打开的页面是跨域的也照样可以（例如 location 就不存在跨域问题）。  

##### `rel=noopener` 新特性


rel =“noopener”在新标签中打开链接时基本上不会打开它的开启者。这意味着，它的 window.opener 属性将是在新标签中打开一个链接时，而不是从那里的链接打开同一个页面为空。

`rel ="noopener` 
> 一般都是搭配 `target="_blank"` 同时使用，因为 `target="_blank"` 也是一个安全漏洞：新的页面可以通过 `window.opener` 访问您的窗口对象，并且它可以使用 `window.opener.location = newURL` 将您的页面导航至不同的网址。  
> 新页面将与您的页面在同一个进程上运行，如果新页面正在执行开销极大的 JavaScript，您的页面性能可能会受影响。

##### 什么是 noreferrer 标签？

简而言之，noreferrer 标记在单击链接时隐藏引用者信息。  
如果有人从使用此标记的链接到达您的网站，您的分析将不会显示谁提到该链接。  
相反，它会错误地显示为您的统计流量报告中的直接流量。

这个 noreferrer 标签在 WordPress 早些版本中是自动添加到 A 标签中，但实际上这并不是 WordPress 本身所做的改变，而是由 WordPress 使用的富文本编辑器 TinyMCE（WordPress 默认编辑器）造成的。目的就是防止网络钓鱼攻击，垃圾邮件发送者劫持您的网页，可能会访问您的网站或访问机密信息。不过现在 TinyMCE 只强制插入 noopener 标签，已经不会强制插入“noopener noreferrer”标签。


##### 什么是 nofollow 标签？

nofollow 标签就是告诉百度、Google 等搜索引擎不要通过使用此标记的链接传递任何值。大多数情况下，`nofollow`  标签用于阻止“PageRank”传递到网站上的管理页面（例如，您不需要排名的登录页面），或者根据 Google 的付费使用广告客户的 URL 链接政策。除了用于付费和管理链接之外，nofollow 标记通常用于限制 PageRank 通过博客评论或留言簿条目中的链接传递。在链接到信誉或可信度可能成为问题的网站时，您也可以使用 `nofollow`。


##### noopener 和 noreferrer 标签如何提高安全性？

Noopener 和 noreferrer 标签是阻止漏洞利用的主动权，该漏洞利用在新标签中打开的链接。很少有成员知道这个漏洞，因此 WordPress 采取这一举措来提高用户的安全性。反向 Tabnabbing 是一种网络钓鱼攻击，攻击者用恶意文档替换合法且可信的页面选项卡。

> 当有人打开新选项卡时，网络钓鱼者会通过 window.opener 检测引荐网址，并使用 window.opener.location = newURL 推送新的网址。

这样，没有人会有陷入网络钓鱼攻击的线索，因为他们已经从可靠的来源（WordPress 建立的网站）到达网站。而使用 rel =“noopener”会阻止网络钓鱼者获取有关链接源和与 referrer 链接相关的任何数据的信息。



```html
<a href="google.com" target="_blank" rel="noopener noreferrer"></a>
```

在chrome 49+，Opera 36+，打开添加了rel=noopener的链接， `window.opener` 会为`null`。在老的浏览器中，可以使用 `rel=noreferrer` 禁用HTTP头部的Referer属性，使用下面`JavaScript`代替`target='_blank'`的解决此问题：

```javascript
var otherWindow = window.open('http://keenwon.com');
otherWindow.opener = null;
otherWindow.location = url;
```

使用 `window.open` 打开页面，手动`opener`设置为null。

### SEO - 100 分

之前少一项 `<meta name="description">` 减了不少分.  
还有 `<img>` tag都缺少 `alt` 属性.

其他方面例如:
1. ` <meta name="viewport"> ` 的属性,
2. ` <title> ` 属性

的表现都还不错
