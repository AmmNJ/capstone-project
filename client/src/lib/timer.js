export function timer(startDateMs, timerLengthMs, onTimerEnd, setTimer) {
  const endDateMs = startDateMs + timerLengthMs
  const elapsedMs = Date.now() - startDateMs
  const remainingMs = endDateMs - Date.now()

  if (elapsedMs >= timerLengthMs) {
    onTimerEnd()
    return
  } else {
    const min = Math.floor(remainingMs / 60000)
    const sec = Math.round((remainingMs % 60000) / 1000)
    setTimer([min, sec])
  }
}
