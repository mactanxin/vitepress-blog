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
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'About', link: '/about-me' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/mactanxin/vitepress-blog' }
    ]
  }
})
