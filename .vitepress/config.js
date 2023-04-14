import { defineConfig } from 'vitepress'

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
          ]
        },
        {
          text: '其他',
          items: [
            { text: 'Vue', link: '/vue/' },
            { text: '2023', link: '/2023/' },
            { text: '2020', link: '/2020/' },
            { text: '2019', link: '/2019/' },
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
            { text: '2023', link: '/2023/' },
            { text: '2020', link: '/2020/' },
            { text: '2019', link: '/2019/' },
          ]
        },

      ],
      '/2023/': [
        {
          text: '2023',
          items: [
            { text: '2023 索引', link: '/2023/' },
            { text: '翻转对象', link: '/2023/convert-object-key-value' }
          ]
        },
        {
          text: '其他',
          items: [
            { text: 'Svelte', link: '/svelte/' },
            { text: 'Vue', link: '/vue/' },
            { text: '2020', link: '/2020/' },
            { text: '2019', link: '/2019/' },
          ]
        }
      ],
      '/2020/': [
        {
          text: '其他',
          items: [
            { text: 'Svelte', link: '/svelte/' },
            { text: 'Vue', link: '/vue/' },
            { text: '2023', link: '/2023/' },
            { text: '2019', link: '/2019/' },
          ]
        }
      ],
      '/2019/': [
        {
          text: '其他',
          items: [
            { text: 'Svelte', link: '/svelte/' },
            { text: 'Vue', link: '/vue/' },
            { text: '2023', link: '/2023/' },
            { text: '2020', link: '/2020/' },
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
