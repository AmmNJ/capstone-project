import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

export default function Header({ text }) {
  return (
    <Heading>
      <HeadingText>{text}</HeadingText>
    </Heading>
  )
}

Header.propTypes = {
  title: PropTypes.string,
}

const Heading = styled.header`
  display: grid;
  place-items: center;
  animation: slide-opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`
const HeadingText = styled.h1`
  font-size: 26px;
  font-weight: 600;
  letter-spacing: -0.78px;
  margin: 0;
`
