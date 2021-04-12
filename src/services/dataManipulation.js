export function getDateValues(array, key) {
  return array.map(entry => new Date(entry[key]))
}

export function getMinValue(array) {
  return Math.min(...array)
}

export function getMaxValue(array) {
  return Math.max(...array)
}
