export function toShortDate(dateObj) {
  let year = dateObj.getFullYear()
  let month = parseInt(dateObj.getMonth() + 1)
    .toString()
    .padStart(2, 0)
  let day = parseInt(dateObj.getDate().toString().padStart(2, 0))
  return year + '/' + month + '/' + day
}

export function getWeekDay(dateObj) {
  let weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  return weekdays[dateObj.getDay()]
}

// TODO remove this comment below
// export function uniqueDates(rawData, key) {
//   let array = []
//   rawData.forEach(entry => array.push(toShortDate(new Date(entry[key]))))

//   let uniqueArray = new Set(array)
//   return uniqueArray
// }

export function daysDifference(startDate, endDate) {
  let dayDifference = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
  )
  if (dayDifference === 0 || isNaN(dayDifference)) return 0

  return dayDifference
}
