export function toHours(ms) {
  return Math.round(ms / (1000 * 60 * 60))
}

export function toHoursMin(ms) {
  const date = new Date(ms)
  const hours = date.toISOString().substr(11, 2)
  const minutes = date.toISOString().substr(14, 2)

  return hours + 'h ' + minutes + 'min'
}

export function addMinToMs(ms, min) {
  return ms + min * 60 * 1000
}
