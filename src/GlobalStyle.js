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
    letter-spacing: -0.6px;
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

  @keyframes shrink {
    -100% {
      height: 0%;
    }
    0% {
      height: 100%;
    }
  }

`
