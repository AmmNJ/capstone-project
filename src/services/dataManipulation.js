import { toShortDate, getWeekDay } from './date'
import { relativeShare } from './math'

export function getDateValues(array, key) {
  return array.map(entry => new Date(entry[key]))
}

export function getMinValue(array) {
  return Math.min(...array)
}

function getMaxValue(array) {
  return Math.max(...array)
}

export function calcHeight(data) {
  let array = []
  data.forEach(element => array.push(element.duration))
  const maxValue = getMaxValue(array)

  data.forEach(el => (el.height = relativeShare(el.duration, 0, maxValue)))
  return data
}

export function allocateData(rawData) {
  const goBackDays = 10
  const previousTenDays = []

  for (let i = 0; i < goBackDays; i++) {
    let today = new Date()
    let date = new Date(today.setDate(today.getDate() - 1 * i))
    let formattedDate = toShortDate(date)

    previousTenDays.push({
      date: formattedDate,
      duration: 0,
      weekday: getWeekDay(date),
      height: 0,
    })
  }

  const targetData = previousTenDays.reverse()
  targetData.map(targetEntry => {
    rawData.map(rawEntry => {
      if (toShortDate(new Date(rawEntry.start)) === targetEntry.date) {
        targetEntry.duration = targetEntry.duration + rawEntry.duration
      }
      return targetData
    })
    return targetData
  })
  return targetData
}
