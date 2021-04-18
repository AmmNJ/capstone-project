import styled from 'styled-components/macro'
import Header from '../components/Header/Header'
import PropTypes from 'prop-types'

LoginScreen.propTypes = { login: PropTypes.func }

export default function LoginScreen({ login }) {
  return (
    <Grid>
      <Header text="teal" />
      <LoginButton onClick={login} name="loginButton">
        Let's get started
      </LoginButton>
    </Grid>
  )
}

const Grid = styled.main`
  display: grid;
  grid-template-rows: 1fr 25vh;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(125deg, #a4e3cc, #56dfd1);
  h1 {
    color: white;
    font-size: 50px;
  }
  padding: 10.5vh 16vw 9vh;
  animation: opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`

const LoginButton = styled.button`
  font-size: 20px;
  color: #56dfd1;
  background: white;
  height: 50px;
  width: 100%;
  border: none;
  border-radius: 8px;
  padding: 0;
  align-self: end;
  animation: slide-opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`
