import EventEmitter from 'events'
import { clearInterval } from 'timers'

const eventEmitter = new EventEmitter()

const logEven = (time) => console.log(`even ${time}`)
eventEmitter.on('even', logEven)

const logOdd = (time) => console.log(`odd ${time}`)
eventEmitter.on('odd', logOdd)

const logHalf = () => console.log('half')
eventEmitter.once('half', logHalf)

let time = 0
const timerId = setInterval(() => {
  console.log(time += 100)

  if (time % 200 === 0) eventEmitter.emit('even', time)
  else eventEmitter.emit('odd', time)

  if (time >= 800) {
    eventEmitter.removeListener('even', logEven)
    // same as below
    eventEmitter.off('even', logEven)

    eventEmitter.removeAllListeners('odd')
  }

  if (time >= 500) eventEmitter.emit('half', 1, 100)
  // trigred only the first time, once

  if (time >= 2000) clearInterval(timerId)

}, 100)