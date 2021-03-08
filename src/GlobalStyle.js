import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    box-sizing: border-box
  }

  @font-face {
  font-family: "Inter";
  src: local("Inter"),
    url("./fonts/Inter.ttf") format("truetype");
}

  body {
    margin: 0;
    font-family: 'Inter', sans-serif;
    font-size: 112.5%;
    line-height: 1.5;
    font-weight: 700;
  }

  button {
    font-family: inherit;
    font-size: inherit;
    width: 100%;
  }
`
