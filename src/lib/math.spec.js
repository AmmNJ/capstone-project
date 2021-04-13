import { sumKeyData, relativeShare, roundOneDecimal } from './math'

describe('lib/math', () => {
  describe('sumKeyData', () => {
    const data = [
      { a: -5, b: -20, c: 5 },
      { a: 39, b: -2, c: 3 },
      { a: 2, b: 1, c: -4 },
    ]

    it('returns the sum of all "a" key values in the array, which is 36', () => {
      const result = sumKeyData(data, 'a')
      expect(result).toBe(36)
    })
  })

  describe('relativeShare', () => {
    it('returns the share of 15 multiplied by 100 relative to 0 (min) and 30 (max) values, which is 50% * 100', () => {
      const result = relativeShare(15, 0, 30)
      expect(result).toBe(50)
    })

    it('returns the share of -15 multiplied by 100 relative to 0 (min) and 30 (max) values, which is 75% * 100', () => {
      const result = relativeShare(15, -30, 30)
      expect(result).toBe(75)
    })
  })

  describe('roundOneDecimal', () => {
    it('returns the number (15.938947) rounded to one decimal place, which is 15.9', () => {
      const result = roundOneDecimal(15.938947)
      expect(result).toBe(15.9)
    })

    it('returns the number without decimal places (16), which stays 16', () => {
      const result = roundOneDecimal(16)
      expect(result).toBe(16)
    })

    it('returns the number (-17.938947) rounded to one decimal place, which is -17.9', () => {
      const result = roundOneDecimal(-17.938947)
      expect(result).toBe(-17.9)
    })

    it('returns 0 rounded if the input is 0', () => {
      const result = roundOneDecimal(0)
      expect(result).toBe(0)
    })
  })
})
