import React from 'react'
import useCountdown from '../hooks/useCountdown'

export default function Timer() {
  const [clockTime, isPlaying, setIsPlaying] = useCountdown(50 * 60)

  function handlePlayClick() {
    setIsPlaying(true)
  }

  function handlePauseClick() {
    setIsPlaying(false)
  }

  function convertTime(count) {
    let minutes = Math.floor(count / 60)
    let seconds = parseFloat(count % 60).toFixed(0)
    if (minutes < 10) minutes = `0${minutes}`
    if (seconds < 10) seconds = `0${seconds}`
    return `${minutes}:${seconds}`
  }

  return (
    <div>
      <span>{convertTime(clockTime)}</span>
      {isPlaying ? (
        <button onClick={handlePauseClick}>Pause</button>
      ) : (
        <button onClick={handlePlayClick}>Play</button>
      )}
    </div>
  )
}
