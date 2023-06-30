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

