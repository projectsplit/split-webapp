export declare const theme: {
    backgroundcolor: string;
    inactiveColor: string;
    lineColor: string;
    highlightColor: string;
    errorColor: string;
    primaryTextColor: string;
    secondaryTextColor: string;
    activeTabButtonTextColor: string;
    inactiveTabButtonTextColor: string;
    tabButtonTextHoverColor: string;
    textActiveColor: string;
    textInactiveColor: string;
    body: string;
    text: string;
    clicked: string;
    whiteText: string;
    lightColor: string;
    pinkish: string;
    pink: string;
    lightPink: string;
    ciel: string;
    lightCiel: string;
    redish: string;
    yellowish: string;
    yellow: string;
    green: string;
    checkmarkGreen: string;
    deepPurple: string;
    deepPurple2: string;
    layer1: string;
    layer2: string;
    layer6: string;
    labelColor6: string;
    inputGrey: string;
    greySelect: string;
    grey: string;
    greyOutline: string;
    searchBarGrey: string;
    buttonActive: string;
    buttonNotActive: string;
    buttonColor: string;
    lightBorder: string;
    orange: string;
    selector: string;
    nonInactive: string;
    nonActive: string;
    activeInactive: string;
    activeActive: string;
    archivedInactive: string;
    archivedActive: string;
};
export type ThemeType = typeof theme;
declare module 'styled-components' {
    interface DefaultTheme extends ThemeType {
    }
}
