const ghpages = require('gh-pages')
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