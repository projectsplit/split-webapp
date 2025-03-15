import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
html,
body,
#root {
  margin: 0;
  padding: 0;
  height: 100%;
  /* font-family: Roboto, Inter, system-ui, Avenir, Helvetica, Arial, sans-serif; */
  font-family: 'Inter', sans-serif;
  background-color: #000000;
  /* font-synthesis: none; */
  text-rendering: optimizeLegibility;
  -webkit-tap-highlight-color: transparent;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  display: flex;
  flex-direction: column;
  color: white;
  font-size: 16px;
}

* {
  box-sizing: border-box;
  scrollbar-gutter: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(192, 192, 192, 0.4) transparent;
  scrollbar-width: thin; 
}

*::-webkit-scrollbar {
  width:4px;
  height: 4px;
  
}

*::-webkit-scrollbar-track {
  background: transparent;
}

*::-webkit-scrollbar-thumb {
  background-color: rgba(192, 192, 192, 0.4);
  border-radius: 4px;
}

*::-webkit-scrollbar-thumb:hover {
  background-color: rgba(192, 192, 192, 0.6);
}

input[type="number"] {
  -webkit-appearance: none;
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
  font-size: inherit;
  font-weight: inherit;
  background: none;
  border: none;
}

input {
  all: unset;
  cursor: text;
}

.bottomslide-enter {
  transform: translateY(100%);
}

.bottomslide-enter.bottomslide-enter-active {
  transform: translateY(0);
  transition: all 1000ms;
}

.bottomslide-exit {
  transform: translateY(0);
  transition: all 1000ms;
}

.bottomslide-exit.bottomslide-exit-active {
  transform: translateY(100%);
}

.infoBox-enter {
  opacity: 0;
  transform: scale(0.9);
}

.infoBox-enter.infoBox-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: opacity 300ms, transform 300ms;
  
}

/* Exiting animation */
.infoBox-exit {
  opacity: 1;
  
}

.infoBox-exit.infoBox-exit-active {
  opacity: 0;
  transform: scale(0.9);
  transition: opacity 300ms, transform 300ms;
  
}

.leftslide-enter {
  transform: translateX(-100%);
}

.leftslide-enter.leftslide-enter-active {
  transform: translateX(0);
  transition: all 100ms ease-in-out;
}

.leftslide-exit {
  transform: translateX(0);
}

.leftslide-exit.leftslide-exit-active {
  transform: translateX(-100%);
  transition: all 100ms ease-in-out;
}

`;

export default GlobalStyles;
