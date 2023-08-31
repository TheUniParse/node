process.stdin.on('data', data => {
  // basic, accept just strings, don't add \n at end.
  // process.stdout.write(`You typed ${data.toString()}`)

  // advanced, on top of process.stdout.write(), add \n at end.
  console.log(`You typed ${data.toString()}`)

  process.exit()
})