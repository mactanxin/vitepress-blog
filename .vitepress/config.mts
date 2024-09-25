import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Xin's Blog",
  description: "Xin's blog, Vue, Nuxt, Svelte, Tailwind CSS",
  srcDir: './markdown',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Svelte', link: '/svelte/' },
      { text: 'About', link: '/about-me' }
    ],

    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' }
    //     ]
    //   }
    // ],
    sidebar: {
      '/svelte/': [
        {
          text: 'Svelte',
          items: [
            { text: 'Fetching Data in Sveltekit', link: '/svelte/fetching-data-in-sveltekit' },
            { text: 'Pagination in Sveltekit', link: '/svelte/pagination-in-sveltekit' },
            { text: 'Endpoint in Sveltekit', link: '/svelte/endpoint-in-sveltekit' },
            { text: 'Forms and enhancement', link: '/svelte/forms-and-enhancement' },
            { text: 'Form validation with zod', link: '/svelte/form-validation-with-zod' },
            { text: 'Grouped Layout', link: '/svelte/advanced-layout' },
          ]
        },
        {
          text: '其他',
          items: [
            { text: 'Vue', link: '/vue/' },
            { text: '归档', link: '/archives/' },
          ]
        },
      ],
      '/vue/': [
        {
          text: 'Vue',
          items: [
            { text: 'Ref', link: '/vue/ref-and-reactive.md' },
            { text: 'shallowRef', link: '/vue/shallowRef.md' },
            { text: 'fetch', link: '/vue/use-fetch.md' },
            { text: 'What\'s new in 3.3', link: '/vue/whats-new-in-v3.3.md' }
          ]
        },
        {
          text: '其他',
          items: [
            { text: 'Svelte', link: '/svelte/' },
            { text: '归档', link: '/archives/' },
          ]
        },

      ],
      '/archives/': [
        {
          text: '归档',
          items: [
            { text: '索引', link: '/archives/' },
          ]
        },
        {
          text: '其他',
          items: [
            { text: 'Svelte', link: '/svelte/' },
            { text: 'Vue', link: '/vue/' },
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/mactanxin/vitepress-blog' }
    ],
    footer: {
      message: 'Made with ❤️  by Xin',
      copyright: 'Copyright © 2019-present <a href="https://github.com/mactanxin">Xin</a>'
    }
  }
})
