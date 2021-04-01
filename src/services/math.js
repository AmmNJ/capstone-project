export function addMinToDate(timeInMs, min) {
  return timeInMs + min * 60 * 1000
}

export function msToHoursMin(ms) {
  const date = new Date(ms)
  const hours = date.toISOString().substr(11, 2)
  const minutes = date.toISOString().substr(14, 2)

  return hours + 'h ' + minutes + 'min'
}

export function objToDate(dateObj) {
  let year = dateObj.getFullYear()
  let month = parseInt(dateObj.getMonth() + 1)
    .toString()
    .padStart(2, 0)
  let day = parseInt(dateObj.getDate().toString().padStart(2, 0))
  return year + '/' + month + '/' + day
}

function toPercentInteger(share, sum) {
  return Math.round((share / sum) * 100)
}

export function calcHeight(data) {
  let array = []

  data.forEach(element => array.push(element.duration))

  let sum = array.reduce((pv, cv) => {
    return pv + cv
  }, 0)

  data.forEach(el => (el.height = toPercentInteger(el.duration, sum)))
  return data
}

function getWeekDay(dateObj) {
  let weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  return weekdays[dateObj.getDay()]
}

function prepareChartData() {
  const goBackDays = 10
  const previousTenDays = []

  for (let i = 0; i < goBackDays; i++) {
    let today = new Date()
    let date = new Date(today.setDate(today.getDate() - 1 * i))
    let formattedDate = objToDate(date)

    previousTenDays.push({
      date: formattedDate,
      duration: 0,
      weekday: getWeekDay(date),
      height: 0,
    })
  }
  return previousTenDays
}

export function allocateData(data) {
  const targetData = prepareChartData()
  targetData.map(item => {
    data.map(entry => {
      if (objToDate(new Date(entry.start)) === item.date) {
        item.duration = item.duration + entry.duration
      }
      return targetData
    })
    return targetData
  })
  return targetData
}
