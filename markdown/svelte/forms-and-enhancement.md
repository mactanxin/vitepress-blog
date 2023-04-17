# Sveltekit 中的 Form 和 渐进增强



关于如何在sveltekit 中使用 form表单, 以及progresive enhancement



首先还是构建一个传统的`form` 表单



<form>
   <div class="sm:col-span-2">
    <label for="name" class="block text-sm font-medium text-gray-700"
      >Name</label
    >
    <div class="mt-1">
      <input
        type="text"
        name="name"
        id="name"
        autocomplete="name"
        class="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
      />
    </div>
  </div>
  <div class="sm:col-span-2">
    <label for="company" class="block text-sm font-medium text-gray-700"
      >Name</label
    >
    <div class="mt-1">
      <input
        type="text"
        name="name"
        id="name"
        autocomplete="name"
        class="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
      />
    </div>
  </div>
	<button type="submit" >
    submit
  </button>
</form>



然后让我们在 `+page.server.ts` 中构建一个简单的表单处理



```typescript
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData()
    console.log('formData: ', formData)
  }
}

```



这样在后台就能看到 `formData`对象了.



### 在同一个页面处理多个form请求

如果在同一个页面, 有多个form(比如删除), 那这时就要加入一些参数



在上面的示例中, 每次form请求, 都会刷新页面, 这样的体验放在现在web中已经过时了. 虽然没有使用任何JavaScript(甚至fetch).

现在大部分的新手可能甚至不会传统post表单了



这时就可以引入progressive enhancement



## Progressive enhancement



最简单的方式就是直接引入`sveltekit`自带的 `use:enhance` 指令.



