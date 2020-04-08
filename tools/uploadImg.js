const fs = require('fs')
const glob = require('glob')
const qiniu = require('qiniu')
const crypto = require('crypto')
const { Duplex } = require('stream')

const accessKey = 'vUYGNWkQ-WE4DjcBO2fWAMjDlJPn5e8x3k5fuWdp' //可在个人中心=》秘钥管理查看
const secretKey = 'JKNjSF4hpFbsCRRHORN4nqZU6r28GdPQjDcvPuPv' //可在个人中心=》秘钥管理查看
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const putPolicy = new qiniu.rs.PutPolicy({ scope: 'sfqweb' })
const uploadToken = putPolicy.uploadToken(mac)
const putExtra = new qiniu.form_up.PutExtra()

// 构造七牛form表单
const config = new qiniu.conf.Config()
config.zone = qiniu.zone.Zone_z2
const formUploader = new qiniu.form_up.FormUploader(config)

// 今天的日期
const date = new Date()
const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

const imgRegexp = /!\[(.+)\]\((.+)\)/g

// 调整修改的md
const files = process.argv.slice(2)
files.forEach(async(file) => {
  console.log(11111, file)
  let content = fs.readFileSync(file, 'utf8')
  let match = null
  while (match = imgRegexp.exec(content)) {
    const [_, linkName, linkUrl] = match

    if (/file\.shenfq\.com/.test(linkUrl)) {
      continue
    }

    const [ url ] = linkUrl.split(/\s+=/)

    // 处理 base64 图片
    if (url.indexOf('data:') === 0) {
      const b64string = url.replace(/data:(.+);base64,/, '');  //base64必须去掉头文件（data:image/png;base64,）
      const md5 = crypto
        .createHash('md5')
        .update(b64string)
        .digest('hex')

      const buff = new Buffer(b64string, 'base64')
      const stream = new Duplex()
      stream.push(buff)
      stream.push(null)

      const key = `${dateStr}/${md5}`
      await new Promise((res) => {
        formUploader.putStream(uploadToken, key, stream, putExtra, (err) => {
          if (err) {
            console.log(err)
          }
          res(key)
        })
      })

      const uploadUrl = `https://file.shenfq.com/${key}`
      content = content.replace(linkUrl, uploadUrl)
    }

    // 处理网络图片
    if (/^https?:\/\//.test(url)) {
      console.log(linkName, linkUrl)
      // try {
      //   rsp = request('GET', url, {
      //     timeout: 3e3
      //   })
      //   if (!rsp || !rsp.body) {
      //     console.error('[GET IMAGE ERROR]')
      //     continue
      //   }
      // } catch (e) {
      //   console.error('[GET IMAGE ERROR]', e)
      // }
      // const img = rsp.body
      // const md5 = crypto
      //   .createHash('md5')
      //   .update(img)
      //   .digest('hex')
      
      // const buff = new Buffer(b64string, 'base64')
      // const stream = new Duplex()
      // stream.push(buff)
      // stream.push(null)

      // const key = `${dateStr}/${md5}`
      // await new Promise((res) => {
      //   formUploader.putStream(uploadToken, key, stream, putExtra, (err) => {
      //     if (err) {
      //       throw respErr
      //     }
      //     res(key)
      //   })
      // })

      // const uploadUrl = `https://file.shenfq.com/${key}`
      // content = content.replace(linkUrl, uploadUrl)
    }
  }

  // 文件更新
  fs.writeFileSync(file, content)
})