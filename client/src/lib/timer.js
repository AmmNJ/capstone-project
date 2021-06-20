import { addMinToMs, toMin, toTimerMinAndSec } from './time'

export function timer(startDateObj, timerLength, onTimerEnd, setTimer) {
  const date = new Date(startDateObj)
  const timerLengthInMin = toMin(timerLength)
  const startTime = date.setTime(addMinToMs(date.getTime(), timerLengthInMin))
  const elapsedTime = startTime - Date.now()

  if (elapsedTime >= timerLength) {
    onTimerEnd()
  } else {
    const [min, sec] = toTimerMinAndSec(elapsedTime)
    setTimer([min, sec])
  }
}
