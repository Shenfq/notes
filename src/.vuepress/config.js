const path = require('path')
module.exports = {
  title: '读书笔记',
  description: ' ',
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
    search: false,
    lastUpdated: '最后更新时间',
    nav: [
      { text: '书单', link: '/book/' }
    ],
    sidebar: {
      '/book/': [{
        title: '书单',
        collapsable: false,
        children: [
          '',
          '2018',
          '2019',
          '2020',
          '2021',
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
