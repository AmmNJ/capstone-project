export function timer(startTimeMs, timerLengthMs, onTimerEnd, setTimer) {
  const endTimeMs = startTimeMs + timerLengthMs
  const elapsedMs = Date.now() - startTimeMs
  const remainingMs = endTimeMs - Date.now()

  if (elapsedMs >= timerLengthMs) {
    onTimerEnd()
    return
  } else {
    const min = Math.floor(remainingMs / 60000)
    const sec = Math.round((remainingMs % 60000) / 1000)
    setTimer([min, sec])
  }
}
