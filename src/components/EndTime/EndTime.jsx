import styled from 'styled-components/macro'

export default function EndTime({ endHours, endMinutes }) {
  const displayEndHours = endHours.toString().padStart(2, '0')
  const displayEndMinutes = endMinutes.toString().padStart(2, '0')

  return (
    <TimeWrapper>
      {displayEndHours}:{displayEndMinutes}
    </TimeWrapper>
  )
}

const TimeWrapper = styled.span`
  font-size: 20px;
  color: #b4b4b4;
  animation: slide-opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`
