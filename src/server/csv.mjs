// comma seprated values
import { createServer } from 'http'

const host = 'localhost'
const port = 8000

const requestListener = (req, res) => {
  // on browser: start downloading uniparse.csv
  // on terminal cURL: display multilines rows

  res.setHeader("Content-Type", "text/csv")
  res.setHeader("Content-Disposition", "attachment;filename=uniparse.csv")

  res.writeHead(200)

  const headerRow = 'id,name,email'
  const dataRows = [
    '1,Uni Parse,TheUniParse@gmail.com',
    '2,Phantom Bill,AbaniBilal4@gmail.com'
  ]
  const csvTable = `${headerRow}\n${dataRows.join('\n')}`

  res.end(csvTable)
}


const server = createServer(requestListener)

server.listen(
  port,
  host,
  () => console.log(`server running at http://${host}:${port}`)
)
