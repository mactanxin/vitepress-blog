# Pagination in Sveltekit



## 方式一



传统请求方式

```typescript
let pageSize = 10
let pageNum = 1;

function fetchProducts() {
    const productRes = await fetch(`https://dummyjson.com/products?limit=${pageSize}&skip=${pageNum * pageSize}&select=title,price`)
    const productData = await productRes.json()

    return productData.products
}
```



使用SSR的话, 这种传统请求方式就要放在 `+page.ts` 中执行, 但是容易泄露 `API_KEY`. 可以改成纯服务端请求

方法一: 



后端请求示例

```typescript
// +page.server.ts
import { BASE_URL } from "$env/static/private"
import { error } from '@sveltejs/kit'

export const load = async ({ fetch, url }) => {

  const pageSize = Number(url.searchParams.get('pageSize')) || 10;
  const pageNum = Number(url.searchParams.get('pageNum')) || 1;

  const fetchNews = async () => {


    if (pageSize > 100) {
      throw error(400, 'Bad Request')
    }
    const res = await fetch(`${BASE_URL}/api/posts?populate=*`)
    const data = await res.json()
    return data.data

  }

  return {
    data: fetchNews()
  }

}

```



然后在 `+page.svelte`中:



```svelte
<script lang="ts">
  import { page } from '$app/stores'
  // 首先暴露一个 data 属性, 接收来自 +page.server.ts 中的数据
  export let data;
  let posts = data.data;
	let pageSize = 10;
  // totalItems 也可以从接口获取
  $: totalItems = posts.length;
  // 计算总页数
  $: totalPages = Math.ceil(totalItems / pageSize);
  $: currentPage = (Number($page.url.searchParams.get('pageNum')) || 0) / pageSize
</script>

<nav>
  {#each Array(totalPages) as _, index}
  	<a href="/posts?limit={pageSize}&skip={pageSize * index}"
       class={currentPage === index ? 'text-blue-600' : 'text-gray-800'}
    >
      {index + 1 }
  	</a>
  {/each}
</nav>
```



## 方式二 



上一种方式请求时url会带上大量searchParams, 现在更多的网站会在做url设计时提前规划好. 例如:

`/news/1` 其实就代表了第一页的数据. 代价是牺牲了固定的pageSize, 当然也可以用其他方法设置



在父级页面的 `+page.svelte`中这是url时,  引导用户到 `/news/` 或 `/news/1` 这样的页面去查看新闻.

在 `news`  的 `+page.server.ts` 中, 请求后台数据



```typescript
export const load = async ({ fetch, params }) => {

  const pageSize = 10;
  const pageNum = Number(params.slug) || 1

  const fetchNews = async (pageNum: number) => {
    if (pageSize > 100) {
      throw error(400, 'Bad Request')
    }
    const res = await fetch(`${BASE_URL}/api/posts?pageSize=${pageSize}&pageNum=${pageNum}`)
    const data = await res.json()
    return data.data

  }

  return {
    data: fetchNews(pageNum)
  }

}
```



之后`+page.svelte`中就是同样的使用方法了



```svelte
<script lang="ts">
  export let data;
  let posts = data.data;
</script>

{#each posts as post}
  <div class="my-post-title">
    {post.title}
	</div>
</div>
{/each}
```

