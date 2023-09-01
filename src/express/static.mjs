import express from 'express'

const port = 3000
const app = express()


/** static assets
 * public/file.txt
 * public/images/img.png
 * db/users.json
 */

// Middleware functions, route static assets ...............

app.use(express.static('public'))
// localhost:3000/file.txt
// localhost:3000/images/img.png
// ...

app.use('/route', express.static('db'))
// localhost:3000/route/users.json

app.use('/users',express.static('db/users.json'))
// localhost:3000/users


// listener ................................................
app.listen(port, () =>
  console.log(`express app listen at port ${port}`)
)