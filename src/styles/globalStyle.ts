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

  table {
  border-collapse: collapse;
  width: 100%;
  table-layout: fixed;
  overflow-wrap: break-word;
  word-break: keep-all;
  }

  th, td {
    border: 1px solid #ccc;
    padding: 8px;
  }

  th {
    background-color: #f2f2f2;
  }

  // note 코드블록 스타일링 
  @media screen and (min-width: 360px) {
  code {
    font-size: 0.9rem;
  }
}
  

`;

export default GlobalStyle;
