import { tokens } from './styles/tokens';

export const theme = {
  ...tokens,
};

type ThemeType = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
