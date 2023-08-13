process.argv.forEach((arg, i) =>
  console.log(`arg${i}: ${arg}`)
)


/** pnpm dev a b=c d
arg0: C:\Program Files\nodejs\node.exe
arg1: C:\Users\uni\projects\node\src\index.js
arg2: a
arg3: b=c
arg4: d
 */