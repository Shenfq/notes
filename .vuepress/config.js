module.exports = {
  title: 'Notes',
  description: '自然醒的学习笔记',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    nav: [
      { text: '前端笔记', link: '/fe/' },
      { text: '通用技术', link: '/common/' },
      { text: '读书笔记', link: '/book/' },
      { text: '有感而发', link: '/feel/' }
    ],
    sidebar: 'auto'
  }
}