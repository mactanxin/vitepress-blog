# 使用Commitizen格式化 commit 信息

最近在项目中规范git的提交信息, 发现普遍选择的都是commitizen.  

首先需要安装 `node` 和 `commitizen`

```
npm install -g commitizen
```

1. 在项目中初始化一下

```
commitizen init cz-conventional-changelog --save --save-exact
```

此时可能会报找不到 `package.json` 的错误,使用下面命令来自动生成一个项目的package,然后在运行 *2* 中的命令.

```
npm init --yes
```

这时在 `package.json` 中默认配置的是 `"cz-conventional-changelog": "^3.2.0",`  

如果想要自定义提示信息, 可以 `npm install cz-customizable`.  

之后替换 `package.json` 中的 `config` 字段: 

```
"config": {
    "commitizen": {
      "path": "./node_modules/cz-customizable"
    }
  }
```

之后就可以在每次提交时使用 `git cz` 命令代替 `git commit` 命令了.  

然后在 `gitHook` 中配置每次提交时检查
```
"gitHooks": {
  "pre-commit": "lint-staged",
  "commit-msg": "node scripts/verifyCommitMsg.js"
},
```

最后在项目`src/` 平级目录新建一个 `scripts/` 文件夹, 放上 `verifyCommitMsg.js`  

最后附上 `Vue` 项目中使用的 `verifyCommitMsg.js`:

```
const chalk = require('chalk')  // eslint-disable-line
const msgPath = process.env.GIT_PARAMS;
const msg = require('fs').readFileSync(msgPath, 'utf-8').trim();

const commitRE = /^(v\d+\.\d+\.\d+(-(alpha|beta|rc.\d+))?)|((revert: )?(feat|fix|docs|style|refactor|perf|test|workflow|ci|chore|types|revert|WIP)(\(.+\))?!?: .{1,50})/;

if (!commitRE.test(msg)) {
  console.log();
  console.error(
    `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(`commit 信息格式不正确.`)}\n\n` +
    chalk.red(`  commit 信息不符合提交规范 请查看示例代码. 如下:\n\n`) +
    `    ${chalk.green(`feat(路由): 新增 '业务变量库' 模块`)}\n` +
    `    ${chalk.green(`fix(业务变量库): handle events on blur (关闭禅道 #28)`)}\n\n` +
    chalk.red(`  更多细节请查看 ${chalk.bgRed.white(`.cz-config.js`)} 文件.\n`) +
    chalk.red(`  你也可以使用 ${chalk.cyan(`npm run commit`)} 命令来生成 commit 信息.\n`)
  );
  process.exit(1);
}
```