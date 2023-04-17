# 在SvelteKit中获取数据



普通请求: [官方教程](https://kit.svelte.dev/docs/load) 使用 `load` 方法获取数据.



在Sveltekit中, `+page.svelte` 以及他的 `+layout.svelte` 渲染之前, 我们使用 `load` 方法来获取数据.

通常一个 `+page.svelte` 会伴随一个 `+page.ts` 或者 `+page.server.ts` 文件



官网 example code

```typescript
import type { PageLoad } from './$types';
 
export const load = (({ params }) => {
  return {
    post: {
      title: `Title for ${params.slug} goes here`,
      content: `Content for ${params.slug} goes here`
    }
  };
}) satisfies PageLoad;
```

这时上面的代码中已经返回了 `post`对象.

然后在页面的 `+page.svelte`中, export 一个 `data`变量, 此时 `data`对象中就会包含上面返回的 `post`

可以看到下面的代码中, 直接使用 `data.post.title` 已经可以直接显示了

```svelte
<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<h1>{data.post.title}</h1>
<div>{@html data.post.content}</div>
```



一个 `load`方法在 `+page.ts` 或 `+page.js` 中时, 会在客户端及服务端运行.  如果为了防止暴露`APIKEY`可以选择把`load` 方法放在 `+page.server.ts`中执行.

比如: 



```typescript
import * as db from '$lib/server/database';
import type { PageServerLoad } from './$types';
 
export const load = (async ({ params }) => {
  return {
    post: await db.getPost(params.slug)
  };
}) satisfies PageServerLoad;
```



## Parallel loading



这个部分在 [官方文档](https://kit.svelte.dev/docs/load#parallel-loading) 中被一笔带过了.

在实际开发中,  如果在同一个 `load` 方法中有多个请求, 可能是下面这样的代码: 



```typescript
<script lang="ts">
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
  const prodRes = await fetch('https://dummyjson.com/products')
  const products = await prodRes.json()
  
  const userRes = await fetch('https://dummyjson.com/users')
  const users= await userRes.json()
  
  return {
    products,
    users
  }
}) satisfies PageServerLoad;
</script>
```



如果这样写, 就会产生两个按顺序执行的请求.



.如果两个请求之间是相互独立的, 那么返回两个请求的方法, 就可以并发请求

改成下面的代码方式: 

```typescript
<script lang="ts">
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {

  function fetchProducts() {
    const productRes = await fetch('https://dummyjson.com/products')
    const productData = await productRes.json()

    return productData.products
  }

  function fetchUsers() {
    const userRes = await fetch('https://dummyjson.com/users')
    const userData= await userRes.json()

    return userData.users
  }

  return {
    products: fetchProducts(),
    users: fetchUsers()
  }
}) satisfies PageServerLoad;
</script>
```





## prefetch



更进一步的优化, 可以在用户鼠标hover在某个链接上的时候就开始预加载.

只要在对应的 `<a>` 标签上加上 `<a data-sveltekit-prefetch>` 属性. 这样只要在用户鼠标悬浮在连接上, 就可以prefetch数据, 然后渲染页面, 提升访问感受
