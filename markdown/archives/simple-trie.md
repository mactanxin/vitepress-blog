# 自己动手实现一个 Trie

trie树常用于搜索提示。如当输入一个网址，可以自动搜索出可能的选择。当没有完全匹配的搜索结果，可以返回前缀最相似的可能。
Trie树检索的时间复杂度可以做到n，n是要检索单词的长度，
如果使用暴力检索，需要指数级O(n2)的时间复杂度。

简易版本: 
```javascript
class Trie{
  constructor() {
    this.root = {};
  }

  insert(w) {
    let p = this.root;
    for(let c of w){
      if(!p[c]){
        p[c] = {}
      }
      p = p[c];
    }
    p['#'] = true;
  }

  search(w) {
    let p = this.root;
    for(let c of w) {
      if(!p[c]) {
        return -1
      }
      p = p[c];
    }
    return p;
  }
}

let trie = new Trie();

trie.insert('hello');
trie.search('h');
```