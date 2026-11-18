import styled from 'styled-components';
import { StyledMiddleScreenMenu } from '../Menus/Layouts/MiddleScreenMenu/MiddleScreenMenu.styled';

export const StyledPlusGate = styled.div`
  /* The screen as it would be, out of reach: blurred enough that nothing on it can be read or
     used, clear enough to show that what was built there is still there. The filter also makes
     this one layer, so nothing inside it can rise above the card. */
  .behind {
    filter: blur(7px);
    opacity: 0.5;
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
  }
`;

/* Under the Plus sheet and its backdrop (998 and 999), which "See plans" opens over this. */
export const PlusLockCard = styled(StyledMiddleScreenMenu)`
  z-index: 2;
  align-items: stretch;
  gap: ${({ theme }) => theme.space.s12};
  padding-top: ${({ theme }) => theme.space.s24};
  box-shadow: ${({ theme }) => theme.shadow.dialog};

  .lockup {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.space.s8};
  }

  .brand {
    font-size: 22px;
    font-weight: ${({ theme }) => theme.weight.semibold};
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.ink.primary};
  }

  .title {
    margin: 0;
    text-align: center;
    font-size: ${({ theme }) => theme.size.s17};
    font-weight: ${({ theme }) => theme.weight.semibold};
    letter-spacing: -0.01em;
    color: ${({ theme }) => theme.ink.primary};
  }

  .body {
    margin: 0 0 ${({ theme }) => theme.space.s4};
    text-align: center;
    font-size: ${({ theme }) => theme.size.s14};
    line-height: 1.45;
    color: ${({ theme }) => theme.ink.tertiary};
  }

  .back {
    align-self: center;
    background: none;
    border: none;
    padding: ${({ theme }) => theme.space.s4};
    font-family: inherit;
    font-size: ${({ theme }) => theme.size.s13};
    color: ${({ theme }) => theme.ink.secondary};
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.ink.primary};
    }
  }
`;
