import styled from 'styled-components';

export const StyledShareExpenseButtons = styled.div`
  .shareExpenseOption {
    display: flex;
    flex-direction: row;
    gap: ${({ theme }) => theme.space.s8};

    .button {
      flex: 1;
      min-width: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: ${({ theme }) => `13px ${theme.space.s12}`};
      background-color: ${({ theme }) => theme.surface.card};
      border: 1px solid ${({ theme }) => theme.surface.hairline};
      border-radius: ${({ theme }) => theme.radius.iconButton};
      color: ${({ theme }) => theme.ink.primary};
      font-size: ${({ theme }) => theme.size.s14};
      font-weight: ${({ theme }) => theme.weight.medium};
      cursor: pointer;

      .textAndIcon {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: ${({ theme }) => theme.space.s8};

        .icon {
          display: flex;
          flex-shrink: 0;
          margin: 0;
          font-size: ${({ theme }) => theme.icon.sm};
          color: ${({ theme }) => theme.ink.secondary};
        }
      }
    }
  }
`;
