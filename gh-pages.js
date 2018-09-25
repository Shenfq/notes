const fs = require('fs')
const path = require('path')
const ghpages = require('gh-pages')
const repo = process.argv[2]

if (!repo) {
  console.log('repo is not defined')
  process.exit(1)
}

fs.writeFileSync(path.resolve(__dirname, ".vuepress/dist/CNAME"), 'notes.shenfq.com');

console.log('push to ' + repo)

ghpages.publish('./.vuepress/dist', {
  branch: 'gh-pages',
  repo: repo
}, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('gh-pages done!')
});