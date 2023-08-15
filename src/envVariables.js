if (process.env.NODE_ENV !== 'production')
  require('dotenv').config()

console.log(`env.MYNAME = ${process.env.MYNAME}`)
