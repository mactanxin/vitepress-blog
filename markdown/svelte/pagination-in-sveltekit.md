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

console.log("BASE_URL", BASE_URL)
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

