import styled from 'styled-components';
import { fullScreenSurfaceStyles } from '@/styles/fullScreenSurface';

export const StyledFullScreenMenu = styled.div`
  ${fullScreenSurfaceStyles}

  .fixedHeader {
    flex-shrink: 0;
    background-color: ${({ theme }) => theme.surface.page};

    .header {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: ${({ theme }) => theme.space.s10};
      padding: ${({ theme }) =>
        `${theme.space.s20} ${theme.space.s20} ${theme.space.s16}`};

      .title {
        flex: 1;
        min-width: 0;
        text-align: center;
        font-size: ${({ theme }) => theme.size.s17};
        font-weight: ${({ theme }) => theme.weight.semibold};
        letter-spacing: -0.01em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .gap {
        width: 34px;
        flex-shrink: 0;
      }
    }
  }

  .scrollable-content {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    display: flex;
    flex-direction: column;

    > * {
      flex-shrink: 0;
    }
  }
`;
