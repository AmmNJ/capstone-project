import { timer } from './timer'

afterEach(() => {
  jest.runOnlyPendingTimers()
  jest.useRealTimers()
})

const setCallback = jest.fn()
const endCallback = jest.fn()
const timerLengthMs = 3000
const startDateMs = Date.now()

describe('lib/timer', () => {
  describe('timer', () => {
    it('calls the set-function as soon as the timer starts', () => {
      jest.useFakeTimers()
      setTimeout(() => {
        timer(startDateMs, timerLengthMs, endCallback, setCallback)
      }, 1000)

      expect(setCallback).not.toBeCalled()
      expect(setTimeout).toHaveBeenCalledTimes(1)
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000)

      jest.runAllTimers()
      expect(setCallback).toHaveBeenCalledTimes(1)
    })
  })
})
