import { program } from 'commander'
import http from 'http'

program
  .version('1.0.0')
  .description('cli tool, to request get, put, post, delete')

// get............................................
program
  .command('get <userName>')
  .description('request localhost:3000 by /path')
  .action(userName => {
    const responseHandler = res => {
      if (res.statusCode !== 200) {
        console.error(`Did not get OK from server, status code: ${res.statusCode}`)
        res.resume() // improve garbage collector
        return
      }

      res.setEncoding('utf8')

      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => console.log(`BODY: ${data}`))
    }

    const request = http.get(
      `http://localhost:3000/users/${userName}`,
      responseHandler
    )

    request.end()

    request.on('error', err =>
      console.error(`Request Error: ${err.message}`)
    )
  })

// post.........................................
program
  .command('post <name> <age>')
  .description('request with POST method')
  .action((name, age) => {
    const options = {
      host: 'localhost',
      port: 3000,
      path: '/users',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }

    const responseHandler = res => {
      if (res.statusCode !== 201) {
        console.error(`Did not get "Created" from server, status code: ${res.statusCode}`)
        res.resume() // improve garbage collector
        return
      }

      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => console.log(data))
    }

    const request = http.request(options, responseHandler)

    const newUser = { name, age: +age }
    request.write(JSON.stringify(newUser))

    request.end()
    request.on('error', err =>
      console.error(`Request Error: ${err.message}`)
    )
  })

// put...........................................
program
  .command('put <name> <age>')
  .description('request with PUT method')
  .action((name, age) => {
    const options = {
      host: 'localhost',
      port: 3000,
      path: '/users',
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }

    const responseHandler = res => {
      if (res.statusCode !== 200) {
        console.error(`Did not get OK from server, status code: ${res.statusCode}`)
        res.resume() // improve garbage collector
        return
      }

      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => console.log(data))
    }

    const request = http.request(options, responseHandler)

    const newUser = { name, age: +age }
    request.write(JSON.stringify(newUser))

    request.end()
    request.on('error', err =>
      console.error(`Request Error: ${err.message}`)
    )
  })

// delete........................................
program
  .command('delete <deletedUser>')
  .description('request with DELETE method')
  .action(deletedUser => {
    const options = {
      host: 'localhost',
      port: 3000,
      path: `/users/${deletedUser}`,
      method: 'DELETE'
    }

    const responseHandler = res => {
      if (res.statusCode !== 200) {
        console.error(`Did not get OK from server, status code: ${res.statusCode}`)
        res.resume() // improve garbage collector
        return
      }

      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => console.log(data))
    }

    const request = http.request(options, responseHandler)

    request.end()
    request.on('error', err =>
      console.error(`Request Error: ${err.message}`)
    )
  })


program.parse(process.argv)