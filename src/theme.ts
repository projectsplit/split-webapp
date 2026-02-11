export const theme = {
  backgroundcolor: "#000000",
  inactiveColor: "#2f3139",
  lineColor: "#2f3139",
  highlightColor: "#646cff",
  errorColor: "#ba5d5d",
  primaryTextColor: "#ffffff",
  secondaryTextColor: "#696e80",
  activeTabButtonTextColor: "#ffffff",
  inactiveTabButtonTextColor: "#696e80",
  tabButtonTextHoverColor: "#2f3139",
  textActiveColor: "#FFFFFF",
  textInactiveColor: "#bfc3cfff",
  body: "#0E0E10",
  text: "#26272B",
  clicked: "#464689",
  whiteText: "#DDDDDD",
  lightColor: "#f5f5f5",
  pinkish: "#e151eeb3",
  pink: "#E151EE",
  lightPink: "#835687",
  ciel: "#5183ee",
  lightCiel: "#374971",
  redish: "#FC6F6F",
  yellowish: "##fcc504",
  yellow: "#FFEE34",
  green: "#55AF4D",
  deepPurple: "#8300e7",
  deepPurple2: "#ac5ee7",
  layer1: "#30323a",
  layer2: "#18181B",
  layer6: "#a3a3a3",
  labelColor6: "#8594E0",
  inputGrey: "#2d2d2d",
  greySelect: "#272A33",
  grey: "#696e80",
  greyOutline: "#30323a",
  searchBarGrey: "#2c2c2c",
  buttonActive: "#f0f0f0",
  buttonNotActive: "black",
  buttonColor: "#3d477a",
  lightBorder: "#30323a",
  orange: "#DFA769",

  nonInactive: "#2c3445",
  nonActive: "#0866ff",

  /* Active Groups (purple) */
  activeInactive: "#3b2f4a",
  activeActive: "#8b5cf6",

  /* Archived Groups (gold) */
  archivedInactive: "#3d3428",
  archivedActive: "rgb(215, 146, 68)",

};

export type ThemeType = typeof theme;

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType { }
}
