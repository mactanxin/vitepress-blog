# 在SvelteKit中获取数据



[官方教程](https://kit.svelte.dev/docs/load) 使用 `load` 方法获取数据.



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



