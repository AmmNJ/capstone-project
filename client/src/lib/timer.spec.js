import { timer } from './timer'

afterEach(() => {
  jest.useRealTimers()
})

const endCallback = jest.fn()
const recurrentCallback = jest.fn()
const timerLengthMs = 1500000
const startDate = new Date()

describe('lib/timer', () => {
  describe('timer', () => {
    it('calls the final function when the timer has ended', () => {
      jest.useFakeTimers()
      setTimeout(() => {
        timer(startDate, timerLengthMs, endCallback, recurrentCallback)
      }, 1000)

      expect(recurrentCallback).not.toBeCalled()
      expect(endCallback).not.toBeCalled()

      expect(setTimeout).toHaveBeenCalledTimes(1)
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000)

      jest.runOnlyPendingTimers()

      expect(recurrentCallback).toBeCalled()
    })
  })
})
