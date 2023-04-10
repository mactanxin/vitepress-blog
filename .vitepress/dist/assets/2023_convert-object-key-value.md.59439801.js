import{_ as s,o as a,c as n,N as p}from"./chunks/framework.7e203a6d.js";const i=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"2023/convert-object-key-value.md"}'),l={name:"2023/convert-object-key-value.md"},o=p(`<p>使用鲜为人知但功能强大的<code>**Object.entries**</code>和<code>**Object.fromEntries**</code>.</p><p>我最近遇到了一个需要翻转或反转/反转的数据结构。</p><p>假设数据如下所示：</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">x</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">y</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">2</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span></span></code></pre></div><p>我们想要反转对象的键和值以得到以下结果：</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#F07178;">: </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">x</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">2</span><span style="color:#F07178;">: </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">y</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span></span></code></pre></div><p><em>小提示：当用作键值时，JavaScript 将“数字”存储为字符串——即使它们可能看起来像数字。</em></p><p>那么我们如何反转这个数据结构呢？</p><p>让我们首先将键和值转换为数组，这样我们就可以交换它们的顺序。</p><p>为此，我将使用 <code>**Object.entries()**</code>：</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// [[&#39;x&#39;, 1], [&#39;y&#39;, 2]]</span></span>
<span class="line"><span style="color:#A6ACCD;">Object</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">entries</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">x</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">y</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><p>当这返回一个新数组时，我们可以映射这些值并使用新数组和一些解构来交换它们：</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// [[1, &#39;x&#39;], [2, &#39;y&#39;]]</span></span>
<span class="line"><span style="color:#A6ACCD;">Object</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">entries</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">x</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">y</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">map</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">([</span><span style="color:#A6ACCD;font-style:italic;">key</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">value</span><span style="color:#89DDFF;">])</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> [value</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> key])</span><span style="color:#89DDFF;">;</span></span></code></pre></div><p>现在是时候将它们重新组合成一个普通的 JavaScript 对象了。</p><p>我们将获取我们的多维数组并将其传递给<code>**Object.fromEntries()**</code>，正如名称所描述的，它需要“条目”格式的数据：</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> flipped </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> Object</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">entries</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">x</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">y</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">map</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">([</span><span style="color:#A6ACCD;font-style:italic;">key</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">value</span><span style="color:#89DDFF;">])</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> [value</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> key])</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// { 1: &#39;x&#39;, 2: &#39;y&#39; }</span></span>
<span class="line"><span style="color:#A6ACCD;">Object</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">fromEntries</span><span style="color:#A6ACCD;">(flipped)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><p>而已！</p><p>然而，与所有好的代码一样，我们应该将它完全包装在一个实用函数中，以实现最大程度的重用和可测试性：</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> flip </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">data</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> Object</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">fromEntries</span><span style="color:#A6ACCD;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">  Object</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">entries</span><span style="color:#A6ACCD;">(data)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">map</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">([</span><span style="color:#A6ACCD;font-style:italic;">key</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">value</span><span style="color:#89DDFF;">])</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> [value</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> key])</span></span>
<span class="line"><span style="color:#A6ACCD;">  )</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// { 1: &#39;x&#39;, 2: &#39;y&#39; }</span></span>
<span class="line"><span style="color:#82AAFF;">flip</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">x</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">y</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span></code></pre></div>`,19),e=[o];function t(c,r,y,D,C,F){return a(),n("div",null,e)}const d=s(l,[["render",t]]);export{i as __pageData,d as default};