const path = require('path')
module.exports = {
  title: 'Notes',
  description: '自然醒的学习笔记',
  search: false,
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['script', {}, `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?b887a437433180b7cdce3335aedd741d";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
    `]
  ],
  plugins: [
    ['image']
  ],
  themeConfig: {
    lastUpdated: '最后更新时间',
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
            'modules'
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
          '2020',
          'the-art-of-scalability.md'
        ]
      }]
    }
  },
  configureWebpack: (config) => {
    return { 
      module: {
        rules: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [
              path.resolve(__dirname, '../node_modules/vue-echarts'),
              path.resolve(__dirname, '../node_modules/resize-detector')
            ]
          }
        ]
      }
    }
  }
}
