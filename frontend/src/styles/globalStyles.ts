import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #f0f2f5;
    color: #333;
    line-height: 1.5;
    padding: 16px;
    min-height: 100vh;
    
    @media (min-width: 768px) {
      padding: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  h1 {
    font-size: 24px;
    margin-bottom: 24px;
    text-align: center;
    
    @media (min-width: 768px) {
      font-size: 28px;
    }
  }
`;