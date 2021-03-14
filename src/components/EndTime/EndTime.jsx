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
  color: #c2c2c2;
`
