import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

export default function DisplayTimerEnd({ endHrs, endMin }) {
  const displayEndHrs = endHrs.toString().padStart(2, '0')
  const displayEndMin = endMin.toString().padStart(2, '0')

  return (
    <TimeWrapper>
      {displayEndHrs}:{displayEndMin}
    </TimeWrapper>
  )
}

DisplayTimerEnd.propTypes = {
  endHrs: PropTypes.number,
  endMin: PropTypes.number,
}

const TimeWrapper = styled.span`
  font-size: 20px;
  color: #b4b4b4;
  animation: slide-opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`
