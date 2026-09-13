import styled from 'styled-components';
import { StyledDialog } from '../Layouts/Dialog/Dialog.styled';

export const StyledForgotCredentials = styled(StyledDialog)`
  .title {
    font-size: ${({ theme }) => theme.size.s17};
    font-weight: ${({ theme }) => theme.weight.semibold};
    letter-spacing: -0.01em;
    color: ${({ theme }) => theme.ink.primary};
  }

  .description,
  .confirmation {
    font-size: ${({ theme }) => theme.size.s13};
    line-height: 1.6;
    color: ${({ theme }) => theme.ink.secondary};
    white-space: initial;
  }

  input {
    background-color: ${({ theme }) => theme.surface.page};
  }

  .errormsg {
    font-size: ${({ theme }) => theme.size.s12};
    line-height: 1.5;
    color: ${({ theme }) => theme.direction.owe};
    white-space: initial;
  }
`;

export const StyledForgotBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background-color: ${({ theme }) => theme.scrim.sheet};
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  z-index: 998;
`;

export const StyledForgotLinks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.space.s14};
  font-size: ${({ theme }) => theme.size.s12};

  .link {
    color: ${({ theme }) => theme.ink.secondary};
    text-decoration: none;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    font-size: ${({ theme }) => theme.size.s12};
  }
`;
