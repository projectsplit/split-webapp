import styled from 'styled-components';
import { StyledMiddleScreenMenu } from '../MiddleScreenMenu/MiddleScreenMenu.styled';

export const StyledDialog = styled(StyledMiddleScreenMenu)`
  .dialogHeader {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: ${({ theme }) => theme.space.s10};

    .dialogIcon {
      display: flex;
      flex-shrink: 0;
      margin-top: 2px;
      font-size: ${({ theme }) => theme.icon.md};
      color: ${({ theme }) => theme.ink.secondary};

      &.danger {
        color: ${({ theme }) => theme.direction.owe};
      }
    }

    .closeButton {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: 34px;
      height: 34px;
      margin: ${({ theme }) => `-6px -${theme.space.s10} -6px 0`};
      font-size: ${({ theme }) => theme.icon.md};
      color: ${({ theme }) => theme.ink.tertiary};
      cursor: pointer;
    }
  }

  .dialogTitle {
    flex: 1;
    min-width: 0;
    font-size: ${({ theme }) => theme.size.s17};
    font-weight: ${({ theme }) => theme.weight.semibold};
    letter-spacing: -0.01em;
    overflow-wrap: anywhere;
  }

  .info {
    font-size: ${({ theme }) => theme.size.s13};
    line-height: 1.6;
    color: ${({ theme }) => theme.ink.secondary};
    overflow-wrap: anywhere;

    p {
      margin: 0;
    }

    > * + * {
      margin-top: ${({ theme }) => theme.space.s6};
    }

    strong,
    .descr {
      font-weight: ${({ theme }) => theme.weight.medium};
      color: ${({ theme }) => theme.ink.primary};
    }
  }

  .buttons {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s10};
    margin-top: ${({ theme }) => theme.space.s2};
  }
`;
