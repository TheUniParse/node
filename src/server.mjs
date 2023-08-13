import { createServer } from 'http'
const port = parseInt(process.env.PORT, 10) || 5000
const name = process.env.MYNAME || 'Guest'

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })

  res.write(`Hello ${name}!`)
  // <body>
  //   <pre style="word-wrap:break-word; white-space:pre-wrap">
  //     Hello Uniparse|Guest!
  //   </pre>
  // </body>

  res.end()
})

server.listen(port)
// http://localhost:5001|5000
