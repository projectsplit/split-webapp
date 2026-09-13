import styled from 'styled-components';

export const StyledRevokeAccessItem = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.s10};
  padding: ${({ theme }) => `${theme.space.s14} ${theme.space.s16}`};
  background-color: ${({ theme }) => theme.surface.card};
  border: 1px solid ${({ theme }) => theme.surface.hairline};
  border-radius: ${({ theme }) => theme.radius.surface};

  .codeAndCopy {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.space.s10};
    min-width: 0;

    .code {
      flex: 1;
      min-width: 0;
      font-family: ${({ theme }) => theme.font.mono};
      font-size: ${({ theme }) => theme.size.s15};
      font-weight: ${({ theme }) => theme.weight.medium};
      letter-spacing: 0.06em;
      color: ${({ theme }) => theme.ink.primary};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .copyButton {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: 34px;
      height: 34px;
      margin-right: -6px;
      border-radius: ${({ theme }) => theme.radius.iconButton};
      color: ${({ theme }) => theme.ink.secondary};
      font-size: ${({ theme }) => theme.icon.sm};
      cursor: pointer;
    }
  }

  .metaAndRevoke {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: ${({ theme }) => theme.space.s12};

    .meta {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: ${({ theme }) => theme.space.s6};
      min-width: 0;
      font-size: ${({ theme }) => theme.size.s12};
      color: ${({ theme }) => theme.ink.tertiary};

      .expired {
        display: flex;
        align-items: center;
        gap: ${({ theme }) => theme.space.s4};
        color: ${({ theme }) => theme.direction.owe};
      }

      .sep {
        color: ${({ theme }) => theme.surface.mark};
      }
    }

    button {
      flex-shrink: 0;
    }
  }
`;
