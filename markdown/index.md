---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Xin's Blog"
  text: "Welcome to my blog"
  tagline: This is a blog where I write about the things I learn. I hope that I am able to provide you with some value from my experiences.

  actions:
    - theme: brand
      text: About Me
      link: /about-me
    - theme: alt
      text: Blog
      link: /archives/

features:
  - icon: 
      src: ./svelte-logo.png
    title: Svelte
    link: /svelte/
    details: Sveltekit in real life experiences
  - icon: 
      src: ./vue-logo.png
    title: Vue 
    link: /vue/
    details: Vue, ref, reactive and more
  - icon: 
      src: ./2023.avif
    title: Archives
    link: /archives/
    details: 🚀 Everything else
