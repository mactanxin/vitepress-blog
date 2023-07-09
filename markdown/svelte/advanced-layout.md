# grouped layout in sveltekit



Tl;dr

> 在  `routes`文件夹中使用 `(分组名)` 的形式对路由和layout进行分组



比如一开始写的代码结构是这样的, 如下

```
routes
├── admin
│   ├── +layout.svelte
│   ├── +page.server.ts
│   └── +page.svelte
└── quotes
    ├── id
    │   └── [quoteId]
    │       ├── +page.server.ts
    │       └── +page.svelte
    ├── tags
    │   ├── [tag]
    │   │   ├── +page.server.ts
    │   │   └── +page.svelte
    │   ├── +page.server.ts
    │   └── +page.svelte
    ├── +layout.server.ts
    ├── +layout.svelte
    └── +page.svelte

```



随着业务的开展, 我们需要对某些页面根据不同的路由使用不同的布局.

那么就可以改成



```
routes
├── (app)
│   └── quotes
│       ├── id
│       │   └── ...
│       ├── tags
│       │   └── ...
│       ├── +layout.svelte
│       └── +page.svelte
├── (dashboard)
│   └── admin
│       ├── +layout.svelte
│       ├── +page.server.ts
│       └── +page.svelte
└── +layout.svelte

```

然后再次访问 `/quotes/` 或者 `/admin` 的时候, 就会根据不同的路由显示不同的布局了  



## +page@

如果需要针对某一个页面(aka 路由)单独设置布局, 比如想要重置 `(app)/quotes/tags/+page`

那么可以这样写

```
routes
├── (app)
│   └── quotes
│       ├── id
│       │   └── ...
│       ├── tags
│       │   └── +page@(app).svelte
│       ├── +layout.svelte
│       └── +page.svelte
├── (dashboard)
│   └── admin
│       ├── +layout.svelte
│       ├── +page.server.ts
│       └── +page.svelte
└── +layout.svelte
```

