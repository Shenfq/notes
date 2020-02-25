const request = require('syncrequest')



const getImage = function (md, options) {
  md.inline.ruler.before('emphasis', 'base64', function (state, silent) {
    console.log(state.src)
  });
}

module.exports = (options, ctx) => {
  return {
      name: 'vuepress-plugin-image',
      extendMarkdown: md => {
          md.use(require('markdown-it-imsize'))
          md.use(getImage)
      }
  }
}