import { styled } from 'styled-components';
import { tokens } from '../../styles/tokens';

export const StyledProtected = styled.div<{ $shouldStyleBorder: boolean }>`
  ${({ $shouldStyleBorder }) =>
    $shouldStyleBorder &&
    `
    border: 2px solid ${tokens.state.locked};
    border-radius: ${tokens.radius.surface};
  `}
  overflow: auto;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  > div[style*='position: fixed'] {
    z-index: 4;
  }
`;
