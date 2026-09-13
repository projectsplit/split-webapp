import { createGlobalStyle } from 'styled-components';
import { tokens } from './tokens';

const GlobalStyles = createGlobalStyle`
  html, body, #root {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: ${tokens.font.sans};
    background-color: ${tokens.surface.page};
    color: white;
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
    font-size: 16px;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
  }

  @media (min-width: 769px) {
    html, body, #root {
      padding-left: 0 !important;
      padding-right: 0 !important;
      margin-left: 10 !important;
      margin-right: 10 !important;
      transform: translateX(0) !important;
    }

    html, body {
      background-color: ${tokens.surface.page};
    }

    #root {
      max-width: 768px;
      width: 100%;
      margin: 0 auto;
      border-left: 1px solid ${tokens.surface.hairline};
      border-right: 1px solid ${tokens.surface.hairline};
      position: relative;
      overflow-x: hidden;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    }

    * {
      --safe-area-inset-left: 0px !important;
      --safe-area-inset-right: 0px !important;
      --safe-area-inset-top: 0px !important;
      --safe-area-inset-bottom: 0px !important;
    }
  }

  * {
    box-sizing: border-box;
  }

  .pac-container {
    margin-top: 6px;
    padding: 4px;
    background-color: ${tokens.surface.card};
    border: 1px solid ${tokens.surface.hairline};
    border-radius: ${tokens.radius.iconButton};
    box-shadow: 0 14px 32px rgba(0, 0, 0, 0.6);
    font-family: ${tokens.font.sans};
    z-index: 1000;
  }

  .pac-item {
    padding: 9px 10px;
    border: none;
    border-radius: ${tokens.radius.control};
    font-size: ${tokens.size.s13};
    line-height: 1.4;
    color: ${tokens.ink.secondary};
    cursor: pointer;
  }

  .pac-item:hover,
  .pac-item-selected {
    background-color: ${tokens.surface.raised};
  }

  .pac-item-query {
    font-size: ${tokens.size.s14};
    color: ${tokens.ink.primary};
  }

  .pac-matched {
    font-weight: ${tokens.weight.semibold};
    color: ${tokens.ink.primary};
  }

  .pac-icon {
    display: none;
  }

  *::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  *::-webkit-scrollbar-track { background: transparent; }
  *::-webkit-scrollbar-thumb {
    background-color: rgba(192, 192, 192, 0.4);
    border-radius: 4px;
  }
  *::-webkit-scrollbar-thumb:hover {
    background-color: rgba(192, 192, 192, 0.6);
  }

  input[type="number"] {
    -moz-appearance: textfield;
    appearance: textfield;
  }
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  input { all: unset; cursor: text; }

  .bottomslide-enter { transform: translateY(100%); }
  .bottomslide-enter.bottomslide-enter-active {
    transform: translateY(0);
    transition: all 1000ms;
  }
  .bottomslide-exit { transform: translateY(0); transition: all 1000ms; }
  .bottomslide-exit.bottomslide-exit-active { transform: translateY(100%); }

  .infoBox-enter { opacity: 0; transform: scale(0.9); }
  .infoBox-enter.infoBox-enter-active {
    opacity: 1; transform: scale(1); transition: opacity 300ms, transform 300ms;
  }
  .infoBox-exit.infoBox-exit-active {
    opacity: 0; transform: scale(0.9); transition: opacity 300ms, transform 300ms;
  }

  .leftslide-enter { transform: translateX(-100%); }
  .leftslide-enter.leftslide-enter-active {
    transform: translateX(0); transition: all 100ms ease-in-out;
  }
  .leftslide-exit.leftslide-exit-active {
    transform: translateX(-100%); transition: all 100ms ease-in-out;
  }

  .quick-actions-enter { opacity: 0; }
  .quick-actions-exit-active .new { animation: none; transform: scale(1); }
  .quick-actions-exit-done { transform: scale(0); opacity: 0; }

  .search-enter {
    clip-path: inset(0 100%);
    opacity: 0;
  }
  .search-enter-active {
    clip-path: inset(0 0);
    opacity: 1;
    transition: clip-path 0.3s ease-out, opacity 0.3s ease-out;
  }
  .search-exit {
    clip-path: inset(0 0);
    opacity: 1;
  }
  .search-exit-active {
    clip-path: inset(0 100%);
    opacity: 0;
    transition: clip-path 0.3s ease-in, opacity 0.3s ease-in;
  }
`;

export default GlobalStyles;
