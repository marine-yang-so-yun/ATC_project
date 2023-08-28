import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import { media, theme } from "./theme";

export const GlobalStyle = createGlobalStyle`
  ${reset}
  :focus {
    outline: none;
    border: none;
  }
  ::-webkit-scrollbar {
    display: none;
  }
  * {
    box-sizing: border-box;
  }
  html {
    color: ${theme.color.black};
    -webkit-text-size-adjust: none;
    font-family: 'Noto Sans KR', sans-serif;
    font-display: fallback;
    -ms-overflow-style: none;
    scrollbar-width: none;
    margin: 0 auto;

    ${media.pc} {
      font-size: 16px;
    }
  }
  button {
    background: none;
    padding: 0;
    cursor: pointer;
    &:disabled {
      cursor: default;
      fill: ${theme.color.gray};
    }
  }
  input, button, textarea {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 100%;
    border: none;
  }
  img {
    display: block;
  }
  a {
    text-decoration: none;
    color: inherit;
  }

  .pc-tablet-only {
    display: block;
    ${media.mobile} {
      display: none;
    }
  }
  .tablet-moblie-only{
    display: none;
    ${media.tabletMax}{
      display: block;
    }
  }
  .tabletMin-mobile-only{
    display: none;
    ${media.tabletMin} {
      display: block;
    }
  }
  .mobile-only {
    display: none;
    ${media.mobile} {
      display: block;
    }
  }
`;
