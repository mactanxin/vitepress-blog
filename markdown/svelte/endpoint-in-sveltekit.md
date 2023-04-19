# Endpoint



其实是`+page.server.ts`的延伸, [官网的说明](https://kit.svelte.dev/docs/routing#server)

> By exporting `POST`/`PUT`/`PATCH`/`DELETE`/`OPTIONS` handlers, `+server.ts` files can be used to create a complete API



这样可以运行我们更灵活的控制请求, 同时很好的把敏感数据隐藏在 `+server.ts`中. 例如 `API_KEY`



```svelte
<script>
    let a = 0;
    let b = 0;
    let total = 0;

    async function add() {
        // 这里的 /api/add 就是我们要创建的 endpoint
        const response = await fetch('/api/add', {
            method: 'POST',
            body: JSON.stringify({ a, b }),
            headers: {
                'content-type': 'application/json'
            }
        });

        total = await response.json();
    }
</script>
```

