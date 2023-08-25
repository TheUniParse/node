import { createServer } from 'http'
import fs from 'fs'

const host = 'localhost'
const port = 8000

let htmlCache

const requestListener = (req, res) => {
  res.setHeader('Content-Type', 'text/html')
  res.writeHead(200)
  res.end(htmlCache + '\n')
}

const server = createServer(requestListener)

try {
  // read once at server starting, not on every request!!
  htmlCache = fs.readFileSync('./page.html', 'utf-8')
  server.listen(port, host, () =>
    console.log(`server running at http://${host}:${port}`)
  )
} catch (err) {
  console.error(`could not read page.html file: ${err}`)
  process.exit(1)
}
