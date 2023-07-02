# Better Prompting for ChatGPT



## guidelines



1. Be clear and specific
2. Analyze why the result does not give desired output 
3. Refine the idea and prompt
4. Repeat



## Be clear and specific

### 使用分隔符

> """
>
> '''
>
> `
>
> <>
>
> -

###  规定格式

> 要求输出 JSON, XML 格式



### 给出边界

> 总结一点文字, 按照 step 1, step 2格式输出. 如果没有步骤, 就输出没有步骤



### 给出示例

> 举例:
>
> 孩子: 时间是什么
>
> 老师: **时间**是一种[尺度](https://zh.wikipedia.org/wiki/尺度)，在[物理](https://zh.wikipedia.org/wiki/物理)[定义](https://zh.wikipedia.org/wiki/定义)是[标量](https://zh.wikipedia.org/wiki/标量_(物理学))，藉著时间，事件发生之先后可以按[过去](https://zh.wikipedia.org/wiki/過去)-[现在](https://zh.wikipedia.org/wiki/現在)-[未来](https://zh.wikipedia.org/wiki/未来)之序列得以确定（时间点/时刻），也可以衡量事件持续的期间以及事件之间和间隔长短（时间段）[[1\]](https://zh.wikipedia.org/zh-hans/时间#cite_note-1)[[2\]](https://zh.wikipedia.org/zh-hans/时间#cite_note-DefRefs02-2)。
>
> 孩子: 空间是什么
>
> 老师: 



## 给出思考的时间



### 按照步骤给出思考的过程

 >请按照下面的指示执行.
 >
 >1. 总结这段文字
 >2. 将一段文字翻译成英文
 >3. 列出其中的xx关键点
 >4. 按照 指定格式输出



### 让ChatGPT思考一遍(给出自己的方案)再给出答案

> 做一道xx计算题
>
> 先让chatgpt 给出一套方案,
>
> 然后再插入想要对比的方案
>
> 评估对比方案是否是正确的



## 一本正经的胡说八道

> Tell me about AreoGlide Ultraslim Smart Toothbrush by Boie



### 第一性原则提问

>每当我问你一个知识点，你应该提出三个问题，井且尝试解答这三个问题。
>
>这三个问题应该按下面的思路去提问：
>
>1. ﻿﻿﻿它从哪里来？这个问题意味着，一个知识的产生，并不是凭空而产生的，它必然是为了解决一个问题而诞生。
>2. ﻿﻿它是什么？这个问题意味着，一个知识点它本身是什么样的。它对于要解决的问题提出了什么方案。
>3. ﻿﻿它到哪里去？这个问题意味着，一个知识点本身针对问题的解決存在哪些缺陷？它有什么
>4. 局限性？ 未来的发展方向如何？



Prompt examples



Ver 1

```txt
Your task is to help a marketing team create a description for a retail website of a product, based on a technical fact sheet.

Write a product description based on the information providedin the technical specification delimited by triple backticks.

Use at most 50 words

Technical specificaions: ```${fact_sheet}```

```



Ver 2

```txt
Your task is to help a marketing team create a description for a retail website of a product, based on a technical fact sheet.

Write a product description based on the information providedin the technical specification delimited by triple backticks.

* The description is intended for furniture retailers, so it should be technical in nature and focus on the materials the product is constructed from. *

Use at most 50 words

Technical specificaions: ```${fact_sheet}```

```



