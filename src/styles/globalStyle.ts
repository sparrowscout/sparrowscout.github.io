// src/styles/GlobalStyle.ts
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color:rgb(31, 31, 31);
  }

  html, body {
    font-family: sans-serif;
    height: 100%;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  // note 코드블록 스타일링 
  @media screen and (min-width: 360px) {
  code {
    font-size: 0.9rem;
  }
}
  

`;

export default GlobalStyle;
