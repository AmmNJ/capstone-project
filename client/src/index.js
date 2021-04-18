import React from 'react'
import ReactDOM from 'react-dom'
import App from './App/App'
import reportWebVitals from './reportWebVitals'
import GlobalStyle from './GlobalStyle'
import GlobalFonts from './fonts/fonts'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <GlobalStyle />
      <GlobalFonts />
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
