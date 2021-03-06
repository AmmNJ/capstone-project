export function sumKeyData(data, key) {
  return data.reduce((acc, cur) => acc + (cur[key] || 0), 0)
}

export function relativeShare(input, min, max) {
  return ((input - min) * 100) / (max - min)
}

export function roundOneDecimal(value) {
  return Math.round(value * 10) / 10 || 0
}
