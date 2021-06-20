import { addMinToMs, toMin, toMinAndSec } from './time'

export function timer(startDateObj, timerLengthMs, onTimerEnd, setTimer) {
  const timerLengthMin = toMin(timerLengthMs)
  const startDate = new Date(startDateObj)
  const endTimeMs = new Date(addMinToMs(startDate.getTime(), timerLengthMin))

  const elapsedMs = Date.now() - startDate.getTime()
  const remainingMs = endTimeMs - Date.now()

  if (elapsedMs >= timerLengthMs) {
    onTimerEnd()
    return
  } else {
    const [min, sec] = toMinAndSec(remainingMs)
    setTimer([min, sec])
  }
}
