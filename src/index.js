if (process.env.NODE_ENV !== 'production')
  require('dotenv').config()

// console.log(`env.MYNAME = ${process.env.MYNAME}`)

// require('./event.mjs')
// import('./server.mjs')

import('./process_args.js')