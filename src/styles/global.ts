import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  html, body, #root {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: 'Inter', sans-serif;
    background-color: #000000;
    color: white;
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

  /* Force perfect centering on desktop */
  @media (min-width: 769px) {
    html, body, #root {
      padding-left: 0 !important;
      padding-right: 0 !important;
      margin-left: 10 !important;
      margin-right: 10 !important;
      transform: translateX(0) !important;
    }

    html, body {
      background-color: #000000;
    }

    #root {
      max-width: 768px;
      width: 100%;
      margin: 0 auto;
      border-left: 1px solid #333;
      border-right: 1px solid #333;
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

  /* Scrollbar styles */
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

  /* Rest of your original styles (unchanged) */
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

  /* Your animations */
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