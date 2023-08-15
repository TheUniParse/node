
let time = 0
console.log(`code start running ${time} ms`)

// endless logs each 100ms
setInterval(() => console.log(`code still running ${time += 100} ms`), 100)

// the listener on 'exit' invoked!!
setTimeout(() => process.exit(), 500)
// we can set process.exitCode = number

// the listener on 'exit' don't invoked!!
// setTimeout(() => process.kill(process.pid), 3000)

// the listener on 'exit' don't invoked!!
// log explaination
// setTimeout(() => process.abort(), 3000)



process.on('exit', code => {
  const cause = !code ? 'default, imlicitly, exit after all async funcs done, or after calling process.exit()' : 'error, other reason'

  console.log(`exitCode = ${code}: ${cause}`)
})