import{_ as e,o,c as a,N as s}from"./chunks/framework.7e203a6d.js";const C=JSON.parse('{"title":"如何最快地得到 0.3","description":"","frontmatter":{},"headers":[],"relativePath":"2020/quick-zero-dot-three.md"}'),t={name:"2020/quick-zero-dot-three.md"},c=s(`<h1 id="如何最快地得到-0-3" tabindex="-1">如何最快地得到 0.3 <a class="header-anchor" href="#如何最快地得到-0-3" aria-label="Permalink to &quot;如何最快地得到 0.3&quot;">​</a></h1><p>首先:</p><blockquote><p><code>0.1 + 0.2</code> 只能得到 <code>0.30000000000000004</code></p></blockquote><p>那么我要是需要<code>0.3</code> 怎么办呢?</p><p>答: <code>+(0.1 + 0.2).toFixed(1);</code></p><p>首先用 <code>toFixed(1)</code> 会得到<code>&quot;0.3&quot;</code>, 然后前置的 <code>+</code> 会转义回 <code>Number</code> 类型</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">var x = 0.1,</span></span>
<span class="line"><span style="color:#A6ACCD;">  y = 0.2;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">var z = +(x + y).toFixed(1);</span></span>
<span class="line"><span style="color:#A6ACCD;">z += 0.1; // z现在等于0.4了</span></span></code></pre></div>`,7),n=[c];function p(l,d,r,i,_,u){return o(),a("div",null,n)}const A=e(t,[["render",p]]);export{C as __pageData,A as default};