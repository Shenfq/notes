module.exports = {
  title: 'Notes',
  description: '自然醒的学习笔记',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  search: false,
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: '前端笔记', link: '/fe/' },
      { text: '通用技术', link: '/common/' },
      { text: '读书笔记', link: '/book/' }
    ],
    sidebar: {
      '/fe/': [
        'module',
        'node'
      ],
      '/common/': [
        'design-patterns',
        'functions'
      ],
      '/book/': [
        'the-art-of-scalability.md'
      ]
    }
  }
}