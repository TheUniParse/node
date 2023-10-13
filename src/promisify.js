import util from 'util'
import fs from 'fs'

// instead of the old callback based function
const callback = (err, data) => {
  if (err) return console.log('handle err')
  console.log(data)
}
fs.readFile('src.txt', 'utf8', callback)

// wecan promisify fs.readfile
const readFilePromise = util.promisify(fs.readFile)

// then we can write the modern bromise based function
try {
  const data = await readFilePromise('src.txt', 'utf8')
  console.log(data)
} catch (err) {
  console.log('handle err')
}