
let time = 0
console.log(`code start running ${time} ms`)

// endless logs each 1s
setInterval(() => console.log(`code still running ${time += 1000} ms`), 1000)

// the listener on 'exit' invoked!!
setTimeout(() => process.exit(0), 3000)
// we can set process.exitCode = number

// the listener on 'exit' don't invoked!!
// setTimeout(() => process.kill(process.pid), 3000)

// the listener on 'exit' don't invoked!!
// log explaination
// setTimeout(() => process.abort(), 3000)



process.on('exit', code => {
  const cause = !code ? 'default, imlicitly, exit after all async funcs done, or after calling process.exit(0)' : 'error, other reason'

  console.log(`exitCode = ${code}: ${cause}`)
})