import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -moz-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  body {
    margin: 0;
    font-family: 'Inter', sans-serif;
    line-height: 1.5;
    font-size: 112.5%;
    color: #585858;
  }

  @keyframes slide-opacity {
    -50% {
      transform: translateY(0);
    }
    0% {
      transform: translateY(10px);
    }
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`
