const fs = require('fs')
const glob = require('glob')
const images = require('images')
const sharp = require('sharp')
const crypto = require('crypto')
const request = require('sync-request')
const mimeType = require('mime-types')

const cacheString = fs.readFileSync('cache/image.json', 'utf8') || '{}'
const cache = JSON.parse(cacheString)

const imgRegexp = /!\[.+\]\((.+)\)/g

glob.sync('src/**/*.md').forEach(async(file) => {
  let content = fs.readFileSync(file, 'utf8')
  let match = null
  while (match = imgRegexp.exec(content)) {
    const [origin, linkUrl] = match
    const [ url, resize ] = linkUrl.split(/\s+=/)
    if (!resize) {
      continue
    }
    let rsp = null
    try {
      rsp = request('GET', url, {
        timeout: 3e3
      })
      if (!rsp || !rsp.body) {
        console.error('[GET IMAGE ERROR]')
        continue
      }
    } catch (e) {
      console.error('[GET IMAGE ERROR]', e)
    }
    const img = rsp.body
    const md5 = crypto
      .createHash('md5')
      .update(img)
      .digest('hex')
    
    let base64 = cache[md5]
    const mime = mimeType.lookup(url)
    if (!base64) {
      base64 = `data:${mime};base64,${img.toString('base64')}`
    }
    const resizes = resize.split('x')
    const width = parseInt(resizes[0]) || 210

    const resizeImg = await sharp(img)
      .resize(width)
      .toBuffer()
    base64 = `data:${mime};base64,${resizeImg.toString('base64')}`
    cache[md5] = base64

    while (content.includes(linkUrl)) {
      content = content.replace(linkUrl, base64)
    }
  }
  fs.writeFileSync('cache/image.json', JSON.stringify(cache, null, 4))
})