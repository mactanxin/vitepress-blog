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

如果什么都不做, 默认的表单会继续提交, 但是现在**没有**页面刷新的动作了



这时可以指定一个方法来处理表单提交的动作



```svelte
<form
  use:enhance={({ form, data, action, cancel }) => {
    return async ({ result, update }) => {};
  }}
  method="POST"
  action="?/create"
  class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
>

```



在这里有几个地方需要注意一下:

这个的 `{form, data, action, cancel}` 对象, 可以分别获取到以下内容:

```text
form 是 form 表单元素
data 是 FormData 对象
action 是对应的 action对象, 包含URL, host, origin等信息
cancel() 可以取消提交
```



在回调函数中的 `{result, update}`

```
result 是 提交结果对象
update()
```





```javascript
({ form, data, action, cancel }) => {
  // 这里的以前在表单提交前执行
  // 比如
  console.log('form: ', form)
  
 
  return async ({ result, update }) => {
    // 这里的代码会在submit之后执行
    console.log('result: ', result)
    if (result.type === 'success') {
      form.reset()
    }
  };
}
```



// todo: add an alert component, if form validation fails on server, return error, display alert



```svelte
{#if form?.error}
	<Alert message={form?.message} />
{/if}
```



如果这个时候再次提交, 及时故意写一个错误的表单也什么都不会显示. 因为这时的`use:enhance` 已经启用了,

这时如果禁用浏览器的`javascript`, 使用传统表单提交, 就会显示错误信息.

那么如何解决呢?



## 处理异常

我们就需要在 `use:enhance`中加入处理

```typescript
import { enhance, applyAction } from '$app/forms'
({ form, data, action, cancel }) => {
  // 这里的以前在表单提交前执行
  // 比如
  console.log('form: ', form)
  
 
  return async ({ result, update }) => {
    // 这里的代码会在submit之后执行
    console.log('result: ', result)
    if (result.type === 'success') {
      form.reset()
    }
    
    // ++++ 这里处理异常
    if (resule.type === 'invalid') {
      await applyAction(result)
    }
    // 最后需要执行 update()
    // 否则load方法只会在页面加载时执行一次, 且不会再次处理表单请求
    update()
  };
}
```



但是这种方式, 使用传统的表单验证会非常影响效率. 我们可以使用 [Zod](https://zod.dev) 来验证表单.

具体可以查看[这一篇](./form-validation-with-zod.md)
