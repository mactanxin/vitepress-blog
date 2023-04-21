import { defineConfig } from 'vitepress'

const archived = [

]

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Xin's Blog",
  description: "Xin's blog, focus on Vue, Svelte, Tailwind CSS",
  srcDir: './markdown',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Svelte', link: '/svelte/' },
      { text: 'About', link: '/about-me' }
    ],

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
            { text: 'Ref', link: '/vue/ref-and-reactive.md' }
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
