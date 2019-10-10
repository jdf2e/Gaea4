const Vue = require('vue')
const server = require('express')()
const { createRenderer } = require('vue-server-renderer')
const path = require('path');
const context = {
    title:'hellow',
    meta:``
}

server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>you visiter is {{ url }}</div>`
  })
  const renderer = createRenderer({
    template: require('fs').readFileSync(path.resolve('./.bin/index.html'), 'utf-8')
  })
  
  renderer.renderToString(app,context, (err, html) => {
    console.log(html) // html 将是注入应用程序内容的完整页面
    res.end(html)
  })
//   renderer.renderToString(app, (err, html) => {
//     if (err) {
//       res.status(500).end('Internal Server Error')
//       return
//     }
//     res.end(`
//       <!DOCTYPE html>
//       <html lang="en">
//         <head><title>Hello</title></head>
//         <body>${html}</body>
//       </html>
//     `)
//   })
})

server.listen(8080)