import { toShortDate, getWeekDay } from './date'
import { relativeShare } from './math'

export function calcHeight(data) {
  let array = []
  data.forEach(element => array.push(element.duration))
  const maxValue = Math.max(...array)

  data.forEach(el => (el.height = relativeShare(el.duration, 0, maxValue)))
  return data
}

export function allocateData(rawData) {
  const targetData = prepareChartData()
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

function prepareChartData() {
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
  return previousTenDays.reverse()
}
