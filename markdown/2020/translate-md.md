# 解析Markdown的标题

最近遇到了一道有意思的题, 如何解析markdown里的`#`标题, 并且转义成数字, 例如 1.1 这种章节的形式.  
根据 # 的数量解析章节, 返回一个数组, 每个对象都是一个章节 { hn: '1', title: 'a'} 的形式.  

```javascript
var md = `
# a

## bb

### ccc

## dd

### eee

## ff

### ggg

### hhh
`;
```

期望的结果是
```text
[
  { hn: '1', title: 'a' },
  { hn: '1.1', title: 'bb' },
  { hn: '1.1.1', title: 'ccc' },
  { hn: '1.2', title: 'dd' },
  { hn: '1.2.1', title: 'eee' },
  { hn: '1.3', title: 'ff' },
  { hn: '1.3.1', title: 'ggg' },
  { hn: '1.3.2', title: 'hhh' }
]
```

## 思路一:

这种方法比较偷懒, ~~并不是最优解~~ 维护一个Map, 保存当前的章节, 然后根据现在的#数量取对应的层级, 缺点是需要在父级章节递增的时候重置子级.

```javascript
const generateHeadingNumber = (markdown) => {
  let ret = [];
  // strip and convert to list
  if (!markdown) {
    return null;
  }
  try {
    markdown = markdown.split('\n').filter( i => i.includes('#'));
    console.info(markdown)
  } catch {
    console.error('illegal string');
  }
  // maintain a map for '#'
  let sign_dict = {};

  let counter = 0;

  for (let i = 0; i < markdown.length; i++) {
    let head = markdown[i];
    let [hn, title] = head.split(' ');
    if (hn === '#') {
      sign_dict = {};
      counter += 1;
      sign_dict['#'] = counter;
      hn = String(counter)
      let item = {
        hn,
        title
      }
      ret.push(item)
    } else {
      if (!sign_dict[hn]) {
        sign_dict[hn] = 1
      } else {
        sign_dict[hn] += 1
        for (const [key, value] of Object.entries(sign_dict)) {
          if (key.length > hn.length) {
            sign_dict[key] = 0
          }
        }
      }
      let tmp_hn = '';
      let item = {};
      for (let j = 1; j <= hn.length; j++) {
        let sharps = '#'.repeat(j)
        if (!sign_dict[sharps]) {
          sign_dict[sharps] = 1;
        }
        tmp_hn += (sign_dict[sharps] || '1') + '.';
        item['hn'] = tmp_hn.substr(0, tmp_hn.length-1);
        item['title'] = title;
      }
      ret.push(item)
    }
  }
  return ret
}
```

## 思路二:
这种更直观, 就是利用当前的#数量维护一个树状结构: 

```javascript
[
  {
    hn: '1', // 对象的hn 其实可以通过当前层的index + 1得到, 更简单
    title: 'a',
    children: [
      {
        hn: '1',
        title: 'bb',
        children: [
          {
            hn: '1',
            title: 'ccc',
          }
        ]
      },
      {} // same as above
    ]
  }
]
```


