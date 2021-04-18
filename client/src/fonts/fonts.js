import { createGlobalStyle } from 'styled-components'
import InterRegularWoff2 from './inter-regular.woff2'
import InterRegularWoff from './inter-regular.woff'
import InterSemiboldWoff2 from './inter-semibold.woff2'
import InterSemiboldWoff from './inter-semibold.woff'

export default createGlobalStyle`
    @font-face {
      font-family: 'Inter';
      src: local('Inter'), local('Inter'),
      url(${InterRegularWoff2}) format('woff2'),
      url(${InterRegularWoff}) format('woff');
      font-weight: 400;
      font-style: normal;
     }

     @font-face {
      font-family: 'Inter';
      src: local('Inter'), local('Inter'),
      url(${InterSemiboldWoff2}) format('woff2'),
      url(${InterSemiboldWoff}) format('woff');
      font-weight: 600;
      font-style: normal;
     }
  `
