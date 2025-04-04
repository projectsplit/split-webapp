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
  textInactiveColor: "#A8AEBF",
  body: "#0E0E10",
  text: "#26272B",
  clicked: "#464689",
  whiteText: "#DDDDDD",
  lightColor: "#f5f5f5",
  pinkish: "#f91880",
  pink:"#E151EE",
  lightPink:"#835687",
  ciel:"#5183ee",
  lightCiel:"#374971",
  redish: "#fc4c4c",
  yellowish: "##fcc504",
  yellow: "#FFEE34",
  green: "#0d8d01",
  deepPurple: "#8300e7",
  deepPurple2: "#ac5ee7",
  layer1: "#1f1f22",
  layer2: "#18181B",
  layer6: "#a3a3a3",
  labelColor6: "#8594E0",
  inputGrey: "#2d2d2d",
  greySelect:"#272A33",
  grey: "#777777",
  greyOutline:"#2E2E2E",
  searchBarGrey: "#2c2c2c",
  buttonActive: "#f0f0f0",
  buttonNotActive: "black",
  buttonColor: "#3d477a",
  lightBorder:"rgb(54,54,54)",
  orange:"#D79244"
};

export type ThemeType = typeof theme;

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}
