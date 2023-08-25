import { createServer } from 'http'

const host = 'localhost'
const port = 8000

const requestListener = (req, res) => {
  res.setHeader('Content-Type', 'text/plain')
  res.writeHead(200)
  res.end(`Hello World!\n`)
}

const server = createServer(requestListener)

server.listen(port, host, () =>
  console.log(`server running at http://${host}:${port}`)
)
