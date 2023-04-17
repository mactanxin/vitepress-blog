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



