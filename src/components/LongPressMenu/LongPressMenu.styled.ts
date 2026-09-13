import styled from 'styled-components';

export const StyledLongPressMenu = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  .backdrop {
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.scrim.sheet};
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    animation: fadeIn 0.2s ease;
  }

  .sheet {
    position: relative;
    box-sizing: border-box;
    background: ${({ theme }) => theme.surface.card};
    border-top: 1px solid ${({ theme }) => theme.surface.hairline};
    border-radius: ${({ theme }) =>
      `${theme.radius.sheet} ${theme.radius.sheet} 0 0`};
    padding: ${({ theme }) =>
      `${theme.space.s10} ${theme.space.s20} ${theme.space.s20}`};
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s8};
    animation: slideUp 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: ${({ theme }) => theme.shadow.sheet};

    .handle {
      width: 36px;
      height: 4px;
      border-radius: ${({ theme }) => theme.radius.pill};
      background: ${({ theme }) => theme.surface.dot};
      align-self: center;
      margin-bottom: ${({ theme }) => theme.space.s8};
    }

    .option {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.space.s12};
      width: 100%;
      padding: ${({ theme }) => `${theme.space.s14} ${theme.space.s16}`};
      border: none;
      border-radius: ${({ theme }) => theme.radius.iconButton};
      cursor: pointer;
      font-family: ${({ theme }) => theme.font.sans};
      font-size: ${({ theme }) => theme.size.s15};
      font-weight: ${({ theme }) => theme.weight.medium};
      transition: opacity 0.15s ease, transform 0.1s ease;

      &:active {
        opacity: 0.75;
        transform: scale(0.98);
      }

      .icon {
        display: flex;
        font-size: ${({ theme }) => theme.icon.md};
        flex-shrink: 0;
      }
    }

    .option.edit {
      background: ${({ theme }) => theme.surface.raised};
      color: ${({ theme }) => theme.ink.primary};
    }

    .option.delete {
      background: ${({ theme }) =>
        `color-mix(in oklab, ${theme.direction.owe} 14%, transparent)`};
      color: ${({ theme }) =>
        `color-mix(in oklab, ${theme.direction.owe} 82%, white)`};
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;
