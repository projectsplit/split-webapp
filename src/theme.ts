export const theme = {
  backgroundColor: "#0f1214",
  inactiveColor: "#2f3139",
  lineColor: "#2f3139",
  highlightColor: "#646cff",
  errorColor: "#ba5d5d",
  primaryTextColor: "#ffffff",
  secondaryTextColor: "#696e80",
  activeTabButtonTextColor: "#ffffff",
  inactiveTabButtonTextColor: "#696e80",
  tabButtonTextHoverColor: "#2f3139",
  textActiveColor: "#fff",
  textInactiveColor: "#888",
  body: "#0E0E10",
  text: "#26272B",
  clicked: "#464689",
  whiteText: "#DDDDDD",
  lightColor: "#f5f5f5",
  pink: "#f91880",
  redish: "#fc4c4c",
  yellowish: "#e7e100",
  yellow: "#fcc504",
  green: "#0d8d01",
  deepPurple: "#8300e7",
  deepPurple2: "#ac5ee7",
  layer1: "#1f1f22",
  layer2: "#18181B",
  layer6: "#a3a3a3",
  labelColor6: "#8594E0",
  inputGrey: "#2d2d2d",
  grey: "#777777",
  searchBarGrey: "#2c2c2c",
  buttonActive: "#f0f0f0",
  buttonNotActive: "black",
  buttonColor: "#3d477a",
};

export type ThemeType = typeof theme;

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}
