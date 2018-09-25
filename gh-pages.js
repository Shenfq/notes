const fs = require('fs')
const path = require('path')
const ghpages = require('gh-pages')

fs.writeFileSync(path.resolve(__dirname, ".vuepress/dist/CNAME"), 'notes.shenfq.com');

ghpages.publish('./.vuepress/dist', {
  branch: 'gh-pages',
  repo: 'git@github.com:Shenfq/notes.git'
}, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('gh-pages done!')
});