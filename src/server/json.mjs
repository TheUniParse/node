import { createServer } from 'http'

const host = 'localhost'
const port = 8000
const message = 'json response !!'

const requestListener = (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  res.writeHead(200)

  res.end(JSON.stringify({ message }) + '\n')
}

const server = createServer(requestListener)

server.listen(
  port,
  host,
  () => console.log(`server running at http://${host}:${port}`)
)
