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
        {
          title: '简介',
          collapsable: false,
          children: ['']
        },
        {
          title: '模块化',
          collapsable: false,
          children: [
            'commonjs'
          ]
        },
        {
          title: 'Node.js',
          collapsable: false,
          children: [
            'node-process'
          ]
        }
      ],
      '/common/': [{
        title: '通用技术',
        collapsable: false,
        children: [
          '',
          'design-patterns',
          'functions'
        ]
      }],
      '/book/': [{
        title: '读书笔记',
        collapsable: false,
        children: [
          '',
          '2018',
          '2019',
          'the-art-of-scalability.md'
        ]
      }]
    }
  }
}
