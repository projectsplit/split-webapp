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
  textInactiveColor: "#888"
};

export type ThemeType = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}