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
  background-color: #0f1214;
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
}

* {
  box-sizing: border-box;
  scrollbar-gutter: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(192, 192, 192, 0.4) transparent;
}

*::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

*::-webkit-scrollbar-track {
  background: transparent;
}

*::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 4px;
}

*::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.6);
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
  
`;

export default GlobalStyles;
