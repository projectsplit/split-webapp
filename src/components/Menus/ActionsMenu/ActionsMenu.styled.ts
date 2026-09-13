import styled from 'styled-components';

interface StyledActionsMenuProps {
  $bottom?: string | number;
}

export const StyledActionsMenu = styled.div<StyledActionsMenuProps>`
  z-index: 4;
  position: fixed;
  bottom: ${({ $bottom }) =>
    typeof $bottom === 'number' ? `${$bottom}px` : $bottom};
  right: 30px;

  .buttons {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s12};
    margin-bottom: ${({ theme }) => theme.space.s12};

    .new {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: ${({ theme }) => theme.space.s12};
      cursor: pointer;

      .wrapper {
        animation: emerge 0.2s ease-out forwards;
        transform-origin: center;
        opacity: 0;

        &:nth-child(1) {
          animation-delay: 0.05s;
        }
        &:nth-child(2) {
          animation-delay: 0.05s;
        }

        transform: scale(0);

        display: flex;
        flex-direction: row;
        position: relative;

        .symbol {
          box-sizing: border-box;
          display: block;
          width: 48px;
          height: 48px;
          padding: 14px;
          border-radius: ${({ theme }) => theme.radius.pill};
          background-color: ${({ theme }) => theme.ink.primary};
          color: ${({ theme }) => theme.surface.page};
          box-shadow: ${({ theme }) => theme.shadow.fab};
          cursor: pointer;
        }
      }

      .descr {
        flex: 1 1 auto;
        text-align: right;
        font-size: ${({ theme }) => theme.size.s14};
        font-weight: ${({ theme }) => theme.weight.medium};
        color: ${({ theme }) => theme.ink.primary};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  @keyframes emerge {
    from {
      transform: scale(0);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;
