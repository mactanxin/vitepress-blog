import { createContentLoader, defineConfig } from 'vitepress'
import { SitemapStream } from 'sitemap'
import { createWriteStream } from 'node:fs'
import { resolve } from 'node:path'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  lastUpdated: true,
  head: [
    [
      'script',
      {
        async: true,
        src: 'https://www.googletagmanager.com/gtag/js?id=G-85K7LK4QKE'
      }
    ],
    [
      'script',
      {},
      "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-85K7LK4QKE');"
    ]
  ],
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
  },
  buildEnd: async ({ outDir }) => {
    const sitemap = new SitemapStream({ hostname: 'https://tanx.in/' })
    const pages = await createContentLoader('*.md').load()
    const writeStream = createWriteStream(resolve(outDir, 'sitemap.xml'))

    sitemap.pipe(writeStream)
    pages.forEach((page) => sitemap.write(
      page.url
        // Strip `index.html` from URL
        .replace(/index$/g, '')
      // Optional: if Markdown files are located in a subfolder
      // .replace(/^\/docs/, '')
    ))
    sitemap.end()

    await new Promise((r) => writeStream.on('finish', r))
  }
})
