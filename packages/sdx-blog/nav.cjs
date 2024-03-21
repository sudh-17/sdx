// import fs from 'fs'
// import path from 'path'
const fs = require('fs')
const path = require('path')
// 读取文件
const docs = fs.readdirSync(path.join(__dirname, './docs'), 'utf-8')
// 读取目录 docs

const nav = []
const sidebar = {}
for (let it of docs) {
  const filepath = path.join(__dirname, './docs', it)
  if (fs.statSync(filepath).isDirectory() && /^\d+-/.test(it)) {
    const items = createNav(filepath, it)
    nav.push({
      text: it.replace(/^\d+-/, ''),
      items
    })
  }
}
// console.log(JSON.stringify(nav, null, 2))
fs.writeFileSync(
  path.join(__dirname, './docs/.vitepress/nav.ts'),
  `export default ${JSON.stringify(nav, null, 2)}`
)
fs.writeFileSync(
  path.join(__dirname, './docs/.vitepress/sidebar.ts'),
  `export default ${JSON.stringify(sidebar, null, 2)}`
)

function createNav(filepath, filename) { // 1-基础知识
  let dir = fs.readdirSync(filepath)
  let items = []
  dir.forEach(it => {
    let link
    let text
    const p = path.join(filepath, it)
    if (fs.statSync(p).isDirectory()) {
      let d = fs.readdirSync(p)
      let first = d[0] ? d[0] : ''
      link = `/${filename}/${it}/${first}`
      text = it

      sidebar[`/${filename}/${it}/`] = [
        {
          text: it,
          items: d.map(item => {
            return {
              text: item.replace(/\.md$/, ''),
              link: `/${filename}/${it}/${item.replace(/\.md$/, '')}`
            }
          })
        }
      ]
    } else {
      if (/\.md$/.test(it)) {
        link = `/${filename}/${it.replace(/\.md$/, '')}`
        text = it.replace(/\.md$/, '')
      }
    }

    if (link) {
      items.push({
        text,
        link
      })
    }
  })
  return items
}
