import axios from 'axios'
import { program } from 'commander'

program
  .version('1.0.0')
  .description('cli tool, to request get, put, post, delete')

// get............................................
program
  .command('get <name>')
  .description('request localhost:3000 by /path')
  .action(async name => {
    try {
      const { data, status, statusText } =
        await axios.get(`http://localhost:3000/users/${name}`)

      console.log(`STATUS ${status} ${statusText}\n${data}`)
    } catch (err) {
      console.error(err.message)
    }
  })

// post.........................................
program
  .command('post <name> <age>')
  .description('request with POST method')
  .action(async (name, age) => {
    try {
      const user = { name, age: +age }
      const { data, status, statusText } =
        await axios.post(`http://localhost:3000/users`, user)

      console.log(`STATUS ${status} ${statusText}\n${data}`)
    } catch (err) {
      console.error(err.message)
    }
  })

// put...........................................
program
  .command('put <name> <age>')
  .description('request with PUT method')
  .action(async (name, age) => {
    try {
      const user = { name, age: +age }
      const { data, status, statusText } =
        await axios.put(`http://localhost:3000/users`, user)

      console.log(`STATUS ${status} ${statusText}\n${data}`)
    } catch (err) {
      console.error(err.message)
    }
  })

// delete........................................
program
  .command('delete <user>')
  .description('request with DELETE method')
  .action(async user => {
    try {
      const { data, status, statusText } = await axios
        .delete(`http://localhost:3000/users/${user}`)

      console.log(`STATUS ${status} ${statusText}\n${data}`)
    } catch (err) {
      console.error(err.message)
    }
  })


program.parse(process.argv)