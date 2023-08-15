export function logArgs(__filename) {
  const [execPath, scriptPath, ...Args] = process.argv

  console.log(`path of the executable program:
  process.argv[0]: ${execPath}
  process.execPath: ${process.execPath}
  process.argv[0] === process.execPath : ${process.argv[0] === process.execPath}
  `)

  console.log(`path of the main js script:
  process.argv[1]: ${scriptPath}
  __filename: ${__filename}
  process.argv[1] === __filename : ${process.argv[1] === __filename} (only in main .js)
  `)

  console.log('command line interface arguments:')
  Args.forEach((arg, i) =>
    console.log(`  argument${i + 1}: ${arg}`)
  )
}

/** pnpm dev a b c
path of the executable program:
  process.argv[0]: C:\Program Files\nodejs\node.exe
  process.execPath: C:\Program Files\nodejs\node.exe
  process.argv[0] === process.execPath : true

path of the main js script:
  process.argv[1]: C:\Users\uni\projects\node\src\index.js
  __filename: C:\Users\uni\projects\node\src\index.js
  process.argv[1] === __filename : true (only in main .js)

command line interface arguments:
  argument1: a
  argument2: b
  argument3: c
 */