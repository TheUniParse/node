import { createServer } from 'http'
import fs from 'fs'

const host = 'localhost'
const port = 8000

const requestListener = (req, res) => {
  try {
    // read on every request
    const html = fs.readFileSync('./page.html', 'utf-8')
    res.setHeader('Content-Type', 'text/html')
    res.writeHead(200)
    res.end(html + '\n')
  } catch (err) {
    res.writeHead(500)
    res.end(err)
  }
}

const server = createServer(requestListener)

server.listen(
  port,
  host,
  () => console.log(`server running at http://${host}:${port}`)
)
