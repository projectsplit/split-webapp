import styled from 'styled-components';
import { StyledDialog } from '@/components/Menus/Layouts/Dialog/Dialog.styled';

export const StyledInfoDialog = styled(StyledDialog)`
  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: ${({ theme }) => theme.space.s10};

    .info {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: ${({ theme }) => theme.space.s10};
      min-width: 0;
      font-size: ${({ theme }) => theme.size.s17};
      font-weight: ${({ theme }) => theme.weight.semibold};
      letter-spacing: -0.01em;
      color: ${({ theme }) => theme.ink.primary};

      .infoLogo {
        display: block;
        flex-shrink: 0;
        font-size: ${({ theme }) => theme.icon.md};
        color: ${({ theme }) => theme.ink.secondary};
      }
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

    .close {
      display: block;
    }
  }

  .text {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s8};
    font-size: ${({ theme }) => theme.size.s13};
    line-height: 1.6;
    color: ${({ theme }) => theme.ink.secondary};
    text-align: left;
    text-wrap: pretty;
  }
`;
