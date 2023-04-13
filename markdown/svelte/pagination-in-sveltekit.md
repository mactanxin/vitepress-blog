# pagination on server



普通的请求

```typescript
let pageSize = 10
let pageNum = 1;

function fetchProducts() {
    const productRes = await fetch(`https://dummyjson.com/products?limit=${pageSize}&skip=${pageNum * pageSize}&select=title,price`)
    const productData = await productRes.json()

    return productData.products
}
```



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
    console.log('server: ', data.data)
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
  // 首先暴露一个 data 属性, 接收来自 +page.server.ts 中的数据
  export let data;
  let posts = data.data;
	let pageSize = 10;
  // totalItems 也可以从接口获取
  $: totalItems = posts.length;
  // 计算总页数
  $: totalPages = Math.ceil(totalItems / pageSize);
</script>

<nav>
</nav>
```

