import { createServer } from 'http'

const host = 'localhost'
const port = 8000

const books = JSON.stringify([
  { title: 'title1', author: 'author1', publishedYear: 2021 },
  { title: 'title2', author: 'author2', publishedYear: 2022 }
], null, 2)

const authors = JSON.stringify([
  { name: 'author1', country: 'country1', birthdayYear: 2001 },
  { name: 'author2', country: 'country2', birthdayYear: 2002 }
], null, 2)

const requestListener = (req, res) => {
  const { url } = req

  res.setHeader('Content-Type', 'application/json')

  switch (url) {
    case '/books':
      res.writeHead(200)
      res.end(authors + '\n')
      break

    case '/authors':
      res.writeHead(200)
      res.end(authors + '\n')
      break

    default:
      if (url.match(/\/books\/\w+/)) {
        const bookTitle = url.replace('/books/', '')
        const book = JSON.parse(books)
          .find(book => book.title === bookTitle)

        if (book) {
          res.writeHead(200)
          res.end(JSON.stringify(book, null, 2) + '\n')

          return
        }
      } else if (url.match(/\/authors\/\w+/)) {
        const authorName = url.replace('/authors/', '')
        const author = JSON.parse(authors)
          .find(author => author.name === authorName)

        if (author) {
          res.writeHead(200)
          res.end(JSON.stringify(author, null, 2) + '\n')

          return
        }
      }

      res.writeHead(404)
      res.end(JSON.stringify({ error: 'Resource not found' }, null, 2) + '\n')
  }
}

const server = createServer(requestListener)

server.listen(port, host, () =>
  console.log(`server running at http://${host}:${port}/books or http://${host}:${port}/authors`)
)
