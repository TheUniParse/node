import chalk from 'chalk'
import figlet from 'figlet'
import cliProgress from 'cli-progress'
import { sleep } from './lib/lib.mjs'

// outputs:
process.stdout.write('output\n')
console.log('output') // better

// errors:
process.stderr.write('error\n')
console.error('error') // better


// style output:
const good = chalk.hex('#9f0').bold.italic.overline
const normal = chalk.rgb(0, 175, 255).bold.underline
const bad = chalk.red.bold.strikethrough

console.log(`
${good('good')}
${normal('normal')}
${bad('bad')}
`)

// styling output heading
const heading = figlet.textSync

console.log(`
${heading('UniParse')}
${heading('Ghost', 'ghost')}
`)


// progress
const { SingleBar, MultiBar, Presets: {
  shades_classic,
  shades_grey,
} } = cliProgress

const singleBar = new SingleBar(
  {},
  shades_classic
)

await task1(singleBar)
console.log('single progress done!\n multi progress start:')

// multibar progress
const multiBar = new MultiBar({
  clearOnComplete: false,
  hideCursor: true,
  format: ' {bar} | {filename} | {value}/{total}'
}, shades_grey)

const bar1 = task2(multiBar, { max: 200 })
const bar2 = task2(multiBar, { max: 1000, increment: 50, ms: 500 })

// stop all bars
await Promise.allSettled([bar1, bar2])
multiBar.stop()


// utility
async function task1(singleBar, options = {}) {
  const {
    ms = 300,
    increment = 10,
    initial = 0,
    max = 100
  } = options

  singleBar.start(max, initial)

  let progress = initial
  while ((progress += increment) <= max) {
    await sleep(ms)
    singleBar.increment(increment)
    // or progressBar.update(progress)

    // we can reset total progressBar.setTotal(150)
  }

  singleBar.stop()

}

async function task2(multiBar, options = {}) {
  const {
    ms = 300,
    increment = 10,
    initial = 0,
    max = 100
  } = options

  const bar = multiBar.create(max, initial)

  let progress = initial
  while ((progress += increment) <= max) {
    await sleep(ms)
    bar.update(progress, { filename: 'data1.txt' })
  }
}

