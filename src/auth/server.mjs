import express from "express"
import cors from 'cors'
import cookieParser from 'cookie-parser'

const port = 3000

// simulate database/users.json
const USERS = new Map()
  .set('user1', {
    id: 1,
    username: 'user1',
    password: 'pw1',
    role: 'admin'
  })
  .set('user2', {
    id: 2,
    username: 'user2',
    password: 'pw2',
    role: 'user'
  })

const SESSONS = new Map()

const app = express()

app.use(express.json())
app.use(cors({ // cross origin resource sharing
  origin: `http://192.168.1.3:5500`, // allow this origin
  credentials: true // allow cookies
}))
app.use(cookieParser()) // populate req.cookies res.cookie()

// post .................................................
app.post('/login', (req, res) => {
  const { username, password } = req.body
  const user = USERS.get(username)

  // authentication, (ex check password & userName)
  if (!user || user.password !== password)
    return res.sendStatus(401) // Unauthorized

  const sessonId = crypto.randomUUID()
  SESSONS.set(sessonId, user)
  res.cookie('sessonId', sessonId, {
    secure: true,
    httpOnly: true, // client javascript has no access
    sameSite: 'none' // just for testing
  })
    .send(`${username} login successfully`)

  console.log(`${username} login successfully with sessonId ${sessonId}`)
})


// get...................................................
app.get('/adminData', (req, res) => {
  const { sessonId } = req.cookies
  const user = SESSONS.get(sessonId)

  if (!user) return res.sendStatus(401)

  if (user.role !== 'admin') return res.sendStatus(403)
  // Forbidden

  res.send('access grented to admin data')
})

// listener .............................................
app.listen(port, () =>
  console.log(`Server Run at port ${port}`)
)