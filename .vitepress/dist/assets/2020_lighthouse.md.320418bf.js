import{_ as e,o,c as a,N as r}from"./chunks/framework.7e203a6d.js";const f=JSON.parse('{"title":"使用Lighthouse 优化","description":"","frontmatter":{},"headers":[],"relativePath":"2020/lighthouse.md"}'),n={name:"2020/lighthouse.md"},s=r('<h1 id="使用lighthouse-优化" tabindex="-1">使用Lighthouse 优化 <a class="header-anchor" href="#使用lighthouse-优化" aria-label="Permalink to &quot;使用Lighthouse 优化&quot;">​</a></h1><p>一直想要 <s>但是没有勇气</s> 使用Lighthouse测试一下性能, 最近终于在自己的博客上开刀了.<br> 我没有开PWA, 在Desktop模式下测试了一下, 主要针对这几类, 对自己的问题做个总结.</p><h2 id="desktop" tabindex="-1">Desktop <a class="header-anchor" href="#desktop" aria-label="Permalink to &quot;Desktop&quot;">​</a></h2><h3 id="performance-100分" tabindex="-1">Performance - 100分 <a class="header-anchor" href="#performance-100分" aria-label="Permalink to &quot;Performance - 100分&quot;">​</a></h3><p><em>Max Potential First Input Delay 170 ms</em> 这一项比较低, 有待改进</p><p><a href="https://www.imqianduan.com/tool/fid.html" target="_blank" rel="noreferrer">详解</a></p><h3 id="什么是第一次输入延迟" tabindex="-1">什么是第一次输入延迟？ <a class="header-anchor" href="#什么是第一次输入延迟" aria-label="Permalink to &quot;什么是第一次输入延迟？&quot;">​</a></h3><p>第一输入延迟（FID）测量用户首次与您的站点交互时的时间（即，当他们单击链接，点击按钮或使用自定义的JavaScript驱动控件时）到浏览器实际能够的时间回应这种互动。</p><p>作为编写响应事件的代码的开发人员，我们经常假设我们的代码将在事件发生后立即运行。 但作为用户，我们经常遇到相反的情况 - 我们在手机上加载了一个网页，试图与它进行交互，然后在没有任何反应时感到沮丧。</p><p>通常，输入延迟（或输入延迟）发生是因为浏览器的主线程忙于执行其他操作，因此它无法（尚未）响应用户。 可能发生这种情况的一个常见原因是浏览器正忙于解析并执行应用程序加载的大型JavaScript文件。 虽然它正在这样做，它不能运行任何事件监听器，因为它加载的JavaScript可能会告诉它做其他事情。</p><h3 id="accessibility-92分" tabindex="-1">Accessibility - 92分 <a class="header-anchor" href="#accessibility-92分" aria-label="Permalink to &quot;Accessibility - 92分&quot;">​</a></h3><p><em>Background and foreground colors do not have a sufficient contrast ratio.</em> 主要是针对配色的, 不太想改了.</p><h3 id="best-practises" tabindex="-1">Best Practises <a class="header-anchor" href="#best-practises" aria-label="Permalink to &quot;Best Practises&quot;">​</a></h3><h4 id="links-to-cross-origin-destinations-are-unsafe" tabindex="-1">Links to cross-origin destinations are unsafe <a class="header-anchor" href="#links-to-cross-origin-destinations-are-unsafe" aria-label="Permalink to &quot;Links to cross-origin destinations are unsafe&quot;">​</a></h4><p><em>Add <code>rel=&quot;noopener&quot;</code> or <code>rel=&quot;noreferrer&quot;</code> to any external links to improve performance and prevent security vulnerabilities.</em><br> 我的 Github 外链没有加这个<code>rel</code>, 查了一下是个新特性</p><p>当你浏览一个页面点击一个a标签连接 <code>&lt;a href=&quot;www.google.com&quot; target=&quot;_blank&quot;&gt;</code> 跳转到另一个页面时，</p><p>在新打开的页面（Google）中可以通过 window.opener获取到源页面的部分控制权， 即使新打开的页面是跨域的也照样可以（例如 location 就不存在跨域问题）。</p><h5 id="rel-noopener-新特性" tabindex="-1"><code>rel=noopener</code> 新特性 <a class="header-anchor" href="#rel-noopener-新特性" aria-label="Permalink to &quot;`rel=noopener` 新特性&quot;">​</a></h5><p>rel =“noopener”在新标签中打开链接时基本上不会打开它的开启者。这意味着，它的 window.opener 属性将是在新标签中打开一个链接时，而不是从那里的链接打开同一个页面为空。</p><p><code>rel =&quot;noopener</code></p><blockquote><p>一般都是搭配 <code>target=&quot;_blank&quot;</code> 同时使用，因为 <code>target=&quot;_blank&quot;</code> 也是一个安全漏洞：新的页面可以通过 <code>window.opener</code> 访问您的窗口对象，并且它可以使用 <code>window.opener.location = newURL</code> 将您的页面导航至不同的网址。<br> 新页面将与您的页面在同一个进程上运行，如果新页面正在执行开销极大的 JavaScript，您的页面性能可能会受影响。</p></blockquote><h5 id="什么是-noreferrer-标签" tabindex="-1">什么是 noreferrer 标签？ <a class="header-anchor" href="#什么是-noreferrer-标签" aria-label="Permalink to &quot;什么是 noreferrer 标签？&quot;">​</a></h5><p>简而言之，noreferrer 标记在单击链接时隐藏引用者信息。<br> 如果有人从使用此标记的链接到达您的网站，您的分析将不会显示谁提到该链接。<br> 相反，它会错误地显示为您的统计流量报告中的直接流量。</p><p>这个 noreferrer 标签在 WordPress 早些版本中是自动添加到 A 标签中，但实际上这并不是 WordPress 本身所做的改变，而是由 WordPress 使用的富文本编辑器 TinyMCE（WordPress 默认编辑器）造成的。目的就是防止网络钓鱼攻击，垃圾邮件发送者劫持您的网页，可能会访问您的网站或访问机密信息。不过现在 TinyMCE 只强制插入 noopener 标签，已经不会强制插入“noopener noreferrer”标签。</p><h5 id="什么是-nofollow-标签" tabindex="-1">什么是 nofollow 标签？ <a class="header-anchor" href="#什么是-nofollow-标签" aria-label="Permalink to &quot;什么是 nofollow 标签？&quot;">​</a></h5><p>nofollow 标签就是告诉百度、Google 等搜索引擎不要通过使用此标记的链接传递任何值。大多数情况下，<code>nofollow</code> 标签用于阻止“PageRank”传递到网站上的管理页面（例如，您不需要排名的登录页面），或者根据 Google 的付费使用广告客户的 URL 链接政策。除了用于付费和管理链接之外，nofollow 标记通常用于限制 PageRank 通过博客评论或留言簿条目中的链接传递。在链接到信誉或可信度可能成为问题的网站时，您也可以使用 <code>nofollow</code>。</p><h5 id="noopener-和-noreferrer-标签如何提高安全性" tabindex="-1">noopener 和 noreferrer 标签如何提高安全性？ <a class="header-anchor" href="#noopener-和-noreferrer-标签如何提高安全性" aria-label="Permalink to &quot;noopener 和 noreferrer 标签如何提高安全性？&quot;">​</a></h5><p>Noopener 和 noreferrer 标签是阻止漏洞利用的主动权，该漏洞利用在新标签中打开的链接。很少有成员知道这个漏洞，因此 WordPress 采取这一举措来提高用户的安全性。反向 Tabnabbing 是一种网络钓鱼攻击，攻击者用恶意文档替换合法且可信的页面选项卡。</p><blockquote><p>当有人打开新选项卡时，网络钓鱼者会通过 window.opener 检测引荐网址，并使用 window.opener.location = newURL 推送新的网址。</p></blockquote><p>这样，没有人会有陷入网络钓鱼攻击的线索，因为他们已经从可靠的来源（WordPress 建立的网站）到达网站。而使用 rel =“noopener”会阻止网络钓鱼者获取有关链接源和与 referrer 链接相关的任何数据的信息。</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">google.com</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">target</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">_blank</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">rel</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">noopener noreferrer</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>在chrome 49+，Opera 36+，打开添加了rel=noopener的链接， <code>window.opener</code> 会为<code>null</code>。在老的浏览器中，可以使用 <code>rel=noreferrer</code> 禁用HTTP头部的Referer属性，使用下面<code>JavaScript</code>代替<code>target=&#39;_blank&#39;</code>的解决此问题：</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> otherWindow </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> window</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">open</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">http://keenwon.com</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#A6ACCD;">otherWindow</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">opener </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null;</span></span>\n<span class="line"><span style="color:#A6ACCD;">otherWindow</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">location </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> url</span><span style="color:#89DDFF;">;</span></span></code></pre></div><p>使用 <code>window.open</code> 打开页面，手动<code>opener</code>设置为null。</p><h3 id="seo-100-分" tabindex="-1">SEO - 100 分 <a class="header-anchor" href="#seo-100-分" aria-label="Permalink to &quot;SEO - 100 分&quot;">​</a></h3><p>之前少一项 <code>&lt;meta name=&quot;description&quot;&gt;</code> 减了不少分.<br> 还有 <code>&lt;img&gt;</code> tag都缺少 <code>alt</code> 属性.</p><p>其他方面例如:</p><ol><li><code>&lt;meta name=&quot;viewport&quot;&gt;</code> 的属性,</li><li><code>&lt;title&gt;</code> 属性</li></ol><p>的表现都还不错</p>',39),t=[s];function l(p,c,i,d,h,u){return o(),a("div",null,t)}const y=e(n,[["render",l]]);export{f as __pageData,y as default};