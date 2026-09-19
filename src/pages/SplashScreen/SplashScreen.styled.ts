import { styled } from 'styled-components';
import { tokens } from '../../styles/tokens';

export const StyledSplashScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100dvh;
  background-color: ${tokens.surface.page};
`;

export const Logo = styled.img`
  max-width: 300px;
  max-height: 300px;
  width: auto;
  height: auto;
`;
