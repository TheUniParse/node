
import http from 'http'

const options = {
  host: 'www.geeksforgeeks.org',
  // 'localhost:5000'
  path: '/courses',
  method: 'GET'
}

http.request(options, res =>
  console.log(`STATUS: ${res.statusCode}`)
).end()