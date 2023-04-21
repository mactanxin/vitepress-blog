使用鲜为人知但功能强大的`**Object.entries**`和`**Object.fromEntries**`.

我最近遇到了一个需要翻转或反转/反转的数据结构。

假设数据如下所示：

```javascript
{ x: 1, y: 2 }
```

我们想要反转对象的键和值以得到以下结果：

```javascript
{ 1: 'x', 2: 'y' }
```

_小提示：当用作键值时，JavaScript 将“数字”存储为字符串——即使它们可能看起来像数字。_

那么我们如何反转这个数据结构呢？

让我们首先将键和值转换为数组，这样我们就可以交换它们的顺序。

为此，我将使用 `**Object.entries()**`：

```javascript
// [['x', 1], ['y', 2]]
Object
  .entries({ x: 1, y: 2 });
```

当这返回一个新数组时，我们可以映射这些值并使用新数组和一些解构来交换它们：

```javascript
// [[1, 'x'], [2, 'y']]
Object
  .entries({ x: 1, y: 2 })
  .map(([key, value]) => [value, key]);
```

现在是时候将它们重新组合成一个普通的 JavaScript 对象了。

我们将获取我们的多维数组并将其传递给`**Object.fromEntries()**`，正如名称所描述的，它需要“条目”格式的数据：

```javascript
const flipped = Object
  .entries({ x: 1, y: 2 })
  .map(([key, value]) => [value, key]);

// { 1: 'x', 2: 'y' }
Object
  .fromEntries(flipped);
```

而已！

然而，与所有好的代码一样，我们应该将它完全包装在一个实用函数中，以实现最大程度的重用和可测试性：

```javascript
const flip = (data) => Object.fromEntries(
  Object
    .entries(data)
    .map(([key, value]) => [value, key])
  );

// { 1: 'x', 2: 'y' }
flip({ x: 1, y: 2 });
```
