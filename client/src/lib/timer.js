import { addMinToMs, toMin, toMinAndSec } from './time'

export function timer(startDateObj, timerLengthMs, onTimerEnd, setTimer) {
  const timerLengthMin = toMin(timerLengthMs)
  const startTimeMs = startDateObj.getTime()
  const endTimeMs = addMinToMs(startTimeMs, timerLengthMin)

  const elapsedMs = Date.now() - startTimeMs
  const remainingMs = endTimeMs - Date.now()

  if (elapsedMs >= timerLengthMs) {
    onTimerEnd()
    return
  } else {
    const [min, sec] = toMinAndSec(remainingMs)
    setTimer([min, sec])
  }
}
