import { toHours, toHoursMin, addMinToMs, toMin } from './time'

describe('lib/time', () => {
  describe('toHours', () => {
    it('returns the hours of 36000000 milliseconds as a number, which is 10', () => {
      const result = toHours(36000000)
      expect(result).toBe(10)
    })
  })

  describe('toMin', () => {
    it('returns the minutes of 60000 milliseconds as a number, which is 1', () => {
      const result = toMin(120000)
      expect(result).toBe(2)
    })
  })

  describe('toHoursMin', () => {
    it('returns the hours and minutes of 36700000 milliseconds as a string, which is "10h 11min"', () => {
      const result = toHoursMin(36700000)
      expect(result).toBe('10h 11min')
    })
  })

  describe('addMinToMs', () => {
    it('returns one minute added to 1000 milliseconds, which is 61000 milliseconds', () => {
      const result = addMinToMs(1000, 1)
      expect(result).toBe(61000)
    })
  })
})
