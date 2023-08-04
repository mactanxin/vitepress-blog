# LeetCode

2619. Array Prototype Last

```javascript
Array.prototype.last = function() {
    if(this.length === 0) return -1
    return this.at(-1)
};
```



