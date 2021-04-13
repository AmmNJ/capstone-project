import { toShortDate, getWeekDay, daysDifference } from './date'

describe('lib/date', () => {
  describe('toShortDate', () => {
    const date = new Date(
      'Date Tue Apr 03 2021 12:00:00 GMT+0200 (Central European Summer Time)'
    )

    it('returns a short version of the given date object "YYYY/MM/DD" format as a string, which is "2021/04/03"', () => {
      const result = toShortDate(date)
      expect(result).toBe('2021/04/03')
    })
  })

  describe('getWeekDay', () => {
    const date = new Date(
      'Date Tue Apr 03 2021 12:00:00 GMT+0200 (Central European Summer Time)'
    )

    it('returns the weekday of a given date object in short, which is "Sa"', () => {
      const result = getWeekDay(date)
      expect(result).toBe('Sa')
    })
  })

  describe('daysDifference', () => {
    it('returns the number of days between 2021/04/03 and 2021/04/10, which is 7', () => {
      const startDate = new Date(
        'Date Tue Apr 03 2021 12:00:00 GMT+0200 (Central European Summer Time)'
      )
      const endDate = new Date(
        'Date Tue Apr 10 2021 12:00:00 GMT+0200 (Central European Summer Time)'
      )
      const result = daysDifference(startDate, endDate)
      expect(result).toBe(7)
    })

    it('returns 0 if the dates are equal', () => {
      const startDate = new Date(
        'Date Tue Apr 10 2021 12:00:00 GMT+0200 (Central European Summer Time)'
      )
      const endDate = new Date(
        'Date Tue Apr 10 2021 12:00:00 GMT+0200 (Central European Summer Time)'
      )
      const result = daysDifference(startDate, endDate)
      expect(result).toBe(0)
    })

    it('returns the negative number of days between the two dates if the end date (2021/04/03) lower than the start date (2021/04/10)', () => {
      const startDate = new Date(
        'Date Tue Apr 10 2021 12:00:00 GMT+0200 (Central European Summer Time)'
      )
      const endDate = new Date(
        'Date Tue Apr 03 2021 12:00:00 GMT+0200 (Central European Summer Time)'
      )
      const result = daysDifference(startDate, endDate)
      expect(result).toBe(-7)
    })
  })
})
