import{_ as s,o as a,c as n,N as e}from"./chunks/framework.7e203a6d.js";const g=JSON.parse('{"title":"使用Commitizen格式化 commit 信息","description":"","frontmatter":{},"headers":[],"relativePath":"2020/format-git-commit.md"}'),o={name:"2020/format-git-commit.md"},c=e('<h1 id="使用commitizen格式化-commit-信息" tabindex="-1">使用Commitizen格式化 commit 信息 <a class="header-anchor" href="#使用commitizen格式化-commit-信息" aria-label="Permalink to &quot;使用Commitizen格式化 commit 信息&quot;">​</a></h1><p>最近在项目中规范git的提交信息, 发现普遍选择的都是commitizen.</p><p>首先需要安装 <code>node</code> 和 <code>commitizen</code></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">npm install -g commitizen</span></span></code></pre></div><ol><li>在项目中初始化一下</li></ol><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">commitizen init cz-conventional-changelog --save --save-exact</span></span></code></pre></div><p>此时可能会报找不到 <code>package.json</code> 的错误,使用下面命令来自动生成一个项目的package,然后在运行 <em>2</em> 中的命令.</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">npm init --yes</span></span></code></pre></div><p>这时在 <code>package.json</code> 中默认配置的是 <code>&quot;cz-conventional-changelog&quot;: &quot;^3.2.0&quot;,</code></p><p>如果想要自定义提示信息, 可以 <code>npm install cz-customizable</code>.</p><p>之后替换 <code>package.json</code> 中的 <code>config</code> 字段:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&quot;config&quot;: {</span></span>\n<span class="line"><span style="color:#A6ACCD;">    &quot;commitizen&quot;: {</span></span>\n<span class="line"><span style="color:#A6ACCD;">      &quot;path&quot;: &quot;./node_modules/cz-customizable&quot;</span></span>\n<span class="line"><span style="color:#A6ACCD;">    }</span></span>\n<span class="line"><span style="color:#A6ACCD;">  }</span></span></code></pre></div><p>之后就可以在每次提交时使用 <code>git cz</code> 命令代替 <code>git commit</code> 命令了.</p><p>然后在 <code>gitHook</code> 中配置每次提交时检查</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&quot;gitHooks&quot;: {</span></span>\n<span class="line"><span style="color:#A6ACCD;">  &quot;pre-commit&quot;: &quot;lint-staged&quot;,</span></span>\n<span class="line"><span style="color:#A6ACCD;">  &quot;commit-msg&quot;: &quot;node scripts/verifyCommitMsg.js&quot;</span></span>\n<span class="line"><span style="color:#A6ACCD;">},</span></span></code></pre></div><p>最后在项目<code>src/</code> 平级目录新建一个 <code>scripts/</code> 文件夹, 放上 <code>verifyCommitMsg.js</code></p><p>最后附上 <code>Vue</code> 项目中使用的 <code>verifyCommitMsg.js</code>:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">const chalk = require(&#39;chalk&#39;)  // eslint-disable-line</span></span>\n<span class="line"><span style="color:#A6ACCD;">const msgPath = p<wbr>rocess.env.GIT_PARAMS;</span></span>\n<span class="line"><span style="color:#A6ACCD;">const msg = require(&#39;fs&#39;).readFileSync(msgPath, &#39;utf-8&#39;).trim();</span></span>\n<span class="line"><span style="color:#A6ACCD;"></span></span>\n<span class="line"><span style="color:#A6ACCD;">const commitRE = /^(v\\d+\\.\\d+\\.\\d+(-(alpha|beta|rc.\\d+))?)|((revert: )?(feat|fix|docs|style|refactor|perf|test|workflow|ci|chore|types|revert|WIP)(\\(.+\\))?!?: .{1,50})/;</span></span>\n<span class="line"><span style="color:#A6ACCD;"></span></span>\n<span class="line"><span style="color:#A6ACCD;">if (!commitRE.test(msg)) {</span></span>\n<span class="line"><span style="color:#A6ACCD;">  console.log();</span></span>\n<span class="line"><span style="color:#A6ACCD;">  console.error(</span></span>\n<span class="line"><span style="color:#A6ACCD;">    `  ${chalk.bgRed.white(&#39; ERROR &#39;)} ${chalk.red(`commit 信息格式不正确.`)}\\n\\n` +</span></span>\n<span class="line"><span style="color:#A6ACCD;">    chalk.red(`  commit 信息不符合提交规范 请查看示例代码. 如下:\\n\\n`) +</span></span>\n<span class="line"><span style="color:#A6ACCD;">    `    ${chalk.green(`feat(路由): 新增 &#39;业务变量库&#39; 模块`)}\\n` +</span></span>\n<span class="line"><span style="color:#A6ACCD;">    `    ${chalk.green(`fix(业务变量库): handle events on blur (关闭禅道 #28)`)}\\n\\n` +</span></span>\n<span class="line"><span style="color:#A6ACCD;">    chalk.red(`  更多细节请查看 ${chalk.bgRed.white(`.cz-config.js`)} 文件.\\n`) +</span></span>\n<span class="line"><span style="color:#A6ACCD;">    chalk.red(`  你也可以使用 ${chalk.cyan(`npm run commit`)} 命令来生成 commit 信息.\\n`)</span></span>\n<span class="line"><span style="color:#A6ACCD;">  );</span></span>\n<span class="line"><span style="color:#A6ACCD;">  process.exit(1);</span></span>\n<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div>',18),l=[c];function t(p,i,r,m,d,C){return a(),n("div",null,l)}const u=s(o,[["render",t]]);export{g as __pageData,u as default};
