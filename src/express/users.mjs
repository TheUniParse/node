import express from 'express'
import fs from 'fs'
import path from 'path'

const port = 3000
const app = express()

const usersPath = path.join(process.cwd(), 'db', 'users.json')
const getUsers = () => {
  const usersJson = fs.readFileSync(usersPath, 'utf8')
  const users = JSON.parse(usersJson)
  return users
}

// Middleware, parse req.body as JSON
app.use(express.json())

// routes: get post put delete ..........................

app.get('/users/:userName', (req, res) => {
  // curl http://localhost:3000/users/user1

  const { userName } = req.params
  const users = getUsers()
  const user = users.find(user => user.name === userName)

  if (user) res
    .send(`the age of ${userName} is ${user.age} !\n`)
  else res
    .status(404)
    .send(`there is no userName ${userName} in database !\n`)
})

app.post('/users', (req, res) => {
  // curl -X POST -H "Content-Type: application/json" -d '{"name":"user5","age":35}' http://localhost:3000/users

  const newUser = req.body
  const oldUsers = getUsers()

  // check if user exist
  const userExist = oldUsers.some(user =>
    user.hasOwnProperty('name')
    && user.name === newUser.name
  )
  if (userExist) {
    res.send(`sorry, user ${newUser.name} already exist !!`)
    return
  }

  // add new user
  const newUsers = oldUsers
  newUsers.push(newUser)

  const newUsersJson = JSON.stringify(newUsers, null, 2)
  fs.writeFileSync(usersPath, newUsersJson)

  res
    .status(201)
    .send(`the user ${newUser.name} added successfully.`)
})

app.put('/users', (req, res) => {
  // curl -X PUT -H "Content-Type: application/json" -d '{"name":"user5","age":45}' http://localhost:3000/users

  const newUser = req.body
  const oldUsers = getUsers()

  // check if user exist
  const userExist = oldUsers.some(user =>
    user.hasOwnProperty('name')
    && user.name === newUser.name
  )

  let newUsers
  if (userExist) // update
    newUsers = oldUsers.map(user =>
      user.name === newUser.name ? newUser : user
    )
  else { // add new user
    newUsers = oldUsers
    newUsers.push(newUser)
  }

  const newUsersJson = JSON.stringify(newUsers, null, 2)
  fs.writeFileSync(usersPath, newUsersJson)

  res.send(`the user ${newUser.name} ${userExist ? 'updated' : 'added'} successfully.`)
})

app.delete('/users/:deletedUser', (req, res) => {
  // curl -X DELETE http://localhost:3000/users/user5

  const { deletedUser } = req.params
  const oldUsers = getUsers()

  // check if user exist
  const userExist = oldUsers.some(user =>
    user.hasOwnProperty('name')
    && user.name === deletedUser
  )

  if (!userExist) {
    res.send(`sorry, user ${deletedUser} don't exist !!`)
    return
  }

  const newUsers = oldUsers.filter(user =>
    user.name !== deletedUser
  )

  const newUsersJson = JSON.stringify(newUsers, null, 2)
  fs.writeFileSync(usersPath, newUsersJson)

  res.send(`deleted the user ${deletedUser} successfully.`)
})

// listener .............................................
app.listen(port, () =>
  console.log(`express app listen at port ${port}`)
)