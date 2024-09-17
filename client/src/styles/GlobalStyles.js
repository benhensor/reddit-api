import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

:root {

  ::-webkit-scrollbar {display:none;}
  
  --color-background: #fcfcfc;
  --color-background-secondary: #f3f3f3;
  --color-foreground: #ffffff;
  --color-border: #e6e6e6;
  --color-text-header: #444444;
  --color-text-body: #6f6f6f;
  --color-text-secondary: #717171;
  --color-text-invert: #ffffff;
  --color-text-link: #4ec3f5;
  --color-branding: #3d5af1;
  --color-branding-transparent: #3d5af140;

  --color-alert: #ff304f;
  --color-success: #45b81f;
  --color-on-hover: #0000000f;

  --box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
  --box-shadow-hover: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;

  --spacing-0: 4px;
  --spacing-1: 8px;
  --spacing-2: 16px;
  --spacing-3: 24px;
  --spacing-4: 36px;
  --spacing-5: 64px;

  --radius: 999px;
  --radius-2: 8px;
}

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: 'Roboto', sans-serif;
    font-size: 1.6rem;
    line-height: 1.5;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textParagraph};
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    transition: .12s ease;
    cursor: pointer;
  }

  article {
    max-width: 80rem;
    margin: 0 auto;
  }

  span {
    border-radius: 999px;
  }
`

export default GlobalStyles;