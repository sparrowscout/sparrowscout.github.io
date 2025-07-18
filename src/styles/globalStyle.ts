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
    font-size: 16px;
    overflow-wrap: break-word;
    word-break: keep-all;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;


      /* Headings */
  --heading-formatting: var(--text-faint);
  --heading-spacing: calc(var(--p-spacing) * 2.5);
  --h1-color: inherit;
  --h2-color: inherit;
  --h3-color: inherit;
  --h4-color: inherit;
  --h5-color: inherit;
  --h6-color: inherit;
  --h1-font: inherit;
  --h2-font: inherit;
  --h3-font: inherit;
  --h4-font: inherit;
  --h5-font: inherit;
  --h6-font: inherit;
  --h1-line-height: 1.2;
  --h2-line-height: 1.2;
  --h3-line-height: 1.3;
  --h4-line-height: 1.4;
  --h5-line-height: var(--line-height-normal);
  --h6-line-height: var(--line-height-normal);
  --h1-size: 1.802em;
  --h2-size: 1.602em;
  --h3-size: 1.424em;
  --h4-size: 1.266em;
  --h5-size: 1.125em;
  --h6-size: 1em;
  --h1-style: normal;
  --h2-style: normal;
  --h3-style: normal;
  --h4-style: normal;
  --h5-style: normal;
  --h6-style: normal;
  --h1-variant: normal;
  --h2-variant: normal;
  --h3-variant: normal;
  --h4-variant: normal;
  --h5-variant: normal;
  --h6-variant: normal;
  --h1-weight: 700;
  --h2-weight: 600;
  --h3-weight: 600;
  --h4-weight: 600;
  --h5-weight: 600;
  --h6-weight: 600;


    @media screen and (max-width:760px) {
      font-size: 0.875rem;
    }
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

  hr { 
  
    margin: 2rem 0;
    border-top: 1px solid;
    border-color: #e0e0e0;
  }

  p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }

  div > :is(h1,h2,h3,h4,h5,h6) {
    margin-top: calc(1rem * 2.5);
  }

  h1, h2, h3, h4, h5, h6 {
    margin-block-start: 1rem;
    margin-block-end: 1rem;
  }

  h1  {
  --font-weight: var(--h1-weight);
  font-variant: var(--h1-variant);
  letter-spacing: -0.015em;
  line-height: var(--h1-line-height);
  font-size: var(--h1-size);
  color: var(--h1-color);
  font-weight: var(--font-weight);
  font-style: var(--h1-style);
  font-family: var(--h1-font);
  }

  h3{
    --font-weight: var(--h3-weight);
    font-variant: var(--h3-variant);
    letter-spacing: -0.015em;
    line-height: var(--h3-line-height);
    font-size: var(--h3-size);
    color: var(--h3-color);
    font-weight: var(--font-weight);
    font-style: var(--h3-style);
    font-family: var(--h3-font);
  }

  img{
    max-width: 100%;
    overflow-clip-margin: content-box;
    overflow: clip;

    @media screen and (min-width: 700px) {
      max-width: 80%;    
      display:flex;
      margin: 0 auto;
    }
  }


  .no-hover *:hover {
  pointer-events: none !important;
  }


  // note 코드블록 스타일링 
  @media screen and (min-width: 360px) {
    code {
      font-size: 0.9rem;
    }
  }   
  
  

`;

export default GlobalStyle;
