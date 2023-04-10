import{_ as s,o as n,c as a,N as l}from"./chunks/framework.7e203a6d.js";const d=JSON.parse('{"title":"leetcode14：最长公共前缀","description":"","frontmatter":{},"headers":[],"relativePath":"2020/most-common-prefix.md"}'),e={name:"2020/most-common-prefix.md"},p=l(`<h1 id="leetcode14-最长公共前缀" tabindex="-1">leetcode14：最长公共前缀 <a class="header-anchor" href="#leetcode14-最长公共前缀" aria-label="Permalink to &quot;leetcode14：最长公共前缀&quot;">​</a></h1><h2 id="前情提要之-最近一直在面试别人-好久没有自己动手刷算法了" tabindex="-1">前情提要之: 最近一直在面试别人, 好久没有自己动手刷算法了 <a class="header-anchor" href="#前情提要之-最近一直在面试别人-好久没有自己动手刷算法了" aria-label="Permalink to &quot;前情提要之: 最近一直在面试别人, 好久没有自己动手刷算法了&quot;">​</a></h2><p>编写一个函数来查找字符串数组中的最长公共前缀。</p><p>如果不存在公共前缀，返回空字符串 &quot;&quot;。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">示例 1:</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">输入: [&quot;flower&quot;,&quot;flow&quot;,&quot;flight&quot;]</span></span>
<span class="line"><span style="color:#A6ACCD;">输出: &quot;fl&quot;</span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">示例 2:</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">输入: [&quot;dog&quot;,&quot;racecar&quot;,&quot;car&quot;]</span></span>
<span class="line"><span style="color:#A6ACCD;">输出: &quot;&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">解释: 输入不存在公共前缀。</span></span></code></pre></div><ol><li>最笨办法:</li></ol><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">var a = &#39;flow&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;">var b = &#39;fleet&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">function getCommon(a, b) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  let result = &#39;&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;">  let counter = 0;</span></span>
<span class="line"><span style="color:#A6ACCD;">  for (let i = 0; i &lt; a.length; i++) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      if (a[i] === b[i]) {</span></span>
<span class="line"><span style="color:#A6ACCD;">          result += a[i];</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  return result</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>方法2:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">function maxPrefix (strs) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  if (!strs || !strs.length) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    return &#39;&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  // 从0开始依次比较</span></span>
<span class="line"><span style="color:#A6ACCD;">  let currentIndex = 0;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  while (true) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 取第一个字符串的当前位字符作为参照</span></span>
<span class="line"><span style="color:#A6ACCD;">    const refer = strs[0][currentIndex];</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 是否全部匹配</span></span>
<span class="line"><span style="color:#A6ACCD;">    const currentAllMatch = strs.reduce((pre, str) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">      return pre &amp;&amp; str.charAt(currentIndex) === refer;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }, true);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    if (currentAllMatch) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      currentIndex ++;</span></span>
<span class="line"><span style="color:#A6ACCD;">    } else {</span></span>
<span class="line"><span style="color:#A6ACCD;">      break;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  return strs[0].substring(0, currentIndex);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div>`,10),o=[p];function t(c,r,i,C,A,u){return n(),a("div",null,o)}const D=s(e,[["render",t]]);export{d as __pageData,D as default};
