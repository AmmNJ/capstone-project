import { addMinToMs, toMin, toMinAndSec } from './time'

export function timer(startDateObj, timerLengthInMs, onTimerEnd, setTimer) {
  const timerLengthInMin = toMin(timerLengthInMs)
  const date = new Date(startDateObj)
  const endTime = new Date(addMinToMs(date.getTime(), timerLengthInMin))
  const elapsed = Date.now() - date.getTime()
  const remaining = endTime - Date.now()

  if (elapsed >= timerLengthInMs) {
    onTimerEnd()
    return
  } else {
    const [min, sec] = toMinAndSec(remaining)
    setTimer([min, sec])
  }
}
