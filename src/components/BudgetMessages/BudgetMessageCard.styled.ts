import styled from 'styled-components';

export const StyledBudgetMessageCard = styled.div`
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.surface.card};
  border: 1px solid ${({ theme }) => theme.surface.hairline};
  border-radius: ${({ theme }) => theme.radius.surface};
  padding: ${({ theme }) => theme.space.s16};

  .main {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s12};

    .signParagraphWrap {
      display: flex;
      flex-direction: row;
      gap: ${({ theme }) => theme.space.s10};

      .sign {
        display: flex;
        align-self: flex-start;
        flex-shrink: 0;
      }

      .information {
        display: block;
        font-size: ${({ theme }) => theme.icon.lg};
        color: ${({ theme }) => theme.ink.secondary};
      }
    }

    .closeButton {
      position: absolute;
      top: -6px;
      right: -6px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 34px;
      height: 34px;
      font-size: ${({ theme }) => theme.icon.md};
      color: ${({ theme }) => theme.ink.tertiary};
    }

    .close {
      cursor: pointer;
      display: block;
    }
  }
`;
