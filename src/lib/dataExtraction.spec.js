import { getDateValues, getMinValue, getMaxValue } from './dataExtraction'

describe('lib/dataExtraction', () => {
  describe('getDateValues', () => {
    it('returns a new array with date objects of all start values', () => {
      const array = [
        { start: '2021-04-02', end: '2020-03-04' },
        { start: '2021-04-05', end: '2020-03-08' },
        {
          start:
            'Date Tue Apr 10 2021 12:00:00 GMT+0200 (Central European Summer Time)',
          end: '2020-03-07',
        },
      ]
      const result = getDateValues(array, 'start')
      expect(result).toStrictEqual([
        new Date('2021-04-02'),
        new Date('2021-04-05'),
        new Date(
          'Date Tue Apr 10 2021 12:00:00 GMT+0200 (Central European Summer Time)'
        ),
      ])
    })
  })

  describe('getMinValue', () => {
    it('returns the lowest value of the array, which is -10', () => {
      const array = [12, 3, 5, -10, 9]
      const result = getMinValue(array)
      expect(result).toBe(-10)
    })
  })

  describe('getMaxValue', () => {
    it('returns the lowest value of the array, which is 12', () => {
      const array = [12, 3, 5, 2, 9]
      const result = getMaxValue(array)
      expect(result).toBe(12)
    })
  })
})
