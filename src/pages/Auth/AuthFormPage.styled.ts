import styled from 'styled-components';

export const StyledAuthFormPage = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.ink.primary};
  padding: ${({ theme }) => `0 ${theme.space.s20}`};

  .backToSignIn {
    position: absolute;
    top: ${({ theme }) => theme.space.s20};
    left: ${({ theme }) => theme.space.s20};
  }

  .loginBox {
    display: flex;
    flex-direction: column;
    background-color: transparent;
    border: none;
    padding: 0;

    .promptMsg {
      padding-bottom: ${({ theme }) => theme.space.s14};
      white-space: initial;
      font-size: ${({ theme }) => theme.size.s14};
      color: ${({ theme }) => theme.ink.secondary};
    }

    .controlsContainer {
      display: flex;
      flex-direction: column;

      .errormsg {
        white-space: initial;
        padding-top: ${({ theme }) => theme.space.s6};
        color: ${({ theme }) => theme.direction.owe};
        font-size: ${({ theme }) => theme.size.s12};
      }

      .inputBox {
        display: flex;
        flex-direction: column;
        margin-bottom: ${({ theme }) => theme.space.s14};
      }

      button {
        margin-top: ${({ theme }) => theme.space.s4};
      }
    }
  }
`;
