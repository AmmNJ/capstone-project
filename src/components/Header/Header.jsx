import styled from 'styled-components/macro'

export default function Header({ text }) {
  return (
    <Heading>
      <HeadingText>{text}</HeadingText>
    </Heading>
  )
}

const Heading = styled.header`
  display: grid;
  place-items: center;
`
const HeadingText = styled.h1`
  font-size: 26px;
  font-weight: 600;
  letter-spacing: -0.78px;
`
