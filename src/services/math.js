export function toPercent(a, b) {
  return Math.round((a / b) * 100)
}

export function addMinToDate(timeInMS, min) {
  return timeInMS + min * 60 * 1000
}
